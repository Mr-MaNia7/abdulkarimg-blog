import { Fragment } from 'react'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import LangEntry from '@/components/index/LangEntry'
import siteMetadata from '@/data/siteMetadata'
import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import { dateLines } from '@/lib/posts'
import { countLine, postsIn } from '@/lib/content'
import { ldScript, siteJsonLd } from '@/lib/jsonld'

const LATEST = 8

/** The Amharic front page: the same cover, then the latest Amharic writing. */
export default function AmharicHome() {
  const t = dict('am')
  const posts = postsIn('am')
  const latest = posts.slice(0, LATEST)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldScript(siteJsonLd('am')) }}
      />
      <section className="cover" aria-labelledby="cover-title">
        <SectionContainer>
          <div className="cover-panel">
            <h1 id="cover-title" className="cover-title" translate="no" lang="en">
              {typeset(siteMetadata.title)}
            </h1>
            <p className="cover-arabic" lang="ar" dir="rtl" translate="no">
              سيماء
            </p>
            <p className="cover-mission">{t.description}</p>
            {posts.length > 0 && <p className="cover-meta">{countLine(posts, 'am')}</p>}
            <p className="cover-author" lang="en">
              {siteMetadata.author}
            </p>
          </div>
        </SectionContainer>
      </section>

      <SectionContainer>
        <section className="home-section home-section-last" aria-labelledby="latest-heading">
          <div className="home-heading-row">
            <h2 id="latest-heading" className="home-heading">
              {t.index.latest}
            </h2>
            <p className="home-links">
              <Link href={t.archive} className="home-more">
                {t.index.fullArchive}
              </Link>
              <LangEntry to="en" from="am" />
            </p>
          </div>
          {latest.length ? (
            <ol className="latest-list">
              {latest.map((p) => (
                <li key={p.path} className="latest-row">
                  <div className="latest-body">
                    <Link href={`/${p.path}`} className="latest-title">
                      {typeset(p.title)}
                    </Link>
                    {(p.summary || p.short_answer) && (
                      <p className="latest-summary">{typeset(p.summary ?? p.short_answer!)}</p>
                    )}
                  </div>
                  <p className="latest-meta">
                    {t.types[p.type ?? 'essay']}
                    <br />
                    <time dateTime={p.date}>
                      {dateLines(p.date, 'am').map((line, i) => (
                        <Fragment key={line}>
                          {i > 0 && ' '}
                          <span className="latest-date">{line}</span>
                        </Fragment>
                      ))}
                    </time>
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <p className="archive-empty">{t.index.empty}</p>
          )}
        </section>
      </SectionContainer>
    </>
  )
}
