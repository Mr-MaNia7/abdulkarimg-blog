/**
 * Build-time typesetting for Ḥāshiya posts.
 *
 * rehypeScripts
 *   - wraps every run of Arabic script in <span lang="ar" dir="rtl"> so authors
 *     can type Arabic directly in Markdown;
 *   - wraps runs of Ethiopic (Amharic) in <span lang="am"> (left to right), except
 *     in Amharic posts, whose whole page is already lang="am";
 *   - closes up space before Ethiopic punctuation (። ፣ ፤ ፡ …), so a stop never
 *     starts a line, and opens a space after a stop that runs into the next word;
 *   - marks honorifics (ﷺ ﷻ) as their own small inline unit;
 *   - wraps the transliteration marks ʿ ʾ so CSS can tighten their spacing.
 *
 * rehypeLocalize
 *   - in Amharic posts, translates the labels remark adds to footnotes.
 *
 * rehypeMarginFootnotes
 *   - copies each GFM footnote next to its reference as a margin note, shown
 *     only where the margin exists. The canonical footnote list stays at the end.
 */

import am from '../data/i18n/am'
import { fill } from '../data/i18n/index'
import { ETHIOPIC_RANGE, spaceEthiopic } from './ethiopic'

type Node = {
  type: string
  tagName?: string
  name?: string
  value?: string
  properties?: Record<string, unknown>
  attributes?: { type: string; name: string; value: unknown }[]
  children?: Node[]
}

/** The vfile; Contentlayer puts the source document on it (contentlayer2 addRawDocumentToVFile). */
type File = { data: Record<string, unknown> }

/** The language of the post being compiled: data/blog/am/ holds the Amharic posts. */
const docLang = (file?: File) => {
  const doc = file?.data.rawDocumentData as { flattenedPath?: string } | undefined
  return /^blog\/am\//.test(doc?.flattenedPath ?? '') ? 'am' : 'en'
}

const ARABIC =
  '\\u0600-\\u06FF\\u0750-\\u077F\\u0870-\\u089F\\u08A0-\\u08FF\\uFB50-\\uFDF9\\uFDFC-\\uFDFF\\uFE70-\\uFEFF'
const HONORIFIC = '\\uFDFA\\uFDFB'
const MARKS = 'ʿʾ'

// A run may contain spaces and neutral punctuation between words of its script.
const TOKEN = new RegExp(
  `([${ARABIC}]+(?:[\\s\\u00A0،؛؟.,:!()«»\\-–]+[${ARABIC}]+)*)` +
    `|([${ETHIOPIC_RANGE}]+(?:[\\s\\u00A0.,;:!?()«»‹›“”‘’"'/\\-–—]+[${ETHIOPIC_RANGE}]+)*)` +
    `|([${HONORIFIC}])|([${MARKS}])`,
  'g'
)

const SKIP_TAGS = new Set(['code', 'pre', 'script', 'style', 'svg', 'math', 'kbd', 'samp'])

function attr(node: Node, name: string): unknown {
  if (node.type === 'element') return node.properties?.[name]
  if (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') {
    return node.attributes?.find((a) => a.type === 'mdxJsxAttribute' && a.name === name)?.value
  }
  return undefined
}

function isSkipped(node: Node): boolean {
  const tag = node.tagName ?? node.name
  if (tag && SKIP_TAGS.has(tag)) return true
  const lang = attr(node, 'lang')
  if (typeof lang === 'string' && lang.startsWith('ar')) return true
  const className = attr(node, 'className') ?? attr(node, 'class')
  const classes = Array.isArray(className) ? className.join(' ') : String(className ?? '')
  return /\b(katex|honorific|ayn|no-typeset)\b/.test(classes)
}

function span(properties: Record<string, unknown>, value: string): Node {
  return { type: 'element', tagName: 'span', properties, children: [{ type: 'text', value }] }
}

/** Split a text node into script runs. `ethiopic` is false where the page is already Amharic. */
function splitText(value: string, ethiopic: boolean): Node[] | null {
  TOKEN.lastIndex = 0
  if (!TOKEN.test(value)) return null
  TOKEN.lastIndex = 0
  const out: Node[] = []
  let last = 0
  let changed = false
  for (const match of value.matchAll(TOKEN)) {
    if (match[2] && !ethiopic) continue
    const index = match.index ?? 0
    if (index > last) out.push({ type: 'text', value: value.slice(last, index) })
    if (match[1]) out.push(span({ lang: 'ar', dir: 'rtl' }, match[1]))
    else if (match[2]) out.push(span({ lang: 'am' }, match[2]))
    else if (match[3]) out.push(span({ className: ['honorific'], lang: 'ar' }, match[3]))
    else out.push(span({ className: ['ayn'] }, match[4]))
    last = index + match[0].length
    changed = true
  }
  if (!changed) return null
  if (last < value.length) out.push({ type: 'text', value: value.slice(last) })
  return out
}

