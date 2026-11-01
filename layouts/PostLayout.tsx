import type { ReactNode } from 'react'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import type { PostSummary, SeriesContext, Translation } from '@/lib/posts'
import PostHeader from '@/components/post/PostHeader'
import PostEnd from '@/components/post/PostEnd'
import ReadingProgress from '@/components/post/ReadingProgress'
import TableOfContents, { TocInline, type TocItem } from '@/components/post/TableOfContents'
import { SeriesContents, SeriesPager } from '@/components/post/SeriesNav'

export interface PostLayoutProps {
  /** The page's language: picks the interface strings and date format. */
  lang?: string
  content: CoreContent<Blog>
  authorDetails?: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  toc?: TocItem[]
  series?: SeriesContext
  related?: PostSummary[]
  /** The same post in other languages. */
  translations?: Translation[]
  children: ReactNode
}

/**
 * The default reading layout: contents in the left margin, the text in a
 * measured column, side notes and footnote copies in the right margin.
 */
export default function PostLayout({
  lang = 'en',
  content,
  next,
  prev,
  toc = [],
  series,
  related = [],
  translations = [],
  children,
}: PostLayoutProps) {
  return (
    <>
      <ReadingProgress />
      <article
        className="post post-margins"
        data-post-type={content.type}
        data-pagefind-body
        data-pagefind-meta={`type:${content.type ?? 'essay'}`}
      >
        <aside className="post-aside" data-pagefind-ignore="all">
          <TableOfContents toc={toc} lang={lang} />
        </aside>
        <div className="post-main">
          <PostHeader content={content} lang={lang} translations={translations} />
          {series && <SeriesContents series={series} lang={lang} />}
          <TocInline toc={toc} lang={lang} />
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
