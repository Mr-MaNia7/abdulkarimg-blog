/**
 * Ethiopic script (Amharic), shared by the MDX pipeline (lib/rehype-hashiya.ts),
 * plain-string typesetting (lib/typeset.tsx) and the build scripts.
 * Blocks: Ethiopic, Ethiopic Supplement, Ethiopic Extended, Ethiopic Extended-A.
 */
export const ETHIOPIC_RANGE = '\u1200-\u137F\u1380-\u139F\u2D80-\u2DDF\uAB00-\uAB2F'

const ETHIOPIC = /[\u1200-\u137F\u1380-\u139F\u2D80-\u2DDF\uAB00-\uAB2F]/

export const hasEthiopic = (s: string) => ETHIOPIC.test(s)

// The wordspace and stops (U+1361–1368: ፡ ። ፣ ፤ ፥ ፦ ፧ ፨) attach to the word before them.
const SPACE_BEFORE_STOP = /[ \t\u00A0]+(?=[\u1361-\u1368])/g
// After a stop (not the wordspace ፡, itself a separator) the next word needs a space.
const STOP_THEN_WORD =
  /([\u1362-\u1366])(?=[\u1200-\u135A\u1380-\u138F\u2D80-\u2DDE\uAB01-\uAB2E])/g

/**
 * Ethiopic punctuation spacing: close up space before a stop, so it never
 * starts a line, and open one after a stop that runs into the next word.
 */
export const spaceEthiopic = (s: string) =>
  s.replace(SPACE_BEFORE_STOP, '').replace(STOP_THEN_WORD, '$1 ')
