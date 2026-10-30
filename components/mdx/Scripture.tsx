import type { ReactNode } from 'react'
import { typeset } from '@/lib/typeset'

type Props = {
  /** "Bible", "Torah", "Gospel of Thomas", … */
  tradition: string
  /** Authors write `ref="John 1:1"`; the build renames it to `reference`. */
  reference?: string
  /** Translation or edition, e.g. "ESV". */
  version?: string
  /** Optional original-language text with its BCP 47 language tag. */
  original?: string
  originalLang?: string
  children: ReactNode
}

const RTL = /^(he|ar|syc|arc|fa|ur)\b/

/** Scripture from other traditions: parallels the Qur'an block without copying it. */
export default function Scripture(props: Props) {
  const { tradition, reference, version, original, originalLang, children } = props
  return (
    <figure className="scripture scripture-other not-prose">
      {original && (
        <p
          className="scripture-original"
          lang={originalLang}
          dir={originalLang && RTL.test(originalLang) ? 'rtl' : 'ltr'}
        >
          {original}
        </p>
      )}
      <blockquote className="scripture-translation">{children}</blockquote>
      <figcaption className="scripture-caption">
        <cite className="scripture-ref">
          {typeset(tradition)}
          {reference && <> · {reference}</>}
        </cite>
        {version && <span className="scripture-version">{version}</span>}
      </figcaption>
    </figure>
  )
}
