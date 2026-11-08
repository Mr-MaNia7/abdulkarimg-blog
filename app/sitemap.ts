import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { allPosts, categories, seriesList, tagCounts } from '@/lib/content'
import { getTranslations } from '@/lib/posts'
import { absolute } from '@/lib/jsonld'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  // A post with a translation lists both versions as hreflang alternates.
  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => {
      const translations = getTranslations(post, allPosts)
      return {
        url: `${siteUrl}/${post.path}`,
        lastModified: post.lastmod || post.date,
        ...(translations.length && {
          alternates: {
            languages: Object.fromEntries([
              [post.lang, absolute(post.path)],
              ...translations.map((t) => [t.lang, absolute(t.path)]),
            ]),
          },
        }),
      }
    })

  const pages = [
    '',
    'start',
    'blog',
    'essays',
    'questions',
    'notes',
    'glossary',
    'about',
    'tags',
    'category',
    'series',
    ...categories.map((c) => `category/${c.slug}`),
    ...seriesList().map((s) => `series/${s.slug}`),
    ...tagCounts().map((t) => `tags/${t.slug}`),
    'am',
    'am/blog',
  ].map((route) => ({ url: `${siteUrl}/${route}`, lastModified: today }))

  return [...pages, ...blogRoutes]
}
