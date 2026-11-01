import { slug } from 'github-slugger'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'
import { dict } from '@/data/i18n'
import type { Translation } from './posts'

const site = siteMetadata.siteUrl
/** Absolute URL with the trailing slash the static export serves. */
export const absolute = (p: string) => `${site}/${p.replace(/^\/|\/$/g, '')}${p ? '/' : ''}`

export const postUrl = (post: Pick<Blog, 'path' | 'canonicalUrl'>) =>
  post.canonicalUrl || absolute(post.path)

/** The post's own image, or its generated card (public/og/<slug>.png, Amharic under og/am/). */
export const ogImage = (post: Pick<Blog, 'slug' | 'images' | 'lang'>) => {
  const own = typeof post.images === 'string' ? post.images : post.images?.[0]
  if (own) return own.startsWith('http') ? own : `${site}${own}`
  return `${site}/og/${post.lang === 'am' ? 'am/' : ''}${post.slug}.png`
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
  const home = post.lang === 'am' ? absolute(dict('am').home) : `${site}/`
  const items = [{ name: siteMetadata.title, item: home }]
  // Subject pages exist in English only.
  if (post.category && post.lang !== 'am')
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
 * A translation points to its original (translationOfWork) and back (workTranslation).
 */
export function postJsonLd(post: CoreContent<Blog>, translations: Translation[] = []) {
  const url = postUrl(post)
  const linked = translations.map((t) => ({ '@id': absolute(t.path), inLanguage: t.lang }))
  const common = {
    datePublished: post.date,
    dateModified: post.lastmod || post.date,
    author: person,
    inLanguage: post.lang,
    url,
    ...(linked.length &&
      (post.translationOf ? { translationOfWork: linked[0] } : { workTranslation: linked })),
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

/** Site identity, on the front page of each language. */
export function siteJsonLd(lang = 'en') {
  const t = dict(lang)
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: siteMetadata.title,
        url: lang === 'en' ? `${site}/` : absolute(t.home),
        description: t.description,
        inLanguage: lang,
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
