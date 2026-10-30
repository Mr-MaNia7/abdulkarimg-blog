import Link from '@/components/Link'

const TABS = [
  { href: '/blog', label: 'Everything' },
  { href: '/essays', label: 'Essays' },
  { href: '/questions', label: 'Questions' },
  { href: '/notes', label: 'Notes' },
]

/** Switch between the archive views; the current one is marked, not linked. */
export default function ArchiveTabs({ current }: { current: string }) {
  return (
    <nav className="archive-tabs" aria-label="Archive views">
      <ul>
        {TABS.map((t) => (
          <li key={t.href}>
            {t.href === current ? (
              <span aria-current="page">{t.label}</span>
            ) : (
              <Link href={t.href}>{t.label}</Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
