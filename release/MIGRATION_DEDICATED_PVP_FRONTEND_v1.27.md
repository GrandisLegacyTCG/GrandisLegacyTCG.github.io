# Dedicated PvP Frontend Migration — carried forward for Website v1.27

Current production still serves PvP from Website `/pvp/`, so canonical PvP frontend changes must be mirrored into Website and require a Website deployment.

Future separation path:
1. Create a dedicated public PvP frontend repository/deployment.
2. Publish canonical PvP `public/` there.
3. Change Website PvP links once to the dedicated URL.
4. Thereafter, PvP frontend releases no longer require Website version bumps unless the Website link itself changes.
