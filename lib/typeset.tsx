import { Fragment, type ReactNode } from 'react'
import { spaceEthiopic } from './ethiopic'

const ARABIC =
  '\u0600-\u06FF\u0750-\u077F\u0870-\u089F\u08A0-\u08FF\uFB50-\uFDF9\uFDFC-\uFDFF\uFE70-\uFEFF'
const ETHIOPIC = '\u1200-\u137F\u1380-\u139F\u2D80-\u2DDF\uAB00-\uAB2F'

const TOKEN = new RegExp(
  `([${ARABIC}]+(?:[\\s\u00A0\u060C\u061B\u061F.,:!()\u00AB\u00BB\\-\u2013]+[${ARABIC}]+)*)` +
    `|([${ETHIOPIC}]+(?:[\\s\u00A0.,;:!?()\u00AB\u00BB\u2039\u203A\u201C\u201D\u2018\u2019"'/\\-\u2013\u2014]+[${ETHIOPIC}]+)*)` +
    `|([\uFDFA\uFDFB])|([\u02BF\u02BE])`,
  'g'
)

/** Typographer's apostrophe for frontmatter strings: Qur'an → Qur’an. */
const curl = (s: string) => s.replace(/(\p{L})'(\p{L})/gu, '$1\u2019$2')

/**
 * The same typesetting the MDX pipeline applies (lib/rehype-sima.ts),
 * for plain strings such as frontmatter titles: Arabic runs get lang="ar"
 * dir="rtl", Ethiopic runs lang="am", ﷺ and ʿ ʾ their own spans.
 */
export function typeset(raw: string): ReactNode {
  if (!raw) return raw
  const text = spaceEthiopic(curl(raw))
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
        <span key={key++} lang="am">
          {match[2]}
        </span>
      )
    else if (match[3])
      out.push(
        <span key={key++} className="honorific" lang="ar">
          {match[3]}
        </span>
      )
    else
      out.push(
        <span key={key++} className="ayn">
          {match[4]}
        </span>
      )
    last = index + match[0].length
  }
  if (!out.length) return text
  if (last < text.length) out.push(text.slice(last))
  return <Fragment>{out}</Fragment>
}
