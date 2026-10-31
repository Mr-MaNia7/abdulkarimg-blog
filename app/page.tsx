import { slug } from 'github-slugger'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import siteMetadata from '@/data/siteMetadata'
import { typeset } from '@/lib/typeset'
import { formatDate, TYPE_LABEL } from '@/lib/posts'
import { byType, categories, countLine, plural, posts } from '@/lib/content'
import { ldScript, siteJsonLd } from '@/lib/jsonld'

const LATEST = 6
const QUESTIONS = 4

export default function Home() {
  const essays = byType('essay')
  const questions = byType('qa')
  const featured = posts.find((p) => p.featured) ?? essays[0] ?? posts[0]
  const latest = posts.filter((p) => p !== featured).slice(0, LATEST)
  const featuredSections = (featured?.toc as { value: string; depth: number }[] | undefined)
    ?.filter((t) => t.depth === 2 && !/^(bibliography|references|notes)$/i.test(t.value))
    .slice(0, 6)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: ldScript(siteJsonLd()) }}
      />
      {/* The cover. */}
      <section className="cover" aria-labelledby="cover-title">
        <SectionContainer>
          <div className="cover-panel">
            <h1 id="cover-title" className="cover-title" translate="no">
              {typeset(siteMetadata.title)}
            </h1>
            <p className="cover-arabic" lang="ar" dir="rtl" translate="no">
              حاشية
            </p>
            <p className="cover-mission">{siteMetadata.description}</p>
            <p className="cover-meta">{countLine()}</p>
            <p className="cover-author">{siteMetadata.author}</p>
          </div>
        </SectionContainer>
      </section>

      <SectionContainer>
        {featured && (
          <section className="home-section featured" aria-labelledby="featured-heading">
            <h2 id="featured-heading" className="home-heading">
              Featured essay
            </h2>
            <div className="featured-grid">
              <article className="featured-main">
                <h3 className="featured-title">
                  <Link href={`/${featured.path}`}>{typeset(featured.title)}</Link>
                </h3>
                {featured.summary && <p className="featured-dek">{typeset(featured.summary)}</p>}
                <p className="entry-meta">
                  <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                  {featured.category && <> · {featured.category}</>}
                  {featured.readingTime && (
                    <> · {Math.max(1, Math.round(featured.readingTime.minutes))} min read</>
                  )}
                </p>
              </article>
              {featuredSections && featuredSections.length > 1 && (
                <nav className="featured-contents" aria-label="In this essay">
                  <p className="featured-contents-label">In this essay</p>
                  <ol>
                    {featuredSections.map((s) => (
                      <li key={s.value}>{typeset(s.value)}</li>
                    ))}
                  </ol>
                </nav>
              )}
            </div>
          </section>
        )}

        {latest.length > 0 && (
          <section className="home-section" aria-labelledby="latest-heading">
            <div className="home-heading-row">
              <h2 id="latest-heading" className="home-heading">
                Latest
              </h2>
              <Link href="/blog" className="home-more">
                The full archive
              </Link>
            </div>
            <ol className="latest-list" data-reveal suppressHydrationWarning>
              {latest.map((p, i) => (
                <li key={p.path} className="latest-row">
                  <span className="latest-index" aria-hidden="true">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="latest-body">
                    <Link href={`/${p.path}`} className="latest-title">
                      {typeset(p.title)}
                    </Link>
                    {p.summary && <p className="latest-summary">{typeset(p.summary)}</p>}
                  </div>
                  <p className="latest-meta">
                    {TYPE_LABEL[p.type ?? 'essay']}
                    <br />
                    <time dateTime={p.date}>{formatDate(p.date, 'short')}</time>
                  </p>
                </li>
              ))}
            </ol>
          </section>
        )}
      </SectionContainer>

      {questions.length > 0 && (
        <section className="questions-band" aria-labelledby="questions-heading">
          <SectionContainer>
            <div className="home-heading-row">
              <h2 id="questions-heading" className="home-heading">
                Questions on Islam
              </h2>
              <Link href="/questions" className="home-more">
                All {plural(questions.length, 'question', 'questions')}
              </Link>
            </div>
            <ul className="question-grid" data-reveal suppressHydrationWarning>
              {questions.slice(0, QUESTIONS).map((q) => (
                <li key={q.path}>
                  <Link href={`/${q.path}`} className="question-title">
                    {typeset(q.title)}
                  </Link>
                  {q.short_answer && <p className="question-answer">{typeset(q.short_answer)}</p>}
                </li>
              ))}
            </ul>
          </SectionContainer>
        </section>
      )}

      <SectionContainer>
        <section className="home-section home-section-last" aria-labelledby="subjects-heading">
          <h2 id="subjects-heading" className="home-heading">
            Browse by subject
          </h2>
          <ul className="subject-grid" data-reveal suppressHydrationWarning>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link href={`/category/${slug(c.name)}`} className="subject-name">
                  {c.name}
                </Link>
                <p className="subject-count">
                  {c.posts.length ? plural(c.posts.length, 'piece', 'pieces') : 'Nothing yet'}
                </p>
                <p className="subject-description">{c.description}</p>
              </li>
            ))}
          </ul>
        </section>
      </SectionContainer>
    </>
  )
}
