'use client'

import { useRef, useState, type ComponentType } from 'react'
import type { Dict } from '@/data/i18n'

type PanelProps = { defaultOpen?: boolean; takeFocus?: boolean; t: Dict['prefs'] }

/**
 * The "Aa" button. The Radix panel behind it loads on first hover or click,
 * so pages do not carry it until a reader reaches for it. When it loads, the
 * panel takes over this button's place and, if the reader was on it, its focus.
 */
export default function ReadingPrefs({ t }: { t: Dict['prefs'] }) {
  const [Panel, setPanel] = useState<ComponentType<PanelProps> | null>(null)
  const [openOnLoad, setOpenOnLoad] = useState(false)
  const [hadFocus, setHadFocus] = useState(false)
  const button = useRef<HTMLButtonElement>(null)

  const load = () =>
    import('./ReadingPrefsPanel').then((m) => {
      setHadFocus(document.activeElement === button.current)
      setPanel(() => m.default as ComponentType<PanelProps>)
    })

  if (Panel) return <Panel defaultOpen={openOnLoad} takeFocus={hadFocus} t={t} />
  return (
    <button
      ref={button}
      type="button"
      className="tool-button tool-button-text js-only"
      aria-label={t.button}
      aria-haspopup="dialog"
      onPointerEnter={load}
      onClick={() => {
        setOpenOnLoad(true)
        load()
      }}
    >
      <span aria-hidden="true">Aa</span>
    </button>
  )
}
