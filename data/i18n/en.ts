import headerNavLinks from '../headerNavLinks'
import siteMetadata from '../siteMetadata'

/** A link in the masthead or footer; hrefLang and lang mark links into the other language. */
export type NavItem = { href: string; title: string; hrefLang?: string; lang?: string }

/**
 * Interface strings, English. data/i18n/am.ts holds the same keys in Amharic;
 * components pick a dictionary by the page's language (see data/i18n/index.ts).
 *
 * Strings stay plain so they can be passed to client components as props.
 * Placeholders in braces ({n}, {query}, …) are filled by `fill()`; a pair is
 * [singular, plural].
 */
const en = {
  lang: 'en',
  /** Open Graph locale. */
  ogLocale: 'en_US',
  /** The language's own name, used on links that lead to it. */
  name: 'English',
  /** Text of a link to this language's version of a post, written in this language. */
  readIn: 'Also in English',
  /** "In English" / "በአማርኛ": the entry point into this language, written in it. */
  inThisLanguage: 'In English',
  home: '/',
  archive: '/blog',
  feed: '/feed.xml',
  description: siteMetadata.description as string,
  /** Social card for pages without their own (scripts/og.mjs). */
  socialBanner: siteMetadata.socialBanner as string,
  skipLink: 'Skip to content',

  masthead: {
    frontPageLabel: '{title}, front page',
    main: 'Main',
    menu: 'Menu',
    frontPage: 'Front page',
    links: headerNavLinks as NavItem[],
    more: [
      { href: '/essays', title: 'Essays' },
      { href: '/questions', title: 'Questions' },
      { href: '/notes', title: 'Notes' },
      { href: '/blog', title: 'Archive' },
      { href: '/tags', title: 'Tags' },
      { href: '/series', title: 'Series' },
    ] as NavItem[],
  },

  search: {
    button: 'Search',
    title: 'Search the site',
    description:
      'Search essays, questions, notes and glossary terms. Use the arrow keys to move through results and Enter to open one.',
    placeholder: 'Search essays, questions, terms…',
    results: 'Results',
    esc: 'Esc',
    searching: 'Searching…',
    noMatch: 'Nothing matches “{query}”.',
    unavailable:
      'The search index is missing. It is built by `yarn build`; glossary terms still work.',
    groups: {
      essays: 'Essays',
      questions: 'Questions',
      notes: 'Notes',
      glossary: 'Glossary',
      goTo: 'Go to',
    },
    quick: [
      { title: 'Start here', url: '/start' },
      { title: 'Questions', url: '/questions' },
      { title: 'Glossary', url: '/glossary' },
      { title: 'Archive', url: '/blog' },
      { title: 'About', url: '/about' },
    ],
  },

  prefs: {
    button: 'Reading preferences',
    textSize: 'Text size',
    sizes: { sm: 'Smaller', md: 'Default', lg: 'Larger', xl: 'Largest' },
    typeface: 'Typeface',
    serif: 'Serif',
    sans: 'Sans',
    theme: 'Theme',
    themes: { system: 'System', light: 'Light', dark: 'Dark' },
    toLight: 'Switch to light theme',
    toDark: 'Switch to dark theme',
  },

  footer: {
    colophon: 'Colophon',
    setIn:
      'Set in Literata, with Commissioner and Source Code Pro. Arabic in Amiri Quran and Amiri.',
    translations:
      'The Qur’an in English follows Sahih International, and the Bible the ESV, unless another translation is named beside the passage.',
    follow: 'Follow',
    feedLink: 'RSS feed',
    feedAfter: ' for every new piece, or one per ',
    /** Only English has subject pages and feeds. */
    subjects: 'subject',
    feedEnd: '.',
    email: 'Email',
    links: [
      { href: '/blog', title: 'Archive' },
      { href: '/tags', title: 'Tags' },
      { href: '/series', title: 'Series' },
    ] as NavItem[],
    newsletter: {
      label: 'New essays by email',
      subscribe: 'Subscribe',
      subscribing: 'Subscribing…',
      done: 'Subscribed. Look for a confirmation email.',
      error: 'That did not go through. Check the address and try again.',
    },
  },

  types: {
    essay: 'Essay',
    qa: 'Question',
    note: 'Note',
  } as Record<string, string>,
  nouns: {
    essay: ['essay', 'essays'],
    qa: ['answer', 'answers'],
    note: ['note', 'notes'],
    piece: ['piece', 'pieces'],
  } as Record<string, [string, string]>,
  categories: {
    Foundations: 'Foundations',
    'Existence of God': 'Existence of God',
    'Truth of Islam': 'Truth of Islam',
    'Answering Doubts': 'Answering Doubts',
    Notes: 'Notes',
  } as Record<string, string>,

  post: {
    contents: 'Contents',
    shortAnswer: 'The short answer',
    notes: 'Notes',
    backToReference: 'Back to reference {n}',
    minRead: '{n} min read',
    revised: 'revised',
    filedUnder: 'Filed under',
    suggestCorrection: 'Suggest a correction',
    related: 'Related reading',
    pager: 'Previous and next post',
    older: 'Older',
    newer: 'Newer',
    seriesPartOf: 'Part {part} of {total} in {name}',
    seriesPart: 'Part {n}',
    seriesOther: '{name}: other parts',
    sideNote: 'Side note',
    loadComments: 'Load comments',
    translations: 'Other languages',
  },

  mdx: {
    callout: { note: 'Note', important: 'Important', clarification: 'Clarification' },
    quran: 'Qur’an',
    quranCaps: 'QUR’AN',
    translatedBy: 'tr.',
    copy: 'Copy',
    copied: 'Copied {label}',
    copyFailed: 'Copy failed. Select the text and copy it manually.',
    grades: { sahih: 'sound', hasan: 'good', daif: 'weak' } as Record<string, string>,
    topic: 'Topic',
    inGlossary: 'In the glossary',
  },

  index: {
    /** Gloss beside the other language's entry point. */
    otherLanguage: 'In Amharic',
    /** After a year in the archive: the Ethiopian era on Amharic pages. */
    era: '',
    feed: 'RSS',
    archive: 'Archive',
    archiveLede: 'Every essay, answer and note, by year.',
    empty: 'Nothing here yet.',
    latest: 'Latest',
    fullArchive: 'The full archive',
    readMore: 'Read',
  },

  notFound: {
    title: 'Nothing at this address',
    lede: 'There is no page at this address. It may have moved, or the link may be mistyped.',
    links: [
      { href: '/', title: 'The front page' },
      { href: '/start', title: 'Start here: the course' },
      { href: '/blog', title: 'The archive' },
      { href: '/glossary', title: 'The glossary' },
    ] as { href: string; title: string; lang?: string }[],
  },
}

export type Dict = typeof en
export default en
