import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { dict, type Lang } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import SectionContainer from './SectionContainer'
import NewsletterForm from './footer/NewsletterForm'

// Brand names stay as they are; only "Email" is translated (dict.footer.email).
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
export default function Footer({ lang = 'en' }: { lang?: Lang }) {
  const t = dict(lang)
  const f = t.footer
  const newsletter = siteMetadata.newsletter as
    | { provider?: string; formAction?: string; fieldName?: string }
    | undefined
  // A hosted form works anywhere; pliny's API route needs a server.
  const showNewsletter = !!newsletter?.formAction || (!isExport && !!newsletter?.provider)
  const socials = SOCIALS.map((s) => ({
    ...s,
    label: s.key === 'email' ? f.email : s.label,
    href: siteMetadata[s.key] as string,
  })).filter((s) => s.href)

  return (
    <footer className="colophon">
      <SectionContainer>
        <div className="colophon-grid">
          <div className="colophon-brand">
            <Link href={t.home} className="colophon-mark" translate="no">
              {typeset(siteMetadata.title)}
            </Link>
            <p className="colophon-arabic" lang="ar" dir="rtl" translate="no">
              سيماء
            </p>
            <p className="colophon-line">{t.description}</p>
          </div>

          <section className="colophon-section" aria-labelledby="colophon-heading">
            <h2 id="colophon-heading" className="colophon-heading">
              {f.colophon}
            </h2>
            <p>{f.setIn}</p>
            <p>{f.translations}</p>
          </section>

          <section className="colophon-section" aria-labelledby="follow-heading">
            <h2 id="follow-heading" className="colophon-heading">
              {f.follow}
            </h2>
            {showNewsletter && (
              <NewsletterForm
                action={newsletter?.formAction}
                fieldName={newsletter?.fieldName}
                t={f.newsletter}
              />
            )}
            <p>
              <a href={t.feed}>{f.feedLink}</a>
              {f.feedAfter}
              {f.subjects && <Link href="/category">{f.subjects}</Link>}
              {f.feedEnd}
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
            © {new Date().getFullYear()}{' '}
            {lang === 'en' ? siteMetadata.author : <span lang="en">{siteMetadata.author}</span>}
          </p>
          <ul className="colophon-links">
            {f.links.map((l) =>
              l.hrefLang ? (
                // Into the other language's root layout: a full load, so no prefetch.
                <li key={l.href} lang={l.lang}>
                  <a href={l.href === '/' ? '/' : `${l.href}/`} hrefLang={l.hrefLang}>
                    {l.title}
                  </a>
                </li>
              ) : (
                <li key={l.href}>
                  <Link href={l.href}>{l.title}</Link>
                </li>
              )
            )}
          </ul>
        </div>
      </SectionContainer>
    </footer>
  )
}
