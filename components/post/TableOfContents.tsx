import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import TocHighlighter from './TocHighlighter'

export type TocItem = { value: string; url: string; depth: number }

/**
 * Every section stays visible; the one being read is brought forward by
 * TocHighlighter. Without JavaScript it is a plain list of links.
 */
export function TocList({ toc }: { toc: TocItem[] }) {
  const items = toc.filter((t) => t.depth <= 3)
  return (
    <ol className="toc-list">
      {items.map((item) => (
        <li key={item.url} className={item.depth === 3 ? 'toc-sub' : undefined}>
          <a href={item.url}>{typeset(item.value)}</a>
        </li>
      ))}
    </ol>
  )
}

const enough = (toc: TocItem[]) => toc.filter((t) => t.depth <= 3).length >= 2

/**
 * Wide screens: sticky in the left margin, closed until the reader opens it,
 * so the margin stays quiet beside the text. A native disclosure, so it opens
 * without JavaScript; open, the section being read is marked.
 */
export default function TableOfContents({ toc, lang }: { toc: TocItem[]; lang?: string }) {
  if (!enough(toc)) return null
  const label = dict(lang).post.contents
  return (
    <nav className="toc toc-margin" aria-label={label}>
      <details className="toc-panel">
        <summary className="toc-toggle">{label}</summary>
        <TocList toc={toc} />
      </details>
      <TocHighlighter />
    </nav>
  )
}

/** Narrow screens: the same disclosure, at the top of the text. */
export function TocInline({ toc, lang }: { toc: TocItem[]; lang?: string }) {
  if (!enough(toc)) return null
  return (
    <details className="toc toc-inline" data-pagefind-ignore="all">
      <summary className="toc-toggle">{dict(lang).post.contents}</summary>
      <TocList toc={toc} />
    </details>
  )
}
