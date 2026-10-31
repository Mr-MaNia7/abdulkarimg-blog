import localFont from 'next/font/local'

/*
  Self-hosted, trimmed fonts (assets/fonts/web, SIL Open Font License).
  - Latin faces keep only the weight axis, pinned at text optical size, and
    carry every character the site sets (ā ī ū ḥ ṣ ḍ ṭ ẓ ʿ ʾ …) in one file.
  - Only Literata is preloaded; the rest swap in behind metric-matched fallbacks.
  - Arabic faces (Amiri, Amiri Quran) live in public/fonts/v1 and are declared
    in css/tailwind.css with an Arabic unicode-range, so they download only on
    pages that render Arabic; posts containing Arabic preload them
    (app/blog/[...slug]/page.tsx) so the text never reflows when they arrive.
  No network fetch at build time.
*/

/** Prose and headings. */
export const literata = localFont({
  src: [
    { path: '../assets/fonts/web/Literata.woff2', weight: '400 700', style: 'normal' },
    { path: '../assets/fonts/web/Literata-Italic.woff2', weight: '400 600', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-literata',
  adjustFontFallback: 'Times New Roman',
})

/** Interface: navigation, buttons, labels. */
export const commissioner = localFont({
  src: '../assets/fonts/web/Commissioner.woff2',
  weight: '400 600',
  display: 'swap',
  preload: false,
  variable: '--font-commissioner',
  adjustFontFallback: 'Arial',
})

/** Metadata and references only. */
export const sourceCodePro = localFont({
  src: '../assets/fonts/web/SourceCodePro.woff2',
  weight: '400 500',
  display: 'swap',
  preload: false,
  variable: '--font-source-code-pro',
  adjustFontFallback: false,
})

export const fontVariables = [
  literata.variable,
  commissioner.variable,
  sourceCodePro.variable,
].join(' ')
