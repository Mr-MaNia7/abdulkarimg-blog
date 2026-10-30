import { MetadataRoute } from 'next'
import { allBlogs } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { categories, seriesList, tagCounts } from '@/lib/content'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const today = new Date().toISOString().split('T')[0]

  const blogRoutes = allBlogs
    .filter((post) => !post.draft)
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      lastModified: post.lastmod || post.date,
    }))

  const pages = [
    '',
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
  ].map((route) => ({ url: `${siteUrl}/${route}`, lastModified: today }))

  return [...pages, ...blogRoutes]
}
