import { Fragment, type ReactNode } from 'react'

const TOKEN =
  /([\u0600-\u06FF\u0750-\u077F\u0870-\u089F\u08A0-\u08FF\uFB50-\uFDF9\uFDFC-\uFDFF\uFE70-\uFEFF]+(?:[\s\u00A0\u060C\u061B\u061F.,:!()\u00AB\u00BB\-\u2013]+[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDF9\uFDFC-\uFDFF\uFE70-\uFEFF]+)*)|([\uFDFA\uFDFB])|([\u02BF\u02BE])/g

/**
 * The same typesetting the MDX pipeline applies (lib/rehype-hashiya.ts),
 * for plain strings such as frontmatter titles.
 */
/** Typographer's apostrophe for frontmatter strings: Qur'an → Qur’an. */
const curl = (s: string) => s.replace(/(\p{L})'(\p{L})/gu, '$1\u2019$2')

export function typeset(raw: string): ReactNode {
  if (!raw) return raw
  const text = curl(raw)
  const out: ReactNode[] = []
  let last = 0
  let key = 0
  for (const match of text.matchAll(TOKEN)) {
    const index = match.index ?? 0
    if (index > last) out.push(text.slice(last, index))
    if (match[1])
      out.push(
        <span key={key++} lang="ar" dir="rtl">
          {match[1]}
        </span>
      )
    else if (match[2])
      out.push(
        <span key={key++} className="honorific" lang="ar">
          {match[2]}
        </span>
      )
    else
      out.push(
        <span key={key++} className="ayn">
          {match[3]}
        </span>
      )
    last = index + match[0].length
  }
  if (!out.length) return text
  if (last < text.length) out.push(text.slice(last))
  return <Fragment>{out}</Fragment>
}
