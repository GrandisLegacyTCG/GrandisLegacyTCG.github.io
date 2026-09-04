# Future migration — dedicated PvP frontend repository

Current production `/pvp/` is owned by the Website repository. This makes a Website deployment necessary whenever PvP frontend files change.

To fully separate future PvP releases:

1. Create a dedicated public GitHub repository, recommended name `Grandis-Legacy-PvP`.
2. Publish PvP `public/` from that repository with GitHub Pages.
3. Confirm its project Pages URL is live.
4. Change Website PvP links to the dedicated project Pages URL.
5. Replace Website `/pvp/` with a minimal redirect to that URL for old bookmarks.
6. Update Northflank `publicFrontendUrl`/room links to the dedicated Pages URL.

After this one-time migration, normal PvP frontend releases no longer need Website version bumps. Do not switch the current live links before the dedicated Pages URL exists.
