import TOCInline from 'pliny/ui/TOCInline'
import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
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

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  // Ḥāshiya
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
