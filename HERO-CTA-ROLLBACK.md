# Hero CTA rollback — "Ver demo" button

The "Ver demo" button in the hero (`site/src/components/Hero.tsx`) is temporary.
This file records the exact state **before** it was added, so it can be restored
without having to reconstruct it from memory.

Current (temporary) state: 3 buttons — "Encuentra una máquina" (small, outline),
"Ver demo" (dark, primary, links to YouTube), "Ver el catálogo" (small, outline).

## To roll back

### 1. `site/src/components/Hero.tsx`

Replace the `.hero-ctas` block with:

```tsx
<div className="hero-ctas">
  <button
    className="hero-cta-primary"
    type="button"
    onClick={() => scrollTo("ubicaciones")}
  >
    Encuentra una máquina
  </button>
  <button
    className="hero-cta-secondary"
    type="button"
    onClick={() => scrollTo("menu")}
  >
    Ver el catálogo
  </button>
</div>
```

This removes the "Ver demo" `<a>` button entirely, restores "Encuentra una máquina"
to `hero-cta-primary` (dark fill), and drops the `hero-cta-minor` modifier from
"Ver el catálogo" (back to full-size outline).

### 2. `site/src/styles.css`

- Remove the `.hero-cta-minor` rule (added for the two shrunk side buttons):

```css
.hero-cta-minor {
  padding: 10px 20px;
  font-size: 13px;
}
```

- In `.hero-cta-primary`, remove the `text-decoration: none;` line (it was only
  needed because "Ver demo" was an `<a>` tag; the original primary button never
  needed it):

```css
.hero-cta-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  border-radius: var(--radius-pill);
  background: var(--ink);
  color: var(--bg);
  font-size: 14px;
  font-weight: 600;
  letter-spacing: -0.01em;
  border: none;
  cursor: pointer;
  font-family: inherit;
  line-height: 1;
  transition: opacity 0.2s ease, transform 0.15s ease;
}
```

`.hero-cta-secondary` itself was never modified — no changes needed there.

## Reference: demo link used

`https://youtu.be/G6g2iOND8vI?si=f7nz3F2Vw7gsFXqC` — kept here in case the button
is reintroduced later.
