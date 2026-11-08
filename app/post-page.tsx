import 'css/prism.css'
import 'katex/dist/katex.css'

import { componentsFor } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { preload } from 'react-dom'
import { dict, type Lang } from '@/data/i18n'
import { allPosts, postsIn } from '@/lib/content'
import { getRelated, getSeries, getTranslations } from '@/lib/posts'
import { absolute, ldScript, ogImage, postJsonLd, postUrl } from '@/lib/jsonld'
import { hasEthiopic } from '@/lib/ethiopic'
import SectionContainer from '@/components/SectionContainer'
import { EMPTY_PARAM, exportParams } from '@/lib/static-params'

/**
 * One post page for every language: app/(en)/blog/[...slug] serves English
 * posts at /blog/<slug>/, app/(am)/am/blog/[...slug] Amharic ones at /am/blog/<slug>/.
 */

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

type Params = { params: Promise<{ slug: string[] }> }

const findPost = (lang: Lang, slug: string) =>
  allBlogs.find((p) => p.lang === lang && p.slug === slug)

export const postStaticParams = (lang: Lang) =>
  exportParams(
    allBlogs
      .filter((p) => p.lang === lang)
      .map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) })),
    { slug: [EMPTY_PARAM] }
  )

export async function postMetadata(lang: Lang, props: Params): Promise<Metadata | undefined> {
  const params = await props.params
  const post = findPost(lang, decodeURI(params.slug.join('/')))
  if (!post) return

  const description = post.summary || post.short_answer
  const image = { url: ogImage(post), width: 1200, height: 630, alt: post.title }
  // hreflang alternates: this post and its translation, English as the default.
  const translations = getTranslations(post, allPosts)
  const versions = [{ lang: post.lang, url: postUrl(post) }].concat(
    translations.map((t) => ({ lang: t.lang, url: absolute(t.path) }))
  )
  const languages = translations.length
    ? Object.fromEntries([
        ...versions.map((v) => [v.lang, v.url]),
        ['x-default', versions.find((v) => v.lang === 'en')?.url ?? versions[0].url],
      ])
    : undefined

  return {
    title: post.title,
    description,
    alternates: { canonical: postUrl(post), languages },
    openGraph: {
      title: post.title,
      description,
      siteName: siteMetadata.title,
      locale: dict(lang).ogLocale,
      alternateLocale: translations.map((t) => dict(t.lang).ogLocale),
      type: 'article',
      publishedTime: new Date(post.date).toISOString(),
      modifiedTime: new Date(post.lastmod || post.date).toISOString(),
      url: postUrl(post),
      images: [image],
      authors: [siteMetadata.author],
      section: post.category,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [image.url],
    },
  }
}

export async function PostPage({ lang, params }: Params & { lang: Lang }) {
  const slug = decodeURI((await params).slug.join('/'))
  // Neighbours, series parts and related reading stay within the language.
  const sortedCoreContents = postsIn(lang)
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = findPost(lang, slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  // Preload the Arabic faces only where the post uses them, so Arabic text is
  // laid out once in its own face instead of reflowing when the font arrives.
  // Ethiopic likewise for English posts that quote Amharic (Amharic pages
  // preload it in app/root-shell.tsx).
  const raw = `${post.title} ${post.body.raw}`
  if (/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(raw)) {
    preload('/fonts/v1/Amiri-Regular.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' })
  }
  if (/<Quran\b/.test(post.body.raw)) {
    preload('/fonts/v1/AmiriQuran.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' })
  }
  if (lang !== 'am' && hasEthiopic(raw)) {
    preload('/fonts/v1/NotoSerifEthiopic.woff2', {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: '',
    })
  }

  const mainContent = coreContent(post)
  const translations = getTranslations(post, allPosts)
  const jsonLd = postJsonLd(mainContent, translations)

  const Layout = layouts[post.layout || defaultLayout]
  const series = getSeries(post, sortedCoreContents)
  const related = getRelated(post, sortedCoreContents)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(jsonLd) }} />
      <SectionContainer>
        <Layout
          lang={lang}
          content={mainContent}
          authorDetails={authorDetails}
          next={next}
          prev={prev}
          toc={post.toc}
          series={series}
          related={related}
          translations={translations}
        >
          <MDXLayoutRenderer
            code={post.body.code}
            components={componentsFor(lang)}
            toc={post.toc}
          />
        </Layout>
      </SectionContainer>
    </>
  )
}
