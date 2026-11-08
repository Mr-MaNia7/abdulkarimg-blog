/**
 * Build-time Open Graph images and favicons, in the journal's cloth-and-gilt identity.
 *
 * Satori lays the cards out and resvg rasterises them. Satori cannot shape
 * Arabic, so every Arabic run (and ﷺ) is shaped here with HarfBuzz and drawn
 * as vector outlines, which keeps joined letters and vowel marks correct.
 * Ethiopic needs no shaping (each syllable is one character), so Amharic is
 * set by Satori itself in Noto Serif Ethiopic, its fallback after Literata.
 *
 * Fonts are committed in assets/og/fonts (static, subset instances, OFL), so
 * the build never depends on a network font download.
 *
 *   node scripts/og.mjs           → public/og/*.png (one per post + default),
 *                                   Amharic posts and default under public/og/am/
 *   node scripts/og.mjs --icons   → also regenerate public/static/favicons/*
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync, rmSync, statSync } from 'fs'
import path from 'path'
import matter from 'gray-matter'
import satori from 'satori'
import { Resvg } from '@resvg/resvg-js'
import { Blob as HbBlob, Face, Font, Buffer as HbBuffer, shape } from 'harfbuzzjs'
import siteMetadata from '../data/siteMetadata.js'
import { dict } from './i18n.mjs'

const FONT_DIR = 'assets/og/fonts'
const OUT = 'public/og'
const W = 1200
const H = 630

const C = {
  cloth: '#1c2f5e',
  gilt: '#d9bc74',
  paper: '#f9f8f5',
  muted: '#c3cbe0',
  frame: 'rgba(217, 188, 116, 0.5)',
  frameInner: 'rgba(217, 188, 116, 0.22)',
}

const fontFile = (name) => readFileSync(path.join(FONT_DIR, name))
const fonts = [
  { name: 'Literata', data: fontFile('Literata-SemiBold.ttf'), weight: 600, style: 'normal' },
  { name: 'Literata', data: fontFile('Literata-Regular.ttf'), weight: 400, style: 'normal' },
  {
    name: 'Source Code Pro',
    data: fontFile('SourceCodePro-Regular.ttf'),
    weight: 400,
    style: 'normal',
  },
  // Ethiopic only (subset); Satori falls back to it for Amharic in any family.
  {
    name: 'Noto Serif Ethiopic',
    data: fontFile('NotoSerifEthiopic-SemiBold.ttf'),
    weight: 600,
    style: 'normal',
  },
  {
    name: 'Noto Serif Ethiopic',
    data: fontFile('NotoSerifEthiopic-Regular.ttf'),
    weight: 400,
    style: 'normal',
  },
]

/* ───────────── Arabic, shaped by HarfBuzz ───────────── */

const amiri = (() => {
  const face = new Face(new HbBlob(fontFile('Amiri-Regular.ttf')), 0)
  return { face, font: new Font(face), upem: face.upem }
})()

/** Shape `text` and return an SVG data URI plus its pixel size at `size`. */
function arabicImage(text, size, color) {
  const buffer = new HbBuffer()
  buffer.addText(text)
  buffer.guessSegmentProperties()
  shape(amiri.font, buffer)
  const glyphs = buffer.getGlyphInfosAndPositions()
  const scale = size / amiri.upem
  let x = 0
  const paths = []
  // HarfBuzz returns RTL runs in visual (left-to-right) order, so advance rightwards.
  for (const g of glyphs) {
    const d = amiri.font.glyphToPath(g.codepoint)
    if (d) {
      const gx = (x + (g.xOffset ?? 0)) * scale
      const gy = (g.yOffset ?? 0) * scale
      paths.push(
        `<path transform="translate(${gx.toFixed(2)} ${(-gy).toFixed(2)}) scale(${scale.toFixed(5)} ${(-scale).toFixed(5)})" d="${d}"/>`
      )
    }
    x += g.xAdvance ?? 0
  }
  const width = Math.ceil(x * scale)
  // Amiri's tall marks and descenders need room above and below the baseline.
  const ascent = Math.ceil(size * 1.15)
  const descent = Math.ceil(size * 0.6)
  const height = ascent + descent
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 ${-ascent} ${width} ${height}"><g fill="${color}">${paths.join('')}</g></svg>`
  return {
    src: `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`,
    width,
    height,
  }
}

