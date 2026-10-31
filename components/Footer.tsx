import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { typeset } from '@/lib/typeset'
import SectionContainer from './SectionContainer'
import NewsletterForm from './footer/NewsletterForm'

const SOCIALS: { key: keyof typeof siteMetadata; label: string }[] = [
  { key: 'email', label: 'Email' },
  { key: 'telegram', label: 'Telegram' },
  { key: 'github', label: 'GitHub' },
  { key: 'x', label: 'X' },
  { key: 'bluesky', label: 'Bluesky' },
  { key: 'mastodon', label: 'Mastodon' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'linkedin', label: 'LinkedIn' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
  { key: 'threads', label: 'Threads' },
  { key: 'facebook', label: 'Facebook' },
  { key: 'medium', label: 'Medium' },
]

const isExport = !!process.env.EXPORT

/** The back board: the cloth returns, carrying the colophon. */
export default function Footer() {
  const newsletter = siteMetadata.newsletter as
    | { provider?: string; formAction?: string; fieldName?: string }
    | undefined
  // A hosted form works anywhere; pliny's API route needs a server.
  const showNewsletter = !!newsletter?.formAction || (!isExport && !!newsletter?.provider)
  const socials = SOCIALS.map((s) => ({ ...s, href: siteMetadata[s.key] as string })).filter(
    (s) => s.href
  )

  return (
    <footer className="colophon">
      <SectionContainer>
        <div className="colophon-grid">
          <div className="colophon-brand">
            <Link href="/" className="colophon-mark" translate="no">
              {typeset(siteMetadata.title)}
            </Link>
            <p className="colophon-arabic" lang="ar" dir="rtl" translate="no">
              حاشية
            </p>
            <p className="colophon-line">{siteMetadata.description}</p>
          </div>

          <section className="colophon-section" aria-labelledby="colophon-heading">
            <h2 id="colophon-heading" className="colophon-heading">
              Colophon
            </h2>
            <p>
              Set in Literata, with Commissioner and Source Code Pro. Arabic in Amiri Quran and
              Amiri.
            </p>
            <p>
              The Qur’an in English follows Sahih International, and the Bible the ESV, unless
              another translation is named beside the passage.
            </p>
          </section>

          <section className="colophon-section" aria-labelledby="follow-heading">
            <h2 id="follow-heading" className="colophon-heading">
              Follow
            </h2>
            {showNewsletter && (
              <NewsletterForm action={newsletter?.formAction} fieldName={newsletter?.fieldName} />
            )}
            <p>
              <a href="/feed.xml">RSS feed</a> for every new piece, or one per{' '}
              <Link href="/category">subject</Link>.
            </p>
            {socials.length > 0 && (
              <ul className="colophon-socials">
                {socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.key === 'email' ? `mailto:${s.href}` : s.href} rel="me noopener">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <div className="colophon-base">
          <p>
            © {new Date().getFullYear()} {siteMetadata.author}
          </p>
          <ul className="colophon-links">
            <li>
              <Link href="/blog">Archive</Link>
            </li>
            <li>
              <Link href="/tags">Tags</Link>
            </li>
            <li>
              <Link href="/series">Series</Link>
            </li>
          </ul>
        </div>
      </SectionContainer>
    </footer>
  )
}
