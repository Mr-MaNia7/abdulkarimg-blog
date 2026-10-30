import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import glossary from '@/data/glossary.json'
import type { GlossaryEntry } from '@/components/mdx/Term'
import { plural } from '@/lib/content'
import { typeset } from '@/lib/typeset'
import { genPageMetadata } from 'app/seo'

const lede =
  'Islamic and theological terms used in the journal, with the Arabic, the transliteration, and a short definition.'
export const metadata = genPageMetadata({ title: 'Glossary', description: lede })

/** Sort and file under the first real letter: ʿaqīda files under A, ḍaʿīf under D. */
const key = (t: string) =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯʾʿ'’]/g, '')
    .toLowerCase()

export default function GlossaryPage() {
  const entries = [...(glossary as GlossaryEntry[])].sort((a, b) =>
    key(a.translit).localeCompare(key(b.translit))
  )
  const groups = new Map<string, GlossaryEntry[]>()
  entries.forEach((e) => {
    const letter = key(e.translit)[0].toUpperCase()
    groups.set(letter, [...(groups.get(letter) ?? []), e])
  })
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro title="Glossary" lede={lede} meta={plural(entries.length, 'term', 'terms')}>
          <nav className="glossary-letters" aria-label="Jump to letter">
            <ul>
              {alphabet.map((l) => (
                <li key={l}>
                  {groups.has(l) ? (
                    <a href={`#letter-${l}`}>{l}</a>
                  ) : (
                    <span aria-hidden="true">{l}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </PageIntro>
        <div className="glossary">
          {[...groups.entries()].map(([letter, list]) => (
            <section key={letter} aria-labelledby={`letter-${letter}`} className="glossary-group">
              <h2 id={`letter-${letter}`} className="glossary-letter">
                {letter}
              </h2>
              <dl className="glossary-list">
                {list.map((e) => (
                  <div key={e.id} id={e.id} className="glossary-entry">
                    <dt>
                      <dfn className="glossary-term">{typeset(e.translit)}</dfn>
                      <span className="glossary-ar" lang="ar" dir="rtl">
                        {e.ar}
                      </span>
                    </dt>
                    <dd>{typeset(e.definition)}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}
