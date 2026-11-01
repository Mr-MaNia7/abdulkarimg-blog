import 'css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'

import type { ReactNode } from 'react'
import type { Metadata } from 'next'
import { preload } from 'react-dom'
import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import Masthead from '@/components/masthead/Masthead'
import Footer from '@/components/Footer'
import ToastHost from '@/components/ToastHost'
import RevealOnNavigate from '@/components/RevealOnNavigate'
import siteMetadata from '@/data/siteMetadata'
import { dict, type Lang } from '@/data/i18n'
import { applyPrefsScript } from '@/lib/reading-prefs'
import { revealScript } from '@/lib/reveal'
import { ThemeProviders } from './theme-providers'
import { fontVariables } from './fonts'

/**
 * Each language has its own root layout (app/(en)/layout.tsx and
 * app/(am)/layout.tsx) so that every page is served with the right
 * <html lang>, which screen readers, hyphenation and Pagefind's per-language
 * indexes all read. Both render this shell.
 */

export function rootMetadata(lang: Lang): Metadata {
  const t = dict(lang)
  // Relative, so each page's canonical and og:url default to its own address.
  const url = './'
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: siteMetadata.title,
      template: `%s | ${siteMetadata.title}`,
    },
    description: t.description,
    openGraph: {
      title: siteMetadata.title,
      description: t.description,
      url,
      siteName: siteMetadata.title,
      images: [{ url: t.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }],
      locale: t.ogLocale,
      type: 'website',
    },
    alternates: {
      canonical: url,
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}${t.feed}`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    twitter: {
      title: siteMetadata.title,
      card: 'summary_large_image',
      images: [t.socialBanner],
    },
  }
}

// Render analytics only once a provider id is actually configured; otherwise the
// script would load with no site id and trip the content security policy.
const analyticsEnabled = Object.values(siteMetadata.analytics ?? {}).some((config) =>
  Object.values(config ?? {}).some(Boolean)
)

export default function RootShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const basePath = process.env.BASE_PATH || ''
  const t = dict(lang)
  // Every Amharic page is set in Ethiopic, so its text face is fetched with the
  // page instead of being discovered late (English posts preload it only when
  // they quote Amharic; see app/post-page.tsx).
  if (lang === 'am') {
    preload(`${basePath}/fonts/v1/NotoSerifEthiopic.woff2`, {
      as: 'font',
      type: 'font/woff2',
      crossOrigin: '',
    })
  }

  return (
    <html lang={lang} className={`${fontVariables} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Saved reading preferences, applied before first paint. */}
        <script dangerouslySetInnerHTML={{ __html: applyPrefsScript }} />
        {/* First-view reveal for index lists; runs before hydration. */}
        <script dangerouslySetInnerHTML={{ __html: revealScript }} />
        <link rel="icon" href={`${basePath}/static/favicons/favicon.ico`} sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href={`${basePath}/static/favicons/icon.svg`} />
        <link rel="apple-touch-icon" href={`${basePath}/static/favicons/apple-touch-icon.png`} />
        <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9f8f5" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#11161f" />
        <link rel="alternate" type="application/rss+xml" href={`${basePath}${t.feed}`} />
      </head>
      <body className="bg-bg text-ink antialiased">
        <a href="#main-content" className="skip-link">
          {t.skipLink}
        </a>
        <ThemeProviders>
          {analyticsEnabled && (
            <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          )}
          <Masthead lang={lang} />
          <main id="main-content" className="mb-auto">
            {children}
          </main>
          <Footer lang={lang} />
          <RevealOnNavigate />
          <ToastHost />
        </ThemeProviders>
      </body>
    </html>
  )
}
