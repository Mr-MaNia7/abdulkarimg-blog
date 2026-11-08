# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two reader groups, served equally:

- **Muslims who want to know why they believe**: readers who know the basics, have met doubts (from university, social media or their own reading) and want the case for their faith set out properly, with sources.
- **Sceptics and seekers**: atheists, agnostics and people of other faiths, often from a Christian or secular background, frequently arriving via a search for one specific argument or objection.

Both read long-form on phones and desktops, often in the evening. Nothing may assume prior knowledge: every Arabic term is glossed, every source is named, every technical term in philosophy is explained.

## Product Purpose

**Sīmā** (سيماء, blog.abdulkarimg.com) is a systematic case for Islam by Abdulkarim G. Mohammed, arranged as a course in four parts, read in order:

1. **Foundations**: how we know (senses, reason, true report, fiṭra) and the kinds of argument (deduction, induction, inference to the best explanation).
2. **Existence of God**: the classical proofs, premise by premise: Ibn Sīnā (contingency, burhān al-ṣiddīqīn), al-Ghazālī (origination, kalām), Ibn Taymiyya (fiṭra and signs), and design.
3. **Truth of Islam**: proofs of prophethood, the Qur'an's challenge and preservation, and why Islam alone holds revelation whole while other religions mix truth with error.
4. **Answering Doubts**: shubuhāt from atheism, liberalism, feminism and other worldviews, and particular arguments such as the problem of evil.

`/start` lays out the whole course from `data/course.ts`; planned pieces show as forthcoming until written. Success means a reader leaves able to state the argument, its strongest objection, and the answer, with the sources in hand to check it themselves.

The name means the mark by which something is known (Qur'an 2:273, 48:29): the site sets out the marks of the truth.

## Positioning

Written openly by a believing Muslim and student of knowledge, from conviction: Islam is true, and where other religions and worldviews contradict it, they are mistaken. That conviction makes fairness more important: every opposing view is stated at its strongest, in its own words where possible, before it is answered. Arguments are laid out as numbered premises so the reader can see exactly which step they reject. Primary texts (Qur'an, Hadith, Bible, Torah, classical works) are quoted in full with their references and translators, set apart from the author's argument.

## Operating Context

- Content is MDX in the repo; no CMS, no database.
- Post types: essay, Q&A (question + short answer first), note, multi-part series. Every post belongs to one pillar (`category`); Notes stand outside the course.
- Arabic appears inline and in block scripture; transliteration uses full diacritics (ā ī ū ḥ ṣ ḍ ṭ ẓ ʿ ʾ); honorifics such as ﷺ appear in running text.
- Static export to Cloudflare Pages.

## Capabilities and Constraints

- Stack: Next.js App Router + Tailwind 4 + Contentlayer2 + Pliny (timlrx starter), yarn.
- Reading pages must work without JavaScript, except search and theme toggle.
- Light and dark themes are equal first-class citizens.
- Lighthouse 100 on mobile post pages; CLS 0.

## Brand Commitments

- Name: **Sīmā** (سيماء). Author: Abdulkarim G. Mohammed.
- Voice: a believing student of knowledge, not a scholar. Writes down what he is learning, with sources, and issues no rulings. Uses honorifics. Calm, reverent, precise; argues firmly but never mocks, and never trendy.
- Standalone project: shares nothing with any other site.

## Evidence on Hand

- No real posts yet. Sample posts must be clearly labeled placeholders.
- Never invent religious text: Quran, Hadith, and Scripture components show only what the author writes in MDX.
- No photographs or brand assets exist; no stock hero imagery.

## Product Principles

1. The text comes first; design serves reading.
2. Source and commentary are always visually distinct.
3. Nothing assumed: every term explained, every claim sourced.
4. Firm in conclusion, fair in representation: state the other side at its strongest before answering it.
5. Timeless over fashionable.

## Accessibility & Inclusion

WCAG 2.2 AA in both themes, including accent and scripture colors. Correct `lang`/`dir` on every Arabic run; logical CSS properties throughout. Full keyboard navigation; prefers-reduced-motion respected everywhere; clean print stylesheet.
