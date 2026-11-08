/**
 * Static export (output: 'export', what Cloudflare Pages serves) fails the
 * whole build when a dynamic route's generateStaticParams() returns an empty
 * list: Next reports it as "missing generateStaticParams()". That happens as
 * soon as a language, tag or series has no content yet.
 *
 * Every dynamic route returns its params through this helper. With nothing
 * to list, it emits one placeholder value; the page finds no content for it
 * and renders the not-found page, so the build still succeeds.
 */
export const EMPTY_PARAM = '_empty'

export function exportParams<T>(params: T[], placeholder: T): T[] {
  return params.length > 0 ? params : [placeholder]
}
