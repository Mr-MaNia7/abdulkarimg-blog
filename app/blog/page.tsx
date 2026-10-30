import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import ArchiveTabs from '@/components/index/ArchiveTabs'
import YearArchive from '@/components/index/YearArchive'
import { countLine, posts } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Archive',
  description: 'Every essay, answer and note, by year.',
})

export default function ArchivePage() {
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro title="Archive" lede="Every essay, answer and note, by year." meta={countLine()}>
          <ArchiveTabs current="/blog" />
        </PageIntro>
        <YearArchive posts={posts} />
      </div>
    </SectionContainer>
  )
}
