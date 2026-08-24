# Grandis Legacy Website v1.10

Deployable GitHub Pages package for the Grandis Legacy public website, Rulebook/General Arvon experience, and embedded PvP v3.09 client.

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
- Includes the exact Player Rulebook v2 EN/ID PDFs supplied for this release.
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
