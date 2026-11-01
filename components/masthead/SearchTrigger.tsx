'use client'

import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'
import type { Dict } from '@/data/i18n'

// The palette, Pagefind and the glossary data load only when search is first opened.
const SearchPalette = dynamic(() => import('@/components/search/SearchPalette'), { ssr: false })

export default function SearchTrigger({ t }: { t: Dict['search'] }) {
  const [open, setOpen] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [mac, setMac] = useState(true)

  const show = useCallback(() => {
    setLoaded(true)
    setOpen(true)
  }, [])

  useEffect(() => {
    setMac(/Mac|iPhone|iPad/.test(navigator.platform || navigator.userAgent))
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      const typing = target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setLoaded(true)
        setOpen((o) => !o)
      } else if (e.key === '/' && !typing) {
        e.preventDefault()
        show()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [show])

  return (
    <>
      <button
        type="button"
        className="search-trigger js-only"
        onClick={show}
        onPointerEnter={() => setLoaded(true)}
        onFocus={() => setLoaded(true)}
        aria-label={t.button}
        aria-keyshortcuts={mac ? 'Meta+K' : 'Control+K'}
      >
        <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
          <circle cx="8.75" cy="8.75" r="5.25" />
          <path d="m12.6 12.6 4.4 4.4" />
        </svg>
        <span className="search-trigger-label">{t.button}</span>
        <kbd className="search-trigger-kbd" aria-hidden="true">
          {mac ? '⌘' : 'Ctrl'}
          {'\u00A0'}K
        </kbd>
      </button>
      {loaded && <SearchPalette open={open} onOpenChange={setOpen} t={t} />}
    </>
  )
}
