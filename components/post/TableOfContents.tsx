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

/** Wide screens: sticky in the left margin, with the current section marked. */
export default function TableOfContents({ toc, lang }: { toc: TocItem[]; lang?: string }) {
  if (!enough(toc)) return null
  return (
    <nav className="toc toc-margin" aria-labelledby="toc-heading">
      {/* A label, not a heading: this box precedes the post's h1 in the document. */}
      <p id="toc-heading" className="toc-heading">
        {dict(lang).post.contents}
      </p>
      <TocList toc={toc} />
      <TocHighlighter />
    </nav>
  )
}

/** Narrow screens: a disclosure at the top of the text. */
export function TocInline({ toc, lang }: { toc: TocItem[]; lang?: string }) {
  if (!enough(toc)) return null
  return (
    <details className="toc toc-inline" data-pagefind-ignore="all">
      <summary className="toc-heading">{dict(lang).post.contents}</summary>
      <TocList toc={toc} />
    </details>
  )
}
