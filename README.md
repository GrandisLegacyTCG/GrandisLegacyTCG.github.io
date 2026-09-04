# Grandis Legacy Website v1.27

Deployable GitHub Pages package for the Grandis Legacy public website, Rulebook v2.1, and the production PvP frontend at `/pvp/`.

## Production PvP synchronization

Current production PvP is still owned by the Website repository at `/pvp/`. Therefore every canonical PvP frontend release must be mirrored into this Website package until the dedicated-frontend migration is performed.

Website v1.27 replaces `/pvp/` byte-for-byte from canonical PvP v3.38 `public/`. This carries the v3.38 frontend changes into the actual GitHub Pages production path: the generic Response commit/payment hierarchy used by Spectral Grappling Hook and Escape Arrow, structural Hero/Legacy card-stage parity, Game Over `BACK TO LOBBY`, and authoritative Heal VFX/audio presentation.

The homepage layout, mobile `Play it Online` touch fix from v1.26, Rulebook v2.1, and unrelated Website sections remain unchanged.

## Deployment boundary

- GitHub Pages Website repository owns the public `/pvp/` frontend.
- Northflank Room 1 and Room 2 own the authoritative PvP server runtime and must run the matching PvP v3.38 backend for full live parity.
- Source Stack v1.7.4 is consumed by the canonical PvP v3.38 runtime; Website-specific non-PvP card/rulebook assets remain unchanged in this release.
