import { slug } from 'github-slugger'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import { allCoreContent, sortPosts, type CoreContent } from 'pliny/utils/contentlayer'

export type Post = CoreContent<Blog>
export type PostType = 'essay' | 'qa' | 'note'

/** Published posts, newest first. Drafts are dropped in production. */
export const posts: Post[] = allCoreContent(sortPosts(allBlogs))

export const byType = (type: PostType) => posts.filter((p) => (p.type ?? 'essay') === type)

export const CATEGORY_INFO = [
  {
    name: 'Theology',
    description: 'God, revelation, prophethood and the unseen, read from the sources.',
  },
  {
    name: 'Comparative Religion',
    description: 'Islam beside Judaism, Christianity and other traditions, fairly stated.',
  },
  {
    name: 'Questions on Islam',
    description: 'Direct answers to questions people ask, short answer first.',
  },
  {
    name: 'Notes',
    description: 'Shorter pieces: reading, language, and things noticed along the way.',
  },
] as const

export const categories = CATEGORY_INFO.map((c) => ({
  ...c,
  slug: slug(c.name),
  posts: posts.filter((p) => p.category === c.name),
}))

export function seriesList() {
  const map = new Map<string, { name: string; slug: string; parts: Post[] }>()
  posts.forEach((p) => {
    if (!p.series || !p.seriesSlug) return
    const entry = map.get(p.seriesSlug) ?? { name: p.series.name, slug: p.seriesSlug, parts: [] }
    entry.parts.push(p)
    map.set(p.seriesSlug, entry)
  })
  return [...map.values()].map((s) => ({
    ...s,
    parts: s.parts.sort((a, b) => a.series!.part - b.series!.part),
  }))
}

export function tagCounts() {
  const counts = new Map<string, { name: string; slug: string; count: number }>()
  posts.forEach((p) =>
    (p.tags ?? []).forEach((t) => {
      const key = slug(t)
      const entry = counts.get(key) ?? { name: t, slug: key, count: 0 }
      entry.count += 1
      counts.set(key, entry)
    })
  )
  return [...counts.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
}

export function groupByYear(list: Post[]) {
  const years = new Map<number, Post[]>()
  list.forEach((p) => {
    const y = new Date(p.date).getUTCFullYear()
    years.set(y, [...(years.get(y) ?? []), p])
  })
  return [...years.entries()].sort((a, b) => b[0] - a[0])
}

const NOUNS: Record<PostType, [string, string]> = {
  essay: ['essay', 'essays'],
  qa: ['answer', 'answers'],
  note: ['note', 'notes'],
}

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

/** "2 essays · 2 answers · 1 note", omitting empty kinds. */
export function countLine(list: Post[] = posts) {
  return (['essay', 'qa', 'note'] as PostType[])
    .map((t) => [t, list.filter((p) => (p.type ?? 'essay') === t).length] as const)
    .filter(([, n]) => n > 0)
    .map(([t, n]) => plural(n, ...NOUNS[t]))
    .join(' · ')
}
