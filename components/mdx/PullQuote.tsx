import type { ReactNode } from 'react'

/**
 * A display-size repetition of a line from the essay. Hidden from assistive
 * tech because the same words already appear in the text.
 */
export default function PullQuote({ children }: { children: ReactNode }) {
  return (
    <figure className="pullquote not-prose" aria-hidden="true">
      <blockquote>{children}</blockquote>
    </figure>
  )
}
