import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import YearArchive from '@/components/index/YearArchive'
import LangEntry from '@/components/index/LangEntry'
import siteMetadata from '@/data/siteMetadata'
import { dict } from '@/data/i18n'
import { countLine, postsIn } from '@/lib/content'
import { genPageMetadata } from 'app/seo'

const t = dict('am')

export const metadata = genPageMetadata({
  title: t.index.archive,
  description: t.index.archiveLede,
  lang: 'am',
  alternates: {
    canonical: './',
    types: { 'application/rss+xml': `${siteMetadata.siteUrl}${t.feed}` },
  },
})

/** Every Amharic post, by Ethiopian year. */
export default function AmharicArchive() {
  const posts = postsIn('am')
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro
          title={t.index.archive}
          lede={t.index.archiveLede}
          meta={
            <>
              {posts.length > 0 && <>{countLine(posts, 'am')} · </>}
              <a href={t.feed}>{t.index.feed}</a> · <LangEntry to="en" from="am" />
            </>
          }
        />
        <YearArchive posts={posts} lang="am" />
      </div>
    </SectionContainer>
  )
}
