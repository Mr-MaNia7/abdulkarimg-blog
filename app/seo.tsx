import { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'
import { dict } from '@/data/i18n'

interface PageSEOProps {
  title: string
  description?: string
  image?: string
  /** The page's language: sets og:locale and the default description. */
  lang?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export function genPageMetadata({
  title,
  description,
  image,
  lang = 'en',
  ...rest
}: PageSEOProps): Metadata {
  const t = dict(lang)
  return {
    title,
    description: description || t.description,
    openGraph: {
      title: `${title} | ${siteMetadata.title}`,
      description: description || t.description,
      url: './',
      siteName: siteMetadata.title,
      images: image ? [image] : [t.socialBanner],
      locale: t.ogLocale,
      type: 'website',
    },
    twitter: {
      title: `${title} | ${siteMetadata.title}`,
      card: 'summary_large_image',
      images: image ? [image] : [t.socialBanner],
    },
    ...rest,
  }
}
