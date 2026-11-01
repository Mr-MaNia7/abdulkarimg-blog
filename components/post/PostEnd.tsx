import { slug } from 'github-slugger'
import Link from '@/components/Link'
import Comments from '@/components/Comments'
import siteMetadata from '@/data/siteMetadata'
import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import { formatDate, type PostSummary } from '@/lib/posts'

type Neighbour = { path: string; title: string }

// Comments appear only once the provider is configured (giscus needs its repo env vars).
const comments = siteMetadata.comments as
  | { provider?: string; giscusConfig?: { repo?: string } }
  | undefined
const commentsReady =
  !!comments?.provider && (comments.provider !== 'giscus' || !!comments.giscusConfig?.repo)

type Props = {
  lang?: string
  slug: string
  filePath: string
  tags?: string[]
  prev?: Neighbour
  next?: Neighbour
  related: PostSummary[]
}

/** Everything after the text: filing, correction link, related reading, neighbours, comments. */
export default function PostEnd({
  lang = 'en',
  slug: postSlug,
  filePath,
  tags,
  prev,
  next,
  related,
}: Props) {
  const editUrl = `${siteMetadata.siteRepo}/blob/main/data/${filePath}`
  const t = dict(lang)
  return (
    <footer className="post-end" data-pagefind-ignore="all">
      <div className="post-filing">
        {tags && tags.length > 0 && (
          <p>
            <span className="post-filing-label">{t.post.filedUnder}</span>{' '}
            {tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 && (lang === 'am' ? '፣ ' : ', ')}
                {lang === 'en' ? (
                  <Link href={`/tags/${slug(tag)}`}>{tag}</Link>
                ) : (
                  // Tag pages exist in English only; tags are named, not linked.
                  <span lang="en">{tag}</span>
                )}
              </span>
            ))}
          </p>
        )}
        <p>
          <Link href={editUrl}>{t.post.suggestCorrection}</Link>
        </p>
      </div>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-heading">
          <h2 id="related-heading" className="end-heading">
            {t.post.related}
          </h2>
          <ul className="related-list">
            {related.map((p) => (
              <li key={p.path}>
                <Link href={`/${p.path}`} className="related-title">
                  {typeset(p.title)}
                </Link>
                <span className="related-meta">
                  {t.types[p.type ?? 'essay']} ·{' '}
                  <time dateTime={p.date}>{formatDate(p.date, 'short', lang)}</time>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(prev || next) && (
        <nav className="pager" aria-label={t.post.pager}>
          {prev && (
            <Link href={`/${prev.path}`} className="pager-link pager-prev" rel="prev">
              <span className="pager-dir">{t.post.older}</span>
              <span className="pager-title">{typeset(prev.title)}</span>
            </Link>
          )}
          {next && (
            <Link href={`/${next.path}`} className="pager-link pager-next" rel="next">
              <span className="pager-dir">{t.post.newer}</span>
              <span className="pager-title">{typeset(next.title)}</span>
            </Link>
          )}
        </nav>
      )}

      {commentsReady && (
        <div className="post-comments" id="comment">
          <Comments slug={postSlug} label={t.post.loadComments} />
        </div>
      )}
    </footer>
  )
}
