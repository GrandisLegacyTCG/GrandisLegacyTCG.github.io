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
