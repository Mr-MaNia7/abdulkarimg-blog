import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { ComponentProps } from 'react'
import type { MDXComponents } from 'mdx/types'
import Image from './Image'
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Quran from './mdx/Quran'
import Hadith from './mdx/Hadith'
import Scripture from './mdx/Scripture'
import Compare from './mdx/Compare'
import Sidenote from './mdx/Sidenote'
import Term from './mdx/Term'
import Callout from './mdx/Callout'
import PullQuote from './mdx/PullQuote'
import Figure from './mdx/Figure'

/** English, for MDX outside posts (the About page). */
export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  // Sīmā
  Quran,
  Hadith,
  Scripture,
  Compare,
  Sidenote,
  Term,
  Callout,
  PullQuote,
  Figure,
}

/**
 * Components whose labels are interface text (Callout titles, "Qur’an", Copy,
 * grade notes, …) take the post's language. Bound once per language, so every
 * page of one language reuses the same component identities.
 */
const bind = (lang: string): MDXComponents => ({
  ...components,
  Quran: (p: ComponentProps<typeof Quran>) => <Quran {...p} lang={lang} />,
  Hadith: (p: ComponentProps<typeof Hadith>) => <Hadith {...p} lang={lang} />,
  Compare: (p: ComponentProps<typeof Compare>) => <Compare {...p} lang={lang} />,
  Sidenote: (p: ComponentProps<typeof Sidenote>) => <Sidenote {...p} lang={lang} />,
  Term: (p: ComponentProps<typeof Term>) => <Term {...p} lang={lang} />,
  Callout: (p: ComponentProps<typeof Callout>) => <Callout {...p} lang={lang} />,
})

const byLang: Record<string, MDXComponents> = { en: components, am: bind('am') }

export const componentsFor = (lang: string) => byLang[lang] ?? components
