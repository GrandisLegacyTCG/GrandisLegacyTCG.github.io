# Grandis Legacy Website v1.23

Deployable GitHub Pages package for the Grandis Legacy public website, Rulebook/General Arvon experience, and the preserved embedded PvP client.


## v1.23 Rulebook v2.1 synchronization

- Replaces the public English and Indonesian Rulebook PDFs with the supplied v2.1 files dated 2026-09-04.
- Updates the HTML Rulebook setup table to **60 Main Deck cards**, **maximum 3 copies per normal card**, and **maximum 1 copy per Ultimate**.
- Updates Rulebook/Arvon UI source labels and PDF links from v2 to v2.1.
- Preserves the approved homepage, card showcase, Source Stack authority, and embedded PvP package; no unrelated gameplay/runtime synchronization is included.

## v1.21 Homepage showcase scale hotfix

- Synchronizes Hero HP and Season 1 physical artwork to the v1.2.1 revised card source.
- Embeds PvP v3.19 with the permanent `#app` mobile scroll contract.
- Preserves Cover Up/Redirect and the pending Attack Direction Indicator.
- Updates homepage card-showcase and stylesheet cache revision to v1.21.0.


## v1.12 Embedded PvP v3.12 synchronization

- Public `/pvp/` frontend synchronized to standalone PvP v3.12 while preserving Website production WebSocket config and mobile Deck Builder Style 2 routing.
- Embedded PvP now uses canonical revised-card Defense values (including Mana Shield Block 60).
- Embedded PvP Game Result Back to Lobby uses authoritative reset then same-page reload.
- Embedded PvP mobile cross-app hamburger is fixed on the right and opens above lobby/battle overlays.

## v1.11 embedded PvP mobile hamburger alignment

- Moves the embedded `/pvp/` mobile cross-app hamburger from the left side of the PvP lobby header to the right side.
- Moves the opened mobile application menu to the same right edge.
- Preserves VS AI / PVP / DECK BUILDER choices and the Style 2 mobile Deck Builder destination.
- No gameplay, card authority, Rulebook, Arvon, homepage layout, or desktop PvP navigation changes.

## v1.10 mobile navigation patch

- Routes every Homepage Deck Builder action to Style 2 on mobile while preserving the existing desktop destinations.
- Embeds the PvP v3.09 mobile cross-app hamburger navigation.
- No gameplay, card data, Rulebook, Arvon, or desktop layout changes are included.

## v1.9 card-art and audio asset sync

- Replaces all 198 Website card images with the exact physical Season 1 v1.2 revised artwork, mapped by canonical Card ID.
- Verifies `S1-THF-010` as **Back Slash**, all 30 revised card artworks, unique image mappings, and resolvable local paths.
- Renames the embedded PvP audio files to `Coin Flip.mp3` and `Card Sound.mp3`, preserving their exact bytes and behavior.
- Updates General Arvon/source-lock asset hashes and embeds the PvP v3.08 public client.

## Preserved Source Stack authority

- Adopts One Source Authority v1.6.1, Season 1 Runtime Data v0.13.1, and Hero Component Authority v1.0.0.
- Builds General Arvon's 198-card rule index from the canonical registry, including all 30 revised IDs and `S1-THF-010` **Back Slash**.
- Represents Resurrection consistently as **3 Mana / 50 HP** and keeps Halfling Second Chance as a defensive Dodge description.
- Resolves 6 shared Racial Traits, 16 shared Class Abilities, 10 Hero profiles, and 30 Hero compositions.
- Supports deterministic same-language answers in English, Indonesian, Japanese, Spanish, and Simplified Chinese, with presentation-only translation fallback for other reliably detected languages.
- Includes the exact Player Rulebook v2.1 EN/ID PDFs supplied for this release.
- Embeds the PvP v3.09 public client while preserving hidden-information, seat authority, and read-only spectator behavior.
- Preserves existing navigation, analytics, Discord link, carousel/swipe behavior, mobile Hero layout, and unrelated homepage sections.

The approved v1.7 desktop Hero top-whitespace refinement is preserved byte-for-byte in the stylesheet. Deterministic layout QA covers 1600×900, 1440×900, 1366×768, and 1280×720. No unrelated UI change is included.

## Verify

Requires Node.js 18 or newer.

```sh
npm run verify
```

This rebuilds the Arvon index/source lock, runs desktop layout QA, verifies source/card/Hero/PDF/PvP preservation contracts, regenerates `FILE_MANIFEST_SHA256.csv`, and verifies the result again.

## Deploy

Publish the repository root as a static GitHub Pages site. Keep `.nojekyll` and the existing relative directory structure intact.
