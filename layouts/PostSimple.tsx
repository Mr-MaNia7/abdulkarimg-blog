import PostHeader from '@/components/post/PostHeader'
import PostEnd from '@/components/post/PostEnd'
import ReadingProgress from '@/components/post/ReadingProgress'
import { SeriesContents, SeriesPager } from '@/components/post/SeriesNav'
import type { PostLayoutProps } from './PostLayout'

/**
 * A single quiet column with no margins: for notes and short answers.
 * Side notes open inline here at every width.
 */
export default function PostSimple({
  lang = 'en',
  content,
  next,
  prev,
  series,
  related = [],
  translations = [],
  children,
}: PostLayoutProps) {
  return (
    <>
      <ReadingProgress />
      <article
        className="post post-simple"
        data-post-type={content.type}
        data-pagefind-body
        data-pagefind-meta={`type:${content.type ?? 'essay'}`}
      >
        <div className="post-main">
          <PostHeader content={content} lang={lang} translations={translations} />
          {series && <SeriesContents series={series} lang={lang} />}
          <div className="prose post-body">{children}</div>
          {series && <SeriesPager series={series} lang={lang} />}
          <PostEnd
            lang={lang}
            slug={content.slug}
            filePath={content.filePath}
            tags={content.tags}
            prev={prev}
            next={next}
            related={related}
          />
        </div>
      </article>
    </>
  )
}
