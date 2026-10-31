---
name: Ḥāshiya
description: A clothbound scholarly journal on the web. Lapis cloth frames white paper; gold is reserved for scripture.
colors:
  paper: '#f9f8f5'
  surface: '#f1efea'
  surface-raised: '#ffffff'
  ink: '#1a1d26'
  ink-muted: '#484d5a'
  ink-faint: '#636875'
  rule-subtle: '#e2dfd8'
  rule-strong: '#8e8a80'
  lapis: '#1f4aa8'
  on-lapis: '#ffffff'
  scripture-gold: '#7a5712'
  scripture-wash: '#f4eedf'
  selection: '#d6def2'
  cloth: '#1c2f5e'
  cloth-ink: '#f9f8f5'
  cloth-muted: '#c3cbe0'
  gilt: '#d9bc74'
typography:
  cover:
    fontFamily: 'Literata, Amiri, Georgia, serif'
    fontSize: 'clamp(2.8rem, 1.8rem + 4.5vw, 5.2rem)'
    fontWeight: 500
    lineHeight: 1
    letterSpacing: '-0.02em'
  title:
    fontFamily: 'Literata, Amiri, Georgia, serif'
    fontSize: 'clamp(2.1rem, 1.6rem + 2vw, 3.05rem)'
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: '-0.025em'
  headline:
    fontFamily: 'Literata, Amiri, Georgia, serif'
    fontSize: 'clamp(1.6rem, 1.4rem + 0.9vw, 1.95rem)'
    fontWeight: 600
    lineHeight: 1.2
  subhead:
    fontFamily: 'Literata, Amiri, Georgia, serif'
    fontSize: 'clamp(1.3rem, 1.2rem + 0.45vw, 1.56rem)'
    fontWeight: 600
    lineHeight: 1.3
  body:
    fontFamily: 'Literata, Amiri, Georgia, serif'
    fontSize: 'clamp(1.0625rem, 1rem + 0.3vw, 1.25rem)'
    fontWeight: 400
    lineHeight: 1.7
  ui:
    fontFamily: 'Commissioner, Amiri, system-ui, sans-serif'
    fontSize: 'clamp(0.875rem, 0.85rem + 0.12vw, 0.97rem)'
    fontWeight: 400
    lineHeight: 1.5
  meta:
    fontFamily: 'Source Code Pro, ui-monospace, monospace'
    fontSize: 'clamp(0.78rem, 0.76rem + 0.1vw, 0.84rem)'
    fontWeight: 400
    lineHeight: 1.5
  quran:
    fontFamily: 'Hashiya Amiri Quran, Hashiya Amiri, serif'
    fontSize: '1.5em'
    fontWeight: 400
    lineHeight: 2.3
  arabic:
    fontFamily: 'Hashiya Amiri, Noto Naskh Arabic, serif'
    fontSize: '1.35em'
    fontWeight: 400
    lineHeight: 2.1
rounded:
  hairline: '2px'
  card: '3px'
  pill: '999px'
spacing:
  measure: '68ch'
  page: '84rem'
  gutter-sm: '1.25rem'
  gutter-md: '2rem'
  gutter-lg: '2.5rem'
  note-width: '15rem'
  note-gap: '3rem'
  toc-width: '13rem'
  section: 'clamp(4rem, 2.5rem + 5vw, 8rem)'
components:
  link:
    textColor: '{colors.lapis}'
  button-quiet:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink-muted}'
    rounded: '{rounded.hairline}'
    padding: '0.3rem 0.6rem'
  button-gilt:
    backgroundColor: '{colors.gilt}'
    textColor: '{colors.cloth}'
    rounded: '{rounded.hairline}'
    padding: '0.6rem 1rem'
  chip-topic:
    backgroundColor: '{colors.paper}'
    textColor: '{colors.ink-muted}'
    rounded: '{rounded.pill}'
    padding: '0.35rem 0.85rem'
  chip-topic-active:
    backgroundColor: '{colors.ink}'
    textColor: '{colors.paper}'
    rounded: '{rounded.pill}'
  scripture-quran:
    backgroundColor: '{colors.scripture-wash}'
    textColor: '{colors.ink}'
    padding: '1.5em 1.6em 1.1em'
  popover:
    backgroundColor: '{colors.surface-raised}'
    textColor: '{colors.ink}'
    rounded: '{rounded.card}'
    padding: '0.95rem 1.05rem'
---

# Design System: Ḥāshiya

## Overview

**Creative north star: the Library Edition.** Ḥāshiya is a clothbound scholarly series on a reading desk. Lapis book cloth with gilt stamping owns the frame (the home cover and the colophon footer); plain paper and iron ink own the reading. The gloss lives in the margin: side notes and footnote copies sit beside the text, the way a _ḥāshiya_ sits beside a classical text.

The system is calm, reverent and precise. The text comes first. Source and commentary are always visually distinct: scripture is gold, commentary is ink. It refuses the dev-blog card grid, SaaS shadows and gradients, and the warm-cream-serif-terracotta look.

Light and dark are designed together. Dark is "night cloth", not an inversion.

## Colors

Restrained: tinted neutrals, one accent (lapis), one reserved colour (scripture gold), and the cloth field.

