import { build } from 'esbuild'

/**
 * The interface dictionaries (data/i18n/*.ts) for the build scripts, which
 * run as plain Node and cannot import TypeScript. esbuild (already a
 * dependency) compiles them in memory; nothing is written and no network is used.
 */
const { outputFiles } = await build({
  entryPoints: ['data/i18n/index.ts'],
  bundle: true,
  format: 'esm',
  platform: 'node',
  write: false,
  logLevel: 'silent',
})
const i18n = await import(
  `data:text/javascript;base64,${Buffer.from(outputFiles[0].text).toString('base64')}`
)

/** @type {(lang?: string) => import('../data/i18n/en').Dict} */
export const dict = i18n.dict
export const LANGS = i18n.LANGS
