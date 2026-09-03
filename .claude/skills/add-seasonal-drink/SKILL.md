---
name: add-seasonal-drink
description: Add a new limited-edition/seasonal drink to the Blendia menu's seasonal spotlight (site/src/data/seasonalDrinks.ts, with shared tint tokens in site/src/data/menu.ts). Use when the user asks to add a new seasonal, limited-edition, or "temporada" drink/beverage to the site. Only ask for the drink's name, its accent hex color, and its price — everything else (source image lookup, webp generation, code wiring) is automated by this skill.
---

# Adding a seasonal drink

This skill is self-contained — read it fresh each time, don't rely on prior
conversation memory. It codifies the exact process used to add the "Sakura
Blendia" and "Pumpkin Spice Blendia" seasonal cards, so the same process can
be repeated for future seasonal releases without re-deriving it.

## What to ask the user (only these three things)

1. **Name** of the drink (e.g. "Pumpkin Spice", "Sakura").
2. **Hex color** to use for the card's accent/tint (e.g. `#EAA271`). If the
   user doesn't give one, you may sample it from the drink's product image
   instead (see Step 2) — but prefer asking first since a specific brand hex
   is a business/design decision, not something to guess when avoidable.
3. **Price** (in quetzales, e.g. `Q48`).

Do not ask about description copy, nutrition facts, or which existing
flavor's nutrition table to borrow — this skill picks reasonable defaults
for all of that automatically (see Steps 4–5). If the user wants to
override those defaults, they'll say so; don't block on it.

## Step 1 — find the source image

The product photo lives in `site/public/img-core/drinks/`, following the
same convention as the permanent flavor images (`vanilla.png`,
`chocolate.png`, `matcha.png`, `chai.png`, `sakura.png`,
`pumpkin-spice.png`, ...). The filename is the kebab-case slug of the drink
name (e.g. "Pumpkin Spice" → `pumpkin-spice.png`).

```bash
cd site/public/img-core/drinks
ls -la | grep -i "<slug-or-keyword>"
```

If no exact filename match, search loosely by keyword — the file may
already exist under a slightly different name than what the user typed. If
truly nothing exists, stop and tell the user the source image is missing;
don't invent or fetch one.

## Step 2 — generate the webp

The permanent-menu images and both existing seasonal images are all
500×500 webp, center-cropped to square first (several of the source PNGs
aren't perfectly square, e.g. `sakura.png` is 1230×1278, `pumpkin-spice.png`
is 1238×1271). Reproduce exactly:

```bash
cd site/public/img-core/drinks
python3 -c "
from PIL import Image
im = Image.open('<slug>.png').convert('RGBA')
w, h = im.size
side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
im2 = im.crop((left, top, left + side, top + side))
im2 = im2.resize((500, 500), Image.LANCZOS)
im2.save('<slug>_500.png')
"
cwebp -q 82 <slug>_500.png -o <slug>.webp
rm <slug>_500.png
```

If the user gave no hex color in Step 0, sample the drink's dominant color
here (e.g. average a patch of the splash/liquid area with PIL) before
moving on, and confirm the sampled hex with the user rather than assuming.

## Step 3 — decide the badge-ink override

`site/src/data/menu.ts` (shared by the permanent and seasonal lineups) has a
`TINT_BADGE_INK` map that forces dark badge text
(`#403F45`) for tints too pale for the default light badge text
(`var(--bg-surface)`) to read against. Compute perceived luminance of the
given hex:

```
L = 0.299*R + 0.587*G + 0.114*B   (R,G,B in 0–255)
```

As a starting heuristic, colors with `L` above roughly 150–160 likely need
the dark-ink override (this matched `sakura` `#FCA5B4` at L≈193 and
`pumpkin-spice` `#EAA271` at L≈178). Treat this as a starting point, not a
hard cutoff — **always confirm visually** in Step 6 and flip the decision
if the rendered badge doesn't read clearly.

## Step 4 — pick a nutrition-table flavor to borrow

Neither seasonal drink has its own dedicated nutrition-table image yet —
each borrows an existing shake flavor's table/macros as a placeholder
(`site/public/img-core/nutrition-tables/table_{flavor}_blendia_shake_{dl|dc}.webp`,
flavors available: `vanilla`, `chocolate`, `matcha`, `chai`). Pick by
keyword match against the new drink's name/theme:

