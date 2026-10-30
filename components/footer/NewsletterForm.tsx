'use client'

import { useId, useState } from 'react'

/**
 * Two modes:
 * - `action` set: a plain form posting to the provider's hosted endpoint.
 *   Works on the static site and without JavaScript.
 * - no `action`: posts to pliny's /api/newsletter (needs a server deployment).
 */
export default function NewsletterForm({
  action,
  fieldName = 'email',
}: {
  action?: string
  fieldName?: string
}) {
  const id = useId()
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    if (action) return // let the browser post to the provider
    e.preventDefault()
    const email = new FormData(e.currentTarget).get(fieldName)
    setState('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (!res.ok) throw new Error(String(res.status))
      setState('done')
      setMessage('Subscribed. Look for a confirmation email.')
    } catch {
      setState('error')
      setMessage('That did not go through. Check the address and try again.')
    }
  }

  return (
    <form
      className="newsletter"
      action={action}
      method={action ? 'post' : undefined}
      target={action ? '_blank' : undefined}
      onSubmit={subscribe}
    >
      <label htmlFor={`${id}-email`} className="newsletter-label">
        New essays by email
      </label>
      <div className="newsletter-row">
        <input
          id={`${id}-email`}
          name={fieldName}
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="newsletter-input"
          aria-describedby={message ? `${id}-msg` : undefined}
        />
        <button type="submit" className="newsletter-button" disabled={state === 'sending'}>
          {state === 'sending' ? 'Subscribing…' : 'Subscribe'}
        </button>
      </div>
      {message && (
        <p id={`${id}-msg`} className="newsletter-message" role="status">
          {message}
        </p>
      )}
    </form>
  )
}
