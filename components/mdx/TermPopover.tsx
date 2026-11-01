'use client'

import * as Popover from '@radix-ui/react-popover'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { GlossaryEntry } from './Term'
import { typeset } from '@/lib/typeset'

/**
 * The trigger is a real link to the glossary, so the term works without
 * JavaScript; once hydrated, a click opens the popover instead. Open state is
 * controlled here because preventing the link's navigation also stops Radix's
 * own toggle.
 */
export default function TermPopover({
  entry,
  children,
  defaultOpen = false,
  label,
  pageLang,
}: {
  entry: GlossaryEntry
  children: ReactNode
  defaultOpen?: boolean
  label: string
  pageLang: string
}) {
  const href = `/glossary#${entry.id}`
  const [open, setOpen] = useState(false)
  const trigger = useRef<HTMLAnchorElement>(null)

  // Replaces a placeholder link: keep focus on the term and open on the next
  // frame, so the swap is not mistaken for an outside interaction.
  useEffect(() => {
    if (!defaultOpen) return
    trigger.current?.focus()
    requestAnimationFrame(() => setOpen(true))
  }, [defaultOpen])
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <a
          ref={trigger}
          href={href}
          className="term"
          aria-haspopup="dialog"
          onClick={(e) => {
            // Cmd/Ctrl/Shift-click and middle-click keep their link behaviour.
            if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
            e.preventDefault()
            setOpen((o) => !o)
          }}
        >
          {children}
        </a>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="term-card"
          side="top"
          align="center"
          sideOffset={8}
          collisionPadding={16}
        >
          <p className="term-card-head">
            {entry.ar && (
              <span className="term-card-ar" lang="ar" dir="rtl">
                {entry.ar}
              </span>
            )}
            {entry.translit && <i className="term-card-translit">{typeset(entry.translit)}</i>}
          </p>
          {/* Glossary definitions are written in English (data/glossary.json). */}
          {entry.definition && (
            <p className="term-card-def" lang={pageLang === 'en' ? undefined : 'en'}>
              {typeset(entry.definition)}
            </p>
          )}
          <a className="term-card-link" href={href} hrefLang={pageLang === 'en' ? undefined : 'en'}>
            {label}
          </a>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
