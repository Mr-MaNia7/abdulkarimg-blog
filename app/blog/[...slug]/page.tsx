import 'css/prism.css'
import 'katex/dist/katex.css'

import { components } from '@/components/MDXComponents'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { sortPosts, coreContent, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs, allAuthors } from 'contentlayer/generated'
import type { Authors, Blog } from 'contentlayer/generated'
import PostSimple from '@/layouts/PostSimple'
import PostLayout from '@/layouts/PostLayout'
import PostBanner from '@/layouts/PostBanner'
import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { notFound } from 'next/navigation'
import { preload } from 'react-dom'
import { getRelated, getSeries } from '@/lib/posts'
import { ldScript, ogImage, postJsonLd, postUrl } from '@/lib/jsonld'
import SectionContainer from '@/components/SectionContainer'

const defaultLayout = 'PostLayout'
const layouts = {
  PostSimple,
  PostLayout,
  PostBanner,
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata | undefined> {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  const post = allBlogs.find((p) => p.slug === slug)
  if (!post) return

  const description = post.summary || post.short_answer
  const image = { url: ogImage(post), width: 1200, height: 630, alt: post.title }
  return {
    title: post.title,
    description,
    alternates: { canonical: postUrl(post) },
    openGraph: {
      title: post.title,
      description,
      siteName: siteMetadata.title,
      locale: 'en_US',
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

export const generateStaticParams = async () => {
  return allBlogs.map((p) => ({ slug: p.slug.split('/').map((name) => decodeURI(name)) }))
}

export default async function Page(props: { params: Promise<{ slug: string[] }> }) {
  const params = await props.params
  const slug = decodeURI(params.slug.join('/'))
  // Filter out drafts in production
  const sortedCoreContents = allCoreContent(sortPosts(allBlogs))
  const postIndex = sortedCoreContents.findIndex((p) => p.slug === slug)
  if (postIndex === -1) {
    return notFound()
  }

  const prev = sortedCoreContents[postIndex + 1]
  const next = sortedCoreContents[postIndex - 1]
  const post = allBlogs.find((p) => p.slug === slug) as Blog
  const authorList = post?.authors || ['default']
  const authorDetails = authorList.map((author) => {
    const authorResults = allAuthors.find((p) => p.slug === author)
    return coreContent(authorResults as Authors)
  })
  // Preload the Arabic faces only where the post uses them, so Arabic text is
  // laid out once in its own face instead of reflowing when the font arrives.
  const raw = `${post.title} ${post.body.raw}`
  if (/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(raw)) {
    preload('/fonts/v1/Amiri-Regular.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' })
  }
  if (/<Quran\b/.test(post.body.raw)) {
    preload('/fonts/v1/AmiriQuran.woff2', { as: 'font', type: 'font/woff2', crossOrigin: '' })
  }

  const mainContent = coreContent(post)
  const jsonLd = postJsonLd(mainContent)

  const Layout = layouts[post.layout || defaultLayout]
  const series = getSeries(post, sortedCoreContents)
  const related = getRelated(post, sortedCoreContents)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldScript(jsonLd) }} />
      <SectionContainer>
        <Layout
          content={mainContent}
          authorDetails={authorDetails}
          next={next}
          prev={prev}
          toc={post.toc}
          series={series}
          related={related}
        >
          <MDXLayoutRenderer code={post.body.code} components={components} toc={post.toc} />
        </Layout>
      </SectionContainer>
    </>
  )
}
