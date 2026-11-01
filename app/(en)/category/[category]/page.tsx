import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import YearArchive from '@/components/index/YearArchive'
import { categories, countLine } from '@/lib/content'
import { genPageMetadata } from 'app/seo'
import siteMetadata from '@/data/siteMetadata'

type Props = { params: Promise<{ category: string }> }

const find = (s: string) => categories.find((c) => c.slug === decodeURI(s))

export const generateStaticParams = async () => categories.map((c) => ({ category: c.slug }))

export async function generateMetadata(props: Props): Promise<Metadata> {
  const c = find((await props.params).category)
  return genPageMetadata({
    title: c?.name ?? 'Subject',
    description: c?.description,
    alternates: c
      ? {
          canonical: './',
          types: { 'application/rss+xml': `${siteMetadata.siteUrl}/category/${c.slug}/feed.xml` },
        }
      : undefined,
  })
}

export default async function CategoryPage(props: Props) {
  const c = find((await props.params).category)
  if (!c) return notFound()
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro
          title={c.name}
          lede={c.description}
          meta={
            <>
              {c.posts.length ? countLine(c.posts) : 'Nothing yet'} ·{' '}
              <Link href="/category">All subjects</Link>
              {c.posts.length > 0 && (
                <>
                  {' · '}
                  <a href={`/category/${c.slug}/feed.xml`}>RSS</a>
                </>
              )}
            </>
          }
        />
        <YearArchive posts={c.posts} />
      </div>
    </SectionContainer>
  )
}
