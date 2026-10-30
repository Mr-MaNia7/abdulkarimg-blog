import { allCoreContent, sortPosts, type CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'

export type PostSummary = Pick<
  CoreContent<Blog>,
  'path' | 'title' | 'date' | 'type' | 'category' | 'summary' | 'tags'
>

export type SeriesContext = {
  name: string
  slug: string
  part: number
  parts: (PostSummary & { part: number })[]
}

const toSummary = ({ path, title, date, type, category, summary, tags }: CoreContent<Blog>) => ({
  path,
  title,
  date,
  type,
  category,
  summary,
  tags,
})

/** Published posts, newest first (drafts are dropped in production by pliny). */
export function publishedPosts(allBlogs: Blog[]) {
  return allCoreContent(sortPosts(allBlogs))
}

export function getSeries(post: Blog, posts: CoreContent<Blog>[]): SeriesContext | undefined {
  if (!post.series || !post.seriesSlug) return undefined
  const parts = posts
    .filter((p) => p.seriesSlug === post.seriesSlug && p.series)
    .map((p) => ({ ...toSummary(p), part: p.series!.part }))
    .sort((a, b) => a.part - b.part)
  return { name: post.series.name, slug: post.seriesSlug, part: post.series.part, parts }
}

/** Up to `limit` posts sharing the most tags, ties broken by recency. */
export function getRelated(post: Blog, posts: CoreContent<Blog>[], limit = 3): PostSummary[] {
  const tags = new Set(post.tags ?? [])
  if (!tags.size) return []
  return posts
    .filter((p) => p.path !== post.path && (!post.seriesSlug || p.seriesSlug !== post.seriesSlug))
    .map((p) => ({ post: p, score: (p.tags ?? []).filter((t) => tags.has(t)).length }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score || +new Date(b.post.date) - +new Date(a.post.date))
    .slice(0, limit)
    .map(({ post }) => toSummary(post))
}

export const TYPE_LABEL: Record<string, string> = {
  essay: 'Essay',
  qa: 'Question',
  note: 'Note',
}

export function formatDate(date: string, style: 'long' | 'short' = 'long') {
  return new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