| Keyword in name/theme | Borrow flavor |
|---|---|
| chocolate | `chocolate` |
| matcha, té verde, green tea | `matcha` |
| chai, spice, cinnamon, canela, pumpkin, calabaza | `chai` |
| anything else (floral, fruity, vanilla-adjacent, unclear) | `vanilla` (default) |

Pull that flavor's `deslactosada` entry from `ITEMS` in `site/src/data/menu.ts`
for the placeholder `protein`/`calories` values, and build `ingredients` as:

```
• Proteína whey vainilla • {Drink Flavor Label} • Leche deslactosada
```

(matches the exact pattern used for both `sakura` and `pumpkin-spice`
entries — the borrowed flavor's own base ingredient, e.g. "Chai", is
replaced with the new drink's own flavor word).

## Step 5 — edit `site/src/data/menu.ts` and `site/src/data/seasonalDrinks.ts`

`Tint`, `TINT_ACCENT`, and `TINT_BADGE_INK` live in `menu.ts` because they're
shared by both the permanent lineup (`ITEMS`) and the seasonal lineup
(`SEASONAL_DRINKS`, in `seasonalDrinks.ts`, which imports `type Tint` from
`menu.ts`). Four edits total:

1. **`Tint` union** (top of `menu.ts`) — append the new tint slug:
   ```ts
   type Tint = "vanilla-latte" | "vanilla-shake" | "chocolate" | "matcha" | "chai" | "sakura" | "pumpkin-spice" | "<new-slug>";
   ```

2. **`TINT_ACCENT`** (in `menu.ts`) — add the hex:
   ```ts
   const TINT_ACCENT: Record<Tint, string> = {
     ...
     "<new-slug>": "#XXXXXX",
   };
   ```

3. **`TINT_BADGE_INK`** (in `menu.ts`) — add only if Step 3 said to:
   ```ts
   const TINT_BADGE_INK: Partial<Record<Tint, string>> = {
     ...
     "<new-slug>": "#403F45",
   };
   ```

4. **`SEASONAL_DRINKS` array** (in `seasonalDrinks.ts`) — append a new `SeasonalItem`:
   ```ts
   {
     name: "<Drink Name> Blendia",
     description: "<one Spanish sentence about the flavor> — edición limitada, solo mientras dure.",
     image: "/img-core/drinks/<slug>.webp",
     category: "seasonal",
     flavor: "<borrowed-flavor-from-step-4>",
     tint: "<new-slug>",
     flavorLabel: "<Drink Name>",
     price: "<price from user>",
     protein: "<borrowed flavor's deslactosada protein>",
     ingredients: "• Proteína whey vainilla • <Drink Name> • Leche deslactosada",
     calories: "<borrowed flavor's deslactosada calories>",
     available: true,
   },
   ```
   Keep the trailing tagline "— edición limitada, solo mientras dure." verbatim
   for consistency with the existing entries. The description's first clause
   is the only part that should vary per drink.

   Each entry's `available` flag independently controls whether that one
   card renders (`SEASONAL_DRINKS.filter((item) => item.available).map(...)`
   in `MenuSection.tsx`) — flip it to `false` instead of deleting the entry
   when a run ends.

Do **not** touch `NutritionModal.tsx`, `SeasonalPromo.tsx`, or `MenuSection.tsx`'s
render loop — those (in `site/src/components/menu/` and
`site/src/components/MenuSection.tsx`) are already generic over any number
of `SEASONAL_DRINKS` entries and need no changes per new drink.

## Step 6 — verify

1. `cd site && npm run build` — must complete cleanly (no typecheck
   configured for this project, so this only catches build-breaking
   errors, not type mistakes — read the diff carefully too).
2. Start the dev server on a free port and screenshot the new
   `.menu-seasonal` card in both `data-theme="light"` and `"dark"` (a
   headless Playwright script against `localhost` works well — Chromium is
   already cached locally under `~/Library/Caches/ms-playwright`, and a
   working `playwright` node_modules install exists at
   `/private/tmp/pw-check` if the project itself has none). Confirm:
   - The card's background/border tint visibly matches the new hex.
   - The "Edición limitada" and price badges are both legible — if not,
     flip the `TINT_BADGE_INK` decision from Step 3 and re-screenshot.
   - The image renders (webp path resolves, no broken-image icon).
3. Open the "Información nutricional" button and confirm the modal shows
   the borrowed flavor's table image without a 404.
4. Kill the dev server and clean up any temp screenshot/script files
   afterward.
