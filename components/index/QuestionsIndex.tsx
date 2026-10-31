'use client'

import { useDeferredValue, useEffect, useId, useMemo, useState } from 'react'
import Link from '@/components/Link'
import { typeset } from '@/lib/typeset'

export type QuestionItem = {
  path: string
  title: string
  question?: string
  short_answer?: string
  tags: string[]
  date: string
}

/** Lowercase, strip diacritics and ʿ ʾ, so "tawhid" finds "tawḥīd". */
const fold = (s: string) =>
  s
    .normalize('NFD')
    .replace(/[̀-ͯʾʿ'’]/g, '')
    .toLowerCase()

/**
 * The full list is server-rendered. Search and topic filters appear only once
 * hydrated, so no reader ever meets a control that does nothing.
 */
export default function QuestionsIndex({ items, tags }: { items: QuestionItem[]; tags: string[] }) {
  const [ready, setReady] = useState(false)
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState<string | null>(null)
  const deferred = useDeferredValue(query)
  const id = useId()
  useEffect(() => setReady(true), [])

  const haystacks = useMemo(
    () =>
      items.map((q) =>
        fold([q.title, q.question, q.short_answer, ...q.tags].filter(Boolean).join(' '))
      ),
    [items]
  )

  const terms = fold(deferred).split(/\s+/).filter(Boolean)
  const shown = items.filter(
    (q, i) => (!tag || q.tags.includes(tag)) && terms.every((t) => haystacks[i].includes(t))
  )

  return (
    <div className="qindex">
      <div className="qindex-controls" hidden={!ready}>
        <label htmlFor={`${id}-q`} className="sr-only">
          Search questions
        </label>
        <input
          id={`${id}-q`}
          type="search"
          className="qindex-search"
          placeholder="Search the questions"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        {tags.length > 1 && (
          <div className="qindex-tags" role="group" aria-label="Filter by topic">
            <button type="button" aria-pressed={tag === null} onClick={() => setTag(null)}>
              All topics
            </button>
            {tags.map((t) => (
              <button
                key={t}
                type="button"
                aria-pressed={tag === t}
                onClick={() => setTag(tag === t ? null : t)}
              >
                {t}
              </button>
            ))}
          </div>
        )}
        <p className="qindex-count" aria-live="polite">
          {shown.length === items.length
            ? `${items.length} questions`
            : `${shown.length} of ${items.length} questions`}
        </p>
      </div>

      {shown.length ? (
        <ol className="qindex-list" data-reveal suppressHydrationWarning>
          {shown.map((q) => (
            <li key={q.path} className="qindex-item">
              <h2 className="qindex-title">
                <Link href={`/${q.path}`}>{typeset(q.title)}</Link>
              </h2>
              {q.short_answer && <p className="qindex-answer">{typeset(q.short_answer)}</p>}
              <p className="qindex-meta">
                {q.tags.join(' · ')}
                {q.tags.length > 0 && ' · '}
                <Link href={`/${q.path}`}>Read the full answer</Link>
              </p>
            </li>
          ))}
        </ol>
      ) : (
        <div className="qindex-empty">
          <p>No question matches that search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setTag(null)
            }}
          >
            Clear the search
          </button>
        </div>
      )}
    </div>
  )
}
