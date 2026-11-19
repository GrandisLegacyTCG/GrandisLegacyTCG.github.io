# Grandis Legacy — Season 1 Playable Archive

**Status:** Season 1 historical archive, frozen at the September 28, 2026 release versions. The current game is **Season 0**: https://grandislegacytcg.web.id/.

This is a single GitHub Pages repository: `GrandisLegacyTCG/GrandisLegacyTCG.github.io`.

## Website routes

| URL path | Archive content | Status |
| --- | --- | --- |
| `/` | Season 1 website v1.40 | Historical homepage, preserved and linked to Season 0 |
| `/rulebook/` | Season 1 Player Rulebook v2.6 (English / Indonesian) | Viewable |
| `/Grandis-Legacy-VS-AI/` | Season 1 VS AI v6.48 | Playable offline in-browser |
| `/Grandis-Legacy-VS-AI/tutorial/` | Season 1 Tutorial v0.71 | Playable offline in-browser |
| `/Grandis-Legacy-Deck-Builder/` | Season 1 Deck Builder v1.31, Style 1 | Usable |
| `/Grandis-Legacy-Deck-Builder/style-1/` | Style 1 alias | Usable |
| `/Grandis-Legacy-Deck-Builder/style-2/` | Style 2 | Usable |
| `/pvp/` | PvP v3.51 **lobby preview only** | No server, no rooms, no multiplayer |
| `/pvp/battle/` | Archived-match notice | No gameplay |

## Origin files (last Season 1 release; not Season 0)

- `Grandis_Legacy_Website_v1.40_GitHub_Pages_2026-09-28.zip`
- `Grandis_Legacy_VS_AI_Tutorial_v6.48_v0.71_GitHub_Repository_2026-09-28.zip`
- `Grandis_Legacy_Deck_Builder_v1.31_GitHub_Repository_2026-09-28.zip`

No PvP backend, Northflank credentials, GitHub repository history or Season 0 code is included. Archived PvP lobby preserves the original v3.51 styling, deck selection, hero formation swap and Rank I–III previews, but it **never creates a WebSocket**.

Only built website/runtime assets are included. Development tests, old history packages, tools, unrelated source authority versions, duplicate PvP battle runtime and obsolete historical style sheets are omitted to reduce deployed storage. The live VS AI and tutorial bundles (including their data and assets) were kept to avoid changing the old game rules.

## Manual upload to GitHub

1. Keep a local backup of the existing `GrandisLegacyTCG.github.io` repository, including Git history if desired.
2. Unzip the deliverable. The `index.html` file and `.nojekyll` must be at the root of the **repository**, not inside an extra version-named folder.
3. On branch `main`, replace the old root files with the unpacked repository content. Commit **deletions** as well as additions, otherwise old development files remain tracked on GitHub.
4. Verify the deployed pages listed above, including desktop and mobile. Then consider removing the separately hosted VS AI and Deck Builder repositories **after backup**.
5. PvP repository contains its own old backend and development history; copy a backup before deletion. This ZIP intentionally does not preserve that server source.

**Note:** GitHub does not extract a ZIP uploaded as one file. Extract it first and copy the contents with GitHub Desktop / local Git. Bulk web UI uploads can be limited.

**GitHub Pages:** Continue serving from `main` repository root, with `.nojekyll`. This package does not modify the active Season 0 repository or its custom domain. Keep this repo non-archived as needed for Pages maintenance; GitHub's repository Archive flag makes the code read-only.

## Verification boundary

We verified file presence, source versions, JavaScript syntax and static asset references in the generated archive. **Live GitHub Pages deployment and real browser gameplay testing require manual confirmation after upload.**
