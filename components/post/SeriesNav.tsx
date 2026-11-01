import type { ReactNode } from 'react'
import Link from '@/components/Link'
import { dict, fill } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import type { SeriesContext } from '@/lib/posts'

/** Fill a template whose {name} is a node, not a string: word order differs by language. */
function withNode(template: string, vars: Record<string, string | number>, name: ReactNode) {
  const [before, after = ''] = fill(template, vars).split('{name}')
  return (
    <>
      {before}
      {name}
      {after}
    </>
  )
}

/** The parts of a multi-part essay, with the current one marked. */
export function SeriesContents({ series, lang = 'en' }: { series: SeriesContext; lang?: string }) {
  const t = dict(lang).post
  // Series index pages exist in English only.
  const name =
    lang === 'en' ? (
      <Link href={`/series/${series.slug}`}>{typeset(series.name)}</Link>
    ) : (
      typeset(series.name)
    )
  return (
    <nav className="series-box" aria-labelledby="series-heading" data-pagefind-ignore="all">
      <p id="series-heading" className="series-heading">
        {withNode(t.seriesPartOf, { part: series.part, total: series.parts.length }, name)}
      </p>
      <ol className="series-list">
        {series.parts.map((p) => (
          <li key={p.path} value={p.part}>
            {p.part === series.part ? (
              <span aria-current="page">{typeset(p.title)}</span>
            ) : (
              <Link href={`/${p.path}`}>{typeset(p.title)}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/** Previous and next part, placed at the end of the text. */
export function SeriesPager({ series, lang = 'en' }: { series: SeriesContext; lang?: string }) {
  const t = dict(lang).post
  const i = series.parts.findIndex((p) => p.part === series.part)
  const prev = series.parts[i - 1]
  const next = series.parts[i + 1]
  if (!prev && !next) return null
  return (
    <nav
      data-pagefind-ignore="all"
      className="pager pager-series"
      aria-label={fill(t.seriesOther, { name: series.name })}
    >
      {prev && (
        <Link href={`/${prev.path}`} className="pager-link pager-prev" rel="prev">
          <span className="pager-dir">{fill(t.seriesPart, { n: prev.part })}</span>
          <span className="pager-title">{typeset(prev.title)}</span>
        </Link>
      )}
      {next && (
        <Link href={`/${next.path}`} className="pager-link pager-next" rel="next">
          <span className="pager-dir">{fill(t.seriesPart, { n: next.part })}</span>
          <span className="pager-title">{typeset(next.title)}</span>
        </Link>
      )}
    </nav>
  )
}
