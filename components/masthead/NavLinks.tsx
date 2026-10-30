'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

type NavLink = { href: string; title: string }

/** Marks the section the reader is in, and closes the mobile menu after navigation. */
export default function NavLinks({ links }: { links: NavLink[] }) {
  const pathname = usePathname() ?? '/'

  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>('details.mobile-menu[open]').forEach((d) => {
      d.open = false
    })
  }, [pathname])

  const isCurrent = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <ul>
      {links.map((link) => (
        <li key={link.href}>
          <Link href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>
            {link.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
