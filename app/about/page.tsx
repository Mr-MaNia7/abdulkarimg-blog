import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import { coreContent } from 'pliny/utils/contentlayer'
import { components } from '@/components/MDXComponents'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import siteMetadata from '@/data/siteMetadata'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({
  title: 'About',
  description: `About ${siteMetadata.title} and its author, and the sources and translations it uses.`,
})

export default function AboutPage() {
  const author = coreContent(allAuthors.find((p) => p.slug === 'default') as Authors)
  const body = allAuthors.find((p) => p.slug === 'default')!.body.code
  return (
    <SectionContainer>
      <div className="index-page about-page">
        <PageIntro title="About" lede={`${siteMetadata.title} is written by ${author.name}.`} />
        <div className="prose">
          <MDXLayoutRenderer code={body} components={components} />
        </div>
      </div>
    </SectionContainer>
  )
}
