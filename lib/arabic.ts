/**
 * Fold Arabic for search: drop vowel signs and Qur'anic annotation marks,
 * unify alif forms (ٱ أ إ آ → ا) and alif maqsura (ى → ي). Applied to the
 * hidden search copy of scripture blocks and to the query in the palette,
 * so a reader typing plain Arabic finds vocalized Qur'anic text.
 */
export const foldArabic = (s: string) =>
  s
    .replace(/[ؐ-ًؚ-ٰٟۖ-ۭـ]/g, '')
    .replace(/[ٱآأإ]/g, 'ا')
    .replace(/ى/g, 'ي')

export const hasArabic = (s: string) => /[؀-ۿ]/.test(s)
