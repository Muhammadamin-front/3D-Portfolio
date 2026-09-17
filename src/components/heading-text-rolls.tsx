"use client"

import { useEffect } from "react"
import { createRoot, type Root } from "react-dom/client"
import { TextRoll } from "./ui/text-roll"

const HEADING_SELECTOR = "h1, h2, h3"
const READY_ATTRIBUTE = "data-text-roll-ready"

interface TextReplacement {
  mount: HTMLSpanElement
  originalTextNode: Text
  root: Root
}

interface ProcessedHeading {
  heading: HTMLHeadingElement
  replacements: TextReplacement[]
  screenReaderText: HTMLSpanElement
}

function normalizeWhitespace(value: string) {
  return value.replace(/\s+/gu, " ")
}

function characterCount(value: string) {
  return Array.from(value).length
}

function collectTextNodes(heading: HTMLHeadingElement) {
  const textNodes: Text[] = []
  const walker = document.createTreeWalker(heading, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement
      if (!parent || parent.closest("script, style, [data-text-roll-ignore]")) {
        return NodeFilter.FILTER_REJECT
      }

      return normalizeWhitespace(node.nodeValue ?? "").length > 0
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT
    },
  })

  let currentNode = walker.nextNode()
  while (currentNode) {
    textNodes.push(currentNode as Text)
    currentNode = walker.nextNode()
  }

  return textNodes
}

function headingsWithin(node: Node) {
  if (!(node instanceof Element)) return []

  const headings: HTMLHeadingElement[] = []
  if (node.matches(HEADING_SELECTOR)) {
    headings.push(node as HTMLHeadingElement)
  }

  headings.push(...Array.from(node.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR)))
  return headings
}

export function HeadingTextRolls() {
  useEffect(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return

    const processedHeadings = new Map<HTMLHeadingElement, ProcessedHeading>()
    let contentObserver: MutationObserver | null = null
    let readyObserver: MutationObserver | null = null
    let hostObserver: MutationObserver | null = null
    let publicView: HTMLElement | null = null

    const restoreHeading = (heading: HTMLHeadingElement) => {
      const processed = processedHeadings.get(heading)
      if (!processed) return

      for (const replacement of processed.replacements) {
        replacement.root.unmount()
        if (replacement.mount.parentNode) {
          replacement.mount.replaceWith(replacement.originalTextNode)
        }
      }

      processed.screenReaderText.remove()
      heading.removeAttribute(READY_ATTRIBUTE)
      processedHeadings.delete(heading)
    }

    const processHeading = (heading: HTMLHeadingElement) => {
      if (heading.hasAttribute(READY_ATTRIBUTE) || !publicView?.contains(heading)) return

      const originalTextNodes = collectTextNodes(heading)
      const accessibleText = normalizeWhitespace(heading.textContent ?? "").trim()
      if (!accessibleText || originalTextNodes.length === 0) return

      heading.setAttribute(READY_ATTRIBUTE, "")

      const screenReaderText = document.createElement("span")
      screenReaderText.className = "sr-only"
      screenReaderText.setAttribute("data-text-roll-ignore", "")
      screenReaderText.textContent = accessibleText
      heading.prepend(screenReaderText)

      const replacements: TextReplacement[] = []
      let characterOffset = 0

      for (const originalTextNode of originalTextNodes) {
        const text = normalizeWhitespace(originalTextNode.nodeValue ?? "")
        if (!text) continue

        const mount = document.createElement("span")
        mount.className = "heading-text-roll-mount"
        mount.setAttribute("aria-hidden", "true")
        originalTextNode.replaceWith(mount)

        const root = createRoot(mount)
        root.render(
          <TextRoll
            announce={false}
            characterOffset={characterOffset}
            text={text}
          />,
        )

        replacements.push({ mount, originalTextNode, root })
        characterOffset += characterCount(text)
      }

      processedHeadings.set(heading, {
        heading,
        replacements,
        screenReaderText,
      })
    }

    const processNode = (node: Node) => {
      for (const heading of headingsWithin(node)) {
        processHeading(heading)
      }
    }

    const restoreRemovedNode = (node: Node) => {
      for (const heading of headingsWithin(node)) {
        if (processedHeadings.has(heading)) restoreHeading(heading)
      }
    }

    const startContentObserver = () => {
      if (contentObserver || !publicView) return

      publicView.querySelectorAll<HTMLHeadingElement>(HEADING_SELECTOR).forEach(processHeading)

      contentObserver = new MutationObserver((records) => {
        for (const record of records) {
          record.removedNodes.forEach(restoreRemovedNode)
          record.addedNodes.forEach(processNode)
        }
      })

      contentObserver.observe(publicView, { childList: true, subtree: true })
    }

    const findPublicViewAndStart = () => {
      if (!document.documentElement.classList.contains("ready")) return

      publicView = document.querySelector<HTMLElement>("#public-view")
      if (publicView) {
        hostObserver?.disconnect()
        hostObserver = null
        startContentObserver()
        return
      }

      if (!hostObserver) {
        hostObserver = new MutationObserver(findPublicViewAndStart)
        hostObserver.observe(document.documentElement, { childList: true, subtree: true })
      }
    }

    if (document.documentElement.classList.contains("ready")) {
      findPublicViewAndStart()
    } else {
      readyObserver = new MutationObserver(() => {
        if (!document.documentElement.classList.contains("ready")) return
        readyObserver?.disconnect()
        readyObserver = null
        findPublicViewAndStart()
      })

      readyObserver.observe(document.documentElement, {
        attributeFilter: ["class"],
        attributes: true,
      })
    }

    return () => {
      contentObserver?.disconnect()
      readyObserver?.disconnect()
      hostObserver?.disconnect()

      for (const heading of Array.from(processedHeadings.keys())) {
        restoreHeading(heading)
      }
    }
  }, [])

  return null
}

export default HeadingTextRolls
