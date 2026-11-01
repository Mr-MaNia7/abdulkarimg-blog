import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import { plural, tagCounts } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Tags',
  description: 'Every topic, with a count.',
})

export default function TagsPage() {
  const tags = tagCounts()
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro
          title="Tags"
          lede="Every topic the journal has touched, most frequent first."
          meta={plural(tags.length, 'tag', 'tags')}
        />
        <ul className="tag-cloud" data-reveal suppressHydrationWarning>
          {tags.map((t) => (
            <li key={t.slug}>
              <Link href={`/tags/${t.slug}`}>
                {t.name}
                <span className="tag-count">{t.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}
