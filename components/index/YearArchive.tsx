import Link from '@/components/Link'
import { typeset } from '@/lib/typeset'
import { groupByYear, type Post } from '@/lib/content'
import { TYPE_LABEL } from '@/lib/posts'

const day = (date: string) =>
  new Date(date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', timeZone: 'UTC' })

/** Posts grouped by year, dates aligned in tabular figures. */
export default function YearArchive({
  posts,
  showType = true,
  headingLevel = 2,
}: {
  posts: Post[]
  showType?: boolean
  headingLevel?: 2 | 3
}) {
  const H = `h${headingLevel}` as 'h2' | 'h3'
  if (!posts.length) {
    return <p className="archive-empty">Nothing here yet.</p>
  }
  return (
    <div className="archive">
      {groupByYear(posts).map(([year, list]) => (
        <section key={year} className="archive-year" aria-labelledby={`y-${year}`}>
          <H id={`y-${year}`} className="archive-year-heading">
            {year}
          </H>
          <ul className="archive-list">
            {list.map((p) => (
              <li key={p.path} className="archive-row">
                <time dateTime={p.date} className="archive-date">
                  {day(p.date)}
                </time>
                <Link href={`/${p.path}`} className="archive-title">
                  {typeset(p.title)}
                </Link>
                {showType && <span className="archive-type">{TYPE_LABEL[p.type ?? 'essay']}</span>}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
