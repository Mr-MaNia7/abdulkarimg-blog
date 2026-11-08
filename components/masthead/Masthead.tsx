import { Fragment } from 'react'
import Link from 'next/link'
import siteMetadata from '@/data/siteMetadata'
import { dict, fill, type Lang } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import NavLinks from './NavLinks'
import SearchTrigger from './SearchTrigger'
import ThemeToggle from './ThemeToggle'
import ReadingPrefs from './ReadingPrefs'

/**
 * A thin masthead: wordmark, six links, search, reading preferences, theme.
 * It keeps one height so nothing below it moves; on scroll it gains a ground
 * and a hairline (CSS scroll-driven animation, no script).
 * Labels come from the page's language (data/i18n).
 */
export default function Masthead({ lang = 'en' }: { lang?: Lang }) {
  const t = dict(lang)
  const m = t.masthead
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link
          href={t.home}
          className="masthead-mark"
          translate="no"
          aria-label={fill(m.frontPageLabel, { title: siteMetadata.title })}
        >
          {typeset(siteMetadata.title)}
        </Link>

        <nav className="masthead-nav" aria-label={m.main}>
          <NavLinks links={m.links} />
        </nav>

        <div className="masthead-tools">
          <SearchTrigger t={t.search} />
          <ReadingPrefs t={t.prefs} />
          <ThemeToggle t={t.prefs} />
          {/* Narrow screens: a disclosure, so the menu works without JavaScript. */}
          <details className="mobile-menu">
            <summary aria-label={m.menu}>
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path className="menu-line menu-line-1" d="M3 6.5h14" />
                <path className="menu-line menu-line-2" d="M3 13.5h14" />
              </svg>
            </summary>
            <nav className="mobile-menu-panel" aria-label={m.main}>
              <NavLinks
                links={[{ href: t.home, title: m.frontPage }, ...m.links.filter((l) => !l.lang)]}
              />
              <p className="mobile-menu-more">
                {m.more.map((l, i) => (
                  <Fragment key={l.href}>
                    {i > 0 && ' · '}
                    {l.hrefLang ? (
                      <a
                        href={l.href === '/' ? '/' : `${l.href}/`}
                        hrefLang={l.hrefLang}
                        lang={l.lang}
                      >
                        {l.title}
                      </a>
                    ) : (
                      <Link href={l.href}>{l.title}</Link>
                    )}
                  </Fragment>
                ))}
              </p>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
