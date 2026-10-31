import rss from './rss.mjs'
import { rmSync, writeFileSync } from 'fs'
import headers from '../security-headers.js'
import { createIndex, close } from 'pagefind'

/**
 * Build the Pagefind index from the rendered HTML.
 * - Static export: index out/ into out/pagefind (what Cloudflare Pages serves).
 * - Server build: index the prerendered pages into public/pagefind, which
 *   `next start` and `next dev` serve.
 */
async function buildSearchIndex() {
  const exporting = !!process.env.EXPORT
  const site = exporting ? 'out' : '.next/server/app'
  const outputPath = exporting ? 'out/pagefind' : 'public/pagefind'
  // Start clean: `next build` copies public/ (including any old public/pagefind)
  // into out/, and stale fragments would otherwise be merged into the new index.
  rmSync(outputPath, { recursive: true, force: true })
  const { index, errors } = await createIndex({ forceLanguage: 'en' })
  if (errors.length) throw new Error(errors.join('\n'))
  const added = await index.addDirectory({ path: site, glob: '**/*.html' })
  if (added.errors.length) throw new Error(added.errors.join('\n'))
  await index.writeFiles({ outputPath })
  await close()
  console.log(
    `Search index: scanned ${added.page_count} HTML files (posts only are indexed) → ${outputPath}`
  )
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
  writeHeaders()
}

postbuild()
