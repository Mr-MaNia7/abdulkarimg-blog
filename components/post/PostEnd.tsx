import { slug } from 'github-slugger'
import Link from '@/components/Link'
import Comments from '@/components/Comments'
import siteMetadata from '@/data/siteMetadata'
import { typeset } from '@/lib/typeset'
import { formatDate, TYPE_LABEL, type PostSummary } from '@/lib/posts'

type Neighbour = { path: string; title: string }

type Props = {
  slug: string
  filePath: string
  tags?: string[]
  prev?: Neighbour
  next?: Neighbour
  related: PostSummary[]
}

/** Everything after the text: filing, correction link, related reading, neighbours, comments. */
export default function PostEnd({ slug: postSlug, filePath, tags, prev, next, related }: Props) {
  const editUrl = `${siteMetadata.siteRepo}/blob/main/data/${filePath}`
  return (
    <footer className="post-end" data-pagefind-ignore="all">
      <div className="post-filing">
        {tags && tags.length > 0 && (
          <p>
            <span className="post-filing-label">Filed under</span>{' '}
            {tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 && ', '}
                <Link href={`/tags/${slug(tag)}`}>{tag}</Link>
              </span>
            ))}
          </p>
        )}
        <p>
          <Link href={editUrl}>Suggest a correction</Link>
        </p>
      </div>

      {related.length > 0 && (
        <section className="related" aria-labelledby="related-heading">
          <h2 id="related-heading" className="end-heading">
            Related reading
          </h2>
          <ul className="related-list">
            {related.map((p) => (
              <li key={p.path}>
                <Link href={`/${p.path}`} className="related-title">
                  {typeset(p.title)}
                </Link>
                <span className="related-meta">
                  {TYPE_LABEL[p.type ?? 'essay']} ·{' '}
                  <time dateTime={p.date}>{formatDate(p.date, 'short')}</time>
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {(prev || next) && (
        <nav className="pager" aria-label="Previous and next post">
          {prev && (
            <Link href={`/${prev.path}`} className="pager-link pager-prev" rel="prev">
              <span className="pager-dir">Older</span>
              <span className="pager-title">{typeset(prev.title)}</span>
            </Link>
          )}
          {next && (
            <Link href={`/${next.path}`} className="pager-link pager-next" rel="next">
              <span className="pager-dir">Newer</span>
              <span className="pager-title">{typeset(next.title)}</span>
            </Link>
          )}
        </nav>
      )}

      {siteMetadata.comments?.provider && (
        <div className="post-comments" id="comment">
          <Comments slug={postSlug} />
        </div>
      )}
    </footer>
  )
}
