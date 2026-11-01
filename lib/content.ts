import { slug } from 'github-slugger'
import { allBlogs } from 'contentlayer/generated'
import type { Blog } from 'contentlayer/generated'
import { allCoreContent, sortPosts, type CoreContent } from 'pliny/utils/contentlayer'
import { count, dict, type Lang } from '@/data/i18n'
import { ethiopianYear } from './posts'

export type Post = CoreContent<Blog>
export type PostType = 'essay' | 'qa' | 'note'

/** Published posts in every language, newest first. Drafts are dropped in production. */
export const allPosts: Post[] = allCoreContent(sortPosts(allBlogs))

export const postsIn = (lang: Lang) => allPosts.filter((p) => p.lang === lang)

/**
 * English posts. Every English index (archive, types, subjects, tags, series)
 * lists only these; Amharic posts are listed under /am/.
 */
export const posts: Post[] = postsIn('en')

export const byType = (type: PostType, list: Post[] = posts) =>
  list.filter((p) => (p.type ?? 'essay') === type)

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

/** Posts by year: the Gregorian year, or the Ethiopian year on Amharic pages. */
export function groupByYear(list: Post[], lang = 'en') {
  const years = new Map<number, Post[]>()
  list.forEach((p) => {
    const y = lang === 'am' ? ethiopianYear(p.date) : new Date(p.date).getUTCFullYear()
    years.set(y, [...(years.get(y) ?? []), p])
  })
  return [...years.entries()].sort((a, b) => b[0] - a[0])
}

export const plural = (n: number, one: string, many: string) => `${n} ${n === 1 ? one : many}`

/** "2 essays · 2 answers · 1 note", omitting empty kinds, in the page's language. */
export function countLine(list: Post[] = posts, lang = 'en') {
  const nouns = dict(lang).nouns
  return (['essay', 'qa', 'note'] as PostType[])
    .map((t) => [t, list.filter((p) => (p.type ?? 'essay') === t).length] as const)
    .filter(([, n]) => n > 0)
    .map(([t, n]) => count(n, nouns[t]))
    .join(' · ')
}
