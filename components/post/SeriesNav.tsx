import Link from '@/components/Link'
import { typeset } from '@/lib/typeset'
import type { SeriesContext } from '@/lib/posts'

/** The parts of a multi-part essay, with the current one marked. */
export function SeriesContents({ series }: { series: SeriesContext }) {
  return (
    <nav className="series-box" aria-labelledby="series-heading" data-pagefind-ignore="all">
      <p id="series-heading" className="series-heading">
        Part {series.part} of {series.parts.length} in{' '}
        <Link href={`/series/${series.slug}`}>{typeset(series.name)}</Link>
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
export function SeriesPager({ series }: { series: SeriesContext }) {
  const i = series.parts.findIndex((p) => p.part === series.part)
  const prev = series.parts[i - 1]
  const next = series.parts[i + 1]
  if (!prev && !next) return null
  return (
    <nav
      data-pagefind-ignore="all"
      className="pager pager-series"
      aria-label={`${series.name}: other parts`}
    >
      {prev && (
        <Link href={`/${prev.path}`} className="pager-link pager-prev" rel="prev">
          <span className="pager-dir">Part {prev.part}</span>
          <span className="pager-title">{typeset(prev.title)}</span>
        </Link>
      )}
      {next && (
        <Link href={`/${next.path}`} className="pager-link pager-next" rel="next">
          <span className="pager-dir">Part {next.part}</span>
          <span className="pager-title">{typeset(next.title)}</span>
        </Link>
      )}
    </nav>
  )
}
