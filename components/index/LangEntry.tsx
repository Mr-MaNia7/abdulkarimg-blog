import { dict, type Lang } from '@/data/i18n'

/**
 * A quiet way into the other language's section: the language's own name for
 * itself, then a gloss in the current page's language ("በአማርኛ · In Amharic").
 */
export default function LangEntry({ to, from }: { to: Lang; from: Lang }) {
  const target = dict(to)
  // A plain link: each language has its own root layout, so crossing over is a
  // full page load, and next/link's prefetch would only fetch the other
  // language's page (and its fonts) for nothing.
  return (
    <a href={`${target.home.replace(/\/$/, '')}/`} hrefLang={to} className="lang-entry">
      <span lang={to}>{target.inThisLanguage}</span>
      <span className="lang-entry-gloss">
        <span aria-hidden="true"> · </span>
        {dict(from).index.otherLanguage}
      </span>
    </a>
  )
}
