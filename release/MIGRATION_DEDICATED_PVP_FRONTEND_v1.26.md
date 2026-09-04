# Dedicated PvP Frontend Migration — carried forward for Website v1.26

Current production still serves PvP from Website `/pvp/`, so PvP frontend changes must be mirrored into Website.

Long-term separation target:
1. Create a dedicated public PvP frontend repository/deployment.
2. Publish canonical PvP `public/` there.
3. Change Website PvP links once to the dedicated URL.
4. Thereafter, PvP frontend releases no longer require Website version bumps unless the Website link itself changes.
