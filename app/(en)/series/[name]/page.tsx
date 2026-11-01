import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'
import PageIntro from '@/components/index/PageIntro'
import { plural, seriesList } from '@/lib/content'
import { formatDate, TYPE_LABEL } from '@/lib/posts'
import { typeset } from '@/lib/typeset'
import { genPageMetadata } from 'app/seo'

type Props = { params: Promise<{ name: string }> }

const find = (s: string) => seriesList().find((x) => x.slug === decodeURI(s))

export const generateStaticParams = async () => seriesList().map((s) => ({ name: s.slug }))

export async function generateMetadata(props: Props): Promise<Metadata> {
  const s = find((await props.params).name)
  return genPageMetadata({
    title: s?.name ?? 'Series',
    description: s ? `A series in ${s.parts.length} parts.` : undefined,
  })
}

/** The table of contents for a multi-part essay. */
export default async function SeriesPage(props: Props) {
  const s = find((await props.params).name)
  if (!s) return notFound()
  return (
    <SectionContainer>
      <div className="index-page">
        <PageIntro
          title={s.name}
          lede="A series, best read in order."
          meta={
            <>
              {plural(s.parts.length, 'part', 'parts')} · <Link href="/series">All series</Link>
            </>
          }
        />
        <ol className="series-toc" data-reveal suppressHydrationWarning>
          {s.parts.map((p) => (
            <li key={p.path}>
              <p className="series-toc-part">Part {p.series!.part}</p>
              <div>
                <h2 className="series-toc-title">
                  <Link href={`/${p.path}`}>{typeset(p.title)}</Link>
                </h2>
                {(p.summary || p.short_answer) && (
                  <p className="series-toc-summary">{typeset(p.summary ?? p.short_answer!)}</p>
                )}
                <p className="entry-meta">
                  {TYPE_LABEL[p.type ?? 'essay']} ·{' '}
                  <time dateTime={p.date}>{formatDate(p.date)}</time>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  )
}
