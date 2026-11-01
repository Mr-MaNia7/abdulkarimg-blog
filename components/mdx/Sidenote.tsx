import { useId, type ReactNode } from 'react'
import { dict } from '@/data/i18n'

/**
 * A Tufte-style margin note. On wide screens it floats into the right margin;
 * on narrow screens the lettered mark toggles it open inline. Pure HTML and CSS:
 * a checkbox carries the open state, so it works without JavaScript.
 */
export default function Sidenote({ children, lang }: { children: ReactNode; lang?: string }) {
  const id = `sn-${useId().replace(/[^a-zA-Z0-9-]/g, '')}`
  return (
    <span className="sidenote-wrap">
      <input type="checkbox" id={id} className="sidenote-toggle" />
      <label htmlFor={id} className="sidenote-ref">
        <span className="sr-only">{dict(lang).post.sideNote}</span>
      </label>
      <span className="sidenote" role="note">
        {children}
      </span>
    </span>
  )
}
