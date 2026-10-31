'use client'

import { notify } from '@/components/ToastHost'

/**
 * Copies `text` and confirms with a toast. Marked js-only, so readers without
 * JavaScript never see a dead button.
 */
export default function CopyButton({ text, label }: { text: string; label: string }) {
  async function copy() {
    try {
      await navigator.clipboard.writeText(text)
      notify(`Copied ${label}`)
    } catch {
      notify('Copy failed. Select the text and copy it manually.')
    }
  }

  return (
    <button type="button" className="scripture-copy js-only" onClick={copy}>
      <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <rect x="5.5" y="5.5" width="8" height="8" rx="1" />
        <path d="M10.5 3.5v-.5a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h.5" />
      </svg>
      <span>Copy</span>
      <span className="sr-only"> {label}</span>
    </button>
  )
}
