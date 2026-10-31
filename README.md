# Ḥāshiya

The journal at **[blog.abdulkarimg.com](https://blog.abdulkarimg.com)**: long-form writing on theology and comparative religion, answers to questions about Islam, and occasional notes.

Built on Next.js (App Router, static export), Tailwind CSS 4, Contentlayer2 and Pliny, starting from the MIT-licensed [Tailwind Next.js Starter Blog](https://github.com/timlrx/tailwind-nextjs-starter-blog) by Timothy Lin. Every visible surface has been redesigned; see [DESIGN.md](DESIGN.md) for the design system.

- [Running it](#running-it)
- [Writing posts](#writing-posts)
- [Components](#components)
- [What happens automatically](#what-happens-automatically)
- [Configuration](#configuration)
- [Deploying to Cloudflare](#deploying-to-cloudflare)
- [Project map](#project-map)

## Running it

Requires Node 22+ (pinned in `.nvmrc`). Yarn 3 is bundled in `.yarn/releases`, so any `yarn` on your machine uses it.

```bash
yarn install
yarn dev                              # http://localhost:3000
yarn build                            # production build (server mode)
EXPORT=1 UNOPTIMIZED=1 yarn build     # static site in out/, as deployed
yarn lint && yarn tsc --noEmit        # checks
```

`yarn build` also generates the Open Graph images (`public/og/`), RSS feeds and the Pagefind search index. Search in `yarn dev` uses the index from your last build, so run a build once before testing search locally.

## Writing posts

Posts are MDX files in `data/blog/`. The file name becomes the URL: `data/blog/the-names-of-god.mdx` → `/blog/the-names-of-god/`.

### Frontmatter

| Field                    | Required | Notes                                                                                                                      |
| ------------------------ | -------- | -------------------------------------------------------------------------------------------------------------------------- |
| `title`                  | yes      | Arabic, ʿ ʾ and ﷺ are fine; they are typeset automatically.                                                                |
| `date`                   | yes      | `'2026-11-02'`                                                                                                             |
| `type`                   |          | `essay` (default), `qa`, or `note`                                                                                         |
| `category`               |          | `Theology`, `Comparative Religion`, `Questions on Islam`, or `Notes`                                                       |
| `summary`                |          | One or two sentences. Shown under the title, in lists, feeds and search results.                                           |
| `tags`                   |          | `['tawhid', 'scripture']`                                                                                                  |
| `series`                 |          | `{ name: 'The Names of God', part: 2 }` links parts together                                                               |
| `question`               | qa only  | The question in full, if it differs from the title                                                                         |
| `short_answer`           | qa only  | 2–3 sentences shown before the full answer                                                                                 |
| `featured`               |          | `true` puts the post on the home page as the featured essay                                                                |
| `layout`                 |          | `PostLayout` (default, with margins), `PostSimple` (one column), `PostBanner` (one column with a wide image from `images`) |
| `lastmod`                |          | Shown as "revised …"                                                                                                       |
| `draft`                  |          | `true` hides the post in production                                                                                        |
| `bibliography`           |          | e.g. `references.bib` (in `data/`) to enable citations                                                                     |
| `images`, `canonicalUrl` |          | Optional overrides for the social image and canonical URL                                                                  |

The build refuses a `type: qa` post without both `question` and `short_answer`, and two posts claiming the same series part.

### An essay

```mdx
---
title: 'The Names of God in the Qur’an'
date: '2026-11-02'
type: essay
category: Theology
summary: What it means that God names Himself, and why the names are not interchangeable.
tags: ['tawhid', 'names-of-god']
series: { name: 'The Names of God', part: 1 }
bibliography: references.bib
---

Opening paragraph…

## First section
```

### A question

```mdx
---
title: 'Is the Qur’an the same in every copy?'
date: '2026-11-05'
type: qa
category: Questions on Islam
layout: PostSimple
question: 'Have different versions of the Qur’an existed, and is today’s text the same everywhere?'
short_answer: 'Two or three sentences that answer directly. The rest of the post gives the reasoning and the sources.'
tags: ['quran']
---
```

Questions appear on `/questions`, with their short answers, and are marked up as a `QAPage` for search engines.

### A note

```mdx
---
title: 'A note on transliteration'
date: '2026-10-18'
type: note
category: Notes
layout: PostSimple
---
```

### A series

Give each part the same `series.name` and its own `part` number. Each part then shows the series contents at the top and previous/next parts at the end, and `/series/<name>` lists them all.

## Components

All of these are available in any post without importing.

### `<Quran>`

```mdx
<Quran
  ref="2:255"
  arabic="ٱللَّهُ لَآ إِلَٰهَ إِلَّا هُوَ …"
  translation="Allah – there is no deity except Him …"
  translator="Sahih International"
/>
```

Arabic in Amiri Quran, translation beneath, `QUR’AN 2:255` in gold, a Copy button (Arabic + translation + reference). A single verse (`2:255`) gets the end-of-verse marker; a range (`112:1-4`) does not. It shows only what you write: nothing is fetched or filled in, so **check every quotation against a printed source**.

### `<Hadith>`

```mdx
<Hadith
  collection="Sahih al-Bukhari"
  number="1"
  grade="Sahih"
  narrator="Narrated by ʿUmar ibn al-Khaṭṭāb"
  arabic="إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ"
>
  Actions are only by intentions.
</Hadith>
```

`grade`: `Sahih`, `Hasan`, `Daif` (shown as Ṣaḥīḥ, Ḥasan, Ḍaʿīf), or any other text. `number`, `grade`, `narrator`, `arabic` are optional.

### `<Scripture>`

```mdx
<Scripture
  tradition="Bible"
  ref="John 1:1"
  version="ESV"
  original="Ἐν ἀρχῇ ἦν ὁ λόγος"
  originalLang="grc"
>
  In the beginning was the Word …
</Scripture>
```

For the Bible, Torah and other texts. `original` / `originalLang` (a language tag such as `he`, `grc`, `syc`) are optional; right-to-left languages are detected.

### `<Compare>`

```mdx
<Compare
  caption="A simplified comparison."
  rows={['God', 'Revelation']}
  left={{ label: 'Islam', items: ['Absolutely one', 'The Qur’an'] }}
  right={{ label: 'Christianity', items: ['One God in three persons', 'The Word made flesh'] }}
/>
```

A real table; rows align by position and stack into labelled blocks on phones.

### `<Sidenote>`

```mdx
The doctrine is first.<Sidenote>A short aside, shown in the margin.</Sidenote>
```

Lettered (a, b, c). In the right margin on wide screens; tap the letter to open it inline on phones. Works without JavaScript.

### Footnotes and citations

```mdx
A claim.[^1] A citation [@nasr2015study].

## Bibliography

[^1]: The footnote text.
```

Footnotes are numbered, listed under "Notes" with backlinks, and copied into the margin on wide screens. Citations need `bibliography:` in the frontmatter and a BibTeX file in `data/` (see `data/references.bib`); the bibliography is generated where the post ends.

### `<Term>`

```mdx
<Term translit="tawḥīd">the oneness of God</Term>
<Term translit="isnād" />
```

A dotted-underlined term that opens a popover with the Arabic, transliteration and definition, linking to `/glossary`. Entries live in `data/glossary.json`:

```json
{ "id": "tawhid", "translit": "tawḥīd", "ar": "توحيد", "definition": "…" }
```

The `id` is the transliteration without diacritics; pass `id="…"` when it differs. Every entry appears on `/glossary`, A–Z.

### `<Callout>`, `<PullQuote>`, `<Figure>`

```mdx
<Callout type="note">…</Callout> {/* note | important | clarification; optional title="…" */}
<PullQuote>A line from the essay, set large.</PullQuote>
<Figure
  src="/static/images/notes/chart.svg"
  alt="What the image shows"
  width={1200}
  height={680}
  caption="…"
  credit="…"
  wide
/>
```

Put images in `public/static/images/`. `wide` lets a figure extend into the right margin.

## What happens automatically

- **Arabic** typed directly in a post is wrapped in `lang="ar" dir="rtl"` and set in Amiri.
- **ﷺ** is set as an honorific; **ʿ ʾ** are tightened; straight quotes become curly (`Qur'an` → `Qur’an`).
- **Search** (⌘K, Ctrl+K or `/`) indexes post bodies with Pagefind, groups results by type, includes glossary terms, and finds vocalized Arabic from plain typing.
- **Feeds**: `/feed.xml`, `/category/<subject>/feed.xml`, `/tags/<tag>/feed.xml`.
- **Social images**: one card per post in `public/og/`, generated at build (Arabic shaped correctly). Run `yarn icons` to regenerate favicons.
- **Structured data**: `BlogPosting` (essays, notes), `QAPage` (questions), `BreadcrumbList`, and `WebSite`/`Person` on the home page.

## Configuration

- **`data/siteMetadata.js`**: title, description, author, social links (empty ones are hidden), analytics, comments, newsletter.
  - **Newsletter**: off. To turn it on for the static site, set `newsletter.formAction` to your provider's hosted form URL (and `fieldName`, e.g. `email_address` for Kit). The footer form then posts there directly.
  - **Comments**: Giscus, shown only once its `NEXT_PUBLIC_GISCUS_*` environment variables are set (see `.env.example`).
  - **Analytics**: rendered only once a provider id is set.
- **`security-headers.js`**: the Content Security Policy and caching rules, written to `out/_headers` for Cloudflare. **When you enable analytics or comments, add their hosts to `thirdParty`** or the browser will block them.
- **`data/glossary.json`**: glossary terms. **`data/authors/default.mdx`**: the About page.
- **Fonts** are self-hosted in `assets/fonts/web` and `public/fonts/v1` (SIL Open Font License), so builds need no network. If you change an Arabic font file, bump `v1` to `v2`; it is cached for a year.

## Deploying to Cloudflare

The site is fully static. Cloudflare serves `out/`, applies `out/_headers`, and uses `out/404.html` for unknown URLs. `wrangler.jsonc` tells Cloudflare exactly that.

### Workers (Cloudflare's default for new projects)

1. Push this repository to GitHub, including `wrangler.jsonc`.
2. In the Cloudflare dashboard: **Workers & Pages → Create → Import a repository**, and choose `Mr-MaNia7/abdulkarimg-blog`.
3. Settings:

   | Setting                            | Value                                                   |
   | ---------------------------------- | ------------------------------------------------------- |
   | Project name                       | `abdulkarimg-blog`                                      |
   | Build command                      | `EXPORT=1 UNOPTIMIZED=1 yarn build`                     |
   | Deploy command                     | `npx wrangler deploy`                                   |
   | Preview command                    | keep Cloudflare's default (e.g. `npx wrangler preview`) |
   | Build variable (Advanced settings) | `NODE_VERSION` = `22` (also read from `.nvmrc`)         |

   Leave "Protect with Cloudflare Access" off, or the public will be asked to log in.

4. Deploy, then check the site: search (⌘K), a post, `/questions`, `/glossary`, `/feed.xml`. `wrangler.jsonc` sets `workers_dev: false`, so once the custom domain below is attached the site is served only there; per-version preview URLs (`preview_urls: true`) stay available for branches.
5. **Custom domain**: in the Worker, **Settings → Domains & Routes → Add → Custom domain → `blog.abdulkarimg.com`**. Because `abdulkarimg.com` is already on Cloudflare, the DNS record and certificate are created for you.
6. Each push to `main` deploys; other branches get preview URLs.

### Pages (alternative)

Under **Workers & Pages → Create → Pages → Connect to Git**: build command `EXPORT=1 UNOPTIMIZED=1 yarn build`, output directory `out`, `NODE_VERSION=22`. Pages ignores `wrangler.jsonc` and reads `out/_headers` directly.

Yarn 3 comes from `.yarn/releases`, so the build image's own Yarn version does not matter. Add `NEXT_PUBLIC_GISCUS_*` or analytics variables to the build variables when you enable them.

After the first deploy, confirm the headers are live:

```bash
curl -sI https://blog.abdulkarimg.com/ | grep -i "content-security-policy\|x-frame-options"
```

## Project map

| Path                                                                    | What it is                                                                                                              |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `data/blog/`                                                            | Posts (MDX)                                                                                                             |
| `data/glossary.json`, `data/references.bib`, `data/authors/default.mdx` | Glossary, citations, About                                                                                              |
| `app/`                                                                  | Routes: home, `/blog`, `/essays`, `/questions`, `/notes`, `/glossary`, `/tags`, `/category`, `/series`, `/about`, posts |
| `layouts/`                                                              | `PostLayout`, `PostSimple`, `PostBanner`                                                                                |
| `components/mdx/`                                                       | The post components above                                                                                               |
| `components/post/`, `components/index/`, `components/masthead/`         | Post furniture, index lists, masthead                                                                                   |
| `lib/rehype-hashiya.ts`                                                 | Build-time typesetting: Arabic runs, honorifics, ʿ ʾ, margin footnotes, `ref` alias                                     |
| `css/`                                                                  | `tailwind.css` (tokens, prose), `reading.css`, `pages.css`, `chrome.css`, `motion.css`, `print.css`                     |
| `scripts/og.mjs`, `scripts/rss.mjs`, `scripts/postbuild.mjs`            | Social images and favicons, feeds, search index and `_headers`                                                          |
| `security-headers.js`                                                   | Security and cache headers (one source for Next and Cloudflare)                                                         |
| `DESIGN.md`, `PRODUCT.md`                                               | Design system and product brief                                                                                         |

## Licence

Code: MIT (see `LICENSE`, © Timothy Lin for the original starter). Fonts: SIL Open Font License (licences beside the font files). Post content © Abdulkarim G. Mohammed.
