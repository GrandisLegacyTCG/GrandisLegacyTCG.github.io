# Verification — Website v1.25

- Website `/pvp/` frontend manifest matches the canonical PvP v3.36 public manifest — PASS.
- `/pvp/` identifies as PvP v3.36 / `gl-pvp-3.36-2026-09-04` — PASS.
- Direct authoritative battle-feedback client path is present and obsolete canonical-ledger diff is absent — PASS.
- P.Atk / M.Atk / P.Def / M.Def assets are present — PASS.
- External local/opponent signal strip markup is present — PASS.
- Mobile Play it Online links remain canonical plain `/pvp/` anchors — PASS.
- Rulebook v2.1 and homepage contracts remain verified by the Website test suite.

Live Northflank room behavior is outside the static Website verification. Deploy both room services from PvP v3.36 before production acceptance.
