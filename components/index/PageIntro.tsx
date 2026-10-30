import type { ReactNode } from 'react'
import { typeset } from '@/lib/typeset'

/** The opening of every index page: title, one plain sentence, and a mono count. */
export default function PageIntro({
  title,
  lede,
  meta,
  children,
}: {
  title: string
  lede?: ReactNode
  meta?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="page-intro">
      <h1 className="page-title">{typeset(title)}</h1>
      {lede && <p className="page-lede">{typeof lede === 'string' ? typeset(lede) : lede}</p>}
      {meta && <p className="page-meta">{meta}</p>}
      {children}
    </header>
  )
}
