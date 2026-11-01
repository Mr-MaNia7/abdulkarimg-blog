import type { Metadata } from 'next'
import NotFoundContent from '@/components/NotFoundContent'
import { dict } from '@/data/i18n'

// Exported as out/am/404/index.html; scripts/postbuild.mjs copies it to
// out/am/404.html, which Cloudflare serves for unknown URLs under /am/.
export const metadata: Metadata = {
  title: dict('am').notFound.title,
  robots: { index: false },
}

export default function AmharicNotFound() {
  return <NotFoundContent lang="am" />
}
