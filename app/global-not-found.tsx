import type { Metadata } from 'next'
import NotFoundContent from '@/components/NotFoundContent'
import RootShell, { rootMetadata } from './root-shell'

// With one root layout per language there is no shared layout for unknown
// URLs, so this page brings its own (next.config.js: experimental.globalNotFound).
// Unknown URLs under /am/ get the Amharic page instead (app/(am)/am/404).
export const metadata: Metadata = {
  ...rootMetadata('en'),
  title: 'Not found',
  robots: { index: false },
}

export default function GlobalNotFound() {
  return (
    <RootShell lang="en">
      <NotFoundContent lang="en" />
    </RootShell>
  )
}
