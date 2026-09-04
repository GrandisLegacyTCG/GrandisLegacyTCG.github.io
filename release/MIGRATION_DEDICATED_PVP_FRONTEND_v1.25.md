# Dedicated PvP Frontend Migration Plan — Website v1.25

## Current state

`https://grandislegacytcg.github.io/pvp/` is physically served from the Website repository `/pvp/` directory. Therefore a production PvP frontend update must currently be mirrored into Website.

## Target state

Create a dedicated public PvP GitHub Pages repository/project that owns the canonical PvP `public/` output. Then:

1. Publish PvP frontend directly from the dedicated repository.
2. Point Website **Play it Online** links to the dedicated PvP Pages URL.
3. Keep Website independent from PvP source releases thereafter.
4. Leave Northflank Room 1 / Room 2 as the authoritative WebSocket backends.
5. Add a migration compatibility redirect at the old Website `/pvp/` route for saved links/bookmarks.

Do not remove the Website `/pvp/` mirror until the new public URL has been verified on desktop/mobile and both Northflank rooms work through it.
