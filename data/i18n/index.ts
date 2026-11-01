import en, { type Dict, type NavItem } from './en'
import am from './am'

export type { Dict, NavItem }
export type Lang = 'en' | 'am'

export const LANGS: Lang[] = ['en', 'am']
export const dictionaries: Record<Lang, Dict> = { en, am }

/** The dictionary for a language; anything unknown falls back to English. */
export const dict = (lang?: string): Dict => dictionaries[lang === 'am' ? 'am' : 'en']

/** Fill {placeholders}: fill('{n} min read', { n: 4 }) → "4 min read". */
export const fill = (template: string, vars: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? String(vars[key]) : match))

/** "1 essay", "3 essays" from a [singular, plural] pair. */
export const count = (n: number, [one, many]: [string, string]) => `${n} ${n === 1 ? one : many}`
