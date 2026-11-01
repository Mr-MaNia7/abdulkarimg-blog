'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import type { NavItem } from '@/data/i18n'

/** Front pages (/ and /am) are current only on themselves, not on everything below. */
const HOMES = new Set(['/', '/am'])
const trim = (p: string) => (p.length > 1 ? p.replace(/\/$/, '') : p)

/** Marks the section the reader is in, and closes the mobile menu after navigation. */
export default function NavLinks({ links }: { links: NavItem[] }) {
  const pathname = trim(usePathname() ?? '/')

  useEffect(() => {
    document.querySelectorAll<HTMLDetailsElement>('details.mobile-menu[open]').forEach((d) => {
      d.open = false
    })
  }, [pathname])

  const isCurrent = (href: string) =>
    HOMES.has(href) ? pathname === href : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <ul>
      {links.map((link) => (
        <li key={link.href} lang={link.lang}>
          {link.hrefLang ? (
            // Into the other language's root layout: a full load, so no prefetch.
            <a href={link.href === '/' ? '/' : `${link.href}/`} hrefLang={link.hrefLang}>
              {link.title}
            </a>
          ) : (
            <Link href={link.href} aria-current={isCurrent(link.href) ? 'page' : undefined}>
              {link.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  )
}
