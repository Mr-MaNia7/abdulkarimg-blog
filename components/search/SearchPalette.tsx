'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import glossary from '@/data/glossary.json'
import { typeset } from '@/lib/typeset'
import { foldArabic, hasArabic } from '@/lib/arabic'
import { fill, type Dict } from '@/data/i18n'

type Result = { id: string; group: Group; title: string; url: string; excerpt?: string }
type Group = keyof Dict['search']['groups']

type PagefindResult = {
  url: string
  excerpt: string
  meta: { title?: string; type?: string }
}
type Pagefind = {
  init: () => Promise<void>
  options: (o: Record<string, unknown>) => Promise<void>
  debouncedSearch: (
    q: string,
    o?: object,
    ms?: number
  ) => Promise<{ results: { data: () => Promise<PagefindResult> }[] } | null>
}

const GROUP_ORDER: Group[] = ['essays', 'questions', 'notes', 'glossary', 'goTo']
const TYPE_GROUP: Record<string, Group> = { essay: 'essays', qa: 'questions', note: 'notes' }

const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯʾʿ'’]/g, '')
    .toLowerCase()

const glossaryIndex = (
  glossary as { id: string; translit: string; ar: string; definition: string }[]
).map((g) => ({ ...g, hay: fold(`${g.translit} ${g.id} ${g.definition}`), ar: g.ar }))

/**
 * Pagefind keeps one index per <html lang> and opens the one matching the
 * page, so search on Amharic pages finds Amharic posts (scripts/postbuild.mjs).
 */
let pagefindPromise: Promise<Pagefind> | null = null
function loadPagefind(): Promise<Pagefind> {
  if (!pagefindPromise) {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || ''
    pagefindPromise = import(/* webpackIgnore: true */ `${base}/pagefind/pagefind.js`).then(
      async (pf: Pagefind) => {
        await pf.options({ excerptLength: 22 })
        await pf.init()
        return pf
      }
    )
    pagefindPromise.catch(() => (pagefindPromise = null))
  }
  return pagefindPromise
}

/** Pagefind URLs from a non-export build end in .html; normalise to the site's routes. */
const cleanUrl = (url: string) => url.replace(/\/index\.html$/, '/').replace(/\.html$/, '/')

export default function SearchPalette({
  open,
  onOpenChange,
  t,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  t: Dict['search']
}) {
  const router = useRouter()
  const listId = useId()
  const inputRef = useRef<HTMLInputElement>(null)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<Result[]>([])
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'unavailable'>('idle')
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (open) loadPagefind().catch(() => setStatus('unavailable'))
  }, [open])

  useEffect(() => {
    const q = query.trim()
    if (!q) {
      setResults([])
      setStatus('idle')
      return
    }
    let cancelled = false
    setStatus('loading')

    const terms = fold(q).split(/\s+/)
    const glossaryHits: Result[] = glossaryIndex
      .filter(
        (g) => terms.every((t) => g.hay.includes(t)) || foldArabic(g.ar).includes(foldArabic(q))
      )
      .slice(0, 4)
      .map((g) => ({
        id: `g-${g.id}`,
        group: 'glossary',
        title: g.translit,
        url: `/glossary#${g.id}`,
        excerpt: g.definition,
      }))

    loadPagefind()
      .then(async (pf) => {
        const search = await pf.debouncedSearch(hasArabic(q) ? foldArabic(q) : q, {}, 120)
        if (!search || cancelled) return
        const data = await Promise.all(search.results.slice(0, 12).map((r) => r.data()))
        if (cancelled) return
        const posts: Result[] = data.map((d, i) => ({
          id: `p-${i}`,
          group: TYPE_GROUP[d.meta.type ?? 'essay'] ?? 'essays',
          title: d.meta.title ?? cleanUrl(d.url),
          url: cleanUrl(d.url),
          excerpt: d.excerpt,
        }))
        setResults([...posts, ...glossaryHits])
        setStatus('ready')
        setActive(0)
      })
      .catch(() => {
        if (cancelled) return
        setResults(glossaryHits)
        setStatus('unavailable')
        setActive(0)
      })
    return () => {
      cancelled = true
    }
  }, [query])

  const quick = useMemo<Result[]>(
    () => t.quick.map((q, i) => ({ id: `q-${i}`, group: 'goTo', ...q })),
    [t.quick]
  )
  const shown = query.trim() ? results : quick
  const ordered = useMemo(
    () => GROUP_ORDER.flatMap((g) => shown.filter((r) => r.group === g)),
    [shown]
  )
  const groups = GROUP_ORDER.map((g) => [g, ordered.filter((r) => r.group === g)] as const).filter(
    ([, list]) => list.length
  )

  const go = (r: Result | undefined) => {
    if (!r) return
    onOpenChange(false)
    router.push(r.url)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, ordered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      go(ordered[active])
    }
  }

  useEffect(() => {
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' })
  }, [active, listId])

  let index = -1
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="palette-overlay" />
        <Dialog.Content
          className="palette"
          onOpenAutoFocus={(e) => {
            e.preventDefault()
            inputRef.current?.focus()
            inputRef.current?.select()
          }}
        >
          <Dialog.Title className="sr-only">{t.title}</Dialog.Title>
          <Dialog.Description className="sr-only">{t.description}</Dialog.Description>
          <div className="palette-field">
            <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
              <circle cx="8.75" cy="8.75" r="5.25" />
              <path d="m12.6 12.6 4.4 4.4" />
            </svg>
            <input
              ref={inputRef}
              className="palette-input"
              type="search"
              name="q"
              aria-label={t.title}
              role="combobox"
              aria-expanded={ordered.length > 0}
              aria-controls={listId}
              aria-activedescendant={ordered.length ? `${listId}-${active}` : undefined}
              aria-autocomplete="list"
              placeholder={t.placeholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              autoComplete="off"
              spellCheck={false}
            />
            <kbd className="palette-esc">{t.esc}</kbd>
          </div>

          <div id={listId} role="listbox" aria-label={t.results} className="palette-results">
            {groups.map(([group, list]) => (
              <div key={group} role="group" aria-labelledby={`${listId}-${group}`}>
                <p id={`${listId}-${group}`} className="palette-group" role="presentation">
                  {t.groups[group]}
                </p>
                {list.map((r) => {
                  index += 1
                  const i = index
                  return (
                    // Keyboard selection is handled on the input (combobox pattern); click is for pointers.
                    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
                    <div
                      key={r.id}
                      id={`${listId}-${i}`}
                      role="option"
                      // Focus stays in the input (aria-activedescendant); -1 keeps options out of the tab order.
                      tabIndex={-1}
                      aria-selected={i === active}
                      className="palette-option"
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(r)}
                    >
                      <span className="palette-option-title">{typeset(r.title)}</span>
                      {r.excerpt && (
                        <span
                          className="palette-option-excerpt"
                          // Glossary definitions are written in English.
                          lang={r.group === 'glossary' ? 'en' : undefined}
                          // Pagefind excerpts are escaped HTML with <mark> around matches.
                          dangerouslySetInnerHTML={
                            r.group === 'glossary' ? undefined : { __html: r.excerpt }
                          }
                        >
                          {r.group === 'glossary' ? r.excerpt : undefined}
                        </span>
                      )}
                    </div>
                  )
                })}
              </div>
            ))}
          </div>

          <p className="palette-status" aria-live="polite">
            {status === 'loading' && t.searching}
            {status === 'ready' && !results.length && fill(t.noMatch, { query: query.trim() })}
            {status === 'unavailable' && t.unavailable}
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
