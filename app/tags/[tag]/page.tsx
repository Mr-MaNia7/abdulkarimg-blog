import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { slug } from 'github-slugger'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import YearArchive from '@/components/index/YearArchive'
import siteMetadata from '@/data/siteMetadata'
import { countLine, posts, tagCounts } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

type Props = { params: Promise<{ tag: string }> }

const find = (s: string) => tagCounts().find((t) => t.slug === decodeURI(s))

export const generateStaticParams = async () => tagCounts().map((t) => ({ tag: t.slug }))

export async function generateMetadata(props: Props): Promise<Metadata> {
  const tag = find((await props.params).tag)
  return genPageMetadata({
    title: tag ? `Tagged “${tag.name}”` : 'Tag',
    description: tag ? `Everything in ${siteMetadata.title} tagged ${tag.name}.` : undefined,
    alternates: {
      canonical: './',
      types: tag
        ? { 'application/rss+xml': `${siteMetadata.siteUrl}/tags/${tag.slug}/feed.xml` }
        : undefined,
    },
  })
}

export default async function TagPage(props: Props) {
  const tag = find((await props.params).tag)
  if (!tag) return notFound()
  const list = posts.filter((p) => (p.tags ?? []).some((t) => slug(t) === tag.slug))
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro
          title={tag.name}
          lede={`Everything tagged ${tag.name}.`}
          meta={
            <>
              {countLine(list)} · <Link href="/tags">All tags</Link> ·{' '}
              <a href={`/tags/${tag.slug}/feed.xml`}>RSS</a>
            </>
          }
        />
        <YearArchive posts={list} />
      </div>
    </SectionContainer>
  )
}
