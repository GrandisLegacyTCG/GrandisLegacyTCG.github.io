# Verification — Website v1.24

Verified locally:
- `npm run verify` PASS.
- Homepage deterministic layout QA PASS.
- Website source/Arvon authority lock PASS.
- Production `/pvp/` payload manifest verifies every mirrored PvP frontend file.
- `/pvp/` identifies as PvP v3.35 / `gl-pvp-3.35-2026-09-04`.
- Production `/pvp/` contains live player-name binding, signal indicator UI, lobby-only mobile hamburger lifecycle, shared Hero/Racial interaction path, and P.Atk/M.Atk/P.Def/M.Def frontend assets/ledger path.
- Mobile `Play it Online` and all Website PvP links are plain canonical anchors to `https://grandislegacytcg.github.io/pvp/`.
- Rulebook v2.1 and approved Website showcase/layout remain preserved.

Live Northflank room connectivity is outside the static Website verification and must be checked after both room services are redeployed from PvP v3.35.
