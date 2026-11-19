# Grandis Legacy Google Analytics 4 — tag reference

Extracted from the archived Season 1 sources (September 28, 2026).
Measurement IDs are PUBLIC tracking IDs, not login credentials and not dashboard URLs.

| Site / app | GA4 Measurement ID | S0 status checked in live GitHub code |
| --- | --- | --- |
| Homepage (S1 and S0) | `G-FVQCYF8PKQ` | **Already installed on S0 homepage** (`index.html`) |
| S1 VS AI and S1 Tutorial | `G-4C2Z5T0EWR` | No tag in S0 `vs-ai/index.html` when checked |
| Deck Builder (S1 and S0) | `G-TG5921Z2EL` | **Already installed on S0 Deck Builder** (`deck-builder/index.html`) |
| Original S1 PvP (pre-archive) | `G-6JD5Q48SXN` | S1 offline PvP archive omits this tag; S0 PvP frontend has no tag in the entry HTML checked |

Analytics dashboard: https://analytics.google.com/analytics/web/ (sign in with account owning GA4 property). A Measurement ID alone cannot give the property admin URL.

### Recommended approach for S0
If the goal is to see all S0 traffic in ONE GA4 web stream, consider using the S0 homepage Measurement ID `G-FVQCYF8PKQ` across S0 app pages *after checking the GA4 property / data stream settings*. Keep or replace the current Deck Builder ID deliberately; installing both across the same page can double-count events. The current S1 and S0 homepages use the same measurement ID, so those visits are included together unless filtered or S1 tag removed.

Example GA4 snippet (do not install on a page which already loads the same tag):

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-FVQCYF8PKQ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-FVQCYF8PKQ');
</script>
```

This S1 navigation update does NOT change GA tracking, S0 code, or analytics property settings.
