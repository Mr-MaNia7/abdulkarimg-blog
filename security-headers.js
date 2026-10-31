/**
 * Security and caching headers, defined once.
 * - next.config.js applies them when the site runs on a Next server (and in dev).
 * - scripts/postbuild.mjs writes them to out/_headers for Cloudflare Pages,
 *   because Next's headers() setting does nothing in a static export.
 */

// Third-party hosts. Add analytics or comment providers here when you enable them,
// e.g. Umami Cloud: script 'cloud.umami.is', connect 'cloud.umami.is api-gateway.umami.dev'.
const thirdParty = {
  script: ['giscus.app'],
  connect: [],
  frame: ['giscus.app'],
}

const dev = process.env.NODE_ENV === 'development'

const csp = [
  "default-src 'self'",
  // Next inlines its bootstrap scripts, so a static site needs 'unsafe-inline'.
  // 'wasm-unsafe-eval' lets Pagefind run its WebAssembly; 'unsafe-eval' is dev-only (hot reload).
  `script-src 'self' 'unsafe-inline' 'wasm-unsafe-eval'${dev ? " 'unsafe-eval'" : ''} ${thirdParty.script.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  `connect-src 'self'${dev ? ' ws:' : ''} ${thirdParty.connect.join(' ')}`,
  `frame-src ${thirdParty.frame.join(' ') || "'none'"}`,
  "form-action 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  ...(dev ? [] : ['upgrade-insecure-requests']),
]
  .map((d) => d.replace(/\s+/g, ' ').trim())
  .join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
]

// Long-lived caching for files whose names change when their content does.
const cacheRules = [
  { path: '/_next/static/*', value: 'public, max-age=31536000, immutable' },
  // Versioned path (public/fonts/v1): bump the folder when a font changes.
  { path: '/fonts/*', value: 'public, max-age=31536000, immutable' },
  { path: '/pagefind/*', value: 'public, max-age=3600' },
  { path: '/og/*', value: 'public, max-age=86400' },
  { path: '/static/*', value: 'public, max-age=86400' },
]

/** The same rules in Cloudflare Pages `_headers` syntax. */
function cloudflareHeaders() {
  const lines = ['/*', ...securityHeaders.map((h) => `  ${h.key}: ${h.value}`), '']
  cacheRules.forEach((r) => lines.push(r.path, `  Cache-Control: ${r.value}`, ''))
  return lines.join('\n')
}

module.exports = { securityHeaders, cacheRules, cloudflareHeaders }
