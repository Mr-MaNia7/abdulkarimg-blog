import type { ReactNode } from 'react'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog, Authors } from 'contentlayer/generated'
import type { PostSummary, SeriesContext } from '@/lib/posts'
import PostHeader from '@/components/post/PostHeader'
import PostEnd from '@/components/post/PostEnd'
import ReadingProgress from '@/components/post/ReadingProgress'
import TableOfContents, { TocInline, type TocItem } from '@/components/post/TableOfContents'
import { SeriesContents, SeriesPager } from '@/components/post/SeriesNav'

export interface PostLayoutProps {
  content: CoreContent<Blog>
  authorDetails?: CoreContent<Authors>[]
  next?: { path: string; title: string }
  prev?: { path: string; title: string }
  toc?: TocItem[]
  series?: SeriesContext
  related?: PostSummary[]
  children: ReactNode
}

/**
 * The default reading layout: contents in the left margin, the text in a
 * measured column, side notes and footnote copies in the right margin.
 */
export default function PostLayout({
  content,
  next,
  prev,
  toc = [],
  series,
  related = [],
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
          <TableOfContents toc={toc} />
        </aside>
        <div className="post-main">
          <PostHeader content={content} />
          {series && <SeriesContents series={series} />}
          <TocInline toc={toc} />
          <div className="prose post-body">{children}</div>
          {series && <SeriesPager series={series} />}
          <PostEnd
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
