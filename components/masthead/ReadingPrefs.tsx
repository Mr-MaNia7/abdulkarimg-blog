'use client'

import * as Popover from '@radix-ui/react-popover'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { PREFS_KEY } from '@/lib/reading-prefs'

type Size = 'sm' | 'md' | 'lg' | 'xl'
type Font = 'serif' | 'sans'
type Prefs = { v: 1; size: Size; font: Font }

const DEFAULTS: Prefs = { v: 1, size: 'md', font: 'serif' }

const SIZES: { value: Size; label: string }[] = [
  { value: 'sm', label: 'Smaller' },
  { value: 'md', label: 'Default' },
  { value: 'lg', label: 'Larger' },
  { value: 'xl', label: 'Largest' },
]

function read(): Prefs {
  try {
    const p = JSON.parse(localStorage.getItem(PREFS_KEY) || '{}')
    return p?.v === 1 ? { ...DEFAULTS, ...p } : DEFAULTS
  } catch {
    return DEFAULTS
  }
}

function apply(p: Prefs) {
  const d = document.documentElement
  if (p.size === 'md') delete d.dataset.readingSize
  else d.dataset.readingSize = p.size
  if (p.font === 'sans') d.dataset.readingFont = 'sans'
  else delete d.dataset.readingFont
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(p))
  } catch {
    // Storage unavailable: the choice still applies for this page view.
  }
}

/** The "Aa" panel: text size, typeface and theme. */
export default function ReadingPrefs() {
  const [mounted, setMounted] = useState(false)
  const [prefs, setPrefs] = useState<Prefs>(DEFAULTS)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setPrefs(read())
    setMounted(true)
  }, [])

  const update = (next: Partial<Prefs>) => {
    const p = { ...prefs, ...next }
    setPrefs(p)
    apply(p)
  }

  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <button
          type="button"
          className="tool-button tool-button-text"
          aria-label="Reading preferences"
          hidden={!mounted}
        >
          <span aria-hidden="true">Aa</span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="prefs-card" align="end" sideOffset={10} collisionPadding={16}>
          <fieldset className="prefs-group">
            <legend>Text size</legend>
            <div className="prefs-options">
              {SIZES.map((s) => (
                <label key={s.value} className={`prefs-size prefs-size-${s.value}`}>
                  <input
                    type="radio"
                    name="reading-size"
                    value={s.value}
                    checked={prefs.size === s.value}
                    onChange={() => update({ size: s.value })}
                  />
                  <span aria-hidden="true">A</span>
                  <span className="sr-only">{s.label}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="prefs-group">
            <legend>Typeface</legend>
            <div className="prefs-options">
              {(['serif', 'sans'] as Font[]).map((f) => (
                <label key={f} className={`prefs-choice prefs-font-${f}`}>
                  <input
                    type="radio"
                    name="reading-font"
                    value={f}
                    checked={prefs.font === f}
                    onChange={() => update({ font: f })}
                  />
                  <span>{f === 'serif' ? 'Serif' : 'Sans'}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="prefs-group">
            <legend>Theme</legend>
            <div className="prefs-options">
              {['system', 'light', 'dark'].map((t) => (
                <label key={t} className="prefs-choice">
                  <input
                    type="radio"
                    name="reading-theme"
                    value={t}
                    checked={(theme ?? 'system') === t}
                    onChange={() => setTheme(t)}
                  />
                  <span>{t === 'system' ? 'System' : t === 'light' ? 'Light' : 'Dark'}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  )
}
