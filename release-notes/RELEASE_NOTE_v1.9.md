# Grandis Legacy Website v1.9

Date: 2026-08-24

## Scope

This release synchronizes Website card artwork with the physical Season 1 v1.2 revised archive and adopts the safe audio filenames from the embedded PvP v3.08 client. Canonical card data, Hero Component authority, gameplay authority, and the approved v1.7 homepage layout are unchanged.

## Card artwork parity

- All 198 canonical Card IDs resolve to exactly one local WebP image.
- Every Website card image is byte-identical to its physical archive counterpart.
- `S1-THF-010` resolves to the canonical **Back Slash** artwork; no active Back Stab artwork or mapping remains.
- All 30 revised card artworks match the physical archive.
- General Arvon continues to index the current canonical registry and local artwork paths.

## Embedded PvP audio rename

- `freesound_community-coin-flip-37787.mp3` becomes `Coin Flip.mp3`.
- `freesound_community-flipcard-91468.mp3` becomes `Card Sound.mp3`.
- Original audio bytes, triggers, timing, and volume are preserved.
- Executable references and source-lock hashes now use the new filenames.

## Preserved contracts

- Multilingual Arvon behavior and translation fallback.
- Exact Rulebook v2 EN/ID PDFs and links.
- Homepage v1.7 layout refinements, analytics, navigation, Discord link, carousel, swipe, and mobile behavior.
- Embedded PvP hidden information, seat authority, stale-resync, and spectator behavior.

Run `npm run verify` to rebuild General Arvon and execute layout, source, artwork, multilingual, PDF, embedded-PvP, audio, and manifest checks.
