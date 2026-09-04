# Grandis Legacy Website v1.24 — Production PvP Frontend Sync

## Root cause

Production `https://grandislegacytcg.github.io/pvp/` is served from the Website repository `/pvp/` directory. The public GrandisLegacyTCG account currently has the Website, VS AI, and Deck Builder repositories; there is no separate public PvP Pages repository owning that production route.

Previous PvP packages changed their canonical `public/` frontend source but the Website's embedded `/pvp/` copy remained on the older v3.22-era client. That masked newer PvP frontend work in production.

## v1.24 fix

- Website `/pvp/` is replaced byte-for-byte from PvP v3.35 `public/`.
- Production now contains the v3.35 player-name binding, internet signal UI, mobile match hamburger lifecycle, shared mobile Hero/Racial action UI, Card Played parity, and authoritative P.Atk/M.Atk/P.Def/M.Def sound/VFX frontend.
- All Website PvP links are canonical plain anchors to `https://grandislegacytcg.github.io/pvp/`, including mobile `Play it Online`.
- Rulebook v2.1 and other Website content remain unchanged.

## Server requirement

Website v1.24 fixes the frontend deployment boundary only. Northflank Room 1 and Room 2 must both be redeployed from PvP v3.35 so the production frontend is not talking to a stale room server.
