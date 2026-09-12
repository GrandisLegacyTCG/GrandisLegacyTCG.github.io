# Grandis Legacy Website v1.8

Date: 2026-08-24

## Scope

This patch adopts the corrected Source Authority Stack after the v1.6.1 hotfix. It updates only the canonical authority snapshot, generated General Arvon index, source lock, embedded current PvP public client, release markers, and verification required by that upstream change.

## Authority and Arvon

- 198 canonical Card IDs.
- Canonical registry SHA-256: `b185307752fd523d6c1e4a450f8bdd82b96b4d4cbfbb884fca8a619e8c5c8057`.
- Hero Component SHA-256 remains `487aa2620b5be99480a81d462082f1a35ee637ec2cc38ebf42b1bcf1103d06c9`.
- Back Slash and all 30 revised-card records remain current.
- Resurrection is consistently 3 Mana / 50 HP throughout the indexed record.
- Halfling Second Chance remains described as a defensive Dodge response.
- English, Indonesian, Japanese, Spanish, Simplified Chinese, and translation-fallback behavior remain intact.

## Preserved website contracts

- Exact Rulebook v2 EN/ID PDF binaries and links.
- v1.7 homepage layout and desktop Hero top-whitespace refinement.
- Mobile layout, analytics, navigation, Discord link, carousel, and swipe behavior.
- Embedded PvP v3.07 hidden-information, seat-authority, and spectator contracts.

No unrelated UI or content change was made.

Run `npm run verify` to rebuild Arvon and execute layout, source, multilingual, PDF, embedded-PvP, and manifest checks.
