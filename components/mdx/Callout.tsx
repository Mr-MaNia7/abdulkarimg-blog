import type { ReactNode } from 'react'
import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'

type Variant = 'note' | 'important' | 'clarification'

/** A quiet bordered aside. The variant changes the weight of the frame, never adds colour. */
export default function Callout({
  type = 'note',
  title,
  lang,
  children,
}: {
  type?: Variant
  title?: string
  lang?: string
  children: ReactNode
}) {
  return (
    <aside className={`callout callout-${type}`}>
      <p className="callout-title">{typeset(title ?? dict(lang).mdx.callout[type])}</p>
      <div className="callout-body">{children}</div>
    </aside>
  )
}
