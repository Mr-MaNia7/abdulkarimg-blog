import Link from 'next/link'
import headerNavLinks from '@/data/headerNavLinks'
import siteMetadata from '@/data/siteMetadata'
import { typeset } from '@/lib/typeset'
import NavLinks from './NavLinks'
import SearchTrigger from './SearchTrigger'
import ThemeToggle from './ThemeToggle'
import ReadingPrefs from './ReadingPrefs'

/**
 * A thin masthead: wordmark, five links, search, reading preferences, theme.
 * It keeps one height so nothing below it moves; on scroll it gains a ground
 * and a hairline (CSS scroll-driven animation, no script).
 */
export default function Masthead() {
  return (
    <header className="masthead">
      <div className="masthead-inner">
        <Link href="/" className="masthead-mark" aria-label={`${siteMetadata.title}, front page`}>
          {typeset(siteMetadata.title)}
        </Link>

        <nav className="masthead-nav" aria-label="Main">
          <NavLinks links={headerNavLinks} />
        </nav>

        <div className="masthead-tools">
          <SearchTrigger />
          <ReadingPrefs />
          <ThemeToggle />
          {/* Narrow screens: a disclosure, so the menu works without JavaScript. */}
          <details className="mobile-menu">
            <summary aria-label="Menu">
              <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
                <path className="menu-line menu-line-1" d="M3 6.5h14" />
                <path className="menu-line menu-line-2" d="M3 13.5h14" />
              </svg>
            </summary>
            <nav className="mobile-menu-panel" aria-label="Main">
              <NavLinks links={[{ href: '/', title: 'Front page' }, ...headerNavLinks]} />
              <p className="mobile-menu-more">
                <Link href="/blog">Archive</Link> · <Link href="/tags">Tags</Link> ·{' '}
                <Link href="/series">Series</Link>
              </p>
            </nav>
          </details>
        </div>
      </div>
    </header>
  )
}