const ARABIC =
  /([\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+(?:\s+[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]+)*)/

/* ───────────── Element helpers (Satori takes React-shaped objects) ───────────── */

const h = (type, style, ...children) => ({
  type,
  props: { style, children: children.length === 1 ? children[0] : children },
})
const img = ({ src, width, height }, style = {}) => ({
  type: 'img',
  props: { src, width, height, style },
})

/**
 * Title text. Pure Latin titles are one text node, so Satori wraps and kerns
 * them normally; titles with Arabic become a wrapping row of words and images.
 */
function titleNode(title, size) {
  const style = {
    fontFamily: 'Literata',
    fontWeight: 600,
    fontSize: size,
    lineHeight: 1.12,
    letterSpacing: '-0.02em',
    color: C.paper,
  }
  if (!ARABIC.test(title)) return h('div', { ...style, display: 'flex' }, title)
  const parts = title.split(ARABIC).filter(Boolean)
  const children = []
  parts.forEach((part) => {
    if (ARABIC.test(part)) {
      children.push(
        img(arabicImage(part.trim(), size * 0.92, C.paper), {
          marginRight: size * 0.25,
          marginTop: -size * 0.28,
        })
      )
    } else {
      part
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => children.push(h('span', { marginRight: size * 0.25 }, word)))
    }
  })
  return h(
    'div',
    { ...style, display: 'flex', flexWrap: 'wrap', alignItems: 'center' },
    ...children
  )
}

const titleSize = (t) => (t.length <= 38 ? 78 : t.length <= 64 ? 66 : t.length <= 96 ? 56 : 48)

/** The stamped double frame of the cover, drawn as absolutely placed boxes. */
const frame = (...children) =>
  h(
    'div',
    { width: W, height: H, display: 'flex', position: 'relative', background: C.cloth },
    h('div', {
      position: 'absolute',
      top: 28,
      left: 28,
      right: 28,
      bottom: 28,
      border: `1px solid ${C.frame}`,
    }),
    h('div', {
      position: 'absolute',
      top: 37,
      left: 37,
      right: 37,
      bottom: 37,
      border: `1px solid ${C.frameInner}`,
    }),
    h(
      'div',
      {
        position: 'absolute',
        top: 37,
        left: 37,
        right: 37,
        bottom: 37,
        display: 'flex',
        flexDirection: 'column',
        padding: '44px 56px',
      },
      ...children
    )
  )

