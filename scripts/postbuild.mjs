import rss from './rss.mjs'
import { copyFileSync, existsSync, readFileSync, rmSync, writeFileSync } from 'fs'
import headers from '../security-headers.js'
import { createIndex, close } from 'pagefind'

/**
 * Build the Pagefind index from the rendered HTML.
 * - Static export: index out/ into out/pagefind (what Cloudflare Pages serves).
 * - Server build: index the prerendered pages into public/pagefind, which
 *   `next start` and `next dev` serve.
 * Pagefind writes one index per <html lang> (en, am) and the palette opens the
 * one matching the page it runs on, so each language searches its own posts.
 */
async function buildSearchIndex() {
  const exporting = !!process.env.EXPORT
  const site = exporting ? 'out' : '.next/server/app'
  const outputPath = exporting ? 'out/pagefind' : 'public/pagefind'
  // Start clean: `next build` copies public/ (including any old public/pagefind)
  // into out/, and stale fragments would otherwise be merged into the new index.
  rmSync(outputPath, { recursive: true, force: true })
  const { index, errors } = await createIndex()
  if (errors.length) throw new Error(errors.join('\n'))
  const added = await index.addDirectory({ path: site, glob: '**/*.html' })
  if (added.errors.length) throw new Error(added.errors.join('\n'))
  await index.writeFiles({ outputPath })
  await close()
  const entry = JSON.parse(readFileSync(`${outputPath}/pagefind-entry.json`, 'utf8'))
  const languages = Object.entries(entry.languages ?? {}).map(
    ([lang, { page_count }]) => `${lang}: ${page_count}`
  )
  console.log(
    `Search index: scanned ${added.page_count} HTML files (posts only are indexed) → ${outputPath}` +
      (languages.length ? ` (${languages.join(', ')})` : '')
  )
}

/**
 * Cloudflare serves the nearest 404.html for an unknown URL, so the Amharic
 * not-found page (exported as out/am/404/index.html) is copied to out/am/404.html.
 */
function amharicNotFound() {
  if (!process.env.EXPORT || !existsSync('out/am/404/index.html')) return
  copyFileSync('out/am/404/index.html', 'out/am/404.html')
  console.log('Amharic 404 → out/am/404.html')
}

/** Cloudflare Pages reads security and cache headers from out/_headers. */
function writeHeaders() {
  if (!process.env.EXPORT) return
  writeFileSync('out/_headers', headers.cloudflareHeaders())
  console.log('Headers → out/_headers')
}

async function postbuild() {
  await rss()
  await buildSearchIndex()
  amharicNotFound()
  writeHeaders()
}

postbuild()
