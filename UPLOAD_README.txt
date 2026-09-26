Grandis Legacy Website v1.37

FULL REPLACEMENT package for the public GrandisLegacyTCG.github.io repository.

IMPORTANT: the contents of this package must be placed directly in the repository root.
`index.html` and `.nojekyll` must sit at the same root level as the repository's `.git` folder.
Do not upload an extra enclosing release folder, otherwise GitHub Pages will return 404 at the site root.

GitHub Desktop workflow:
1. Keep the repository's .git folder.
2. Delete the existing project files (do not delete .git).
3. Copy ALL CONTENTS of this package directly into the repository root.
4. Confirm repository-root/index.html exists before committing.
5. Commit and push to main.
6. GitHub Pages setting: Deploy from a branch -> main -> / (root).

Production locks:
- Website: v1.37
- Rulebook: latest bilingual EN/ID release included in this package
- Season 1 cards: 200
- Terminology: Shard Deck / Shard Pool / Mana Shard / Class Shard
- Embedded production PvP frontend: Grandis Legacy PvP v3.48 exact /public mirror

Because production PvP is served from Website /pvp/, deploy this Website package whenever the canonical PvP public frontend changes.

Deployment: extract/copy the CONTENTS of this package directly to the GitHub Pages repository root; index.html must be at repository root.
