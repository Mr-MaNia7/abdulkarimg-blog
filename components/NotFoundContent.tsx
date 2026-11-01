import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import { dict } from '@/data/i18n'

/** The 404 page body, in the language of the section the reader was in. */
export default function NotFoundContent({ lang = 'en' }: { lang?: string }) {
  const t = dict(lang).notFound
  return (
    <SectionContainer>
      <div className="index-page not-found">
        <p className="not-found-mark" aria-hidden="true">
          ⁂
        </p>
        <h1 className="page-title">{t.title}</h1>
        <p className="page-lede">{t.lede}</p>
        <ul className="not-found-links">
          {t.links.map((l) => (
            <li key={l.href} lang={l.lang}>
              {l.lang ? (
                // Into the other language's root layout: a full load, so no prefetch.
                <a href={l.href === '/' ? '/' : `${l.href}/`} hrefLang={l.lang}>
                  {l.title}
                </a>
              ) : (
                <Link href={l.href}>{l.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}
