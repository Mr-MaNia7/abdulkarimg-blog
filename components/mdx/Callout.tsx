import type { ReactNode } from 'react'
import { typeset } from '@/lib/typeset'

type Variant = 'note' | 'important' | 'clarification'

const TITLES: Record<Variant, string> = {
  note: 'Note',
  important: 'Important',
  clarification: 'Clarification',
}

/** A quiet bordered aside. The variant changes the weight of the frame, never adds colour. */
export default function Callout({
  type = 'note',
  title,
  children,
}: {
  type?: Variant
  title?: string
  children: ReactNode
}) {
  return (
    <aside className={`callout callout-${type}`}>
      <p className="callout-title">{typeset(title ?? TITLES[type])}</p>
      <div className="callout-body">{children}</div>
    </aside>
  )
}
