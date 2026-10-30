import Link from '@/components/Link'
import SectionContainer from '@/components/SectionContainer'

export default function NotFound() {
  return (
    <SectionContainer>
      <div className="index-page not-found">
        <p className="not-found-mark" aria-hidden="true">
          ⁂
        </p>
        <h1 className="page-title">Not in the margins</h1>
        <p className="page-lede">
          There is no page at this address. It may have moved, or the link may be mistyped.
        </p>
        <ul className="not-found-links">
          <li>
            <Link href="/">The front page</Link>
          </li>
          <li>
            <Link href="/questions">Questions on Islam</Link>
          </li>
          <li>
            <Link href="/blog">The archive</Link>
          </li>
          <li>
            <Link href="/glossary">The glossary</Link>
          </li>
        </ul>
      </div>
    </SectionContainer>
  )
}
