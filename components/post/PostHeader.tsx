import { slug } from 'github-slugger'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import { typeset } from '@/lib/typeset'
import { formatDate, TYPE_LABEL } from '@/lib/posts'
import { postUrl } from '@/lib/jsonld'

type Props = { content: CoreContent<Blog> }

/** Mono metadata: date · reading time · category. */
export function PostMeta({ content }: Props) {
  const { date, lastmod, readingTime, category, type } = content
  const minutes = Math.max(1, Math.round(readingTime?.minutes ?? 0))
  return (
    <p className="post-meta" data-pagefind-ignore="all">
      <time dateTime={date}>{formatDate(date)}</time>
      <span aria-hidden="true"> · </span>
      <span>{minutes} min read</span>
      <span aria-hidden="true"> · </span>
      {category ? (
        <Link href={`/category/${slug(category)}`}>{category}</Link>
      ) : (
        <span>{TYPE_LABEL[type ?? 'essay']}</span>
      )}
      {lastmod && lastmod !== date && (
        <>
          <span aria-hidden="true"> · </span>
          <span>
            revised <time dateTime={lastmod}>{formatDate(lastmod, 'short')}</time>
          </span>
        </>
      )}
    </p>
  )
}

export default function PostHeader({ content }: Props) {
  const { title, summary, type, question, short_answer } = content
  const isQa = type === 'qa'
  const showQuestion = isQa && question && question.trim() !== title.trim()

  return (
    <header className="post-header">
      <h1 className="post-title">{typeset(title)}</h1>
      <PostMeta content={content} />
      <p className="post-print-url" data-pagefind-ignore="all">
        {postUrl(content)}
      </p>
      {showQuestion && <p className="post-question">{typeset(question!)}</p>}
      {!isQa && summary && <p className="post-dek">{typeset(summary)}</p>}
      {isQa && short_answer && (
        <section className="short-answer" aria-labelledby="short-answer-heading">
          <h2 id="short-answer-heading" className="short-answer-heading">
            The short answer
          </h2>
          <p>{typeset(short_answer)}</p>
        </section>
      )}
    </header>
  )
}