function postCard(post) {
  const t = dict(post.lang)
  const label = [t.types[post.type ?? 'essay'], post.category && t.categories[post.category]]
    .filter(Boolean)
    .join(' · ')
  return frame(
    h(
      'div',
      { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
      h(
        'div',
        { display: 'flex', alignItems: 'center' },
        h(
          'div',
          {
            fontFamily: 'Literata',
            fontWeight: 600,
            fontSize: 34,
            color: C.gilt,
            letterSpacing: '-0.01em',
          },
          'Sīmā'
        ),
        img(arabicImage('سيماء', 30, C.gilt), { marginLeft: 16, marginTop: 4 })
      ),
      h('div', { fontFamily: 'Source Code Pro', fontSize: 21, color: C.muted }, label)
    ),
    h(
      'div',
      { flex: 1, display: 'flex', alignItems: 'center' },
      titleNode(post.title, titleSize(post.title))
    ),
    h(
      'div',
      { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
      h('div', { fontFamily: 'Literata', fontSize: 24, color: C.muted }, siteMetadata.author),
      h(
        'div',
        { fontFamily: 'Source Code Pro', fontSize: 20, color: C.gilt },
        new URL(siteMetadata.siteUrl).host
      )
    )
  )
}

function defaultCard(lang = 'en') {
  const t = dict(lang)
  return frame(
    h(
      'div',
      {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      },
      h(
        'div',
        {
          fontFamily: 'Literata',
          fontWeight: 600,
          fontSize: 132,
          color: C.gilt,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        },
        'Sīmā'
      ),
      img(arabicImage('سيماء', 64, C.gilt), { marginTop: 14 }),
      h(
        'div',
        {
          marginTop: 34,
          maxWidth: 720,
          textAlign: 'center',
          fontFamily: 'Literata',
          fontSize: lang === 'am' ? 30 : 32,
          lineHeight: lang === 'am' ? 1.6 : 1.4,
          color: C.paper,
        },
        t.description
      ),
      h(
        'div',
        { marginTop: 30, fontFamily: 'Literata', fontSize: 24, color: C.muted },
        siteMetadata.author
      )
    )
  )
}

async function png(node, width = W, height = H) {
  const svg = await satori(node, { width, height, fonts })
  return new Resvg(svg, { fitTo: { mode: 'width', value: width } }).render().asPng()
}

/* ───────────── Posts ───────────── */

function readPosts(dir = 'data/blog') {
  const files = []
  const walk = (d) =>
    readdirSync(d).forEach((f) => {
      const p = path.join(d, f)
      if (statSync(p).isDirectory()) walk(p)
      else if (/\.mdx?$/.test(f)) files.push(p)
    })
  walk(dir)
  return files
    .map((file) => {
      const { data } = matter(readFileSync(file, 'utf8'))
      // data/blog/am/<slug>.mdx → slug "am/<slug>", card og/am/<slug>.png (lib/jsonld.ts ogImage).
      const slug = path.relative(dir, file).replace(/\.mdx?$/, '')
      return { slug, lang: slug.startsWith('am/') ? 'am' : 'en', ...data }
    })
    .filter((p) => !(p.draft === true && process.env.NODE_ENV === 'production'))
}

/* ───────────── Favicons ───────────── */

function iconNode(size) {
  return h(
    'div',
    {
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: C.cloth,
      fontFamily: 'Literata',
      fontWeight: 600,
      fontSize: size * 0.64,
      lineHeight: 1,
      color: C.gilt,
    },
    // Centre the ink, not the box: the dot below makes the glyph bottom-heavy.
    h('div', { display: 'flex', marginTop: -size * 0.16 }, 'Ḥ')
  )
}

/** A .ico holding one PNG, the format every browser accepts. */
function ico(pngBytes, size) {
  const header = Buffer.alloc(6 + 16)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(1, 4)
  header.writeUInt8(size >= 256 ? 0 : size, 6)
  header.writeUInt8(size >= 256 ? 0 : size, 7)
  header.writeUInt16LE(1, 10)
  header.writeUInt16LE(32, 12)
  header.writeUInt32LE(pngBytes.length, 14)
  header.writeUInt32LE(22, 18)
  return Buffer.concat([header, pngBytes])
}

async function icons() {
  const dir = 'public/static/favicons'
  rmSync(dir, { recursive: true, force: true })
  mkdirSync(dir, { recursive: true })
  const sizes = {
    'favicon-16x16.png': 16,
    'favicon-32x32.png': 32,
    'apple-touch-icon.png': 180,
    'icon-192.png': 192,
    'icon-512.png': 512,
  }
  for (const [name, size] of Object.entries(sizes)) {
    writeFileSync(path.join(dir, name), await png(iconNode(size), size, size))
  }
  writeFileSync(path.join(dir, 'favicon.ico'), ico(await png(iconNode(32), 32, 32), 32))
  // Vector favicon: the same Ḥ, from Satori's own SVG output.
  writeFileSync(
    path.join(dir, 'icon.svg'),
    await satori(iconNode(64), { width: 64, height: 64, fonts })
  )
  writeFileSync(
    path.join(dir, 'site.webmanifest'),
    JSON.stringify(
      {
        name: siteMetadata.title,
        short_name: siteMetadata.title,
        icons: [
          { src: '/static/favicons/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/static/favicons/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        theme_color: C.cloth,
        background_color: '#f9f8f5',
        display: 'standalone',
      },
      null,
      2
    )
  )
  console.log(`Favicons → ${dir}`)
}

/* ───────────── Run ───────────── */

async function main() {
  rmSync(OUT, { recursive: true, force: true })
  mkdirSync(OUT, { recursive: true })
  writeFileSync(path.join(OUT, 'default.png'), await png(defaultCard()))
  mkdirSync(path.join(OUT, 'am'), { recursive: true })
  writeFileSync(path.join(OUT, 'am', 'default.png'), await png(defaultCard('am')))
  const posts = readPosts()
  for (const post of posts) {
    const file = path.join(OUT, `${post.slug}.png`)
    mkdirSync(path.dirname(file), { recursive: true })
    writeFileSync(file, await png(postCard(post)))
  }
  console.log(`Open Graph images: ${posts.length + 2} → ${OUT}`)
  if (process.argv.includes('--icons')) await icons()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
