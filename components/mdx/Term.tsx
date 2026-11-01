import type { ReactNode } from 'react'
import { slug } from 'github-slugger'
import glossary from '@/data/glossary.json'
import TermTrigger from './TermTrigger'
import { dict } from '@/data/i18n'
import { typeset } from '@/lib/typeset'

export type GlossaryEntry = {
  id: string
  translit: string
  ar: string
  definition: string
}

const entries = glossary as GlossaryEntry[]

/** Glossary ids are ASCII: "tawḥīd" → "tawhid". */
export const termId = (s: string) =>
  slug(
    s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[ʿʾ'’]/g, '')
  )

type Props = {
  ar?: string
  translit?: string
  /** Glossary id, when it differs from the transliteration. */
  id?: string
  lang?: string
  children?: ReactNode
}

/**
 * An inline glossary term. Data comes from data/glossary.json; props given in
 * the MDX fill any gaps. The visible text is the children, or the
 * transliteration in italics when there are none.
 */
export default function Term({ ar, translit, id, lang = 'en', children }: Props) {
  const key = id ?? (translit ? termId(translit) : undefined)
  const entry = entries.find((e) => e.id === key)
  const data = {
    id: entry?.id ?? key ?? '',
    ar: ar ?? entry?.ar ?? '',
    translit: translit ?? entry?.translit ?? '',
    definition: entry?.definition ?? '',
  }
  if (!entry && process.env.NODE_ENV !== 'production') {
    console.warn(`<Term>: no glossary entry "${key}" in data/glossary.json`)
  }
  return (
    <TermTrigger entry={data} label={dict(lang).mdx.inGlossary} pageLang={lang}>
      {children ?? <i>{typeset(data.translit)}</i>}
    </TermTrigger>
  )
}
