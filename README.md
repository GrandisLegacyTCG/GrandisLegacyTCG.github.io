# Grandis Legacy Website v1.25

Deployable GitHub Pages package for the Grandis Legacy public website, Rulebook v2.1, and the **production PvP frontend at `/pvp/`**.

## v1.25 production PvP synchronization

The live `/pvp/` route is still served by this Website repository. v1.25 mirrors PvP v3.36 `public/` byte-for-byte into Website `/pvp/`.

PvP v3.36 changes visible through this mirror:

- P.Atk / M.Atk / P.Def / M.Def uses the direct server revision-scoped `battle_feedback` event path, played after authoritative board render with the shared VS AI renderer/assets.
- The old client canonical battle-feedback ledger diff path is removed.
- Each player's internet signal is outside the bordered name + deck box, directly to its right.
- Local and opponent signal values remain separately bound to their own player/seat.
- Lobby names and lobby-only mobile navigation remain preserved.

Current production requires Website v1.25 plus both Northflank PvP room services on PvP v3.36. Until a dedicated public PvP GitHub Pages repository is created, a PvP frontend change must continue to update this Website mirror. The separation plan is documented in `release/MIGRATION_DEDICATED_PVP_FRONTEND_v1.25.md`.

## Preserved Website authority

- Rulebook v2.1 EN/ID remains unchanged: Main Deck 60, normal max 3, Ultimate max 1.
- Approved homepage/card showcase and Source Stack v1.7.3 authority are preserved.
- No unrelated Website layout/gameplay changes are included.

## Verify

Requires Node.js 18 or newer.

```sh
npm run verify
```

## Deploy

Publish the repository root as the GitHub Pages site. Keep `.nojekyll` and the current directory structure intact. `/pvp/` must be deployed from this release together with both Northflank PvP room services from PvP v3.36.
