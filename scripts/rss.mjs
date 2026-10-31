import { writeFileSync, mkdirSync, rmSync } from 'fs'
import path from 'path'
import { slug } from 'github-slugger'
import { escape } from 'pliny/utils/htmlEscaper.js'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import { sortPosts } from 'pliny/utils/contentlayer.js'

/**
 * RSS 2.0 feeds:
 *   /feed.xml                    everything
 *   /category/<subject>/feed.xml one per subject
 *   /tags/<tag>/feed.xml         one per tag
 * Written into out/ for a static export, public/ otherwise.
 */
const outputFolder = process.env.EXPORT ? 'out' : 'public'
const site = siteMetadata.siteUrl
const url = (p) => `${site}/${p.replace(/^\/|\/$/g, '')}/`

const item = (post) => {
  const link = post.canonicalUrl || url(post.path)
  const description = post.summary || post.short_answer
  return `
    <item>
      <guid isPermaLink="true">${link}</guid>
      <title>${escape(post.title)}</title>
      <link>${link}</link>
      ${description ? `<description>${escape(description)}</description>` : ''}
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <dc:creator>${escape(siteMetadata.author)}</dc:creator>
      ${post.category ? `<category>${escape(post.category)}</category>` : ''}
      ${(post.tags ?? []).map((t) => `<category>${escape(t)}</category>`).join('')}
    </item>`
}

const feed = ({ title, description, link, file, posts }) => `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${escape(title)}</title>
    <link>${link}</link>
    <description>${escape(description)}</description>
    <language>${siteMetadata.language}</language>
    <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
    <atom:link href="${site}/${file}" rel="self" type="application/rss+xml"/>
    ${posts.map(item).join('')}
  </channel>
</rss>
`

function write(file, data) {
  const target = path.join(outputFolder, file)
  mkdirSync(path.dirname(target), { recursive: true })
  writeFileSync(target, data)
}

/** Group posts under a slug, keeping the display name. */
function groupBy(posts, pick) {
  const map = new Map()
  posts.forEach((p) =>
    pick(p).forEach((name) => {
      const key = slug(name)
      map.set(key, { name, posts: [...(map.get(key)?.posts ?? []), p] })
    })
  )
  return [...map.entries()]
}

const rss = () => {
  const posts = sortPosts(allBlogs.filter((p) => p.draft !== true))
  if (!posts.length) return

  write(
    'feed.xml',
    feed({
      title: siteMetadata.title,
      description: siteMetadata.description,
      link: `${site}/`,
      file: 'feed.xml',
      posts,
    })
  )

  // In public/ these folders hold only generated feeds; clear them so removed
  // tags and subjects do not linger. (`next build` recreates out/ itself.)
  if (outputFolder === 'public') {
    rmSync(path.join('public', 'tags'), { recursive: true, force: true })
    rmSync(path.join('public', 'category'), { recursive: true, force: true })
  }

  for (const [key, { name, posts: list }] of groupBy(posts, (p) =>
    p.category ? [p.category] : []
  )) {
    write(
      `category/${key}/feed.xml`,
      feed({
        title: `${siteMetadata.title}: ${name}`,
        description: `${name}, from ${siteMetadata.title}.`,
        link: url(`category/${key}`),
        file: `category/${key}/feed.xml`,
        posts: list,
      })
    )
  }

  for (const [key, { name, posts: list }] of groupBy(posts, (p) => p.tags ?? [])) {
    write(
      `tags/${key}/feed.xml`,
      feed({
        title: `${siteMetadata.title}: ${name}`,
        description: `Everything tagged ${name}, from ${siteMetadata.title}.`,
        link: url(`tags/${key}`),
        file: `tags/${key}/feed.xml`,
        posts: list,
      })
    )
  }

  console.log('RSS feeds generated...')
}

export default rss
