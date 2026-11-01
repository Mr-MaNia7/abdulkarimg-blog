import Image from '@/components/Image'
import PostHeader from '@/components/post/PostHeader'
import PostEnd from '@/components/post/PostEnd'
import ReadingProgress from '@/components/post/ReadingProgress'
import { SeriesContents, SeriesPager } from '@/components/post/SeriesNav'
import type { PostLayoutProps } from './PostLayout'

/**
 * The simple column opened by a wide plate: the first image in `images`.
 * Without an image it is identical to PostSimple.
 */
export default function PostBanner({
  lang = 'en',
  content,
  next,
  prev,
  series,
  related = [],
  translations = [],
  children,
}: PostLayoutProps) {
  const images = typeof content.images === 'string' ? [content.images] : content.images
  const plate: string | undefined = images?.[0]

  return (
    <>
      <ReadingProgress />
      <article
        className="post post-simple post-banner"
        data-post-type={content.type}
        data-pagefind-body
        data-pagefind-meta={`type:${content.type ?? 'essay'}`}
      >
        {plate && (
          <figure className="post-plate">
            <Image
              src={plate}
              alt=""
              width={1600}
              height={800}
              priority
              sizes="(min-width: 76rem) 72rem, 100vw"
            />
          </figure>
        )}
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
