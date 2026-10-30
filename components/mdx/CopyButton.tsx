'use client'

import { useEffect, useState } from 'react'
import { toast } from 'sonner'

/**
 * Copies `text` and confirms with a toast. Rendered hidden on the server and
 * revealed after hydration, so readers without JavaScript never see a dead button.
 */
export default function CopyButton({ text, label }: { text: string; label: string }) {
  const [ready, setReady] = useState(false)
  useEffect(() => setReady(true), [])

  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      toast(`Copied ${label}`)
    } catch {
      toast('Copy failed. Select the text and copy it manually.')
    }
  }

  return (
    <button type="button" className="scripture-copy" onClick={copy} hidden={!ready}>
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
        <path d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" />
      </svg>
      <span>Copy</span>
      <span className="sr-only"> {label}</span>
    </button>
  )
}
