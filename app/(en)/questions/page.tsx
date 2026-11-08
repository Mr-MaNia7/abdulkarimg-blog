import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import ArchiveTabs from '@/components/index/ArchiveTabs'
import QuestionsIndex from '@/components/index/QuestionsIndex'
import { byType, plural } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

const lede =
  'Direct answers to questions and doubts about God and Islam. Each opens with a short answer, then the reasoning and the sources.'
export const metadata = genPageMetadata({ title: 'Questions', description: lede })

export default function QuestionsPage() {
  const questions = byType('qa')
  const items = questions.map(({ path, title, question, short_answer, tags, date }) => ({
    path,
    title,
    question,
    short_answer,
    tags: tags ?? [],
    date,
  }))
  const tags = [...new Set(items.flatMap((q) => q.tags))].sort()

  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro
          title="Questions"
          lede={lede}
          meta={plural(questions.length, 'answer', 'answers')}
        >
          <ArchiveTabs current="/questions" />
        </PageIntro>
        <QuestionsIndex items={items} tags={tags} />
      </div>
    </SectionContainer>
  )
}
