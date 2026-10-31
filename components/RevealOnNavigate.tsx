'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

declare global {
  interface Window {
    hashiyaReveal?: () => void
  }
}

/** Re-arms the first-view reveal (lib/reveal.ts) for lists rendered by client navigation. */
export default function RevealOnNavigate() {
  const pathname = usePathname()
  useEffect(() => {
    window.hashiyaReveal?.()
  }, [pathname])
  return null
}
