"use client"

import { Download, MonitorDown, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

declare global {
  interface Window {
    __itGirlInstallPrompt?: BeforeInstallPromptEvent | null
  }
}

function isStandaloneMode() {
  if (typeof window === "undefined") return false

  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean }
  return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true
}

export function PwaInstall() {
  const reducedMotion = useReducedMotion()
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  useEffect(() => {
    const displayMode = window.matchMedia("(display-mode: standalone)")

    const syncInstalledState = () => {
      setIsInstalled(isStandaloneMode())
    }

    const saveInstallPrompt = (event: Event) => {
      event.preventDefault()
      const promptEvent = event as BeforeInstallPromptEvent
      window.__itGirlInstallPrompt = promptEvent
      setInstallPrompt(promptEvent)
    }

    const readCapturedPrompt = () => {
      setInstallPrompt(window.__itGirlInstallPrompt ?? null)
    }

    const handleInstalled = () => {
      window.__itGirlInstallPrompt = null
      setInstallPrompt(null)
      setShowHelp(false)
      setIsInstalled(true)
    }

    syncInstalledState()
    readCapturedPrompt()

    window.addEventListener("beforeinstallprompt", saveInstallPrompt)
    window.addEventListener("it-girl-install-ready", readCapturedPrompt)
    window.addEventListener("appinstalled", handleInstalled)
    displayMode.addEventListener("change", syncInstalledState)

    return () => {
      window.removeEventListener("beforeinstallprompt", saveInstallPrompt)
      window.removeEventListener("it-girl-install-ready", readCapturedPrompt)
      window.removeEventListener("appinstalled", handleInstalled)
      displayMode.removeEventListener("change", syncInstalledState)
    }
  }, [])

  const install = async () => {
    const promptEvent = installPrompt ?? window.__itGirlInstallPrompt ?? null

    if (!promptEvent) {
      setShowHelp(true)
      return
    }

    try {
      await promptEvent.prompt()
      const choice = await promptEvent.userChoice
      window.__itGirlInstallPrompt = null
      setInstallPrompt(null)

      if (choice.outcome === "accepted") {
        setIsInstalled(true)
      } else {
        setShowHelp(true)
      }
    } catch {
      window.__itGirlInstallPrompt = null
      setInstallPrompt(null)
      setShowHelp(true)
    }
  }

  if (isInstalled) return null

  return (
    <>
      <motion.button
        type="button"
        onClick={install}
        initial={reducedMotion ? false : { opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed right-4 top-[4.6rem] z-[200] inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/75 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#D7E2EA] shadow-[0_10px_40px_rgba(0,0,0,0.45)] backdrop-blur-xl transition-colors hover:bg-white/10 sm:right-6 sm:top-20 sm:px-5 sm:py-2.5 sm:text-xs"
        aria-label="Install IT Girl portfolio as a desktop app"
      >
        <Download className="h-4 w-4" aria-hidden="true" />
        Install App
      </motion.button>

      <AnimatePresence>
        {showHelp ? (
          <motion.div
            className="fixed inset-0 z-[10000] flex items-center justify-center bg-black/70 px-5 backdrop-blur-md"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.25 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="pwa-install-title"
          >
            <motion.div
              className="relative w-full max-w-md rounded-[28px] border border-white/15 bg-[#111114] p-6 text-[#D7E2EA] shadow-[0_24px_100px_rgba(0,0,0,0.65)] sm:p-8"
              initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: reducedMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="absolute right-4 top-4 rounded-full border border-white/15 p-2 text-[#D7E2EA]/70 transition-colors hover:bg-white/10 hover:text-[#D7E2EA]"
                aria-label="Close install instructions"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#B600A8] via-[#7621B0] to-[#BE4C00] shadow-[0_10px_35px_rgba(118,33,176,0.35)]">
                <MonitorDown className="h-6 w-6 text-white" aria-hidden="true" />
              </div>

              <h2 id="pwa-install-title" className="text-2xl font-semibold uppercase tracking-tight sm:text-3xl">
                Install IT Girl
              </h2>
              <p className="mt-3 text-sm font-light leading-relaxed text-[#D7E2EA]/70 sm:text-base">
                Browser security requires the final install action from its own menu.
              </p>

              <ol className="mt-6 space-y-4 text-sm leading-relaxed sm:text-base">
                <li className="flex gap-3">
                  <span className="font-semibold text-[#BFCBD4]">01</span>
                  <span>Look for the install icon on the right side of the address bar.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-[#BFCBD4]">02</span>
                  <span>Or open the browser menu and choose “Install IT Girl” or “Install app”.</span>
                </li>
                <li className="flex gap-3">
                  <span className="font-semibold text-[#BFCBD4]">03</span>
                  <span>On Safari, use File → Add to Dock.</span>
                </li>
              </ol>

              <button
                type="button"
                onClick={() => setShowHelp(false)}
                className="mt-7 w-full rounded-full border border-white/20 bg-white/10 px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] transition-colors hover:bg-white/15"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default PwaInstall
