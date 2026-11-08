'use client'

import { useEffect, useState, type ComponentType } from 'react'

const EVENT = 'sima:toast'

/** Show a toast from anywhere. sonner loads on the first call, not with the page. */
export function notify(message: string) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: message }))
}

type SonnerModule = typeof import('sonner')

/** Mounts sonner's Toaster lazily, the first time something asks for a toast. */
export default function ToastHost() {
  const [sonner, setSonner] = useState<SonnerModule | null>(null)

  useEffect(() => {
    let mod: SonnerModule | null = null
    const queue: string[] = []
    const onToast = async (e: Event) => {
      const message = (e as CustomEvent<string>).detail
      if (mod) return mod.toast(message)
      queue.push(message)
      if (queue.length > 1) return
      mod = await import('sonner')
      setSonner(mod)
      // Let the Toaster mount before the queued toasts are sent.
      requestAnimationFrame(() => queue.splice(0).forEach((m) => mod!.toast(m)))
    }
    window.addEventListener(EVENT, onToast)
    return () => window.removeEventListener(EVENT, onToast)
  }, [])

  if (!sonner) return null
  const Toaster = sonner.Toaster as ComponentType<Parameters<SonnerModule['Toaster']>[0]>
  return (
    <Toaster
      position="bottom-center"
      toastOptions={{ unstyled: true, classNames: { toast: 'toast' } }}
    />
  )
}
