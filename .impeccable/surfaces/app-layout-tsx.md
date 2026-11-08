---
version: 1
slug: "app-layout-tsx"
primary_target: "app/layout.tsx"
related_targets: ["app/page.tsx","layouts/PostLayout.tsx"]
---

# Surface brief: whole site (Sīmā)

Scope: every route (home cover, post pages, indexes, glossary, about, 404). Visitor mode: **Read**.
Audience: Muslims seeking depth and curious non-Muslims, equally. Job: understand a question about God, scripture or Islam, with sources in hand.
Constraints: the pasted build spec wins over skill house rules (hairlines, index numbers on true sequences, mono metadata are allowed). rem/em/ch units; px only for hairlines, focus rings, shadows. Static export, minimal JS.

## Direction contract

THESIS: Sīmā is a clothbound scholarly edition: the cloth owns the frame, the paper owns the reading, and the gloss lives in the margin. It refuses the dev-blog card grid and the warm-cream-serif-terracotta default.

OWN-WORLD: Lapis cloth (#1C2F5E / night #1A2848) as full fields on the home cover and the colophon only; gilt (#D9BC74) for the stamped wordmark. White paper (#F9F8F5) column with iron ink (#1A1D26). Lapis (#1F4AA8) marks links, focus and ornaments; old gold (#7A5712 / #D8B76A) appears only on scripture. Literata for prose and headings, Commissioner for UI, Source Code Pro for references; Amiri Quran and Amiri for Arabic. Hairlines, ⁂ breaks, square corners.

STORY: The reader lands on a cover, sees what this journal is and how much is in it, opens an essay or a question, reads in a calm column where scripture is gold and commentary is ink, and leaves with sources.

FIRST VIEWPORT: Home: thin paper nav bar; below it a full-width cloth cover block ~70svh holding the gilt wordmark SĪMĀ at cover scale, a one-line mission, and a mono count line; the featured essay begins on paper directly beneath. Post: title, mono metadata, then the column at 68ch with TOC in the left margin and sidenotes in the right.

FORM: Library Edition (clothbound series), candidate 4 of 7. seed:8c940214feaf3b55. Raises: sidenotes anchored to exact marks (tensegrity); TOC shows all sections, active struck forward (cathode gauze); cloth floods its field fully (yé-yé sleeve); colour marks, never body text (seedbed).

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
