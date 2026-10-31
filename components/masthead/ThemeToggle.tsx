'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

/** Switches between light and dark. "Follow the system" lives in the Aa panel. */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // Keep the browser chrome colour in step with a manually chosen theme.
  useEffect(() => {
    if (!resolvedTheme) return
    const bg = resolvedTheme === 'dark' ? '#11161f' : '#f9f8f5'
    document
      .querySelectorAll('meta[name="theme-color"]')
      .forEach((m) => m.setAttribute('content', bg))
  }, [resolvedTheme])

  const dark = mounted && resolvedTheme === 'dark'
  return (
    <button
      type="button"
      className="tool-button js-only"
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
        {dark ? (
          <>
            <circle cx="10" cy="10" r="3.5" />
            <path d="M10 2.5v1.8M10 15.7v1.8M2.5 10h1.8M15.7 10h1.8M4.7 4.7l1.3 1.3M14 14l1.3 1.3M4.7 15.3 6 14M14 6l1.3-1.3" />
          </>
        ) : (
          <path d="M15.5 12.3A6 6 0 0 1 7.7 4.5a6 6 0 1 0 7.8 7.8Z" />
        )}
      </svg>
    </button>
  )
}
