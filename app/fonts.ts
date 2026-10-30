import { Literata, Commissioner, Source_Code_Pro, Amiri, Amiri_Quran } from 'next/font/google'

// Every Latin face below was checked for full transliteration coverage
// (ā ī ū ḥ ṣ ḍ ṭ ẓ ʿ ʾ). `subsets` only decides what is preloaded: next/font
// still declares every subset with its unicode-range, so the `latin-ext` file
// (dot-below letters, ʿ ʾ) downloads on demand when a page uses those letters.

/** Prose and headings. Above the fold on every page, so preloaded. */
export const literata = Literata({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-literata',
})

/** Interface: navigation, buttons, labels. */
export const commissioner = Commissioner({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-commissioner',
})

/** Metadata and references only. */
export const sourceCodePro = Source_Code_Pro({
  subsets: ['latin'],
  display: 'swap',
  preload: false,
  variable: '--font-source-code-pro',
})

// Arabic faces are not preloaded. Their @font-face rules carry the Arabic
// unicode-range, so the browser downloads them only on pages that render
// Arabic, including ﷺ (U+FDFA), which no Latin face here contains.

/** Naskh for all Arabic outside Qur'an blocks, and the honorific fallback. */
export const amiri = Amiri({
  subsets: ['arabic'],
  weight: ['400', '700'],
  display: 'swap',
  preload: false,
  variable: '--font-amiri',
})

/** Qur'anic text only. */
export const amiriQuran = Amiri_Quran({
  subsets: ['arabic'],
  weight: '400',
  display: 'swap',
  preload: false,
  variable: '--font-amiri-quran',
})

export const fontVariables = [
  literata.variable,
  commissioner.variable,
  sourceCodePro.variable,
  amiri.variable,
  amiriQuran.variable,
].join(' ')
