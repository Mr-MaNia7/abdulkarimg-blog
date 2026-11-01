import type { ReactNode } from 'react'
import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'
import SearchCopy from './SearchCopy'

type Grade = 'Sahih' | 'Hasan' | "Da'if" | 'Daif' | string

type Props = {
  collection: string
  number?: string | number
  grade?: Grade
  narrator?: string
  arabic?: string
  lang?: string
  children: ReactNode
}

// The grade stays a transliterated term; its gloss for screen readers is translated.
const GRADES: Record<string, { label: string; key: string }> = {
  sahih: { label: 'Ṣaḥīḥ', key: 'sahih' },
  hasan: { label: 'Ḥasan', key: 'hasan' },
  daif: { label: 'Ḍaʿīf', key: 'daif' },
}

const gradeOf = (grade?: string) =>
  grade ? GRADES[grade.toLowerCase().replace(/[^a-z]/g, '')] : undefined

/** A ḥadīth report: related to the Qur'an block, but framed rather than washed. */
export default function Hadith({
  collection,
  number,
  grade,
  narrator,
  arabic,
  lang,
  children,
}: Props) {
  const g = gradeOf(grade)
  const notes = dict(lang).mdx.grades
  return (
    <figure className="scripture scripture-hadith not-prose">
      {narrator && <p className="hadith-narrator">{typeset(narrator)}</p>}
      {arabic && (
        <p className="hadith-arabic" lang="ar" dir="rtl" translate="no">
          {arabic}
        </p>
      )}
      <SearchCopy text={arabic} />
      <blockquote className="scripture-translation">{children}</blockquote>
      <figcaption className="scripture-caption">
        <cite className="scripture-ref">
          {typeset(collection)}
          {number !== undefined && <> {number}</>}
        </cite>
        {g ? (
          <span className={`hadith-grade hadith-grade-${g.key}`}>
            {g.label}
            <span className="sr-only"> ({notes[g.key]})</span>
          </span>
        ) : (
          grade && <span className="hadith-grade">{grade}</span>
        )}
      </figcaption>
    </figure>
  )
}
