# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two reader groups, served equally:

- **Muslims seeking depth**: readers who know the basics and want serious theology, sources, and careful argument.
- **Curious non-Muslims**: people asking questions about Islam, often arriving from a Christian, Jewish, or secular background, frequently via a search for one specific question.

Both read long-form on phones and desktops, often in the evening. Nothing may assume prior knowledge: every Arabic term is glossed, every source is named.

## Product Purpose

**Ḥāshiya** (blog.abdulkarimg.com) is the personal journal of Abdulkarim G. Mohammed: long-form essays on theology and comparative religion, answers to questions about Islam, and occasional hobby notes. Success means a reader leaves understanding the question better than when they arrived, with the sources in hand to check it themselves.

The name means the marginal gloss written beside a classical text, the commentary tradition of Islamic scholarship.

## Positioning

Written openly as a believing Muslim, yet careful, sourced, and fair to other traditions. Primary texts (Qur'an, Hadith, Bible, Torah) are quoted in full with their references and translators, set apart from the author's commentary, so the reader can always tell the source from the gloss.

## Operating Context

- Content is MDX in the repo; no CMS, no database.
- Post types: essay, Q&A (question + short answer first), note, multi-part series.
- Arabic appears inline and in block scripture; transliteration uses full diacritics (ā ī ū ḥ ṣ ḍ ṭ ẓ ʿ ʾ); honorifics such as ﷺ appear in running text.
- Static export to Cloudflare Pages.

## Capabilities and Constraints

- Stack: Next.js App Router + Tailwind 4 + Contentlayer2 + Pliny (timlrx starter), yarn.
- Reading pages must work without JavaScript, except search and theme toggle.
- Light and dark themes are equal first-class citizens.
- Lighthouse 100 on mobile post pages; CLS 0.

## Brand Commitments

- Name: **Ḥāshiya**. Author: Abdulkarim G. Mohammed.
- Voice: a believing scholar. Uses honorifics. Calm, reverent, precise; never polemical or trendy.
- Standalone project: shares nothing with any other site.

## Evidence on Hand

- No real posts yet. Sample posts must be clearly labeled placeholders.
- Never invent religious text: Quran, Hadith, and Scripture components show only what the author writes in MDX.
- No photographs or brand assets exist; no stock hero imagery.

## Product Principles

1. The text comes first; design serves reading.
2. Source and commentary are always visually distinct.
3. Nothing assumed: every term explained, every claim sourced.
4. Fair to other traditions while speaking from conviction.
5. Timeless over fashionable.

## Accessibility & Inclusion

WCAG 2.2 AA in both themes, including accent and scripture colors. Correct `lang`/`dir` on every Arabic run; logical CSS properties throughout. Full keyboard navigation; prefers-reduced-motion respected everywhere; clean print stylesheet.
