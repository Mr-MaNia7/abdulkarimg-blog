import CopyButton from './CopyButton'

type Props = {
  /**
   * Sūra and verse, e.g. "2:255" or "112:1-4". Authors write `ref="…"`;
   * the build renames it to `reference` (lib/rehype-hashiya.ts).
   */
  reference: string
  arabic: string
  translation: string
  translator?: string
}

const toArabicDigits = (n: string) => n.replace(/\d/g, (d) => '٠١٢٣٤٥٦٧٨٩'[+d])

/**
 * A Qur'an passage: Arabic in the Qur'anic face, translation beneath, reference in mono.
 * Shows only what the author wrote; nothing is fetched or filled in.
 */
export default function Quran(props: Props) {
  const { reference, arabic, translation, translator } = props
  // A single verse gets its traditional end-of-verse marker; ranges do not.
  const single = /^\d+:(\d+)$/.exec(reference.trim())
  const label = `Qur’an ${reference}`
  const copyText = `${arabic}\n\n${translation}\n— ${label}${translator ? `, tr. ${translator}` : ''}`

  return (
    <figure className="scripture scripture-quran not-prose">
      <p className="quran-arabic" lang="ar" dir="rtl">
        {arabic}
        {single && <span className="quran-ayah">{` ۝${toArabicDigits(single[1])}`}</span>}
      </p>
      <blockquote className="scripture-translation">
        <p>{translation}</p>
      </blockquote>
      <figcaption className="scripture-caption">
        <cite className="scripture-ref">
          <abbr title="Qur’an">QUR’AN</abbr> {reference}
        </cite>
        {translator && <span className="scripture-version">{translator}</span>}
        <CopyButton text={copyText} label={label} />
      </figcaption>
    </figure>
  )
}
