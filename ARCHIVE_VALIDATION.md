# Grandis Legacy Season 1 Archive — Build Verification

Target: `GrandisLegacyTCG/GrandisLegacyTCG.github.io`

Source versions: Website v1.40; VS AI v6.48; Tutorial v0.71; Deck Builder v1.31; PvP v3.51 archive lobby.

- Repository consolidation: **three public ZIP snapshots merged into one Pages root**.
- PvP server code: **NOT INCLUDED**; PvP lobby rendered as static HTML/CSS/JS, with no WebSocket clients.
- PvP starter decks: **5**; 60-card Main Deck and 12-card Legacy Deck each, derived from the provided v1.6.1 presets.
- Season 0 link: **header desktop and mobile**, pointing to https://grandislegacytcg.web.id/.
- Static HTML/CSS references checked: **201, no missing local resources**.
- JavaScript syntax: **22/22 valid** (`node --check`).
- JSON syntax: **45/45 valid**.
- PvP static-JS behavior: **PASS** (Starter Deck selection, Rank progression, formation swapping, card modal).
- Browser runtime gameplay, GitHub Pages deployment, and mobile visual layout: **not live-tested** in this workspace; verify after upload.
- Package excludes historic release/test/tools folders and the old PvP match frontend.
- All bundled individual files are below GitHub's 100 MiB size limit.

**Important:** File snapshots are not Git commit history. Back up the original repositories before deleting them. Copy the **contents** of the ZIP into the repository root, not the ZIP file itself. Commit tracked deletions as well as additions.

## November 20, 2026 — Navigation update and Analytics extraction

- Season 0 header link now inherits the exact standard navigation style (no gold button CSS).
- Tutorial entry removed from homepage header, mobile menu, footer, and VS AI's own navigation. The original direct tutorial URL remains available for history.
- Homepage, Rulebook, VS AI, Deck Builder, and archived PvP **cross-app navigation links** point to current Season 0 pages. No automatic redirect for archived pages, so Season 1 can still be opened directly.
- Internal gameplay assets, artwork, local Rulebook chapters and PDFs, contact links, and engine rules remain unchanged.
- GA4 source IDs extracted to `GOOGLE_ANALYTICS_FOR_S0.md`; analytics tracking itself was not changed.
- Static link checks: 135/135 passed; JavaScript syntax: changed application bundle copies and homepage JS passed; 45/45 JSON files validated.
- Live deployment and full browser gameplay QA are still required after the owner's manual upload. Local Chromium navigation is blocked by workspace policy.
