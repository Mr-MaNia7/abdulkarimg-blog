# Sīmā blog: rules for agents

## The deploy must never break

The site is deployed to Cloudflare as **plain static files**. Cloudflare runs
`EXPORT=1 UNOPTIMIZED=1 yarn build` (Next.js `output: 'export'`) and serves
`out/`. Nothing runs on a server at request time. Any change that needs a
server, or that makes the static export fail, breaks the live site.

**Before calling any change done, run `yarn build:export`.** It is Cloudflare's
exact command, run from a clean `.next` and `out/`. A plain `yarn build` or
`yarn dev` passing proves nothing about the deploy. If `build:export` fails,
the change is not done: fix it or revert it. Never report success without this
build passing.

Run it whenever a change touches routes or pages under `app/`, `next.config.js`,
`lib/content.ts` or other data loading, `contentlayer.config.ts`, dependencies,
the build scripts in `scripts/`, or **adds, renames or deletes content**.
Deleting the last post in a language, tag, series or subject is exactly what
broke the build on 2026-11-08: `/am/blog/[...slug]` had no Amharic post left.

### Never add

- Anything that reads the request on the server: `cookies()`, `headers()`,
  `draftMode()`, server-side `searchParams`, `dynamic = 'force-dynamic'`, or
  `revalidate` / ISR.
- Server Actions (`'use server'`), `middleware.ts`, or Edge/Node runtime code
  that expects to run per request.
- Route handlers (`app/**/route.ts`) that aren't `dynamic = 'force-static'`
  GETs. A POST endpoint can't work on this site.
- `rewrites()`, `redirects()` or `i18n` in `next.config.js`: export ignores or
  rejects them. Redirects go in an `out/_redirects` file written at build time.
  Response headers come from `security-headers.js`, which postbuild writes to
  `out/_headers`.
- Next image optimization or a custom loader that needs a server. Images are
  built with `UNOPTIMIZED=1`.
- Network fetches during the build (fonts, data, APIs). Everything the build
  needs is in the repo.
- Changes to `output`, `trailingSlash` or `basePath` in `next.config.js`, or to
  `wrangler.jsonc`, unless the author asks for them.

### Dynamic routes

Every `generateStaticParams()` returns its list through `exportParams()` from
`lib/static-params.ts`. Static export fails the whole build when the list is
empty. The helper then adds one `_empty` placeholder, which renders the
not-found page. A new dynamic route must use it too, and its page must call
`notFound()` for a value it doesn't know.

### Tooling the build depends on

- yarn 3.6.1, never npm or pnpm. Commit `yarn.lock` with any dependency change.
- Node 22 (`.nvmrc`), which is what Cloudflare uses.
