import { slug } from 'github-slugger'
import type { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import { formatDate, readingLabel, type Translation } from '@/lib/posts'
import { postUrl } from '@/lib/jsonld'

type Props = { content: CoreContent<Blog>; lang?: string }

/** Mono metadata: date · reading time · category. */
export function PostMeta({ content, lang = 'en' }: Props) {
  const { date, lastmod, readingTime, category, type } = content
  const t = dict(lang)
  return (
    <p className="post-meta" data-pagefind-ignore="all">
      <time dateTime={date}>{formatDate(date, 'long', lang)}</time>
      <span aria-hidden="true"> · </span>
      <span>{readingLabel(readingTime?.minutes, lang)}</span>
      <span aria-hidden="true"> · </span>
      {category && lang === 'en' ? (
        <Link href={`/category/${slug(category)}`}>{category}</Link>
      ) : (
        // Subject pages exist in English only; elsewhere the subject is named, not linked.
        <span>{category ? (t.categories[category] ?? category) : t.types[type ?? 'essay']}</span>
      )}
      {lastmod && lastmod !== date && (
        <>
          <span aria-hidden="true"> · </span>
          <span>
            {t.post.revised} <time dateTime={lastmod}>{formatDate(lastmod, 'short', lang)}</time>
          </span>
        </>
      )}
    </p>
  )
}

/** "በአማርኛም ያንብቡ" / "Also in English": each link is written in the language it leads to. */
function TranslationLinks({ translations }: { translations: Translation[] }) {
  if (!translations.length) return null
  return (
    <p className="post-translation" data-pagefind-ignore="all">
      {translations.map((tr) => (
        // Plain links: the other language has its own root layout (see LangEntry).
        <a key={tr.lang} href={`/${tr.path}/`} hrefLang={tr.lang} lang={tr.lang}>
          {dict(tr.lang).readIn}
        </a>
      ))}
    </p>
  )
}

export default function PostHeader({
  content,
  lang = 'en',
  translations = [],
}: Props & { translations?: Translation[] }) {
  const { title, summary, type, question, short_answer } = content
  const isQa = type === 'qa'
  const showQuestion = isQa && question && question.trim() !== title.trim()

  return (
    <header className="post-header">
      <h1 className="post-title">{typeset(title)}</h1>
      <PostMeta content={content} lang={lang} />
      <TranslationLinks translations={translations} />
      <p className="post-print-url" data-pagefind-ignore="all">
        {postUrl(content)}
      </p>
      {showQuestion && <p className="post-question">{typeset(question!)}</p>}
      {!isQa && summary && <p className="post-dek">{typeset(summary)}</p>}
      {isQa && short_answer && (
        <section className="short-answer" aria-labelledby="short-answer-heading">
          <h2 id="short-answer-heading" className="short-answer-heading">
            {dict(lang).post.shortAnswer}
          </h2>
          <p>{typeset(short_answer)}</p>
        </section>
      )}
    </header>
  )
}
