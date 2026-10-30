import { foldArabic } from '@/lib/arabic'

/**
 * A normalised copy of Arabic text for the search index only. `hidden` keeps
 * it from sighted readers and assistive tech; Pagefind still reads it.
 */
export default function SearchCopy({ text }: { text?: string }) {
  if (!text) return null
  const folded = foldArabic(text)
  if (folded === text) return null
  return (
    <span hidden lang="ar" className="search-copy">
      {folded}
    </span>
  )
}
