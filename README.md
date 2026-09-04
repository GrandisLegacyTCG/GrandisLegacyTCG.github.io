# Grandis Legacy Website v1.26

Deployable GitHub Pages package for the Grandis Legacy public website, Rulebook v2.1, and the production PvP frontend at `/pvp/`.

## Root cause fixed — mobile `Play it Online` tap

The homepage Hero card showcase image is decorative but is rendered with `transform: scale(1.82)`. On mobile, the transformed image's hit-test area can extend upward into the Hero CTA region even where the PNG is visually transparent. The direct `Play it Online` anchor was correct, but a tap could land on this transformed image instead of the link.

v1.26 makes the decorative showcase non-interactive (`pointer-events:none`) and gives the Hero copy/CTA layer an explicit foreground stacking context. The CTA remains a plain canonical anchor to `https://grandislegacytcg.github.io/pvp/` with no JavaScript routing.

## PvP frontend synchronization

Website `/pvp/` mirrors canonical PvP v3.37 `public/` byte-for-byte. v3.37 fixes the mobile Racial Trait / Class Ability popup lifecycle at the authoritative PvP click boundary.

This batch is frontend-only. Existing v3.36 Northflank services remain protocol-compatible; backend redeployment is not required for these fixes.

Rulebook v2.1, card showcase content, and unrelated Website sections are unchanged.
