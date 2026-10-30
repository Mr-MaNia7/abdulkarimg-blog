import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import { categories, countLine } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'Subjects',
  description: 'The four subjects the journal is organised by.',
})

export default function CategoriesPage() {
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro title="Subjects" lede="The four subjects the journal is organised by." />
        <ul className="subject-list">
          {categories.map((c) => (
            <li key={c.slug}>
              <h2 className="subject-list-name">
                <Link href={`/category/${c.slug}`}>{c.name}</Link>
              </h2>
              <p className="subject-description">{c.description}</p>
              <p className="entry-meta">{c.posts.length ? countLine(c.posts) : 'Nothing yet'}</p>
            </li>
          ))}
        </ul>
      </div>
    </SectionContainer>
  )
}
