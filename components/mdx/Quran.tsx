import { dict } from '@/data/i18n'
import CopyButton from './CopyButton'
import SearchCopy from './SearchCopy'

type Props = {
  /**
   * Sūra and verse, e.g. "2:255" or "112:1-4". Authors write `ref="…"`;
   * the build renames it to `reference` (lib/rehype-sima.ts).
   */
  reference: string
  arabic: string
  translation: string
  translator?: string
  /** The page's language, for the labels (set by componentsFor). */
  lang?: string
}

const toArabicDigits = (n: string) => n.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d])

/**
 * A Qur'an passage: Arabic in the Qur'anic face, translation beneath, reference in mono.
 * Shows only what the author wrote; nothing is fetched or filled in.
 */
export default function Quran(props: Props) {
  const { reference, arabic, translation, translator, lang } = props
  const t = dict(lang).mdx
  // A single verse gets its traditional end-of-verse marker; ranges do not.
  const single = /^\d+:(\d+)$/.exec(reference.trim())
  const label = `${t.quran} ${reference}`
  const copyText = `${arabic}\n\n${translation}\n— ${label}${translator ? `, ${t.translatedBy} ${translator}` : ''}`

  return (
    <figure className="scripture scripture-quran not-prose">
      <p className="quran-arabic" lang="ar" dir="rtl" translate="no">
        {arabic}
        {single && <span className="quran-ayah">{` ۝${toArabicDigits(single[1])}`}</span>}
      </p>
      <SearchCopy text={arabic} />
      <blockquote className="scripture-translation">
        <p>{translation}</p>
      </blockquote>
      <figcaption className="scripture-caption">
        <cite className="scripture-ref">
          <abbr title={t.quran}>{t.quranCaps}</abbr> {reference}
        </cite>
        {translator && <span className="scripture-version">{translator}</span>}
        <CopyButton
          text={copyText}
          label={label}
          strings={{ copy: t.copy, copied: t.copied, failed: t.copyFailed }}
        />
      </figcaption>
    </figure>
  )
}
