import RootShell, { rootMetadata } from 'app/root-shell'

export const metadata = rootMetadata('am')

/** Root layout for the Amharic section, /am/: the same shell with <html lang="am">. */
export default function AmharicLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="am">{children}</RootShell>
}
