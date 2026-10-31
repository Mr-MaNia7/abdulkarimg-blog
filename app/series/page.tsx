import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import { plural, seriesList } from '@/lib/content'
import { typeset } from '@/lib/typeset'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Series',
  description: 'Essays written in several parts.',
})

export default function SeriesIndex() {
  const all = seriesList()
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro
          title="Series"
          lede="Essays written in several parts, best read in order."
          meta={plural(all.length, 'series', 'series')}
        />
        <ul className="subject-list" data-reveal suppressHydrationWarning>
          {all.map((s) => (
            <li key={s.slug}>
              <h2 className="subject-list-name">
                <Link href={`/series/${s.slug}`}>{typeset(s.name)}</Link>
              </h2>
              <p className="entry-meta">{plural(s.parts.length, 'part', 'parts')}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}
