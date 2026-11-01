'use client'

import { useState, type ComponentType, type ReactNode } from 'react'
import type { GlossaryEntry } from './Term'

type PopoverProps = {
  entry: GlossaryEntry
  children: ReactNode
  defaultOpen?: boolean
  label: string
  pageLang: string
}

/**
 * A glossary term as a plain link. The Radix popover loads on first hover or
 * click; a modified click (Cmd/Ctrl/Shift/middle) keeps the link behaviour.
 */
export default function TermTrigger({
  entry,
  label,
  pageLang,
  children,
}: {
  entry: GlossaryEntry
  /** "In the glossary", in the page's language. */
  label: string
  pageLang: string
  children: ReactNode
}) {
  const [Popover, setPopover] = useState<ComponentType<PopoverProps> | null>(null)
  const [openOnLoad, setOpenOnLoad] = useState(false)

  const load = () =>
    import('./TermPopover').then((m) => setPopover(() => m.default as ComponentType<PopoverProps>))

  if (Popover)
    return (
      <Popover entry={entry} defaultOpen={openOnLoad} label={label} pageLang={pageLang}>
        {children}
      </Popover>
    )
  return (
    <a
      href={`/glossary#${entry.id}`}
      className="term"
      aria-haspopup="dialog"
      onPointerEnter={load}
      onClick={(e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
        e.preventDefault()
        setOpenOnLoad(true)
        load()
      }}
    >
      {children}
    </a>
  )
}
