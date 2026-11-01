import Link from '@/components/Link'
import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import { groupByYear, type Post } from '@/lib/content'
import { formatDay } from '@/lib/posts'

/**
 * Posts grouped by year, dates aligned in tabular figures. On Amharic pages
 * the years are Ethiopian ("2019 ዓ.ም.") and each row gives both dates.
 */
export default function YearArchive({
  posts,
  showType = true,
  headingLevel = 2,
  lang = 'en',
}: {
  posts: Post[]
  showType?: boolean
  headingLevel?: 2 | 3
  lang?: string
}) {
  const H = `h${headingLevel}` as 'h2' | 'h3'
  const t = dict(lang)
  if (!posts.length) {
    return <p className="archive-empty">{t.index.empty}</p>
  }
  return (
    <div className="archive" data-lang={lang}>
      {groupByYear(posts, lang).map(([year, list]) => (
        <section key={year} className="archive-year" aria-labelledby={`y-${year}`}>
          <H id={`y-${year}`} className="archive-year-heading">
            {year}
            {t.index.era && <span className="archive-era"> {t.index.era}</span>}
          </H>
          <ul className="archive-list" data-reveal suppressHydrationWarning>
            {list.map((p) => (
              <li key={p.path} className="archive-row">
                <time dateTime={p.date} className="archive-date">
                  {formatDay(p.date, lang)}
                </time>
                <Link href={`/${p.path}`} className="archive-title">
                  {typeset(p.title)}
                </Link>
                {showType && <span className="archive-type">{t.types[p.type ?? 'essay']}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
