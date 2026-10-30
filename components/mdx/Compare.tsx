import type { ReactNode } from 'react'
import { typeset } from '@/lib/typeset'

type Side = {
  label: string
  /** One entry per row, aligned with the other side by position. */
  items: ReactNode[]
}

type Props = {
  left: Side
  right: Side
  /** Optional row headings, e.g. ['God', 'Scripture', 'Salvation']. */
  rows?: string[]
  caption?: string
}

const cell = (item: ReactNode) => (typeof item === 'string' ? typeset(item) : item)

/**
 * Two traditions side by side. A real table, so rows stay aligned and are read
 * in order by assistive tech; on narrow screens each row stacks into a block.
 */
export default function Compare({ left, right, rows, caption }: Props) {
  const count = Math.max(left.items.length, right.items.length, rows?.length ?? 0)
  return (
    <figure className="compare not-prose">
      <table>
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            {rows && (
              <td>
                <span className="sr-only">Topic</span>
              </td>
            )}
            <th scope="col">{typeset(left.label)}</th>
            <th scope="col">{typeset(right.label)}</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: count }, (_, i) => (
            <tr key={i}>
              {rows && <th scope="row">{rows[i] && typeset(rows[i])}</th>}
              <td data-label={left.label}>{cell(left.items[i])}</td>
              <td data-label={right.label}>{cell(right.items[i])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}
