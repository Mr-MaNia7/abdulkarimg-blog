import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import ArchiveTabs from '@/components/index/ArchiveTabs'
import YearArchive from '@/components/index/YearArchive'
import { byType, plural } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

const lede = 'Shorter pieces: reading, language, and things noticed along the way.'
export const metadata = genPageMetadata({ title: 'Notes', description: lede })

export default function NotesPage() {
  const notes = byType('note')
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro title="Notes" lede={lede} meta={plural(notes.length, 'note', 'notes')}>
          <ArchiveTabs current="/notes" />
        </PageIntro>
        <YearArchive posts={notes} showType={false} />
      </div>
    </SectionContainer>
  )
}
