'use client'

import { useEffect } from 'react'

/**
 * Marks the margin TOC link for the section in view with aria-current.
 * Renders nothing; reads the links its parent <nav> already rendered.
 */
export default function TocHighlighter() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('.toc-margin')
    if (!nav) return
    const links = [...nav.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')]
    const headings = links
      .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
      .filter((h): h is HTMLElement => !!h)
    if (!headings.length) return

    const visible = new Set<Element>()
    const setActive = () => {
      // The topmost heading on screen, or else the last one scrolled past.
      const onScreen = headings.find((h) => visible.has(h))
      const passed = headings.filter((h) => h.getBoundingClientRect().top < 120).pop()
      const active = onScreen ?? passed ?? headings[0]
      links.forEach((a) => {
        if (decodeURIComponent(a.hash.slice(1)) === active.id) {
          a.setAttribute('aria-current', 'location')
        } else {
          a.removeAttribute('aria-current')
        }
      })
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)
        )
        setActive()
      },
      { rootMargin: '-80px 0px -55% 0px' }
    )
    headings.forEach((h) => observer.observe(h))
    setActive()
    return () => observer.disconnect()
  }, [])

  return null
}
