import {
  defineDocumentType,
  defineNestedType,
  ComputedFields,
  makeSource,
} from 'contentlayer2/source-files'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
// Remark packages
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkSmartypants from 'remark-smartypants'
import { remarkAlert } from 'remark-github-blockquote-alert'
import {
  remarkExtractFrontmatter,
  remarkCodeTitles,
  remarkImgToJsx,
  extractTocHeadings,
} from 'pliny/mdx-plugins/index.js'
// Rehype packages
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import {
  rehypeScripts,
  rehypeMarginFootnotes,
  rehypeRefAlias,
  rehypeLocalize,
} from './lib/rehype-hashiya'

const root = process.cwd()

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

const computedFields: ComputedFields = {
  readingTime: { type: 'json', resolve: (doc) => readingTime(doc.body.raw) },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath,
  },
  filePath: {
    type: 'string',
    resolve: (doc) => doc._raw.sourceFilePath,
  },
  toc: { type: 'json', resolve: (doc) => extractTocHeadings(doc.body.raw) },
}

/**
 * Languages. English posts live in data/blog/ and are served at /blog/<slug>/;
 * Amharic posts live in data/blog/am/ and are served at /am/blog/<slug>/.
 * The folder decides the language, so authors never write `lang` themselves.
 */
const langOf = (doc): 'en' | 'am' => (/^blog\/am\//.test(doc._raw.flattenedPath) ? 'am' : 'en')

const blogFields: ComputedFields = {
  lang: { type: 'string', resolve: langOf },
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\/(am\/)?/, ''),
  },
  path: {
    type: 'string',
    resolve: (doc) =>
      langOf(doc) === 'am'
        ? doc._raw.flattenedPath.replace(/^blog\/am\//, 'am/blog/')
        : doc._raw.flattenedPath,
  },
}

export const POST_TYPES = ['essay', 'qa', 'note'] as const
export const CATEGORIES = [
  'Theology',
  'Comparative Religion',
  'Questions on Islam',
  'Notes',
] as const

const Series = defineNestedType(() => ({
  name: 'Series',
  fields: {
    name: { type: 'string', required: true },
    part: { type: 'number', required: true },
  },
}))

/**
 * Fail the build on frontmatter the type system cannot express:
 * Q&A posts need their question and short answer, series parts must be unique
 * within a language, and a translation must name an original that exists.
 */
function validatePosts(allBlogs) {
  const problems: string[] = []
  const seriesParts = new Map<string, string>()
  const translated = new Map<string, string>()
  allBlogs.forEach((post) => {
    const file = post._raw.sourceFilePath
    if (post.translationOf) {
      const original = allBlogs.find((p) => p.lang !== post.lang && p.slug === post.translationOf)
      if (!original) {
        problems.push(
          `${file}: \`translationOf: ${post.translationOf}\` names no post in the other language`
        )
      } else if (original.translationOf) {
        problems.push(`${file}: ${original._raw.sourceFilePath} is itself a translation`)
      }
      const key = `${post.lang}:${post.translationOf}`
      const other = translated.get(key)
      if (other) problems.push(`${file}: ${other} already translates ${post.translationOf}`)
      translated.set(key, file)
    }
    if (post.type === 'qa' && (!post.question || !post.short_answer)) {
      problems.push(`${file}: type "qa" requires both \`question\` and \`short_answer\``)
    }
    if (post.type !== 'qa' && (post.question || post.short_answer)) {
      problems.push(`${file}: \`question\` and \`short_answer\` are only used when type is "qa"`)
    }
    if (post.series) {
      const key = `${post.lang}:${post.series.name}#${post.series.part}`
      const other = seriesParts.get(key)
      if (other) problems.push(`${file}: series part ${key} is also used by ${other}`)
      seriesParts.set(key, file)
    }
  })
  if (problems.length) {
    throw new Error(`Invalid post frontmatter:\n  - ${problems.join('\n  - ')}`)
  }
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' }, default: [] },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'json' },
    authors: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
    // Ḥāshiya additions
    type: { type: 'enum', options: [...POST_TYPES], default: 'essay' },
    category: { type: 'enum', options: [...CATEGORIES] },
    series: { type: 'nested', of: Series },
    question: { type: 'string' },
    short_answer: { type: 'string' },
    featured: { type: 'boolean', default: false },
    /** On a translation: the slug of the original in the other language. */
    translationOf: { type: 'string' },
  },
  computedFields: {
    ...computedFields,
    ...blogFields,
    categorySlug: {
      type: 'string',
      resolve: (doc) => (doc.category ? slug(doc.category) : undefined),
    },
    seriesSlug: {
      type: 'string',
      resolve: (doc) => (doc.series?.name ? slug(doc.series.name) : undefined),
    },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: 'Authors',
  filePathPattern: 'authors/**/*.mdx',
  contentType: 'mdx',
  fields: {
    name: { type: 'string', required: true },
    avatar: { type: 'string' },
    occupation: { type: 'string' },
    company: { type: 'string' },
    email: { type: 'string' },
    twitter: { type: 'string' },
    bluesky: { type: 'string' },
    linkedin: { type: 'string' },
    github: { type: 'string' },
    layout: { type: 'string' },
  },
  computedFields,
}))

export default makeSource({
  contentDirPath: 'data',
  // glossary.json is plain data for <Term> and /glossary, not a document.
  contentDirExclude: [
    'node_modules',
    '.git',
    '.yarn',
    '.cache',
    '.next',
    '.contentlayer',
    'glossary.json',
  ],
  documentTypes: [Blog, Authors],
  // Contentlayer's own discriminator moves to `documentType`, so the
  // frontmatter field `type` (essay | qa | note) belongs to the author.
  fieldOptions: { bodyFieldName: 'body', typeFieldName: 'documentType' },
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkSmartypants,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeRefAlias,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      rehypeKatexNoTranslate,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypeScripts,
      rehypeLocalize,
      rehypeMarginFootnotes,
      rehypePresetMinify,
    ],
    mdxOptions: (options) => {
      // A visible, plainly named heading for the notes section.
      options.remarkRehypeOptions = {
        ...options.remarkRehypeOptions,
        footnoteLabel: 'Notes',
        footnoteLabelTagName: 'h2',
        footnoteLabelProperties: { className: ['footnotes-label'] },
        footnoteBackLabel: (n) => `Back to reference ${n + 1}`,
        // U+FE0E keeps ↩ a text glyph rather than an emoji on iOS.
        footnoteBackContent: '\u21A9\uFE0E',
      }
      return options
    },
  },
  onSuccess: async (importData) => {
    const { allBlogs } = await importData()
    validatePosts(allBlogs)
  },
})