function walkScripts(node: Node, ethiopic: boolean) {
  if (!node.children) return
  const next: Node[] = []
  for (const child of node.children) {
    if (child.type === 'text' && child.value) {
      const value = spaceEthiopic(child.value)
      const parts = splitText(value, ethiopic)
      if (parts) next.push(...parts)
      else next.push({ ...child, value })
      continue
    }
    if (!isSkipped(child)) {
      const lang = attr(child, 'lang')
      walkScripts(child, typeof lang === 'string' ? !lang.startsWith('am') : ethiopic)
    }
    next.push(child)
  }
  node.children = next
}

export function rehypeScripts() {
  return (tree: Node, file?: File) => walkScripts(tree, docLang(file) !== 'am')
}

/* ───────────────────────── Localized labels ───────────────────────── */

const BACK_LABEL = /^Back to reference (.+)$/

/**
 * remark-rehype writes the footnote heading and back-link labels in English
 * (contentlayer.config.ts). Amharic posts get them from data/i18n/am.ts.
 */
export function rehypeLocalize() {
  const visit = (node: Node) => {
    if (node.type === 'element') {
      // The heading keeps its anchor link; only its text is replaced.
      if (node.tagName === 'h2' && node.properties?.id === 'footnote-label') {
        node.children = [
          ...(node.children ?? []).filter((c) => c.type !== 'text'),
          { type: 'text', value: am.post.notes },
        ]
      }
      const label = node.properties?.ariaLabel
      const back = typeof label === 'string' ? BACK_LABEL.exec(label) : null
      if (node.tagName === 'a' && back && node.properties?.dataFootnoteBackref !== undefined) {
        node.properties.ariaLabel = fill(am.post.backToReference, { n: back[1] })
      }
    }
    node.children?.forEach(visit)
  }
  return (tree: Node, file?: File) => {
    if (docLang(file) === 'am') visit(tree)
  }
}

/* ───────────────────────── Margin footnotes ───────────────────────── */

function findAll(node: Node, test: (n: Node) => boolean, acc: Node[] = []): Node[] {
  if (test(node)) acc.push(node)
  node.children?.forEach((c) => findAll(c, test, acc))
  return acc
}

function isBackref(n: Node) {
  return (
    n.type === 'element' && n.tagName === 'a' && n.properties?.dataFootnoteBackref !== undefined
  )
}

/** Clone for the aria-hidden margin copy: drop backrefs, keep links out of the tab order. */
function stripBackrefs(nodes: Node[]): Node[] {
  return nodes
    .filter((n) => !isBackref(n))
    .map((n) => {
      const copy = { ...n }
      if (n.type === 'element' && n.tagName === 'a') {
        copy.properties = { ...n.properties, tabIndex: -1 }
      }
      if (n.children) copy.children = stripBackrefs(n.children)
      return copy
    })
}

export function rehypeMarginFootnotes() {
  return (tree: Node) => {
    const items = findAll(
      tree,
      (n) =>
        n.type === 'element' && n.tagName === 'li' && /fn-/.test(String(n.properties?.id ?? ''))
    )
    if (!items.length) return
    const byId = new Map(items.map((li) => [String(li.properties?.id), li]))

    const visit = (node: Node) => {
      if (!node.children) return
      const next: Node[] = []
      for (const child of node.children) {
        visit(child)
        next.push(child)
        if (child.type !== 'element' || child.tagName !== 'sup') continue
        const ref = child.children?.find(
          (c) => c.type === 'element' && c.properties?.dataFootnoteRef !== undefined
        )
        const target = String(ref?.properties?.href ?? '').replace(/^#/, '')
        const li = byId.get(target)
        if (!li || !ref) continue
        const number = (ref.children?.[0]?.value as string) ?? ''
        // Flatten the footnote's paragraphs into one inline run.
        const inline = stripBackrefs(
          (li.children ?? []).flatMap((block) =>
            block.type === 'element' && block.tagName === 'p'
              ? [...(block.children ?? []), { type: 'text', value: ' ' }]
              : []
          )
        )
        next.push({
          type: 'element',
          tagName: 'span',
          properties: { className: ['margin-note'], ariaHidden: 'true', dataPagefindIgnore: 'all' },
          children: [span({ className: ['margin-note-num'] }, number), ...inline],
        })
      }
      node.children = next
    }
    visit(tree)
  }
}

/* ───────────────────────── `ref` alias ───────────────────────── */

const REF_COMPONENTS = new Set(['Quran', 'Scripture'])

/**
 * Authors write <Quran ref="2:255" />, but React reserves `ref` and Server
 * Components reject it. Rename it to `reference` before React sees it.
 */
export function rehypeRefAlias() {
  const visit = (node: Node) => {
    if (
      (node.type === 'mdxJsxFlowElement' || node.type === 'mdxJsxTextElement') &&
      node.name &&
      REF_COMPONENTS.has(node.name)
    ) {
      node.attributes?.forEach((a) => {
        if (a.type === 'mdxJsxAttribute' && a.name === 'ref') a.name = 'reference'
      })
    }
    node.children?.forEach(visit)
  }
  return (tree: Node) => visit(tree)
}
