'use client'

import * as Popover from '@radix-ui/react-popover'
import { useState, type ReactNode } from 'react'
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
}: {
  entry: GlossaryEntry
  children: ReactNode
}) {
  const href = `/glossary#${entry.id}`
  const [open, setOpen] = useState(false)
  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <a
          href={href}
          className="term"
          aria-haspopup="dialog"
          onClick={(e) => {
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
          {entry.definition && <p className="term-card-def">{typeset(entry.definition)}</p>}
          <a className="term-card-link" href={href}>
            In the glossary
          </a>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
