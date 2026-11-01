import { allCoreContent, sortPosts, type CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import en from '@/data/i18n/en'
import { dict } from '@/data/i18n'

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

export type Translation = { lang: string; path: string; title: string }

/**
 * The same post in the other language, either way round: an Amharic post names
 * its English original in `translationOf`, and the original finds it by that.
 */
export function getTranslations(
  post: Pick<Blog, 'lang' | 'slug' | 'translationOf'>,
  posts: CoreContent<Blog>[]
): Translation[] {
  return posts
    .filter(
      (p) =>
        p.lang !== post.lang &&
        ((post.translationOf && p.slug === post.translationOf) || p.translationOf === post.slug)
    )
    .map(({ lang, path, title }) => ({ lang, path, title }))
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

/** English type labels; other languages use dict(lang).types. */
export const TYPE_LABEL: Record<string, string> = en.types

// UTC throughout, so the static output never depends on the build machine's zone.
const ethiopian = new Intl.DateTimeFormat('am-ET-u-ca-ethiopic', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'UTC',
})

/** Day, month name and year in the Ethiopian calendar. */
function ethiopianDate(date: string) {
  const parts = ethiopian.formatToParts(new Date(date))
  const part = (type: string) => parts.find((p) => p.type === type)?.value ?? ''
  return { day: part('day'), month: part('month'), year: part('year') }
}

/** The Ethiopian year a date falls in (it begins in September). */
export const ethiopianYear = (date: string) => Number(ethiopianDate(date).year)

const gregorian = (date: string, options: Intl.DateTimeFormatOptions) =>
  new Date(date).toLocaleDateString('en-GB', { ...options, timeZone: 'UTC' })

/**
 * English: "31 October 2026" (long) or "31 Oct 2026" (short).
 * Amharic: the Ethiopian date, then the Gregorian one, in either style:
 * "ጥቅምት 21 ቀን 2019 ዓ.ም. · 31 Oct 2026".
 */
export function formatDate(date: string, style: 'long' | 'short' = 'long', lang = 'en') {
  if (lang === 'am') {
    const { day, month, year } = ethiopianDate(date)
    const western = gregorian(date, { day: 'numeric', month: 'short', year: 'numeric' })
    return `${month} ${day} ቀን ${year} ዓ.ም. · ${western}`
  }
  return gregorian(date, {
    day: 'numeric',
    month: style === 'long' ? 'long' : 'short',
    year: 'numeric',
  })
}

/** The same date as separate lines for narrow columns: one per calendar on Amharic pages. */
export const dateLines = (date: string, lang = 'en') =>
  lang === 'am' ? formatDate(date, 'short', lang).split(' · ') : [formatDate(date, 'short')]

/** Day and month for archive rows: "31 Oct", or "ጥቅምት 21 · 31 Oct". */
export function formatDay(date: string, lang = 'en') {
  const western = gregorian(date, { day: 'numeric', month: 'short' })
  if (lang !== 'am') return western
  const { day, month } = ethiopianDate(date)
  return `${month} ${day} · ${western}`
}

/** "4 min read" in the page's language. */
export const readingLabel = (minutes: number | undefined, lang = 'en') =>
  dict(lang).post.minRead.replace('{n}', String(Math.max(1, Math.round(minutes ?? 0))))
