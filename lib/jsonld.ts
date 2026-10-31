import { slug } from 'github-slugger'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

const site = siteMetadata.siteUrl
/** Absolute URL with the trailing slash the static export serves. */
export const absolute = (p: string) => `${site}/${p.replace(/^\/|\/$/g, '')}${p ? '/' : ''}`

export const postUrl = (post: Pick<Blog, 'path' | 'canonicalUrl'>) =>
  post.canonicalUrl || absolute(post.path)

export const ogImage = (post: Pick<Blog, 'slug' | 'images'>) => {
  const own = typeof post.images === 'string' ? post.images : post.images?.[0]
  if (own) return own.startsWith('http') ? own : `${site}${own}`
  return `${site}/og/${post.slug}.png`
}

const person = {
  '@type': 'Person',
  name: siteMetadata.author,
  url: absolute('about'),
}

const publisher = {
  '@type': 'Organization',
  name: siteMetadata.title,
  url: `${site}/`,
  logo: { '@type': 'ImageObject', url: `${site}/static/favicons/icon-512.png` },
}

function breadcrumbs(post: CoreContent<Blog>) {
  const items = [{ name: siteMetadata.title, item: `${site}/` }]
  if (post.category)
    items.push({ name: post.category, item: absolute(`category/${slug(post.category)}`) })
  items.push({ name: post.title, item: postUrl(post) })
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, ...it })),
  }
}

/**
 * Structured data for a post: BlogPosting for essays and notes, QAPage for
 * Q&A posts (the short answer is the accepted answer), plus breadcrumbs.
 */
export function postJsonLd(post: CoreContent<Blog>) {
  const url = postUrl(post)
  const common = {
    datePublished: post.date,
    dateModified: post.lastmod || post.date,
    author: person,
    inLanguage: siteMetadata.language,
    url,
  }

  const main =
    post.type === 'qa'
      ? {
          '@type': 'QAPage',
          ...common,
          mainEntity: {
            '@type': 'Question',
            name: post.title,
            text: post.question || post.title,
            answerCount: 1,
            datePublished: post.date,
            author: person,
            acceptedAnswer: {
              '@type': 'Answer',
              text: post.short_answer,
              url,
              datePublished: post.date,
              author: person,
            },
          },
        }
      : {
          '@type': 'BlogPosting',
          ...common,
          headline: post.title,
          description: post.summary,
          image: ogImage(post),
          mainEntityOfPage: { '@type': 'WebPage', '@id': url },
          articleSection: post.category,
          keywords: post.tags?.join(', '),
          publisher,
          ...(post.series && {
            isPartOf: { '@type': 'CreativeWorkSeries', name: post.series.name },
          }),
        }

  return { '@context': 'https://schema.org', '@graph': [main, breadcrumbs(post)] }
}

/** Site identity, on the front page. */
export function siteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: siteMetadata.title,
        url: `${site}/`,
        description: siteMetadata.description,
        inLanguage: siteMetadata.language,
        publisher: person,
      },
      {
        ...person,
        sameAs: [
          siteMetadata.telegram,
          siteMetadata.youtube,
          siteMetadata.instagram,
          siteMetadata.tiktok,
          siteMetadata.facebook,
        ].filter(Boolean),
      },
    ],
  }
}

/** Serialise for a <script type="application/ld+json">, safe against "</script>". */
export const ldScript = (data: object) => JSON.stringify(data).replace(/</g, '\\u003c')
