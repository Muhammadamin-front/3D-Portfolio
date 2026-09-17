"use client"

import { Download } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>
}

function isStandaloneMode() {
  if (typeof window === "undefined") return false

  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean }
  return window.matchMedia("(display-mode: standalone)").matches || navigatorWithStandalone.standalone === true
}

export function PwaInstall() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    setIsInstalled(isStandaloneMode())

    const handleInstallPrompt = (event: Event) => {
      event.preventDefault()
      setInstallPrompt(event as BeforeInstallPromptEvent)
    }

    const handleInstalled = () => {
      setInstallPrompt(null)
      setIsInstalled(true)
    }

    window.addEventListener("beforeinstallprompt", handleInstallPrompt)
    window.addEventListener("appinstalled", handleInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleInstallPrompt)
      window.removeEventListener("appinstalled", handleInstalled)
    }
  }, [])

  const install = async () => {
    if (!installPrompt) return
    await installPrompt.prompt()
    const choice = await installPrompt.userChoice
    if (choice.outcome === "accepted") {
      setInstallPrompt(null)
      setIsInstalled(true)
    }
  }

  return (
    <AnimatePresence>
      {!isInstalled && installPrompt ? (
        <motion.button
          type="button"
          onClick={install}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 top-16 z-[100] inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/70 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-[#D7E2EA] shadow-[0_10px_40px_rgba(0,0,0,0.35)] backdrop-blur-xl transition-colors hover:bg-white/10 sm:right-6 sm:top-20 sm:px-5 sm:py-2.5 sm:text-xs"
          aria-label="Install IT Girl portfolio as a desktop app"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Install App
        </motion.button>
      ) : null}
    </AnimatePresence>
  )
}

export default PwaInstall
