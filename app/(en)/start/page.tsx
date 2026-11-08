import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import { courseParts } from '@/lib/content'
import { typeset } from '@/lib/typeset'
import { genPageMetadata } from 'app/seo'

const lede =
  'The argument of this site, in the order it is meant to be read: first how we know anything, then that God exists, then that Islam is His religion, and last the doubts raised against it.'

export const metadata = genPageMetadata({ title: 'Start here', description: lede })

export default function StartPage() {
  const { parts, total, written } = courseParts()
  return (
    <SectionContainer>
      <div className="index-page course-page">
        <PageIntro
          title="Start here"
          lede={lede}
          meta={`${written} of ${total} pieces written · the rest are forthcoming`}
        />
        {parts.map((part) => (
          <section key={part.slug} className="course-part" aria-labelledby={`part-${part.slug}`}>
            <header className="course-part-head">
              <p className="course-numeral" aria-hidden="true">
                {part.numeral}
              </p>
              <div>
                <h2 id={`part-${part.slug}`} className="course-part-title">
                  <span className="sr-only">Part {part.numeral}: </span>
                  <Link href={`/category/${part.slug}`}>{typeset(part.title)}</Link>
                </h2>
                {part.classical && (
                  <p className="course-classical">
                    <i>{typeset(part.classical)}</i>
                  </p>
                )}
                <p className="course-part-description">{typeset(part.description)}</p>
              </div>
            </header>
            {part.groups.map((g, i) => (
              <div key={g.heading ?? i} className="course-group">
                {g.heading && <h3 className="course-group-heading">{typeset(g.heading)}</h3>}
                <ol className="course-modules">
                  {g.modules.map((m) => (
                    <li key={m.n} className="course-module" value={m.n}>
                      <span className="course-n" aria-hidden="true">
                        {m.n}
                      </span>
                      <div>
                        <p className="course-module-title">
                          {m.post ? (
                            <Link href={`/${m.post.path}`}>{typeset(m.title)}</Link>
                          ) : (
                            typeset(m.title)
                          )}
                          {!m.post && <span className="course-soon">Forthcoming</span>}
                        </p>
                        {m.summary && <p className="course-module-summary">{typeset(m.summary)}</p>}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </section>
        ))}
      </div>
    </SectionContainer>
  )
}
