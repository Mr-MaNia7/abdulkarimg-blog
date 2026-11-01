import RootShell, { rootMetadata } from 'app/root-shell'

export const metadata = rootMetadata('en')

/** Root layout for every English page (all URLs outside /am/). */
export default function EnglishLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>
}
