import type { ReactNode } from 'react'
import { typeset } from '@/lib/typeset'

type Grade = 'Sahih' | 'Hasan' | "Da'if" | 'Daif' | string

type Props = {
  collection: string
  number?: string | number
  grade?: Grade
  narrator?: string
  arabic?: string
  children: ReactNode
}

const GRADES: Record<string, { label: string; key: string; note: string }> = {
  sahih: { label: 'Ṣaḥīḥ', key: 'sahih', note: 'sound' },
  hasan: { label: 'Ḥasan', key: 'hasan', note: 'good' },
  daif: { label: 'Ḍaʿīf', key: 'daif', note: 'weak' },
}

const gradeOf = (grade?: string) =>
  grade ? GRADES[grade.toLowerCase().replace(/[^a-z]/g, '')] : undefined

/** A ḥadīth report: related to the Qur'an block, but framed rather than washed. */
export default function Hadith({ collection, number, grade, narrator, arabic, children }: Props) {
  const g = gradeOf(grade)
  return (
    <figure className="scripture scripture-hadith not-prose">
      {narrator && <p className="hadith-narrator">{typeset(narrator)}</p>}
      {arabic && (
        <p className="hadith-arabic" lang="ar" dir="rtl">
          {arabic}
        </p>
      )}
      <blockquote className="scripture-translation">{children}</blockquote>
      <figcaption className="scripture-caption">
        <cite className="scripture-ref">
          {typeset(collection)}
          {number !== undefined && <> {number}</>}
        </cite>
        {g ? (
          <span className={`hadith-grade hadith-grade-${g.key}`}>
            {g.label}
            <span className="sr-only"> ({g.note})</span>
          </span>
        ) : (
          grade && <span className="hadith-grade">{grade}</span>
        )}
      </figcaption>
    </figure>
  )
}
