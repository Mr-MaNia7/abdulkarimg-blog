import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import ArchiveTabs from '@/components/index/ArchiveTabs'
import YearArchive from '@/components/index/YearArchive'
import { byType, plural } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

const lede = 'Long-form arguments: the proofs, the evidence and the replies, set out step by step.'
export const metadata = genPageMetadata({ title: 'Essays', description: lede })

export default function EssaysPage() {
  const essays = byType('essay')
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro title="Essays" lede={lede} meta={plural(essays.length, 'essay', 'essays')}>
          <ArchiveTabs current="/essays" />
        </PageIntro>
        <YearArchive posts={essays} showType={false} />
      </div>
    </SectionContainer>
  )
}
