import 'css/tailwind.css'
import 'remark-github-blockquote-alert/alert.css'

import { Analytics, AnalyticsConfig } from 'pliny/analytics'
import Masthead from '@/components/masthead/Masthead'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import { Metadata } from 'next'
import { Toaster } from 'sonner'

import { fontVariables } from './fonts'
import { applyPrefsScript } from '@/lib/reading-prefs'
import { revealScript } from '@/lib/reveal'
import RevealOnNavigate from '@/components/RevealOnNavigate'

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: './',
    siteName: siteMetadata.title,
    images: [{ url: siteMetadata.socialBanner, width: 1200, height: 630, alt: siteMetadata.title }],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './',
    types: {
      'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`,
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
    images: [siteMetadata.socialBanner],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''

  return (
    <html
      lang={siteMetadata.language}
      className={`${fontVariables} scroll-smooth`}
      suppressHydrationWarning
    >
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
        <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      </head>
      <body className="bg-bg text-ink antialiased">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <Masthead />
          <main id="main-content" tabIndex={-1} className="mb-auto outline-none">
            {children}
          </main>
          <Footer />
          <RevealOnNavigate />
          <Toaster
            position="bottom-center"
            toastOptions={{ unstyled: true, classNames: { toast: 'toast' } }}
          />
        </ThemeProviders>
      </body>
    </html>
  )
}