| Token                     | Light                 | Dark                  | Role                                            |
| ------------------------- | --------------------- | --------------------- | ----------------------------------------------- |
| paper (`--bg`)            | `#f9f8f5`             | `#11161f`             | Page ground                                     |
| surface                   | `#f1efea`             | `#171d28`             | Code, callouts, the questions band              |
| surface-raised            | `#ffffff`             | `#1e2532`             | Popovers, palette, ḥadīth frame                 |
| ink                       | `#1a1d26`             | `#e4e1d9`             | All running text (dark is softer on purpose)    |
| ink-muted                 | `#484d5a`             | `#abafb8`             | Standfirsts, secondary text                     |
| ink-faint                 | `#636875`             | `#8c919c`             | Metadata, counters (still ≥ 4.5:1)              |
| rule-subtle / rule-strong | `#e2dfd8` / `#8e8a80` | `#262d3a` / `#646c7e` | Hairlines; strong meets 3:1                     |
| lapis (`--accent`)        | `#1f4aa8`             | `#93abeb`             | Links, focus, active marks, ⁂                   |
| scripture-gold            | `#7a5712`             | `#d8b76a`             | Only inside Qur'an, ḥadīth and scripture blocks |
| scripture-wash            | `#f4eedf`             | `#1f1d19`             | Qur'an block ground                             |
| cloth / gilt              | `#1c2f5e` / `#d9bc74` | `#1a2848` / `#d8b76a` | Cover and colophon only                         |

Every text pair passes WCAG 2.2 AA in both themes (ink 15.9 / 13.9, faint ≥ 4.85 on every surface, gold 5.7–9.4). `prefers-contrast: more` darkens muted text and rules. Focus rings on cloth switch to gilt.

## Typography

- **Literata** (variable weight, pinned at text optical size) for prose and every heading. One face carries the voice.
- **Commissioner** for interface text only: navigation, labels, buttons, captions.
- **Source Code Pro** for metadata (dates, reading time, references) and code. Never for headings or running text.
- **Amiri Quran** (`Hashiya Amiri Quran`) for Qur'anic Arabic only; **Amiri** (`Hashiya Amiri`) for all other Arabic and for ﷺ. Arabic is set 1.35–1.5× the surrounding Latin with line-height 2.1–2.3 so vowel marks never clip.
- Fluid scale (`clamp(rem + vw)`, never `vw` alone). Measure 68ch, body line-height 1.7. Headings balance; paragraphs `text-wrap: pretty`.
- Transliteration uses full diacritics. ʿ and ʾ are tightened by −0.12em (Literata draws them with wide side bearings). Straight quotes become typographic quotes at build time.
- Sentence case everywhere. No eyebrow labels above headings.

## Layout

- One page frame: max 84rem, equal gutters 1.25 / 2 / 2.5rem.
- Reading pages: a 68ch column; from 64rem a right margin (15rem notes + 3rem gap) for side notes and footnote copies; from 80rem a left margin (13rem) for the sticky contents.
- Index pages: a centred 56rem column, an intro block closed by a strong rule, then hairline-separated lists.
- The home page opens on the full-width cloth cover, then alternates paper and one surface band. Section spacing `clamp(4rem, 2.5rem + 5vw, 8rem)`.
- All sizes in rem/em/ch; px only for hairlines, focus rings and shadows.

## Elevation & Depth

Flat. Surfaces separate by a step in tone or a 1px hairline, never a shadow. Only things that truly float (the glossary popover, the Aa panel, the search palette, toasts) carry one soft shadow (`0 0.6rem 1.6rem -0.6rem rgb(0 0 0 / .3)`).

## Shapes

Square-cornered by default: 2px on controls and code, 3px on floating cards. Pills only for small chips (topic filters, ḥadīth grades). The cover and colophon carry a double stamped frame: a 1px gilt border at 50% and an inner outline at 22%, inset 0.55rem.

## Components

- **Qur'an block:** scripture-wash ground between gold hairlines; Arabic right-aligned in Amiri Quran with the end-of-verse marker for single verses; translation below; mono gold reference `QUR’AN 2:255`; Copy button.
- **Ḥadīth block:** framed on surface-raised (not washed); narrator in small caps; grade pill (Ṣaḥīḥ in gold, Ḥasan outlined, Ḍaʿīf dashed).
- **Scripture block:** between strong rules; optional original-language line; mono gold reference.
- **Side note:** lettered (a, b, c) so it never collides with numbered footnotes; floats into the right margin, toggles inline on narrow screens with no JavaScript.
- **Glossary term:** dotted lapis underline; a link to /glossary that opens a popover with Arabic, transliteration and definition.
- **Callout:** quiet 1px frame; note on surface, important on raised with a strong rule, clarification transparent with an italic title. Never coloured.
- **Pull quote:** display Literata after a 2.5rem × 2px lapis rule.
- **Ornamental break:** `⁂` in lapis replaces every `<hr>`.
- **Masthead:** constant 4rem; gains a hairline on scroll; current section underlined in lapis.
- **Motion:** one authored moment (index lists rise 6px and fade in on first view, 420ms, capped stagger); everything else is 150–240ms feedback on `cubic-bezier(0.22, 1, 0.36, 1)`. Reduced motion removes all of it.

## Do's and Don'ts

**Do**

- Keep gold for scripture only, and lapis for links, focus and small marks.
- Quote primary texts in full with reference and translator, set apart from commentary.
- Put Arabic in `lang="ar" dir="rtl"` (the build does this automatically) and protect scripture from machine translation (`translate="no"`).
- Let the cloth fill its field completely on the cover and colophon.

**Don't**

- Don't use shadows on things at rest, gradients, glass, or coloured side borders thicker than 1px.
- Don't put the cloth colour, gold or any wash inside the reading column except in scripture blocks.
- Don't add eyebrows, emoji, icon cards or monospace headings.
- Don't style a word in a headline differently from the rest.
