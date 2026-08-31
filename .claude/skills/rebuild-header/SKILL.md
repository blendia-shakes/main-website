---
name: rebuild-header
description: Reconstruct the Blendia site's navbar/header CSS from scratch when it regresses to a backdrop-filter design, breaking the iOS Safari in-page dark/light toggle. Use whenever the header looks wrong, someone reintroduces backdrop-filter on .navbar, or the theme toggle stops updating the iOS status-bar strip / navbar tint live.
---

# Rebuilding the Blendia header (navbar)

This skill is self-contained — read it fresh each time, don't rely on prior conversation memory. It documents one specific, previously-solved bug and the exact CSS that fixes it, so it can be reapplied from a cold start.

## The bug this fixes

**Symptom:** after the user taps the dark/light toggle (`site/src/App.tsx`'s `toggleTheme`, a plain in-page `data-theme` attribute flip with no `window.location.reload()`), something stays visually stuck on the *previous* theme's color. Two possible manifestations, both from the same root cause:

1. The navbar itself (background tint, buttons) stays the old color until the user scrolls.
2. On a real iPhone in Safari specifically, the native OS status-bar strip (the sliver behind the clock/battery icons — not part of the page, part of Safari's own chrome) stays the old color until the next full page load. This is the harder-to-notice, harder-to-diagnose variant — it was mistaken for an unfixable OS-level limitation for a long time before the real cause was isolated.

**Root cause:** `position: fixed` + `backdrop-filter` on `.navbar` (applied via a `.navbar.is-scrolled` class once the user scrolls past 16px, per `Navbar.tsx`) promotes the navbar to its own Safari/WebKit GPU-composited layer. WebKit caches that layer's rasterized paint and does not reliably re-rasterize it — or resolve `<meta name="theme-color">` for the native status bar, which behaves the same way — from a plain in-page attribute/custom-property change. It only repaints at the next compositor flush (typically a scroll event) or a real navigation.

**What was tried and confirmed NOT to work** (do not re-attempt these — they were each tried and tested live on a real device before this fix was found):
- `metaTheme.setAttribute('content', ...)` on toggle
- Replacing the `<meta name="theme-color">` node outright (`cloneNode` + `replaceWith`)
- Declaring CSS `color-scheme: light` / `color-scheme: dark`
- Forcing a synthetic scroll (`scrollTo(0, y+1)` then back) to trigger a compositor flush
- Converting the navbar's own `var()`-driven colors to literal per-theme `rgba()` values scoped via `[data-theme="dark"]` (this pattern *does* work for other, unrelated composited layers elsewhere in the site — see "What this does NOT fix" below — but it does not fix the native iOS status-bar strip specifically, because that's the browser's own chrome, not page content)
- `window.location.reload()` on toggle does fix it (Safari re-resolves everything correctly on a real navigation), but the project owner explicitly rejected this trade-off — a reload on every toggle is too expensive for UX. **Do not reintroduce the reload as a fix for this.**

**What actually works:** don't give Safari a composited layer to get stuck on in the first place. The `aug-bk` git branch's navbar design predates the redesign that introduced `backdrop-filter` and never exhibited this bug, because it never composites the navbar at all — it's a solid, opaque floating pill instead of a translucent blurred bar. This was confirmed fixed on a real device (commit `96d3c12`, "fix(dark-mode): rebuild navbar as opaque pill to fix iOS status-bar toggle").

## The invariant — read this before touching `.navbar` ever again

**`.navbar` and `.navbar-inner` must never use `backdrop-filter`, `filter`, an active/persistent `transform` or `opacity` animation, `mix-blend-mode`, `isolation`, `contain`, or `will-change`.** Any of these promotes the element to its own GPU-composited layer, and a composited, always-mounted, above-the-fold element is exactly what makes this bug possible again. If a future redesign wants a translucent/blurred nav bar back, that trade-off needs to be made consciously (and probably paired with reintroducing the reload-on-toggle, gated to iOS Safari) — it is not a safe default.

## Exact CSS to reconstruct (current canonical state, `site/src/styles.css`)

If the header is broken/missing/regressed, replace whatever currently exists for these selectors with the following, verbatim. This is the exact content as of commit `96d3c12` — if the design has evolved since, prefer the current committed state on `main`/`ui-ux-pro-max` over this snapshot, but the **no-`backdrop-filter` invariant above still applies unconditionally**.

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 150;
  padding: 12px var(--page-pad);
  background: var(--bg);
  transition: background 0.3s ease, box-shadow 0.3s ease;
}

.navbar-inner {
  display: flex;
  align-items: center;
  height: 60px;
  padding: 0 20px;
  background: var(--bg-surface);
  border: 1px solid var(--hairline);
  border-radius: 24px;
  max-width: var(--container);
  margin: 0 auto;
  transition: background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
  position: relative;
}

.navbar.is-scrolled .navbar-inner {
  background: var(--bg-surface);
  box-shadow: 0 4px 24px -4px rgba(var(--ink-rgb), 0.10);
}
```

Key points about this shape:
- The outer `.navbar` is a transparent-background wrapper (`background: var(--bg)` — matches the page, effectively invisible against it) that just positions things and reserves horizontal padding.
- The **inner pill** (`.navbar-inner`) carries the actual visible surface: a solid, fully opaque `var(--bg-surface)` background, 1px hairline border, and a large `24px` border-radius — a floating rounded rectangle, not a full-width bar.
- Scroll state (`.is-scrolled`) only adds a `box-shadow` to the inner pill — it does **not** change background opacity or add any blur.
- `.navbar-link` and `.navbar-cta` use a literal `border-radius: 999px` (fully rounded), **not** `var(--radius-pill)` — that token is `10px` elsewhere in the current design system (shared by many unrelated components sitewide), so using it here would both look wrong (barely-rounded instead of pill-shaped) and couple the header to a token change that should stay scoped.
- `.navbar-toggle`, `.navbar-hamburger`, `.navbar-link:hover` use plain `rgba(var(--ink-rgb), ...)` / `rgba(var(--bg-rgb), ...)` — no literal-color `[data-theme="dark"]` overrides needed. That workaround pattern (used elsewhere in this file for genuinely composited elements — nutrition modal, mobile radial menu, drop-shadow filters) is unnecessary here specifically because nothing in this design is composited. If you find literal-color patches on these three selectors, that's a sign the header regressed back toward a composited design at some point — remove the patches and fix the underlying composited property instead, don't stack another workaround on top.

**Dimensions that must move together** — the navbar's total height changed between the old bar design and this pill design, so `<body>`'s top padding (which reserves space for the `position: fixed` navbar) must match at every breakpoint or page content will overlap/gap under the header:

| Breakpoint | `.navbar-inner` height | outer `.navbar` vertical padding | `body` `padding-top` |
|---|---|---|---|
| Desktop (default) | `60px` | `12px` top + `12px` bottom | `84px` (`site/src/styles.css` base `body` rule) |
| `@media (max-width: 980px)` | `56px` | same `12px`/`12px` | `80px` |
| `@media (max-width: 500px)` | `52px` | same `12px`/`12px` | `76px` |

If you change the pill height at any breakpoint, recompute `body`'s `padding-top` as `2 × 12 + <inner height>` and update it at that same breakpoint.

## What this does NOT fix, and don't try to make it

The nutrition modal overlay (`.menu-modal-overlay`), the mobile radial-menu backdrop (`.radial-backdrop`), and a handful of `filter: drop-shadow(...)` rules (`.hero-visual`, menu card/seasonal images) are *also* composited layers (by `backdrop-filter` or `filter`) with `var()`-driven colors, and *do* use the literal-`rgba()` + `[data-theme="dark"]`-override workaround pattern (search `styles.css` for comments starting "Literal colors, not"). That pattern is correct and necessary for those — they're conditionally-mounted (modal/menu only exist while open) or narrow in scope (a single image's shadow), so eliminating their composited trigger entirely isn't worth the redesign cost the way it was for the always-mounted, above-the-fold navbar. Don't "fix" those by trying to remove their `backdrop-filter`/`filter` — that's solving a different, already-solved problem a different way, unnecessarily.

## Verification steps after reconstructing

1. `cd site && npm run build` — must complete cleanly (Vite/esbuild, no typecheck configured for this project).
2. `npm run preview -- --host` and open the printed LAN URL on a real iPhone in Safari (not the simulator, not another browser — this bug is iOS-Safari-specific and does not reproduce elsewhere).
3. Scroll down past 16px (so `.navbar.is-scrolled` is active), then tap the theme toggle. Confirm **all** of: the navbar pill's shadow/background, the toggle button's ring, the hamburger button (on mobile width), and — critically — **the native status-bar strip behind the clock/battery** all update immediately, with no scroll or reload needed.
4. Also test from the very top of the page (not scrolled) — `.navbar-inner` still has its base (non-`is-scrolled`) styling, confirm the toggle still updates the status bar correctly from there too.

## Source of truth

The `aug-bk` git branch (`git show aug-bk:site/src/styles.css`, `git show aug-bk:site/src/components/Navbar.tsx`) is the canonical origin of this design — it's where it was pulled from, byte-for-byte, when this fix was built. `Navbar.tsx` itself has never needed to change; this is a pure-CSS fix. If in doubt about a value, diff against that branch rather than guessing.
