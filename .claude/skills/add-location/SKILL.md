---
name: add-location
description: Add a new vending-machine location to the Blendia site (site/src/data/locations.ts). Use when the user asks to add a new location, spot, gym, office, mall, university, or clinic where a Blendia machine is/will be placed. Only ask for the location's type, name, address, and hours — everything else (zone, id, maps link, live/soon status, availability) is derived automatically by this skill.
---

# Adding a location

This skill is self-contained — read it fresh each time, don't rely on prior
conversation memory. It follows the same pattern established by the
`add-seasonal-drink` skill: `data/locations.ts` is a standalone data file
(mirroring `data/seasonalDrinks.ts`), each entry carries its own
`available: boolean` that independently controls whether that one card
renders, and `Locations.tsx` is already fully generic over the array — it
needs no per-location code changes.

## What to ask the user (only these four things)

1. **Type** — one of the fixed `LocationType` values: `gym`, `office`,
   `university`, `mall`, `clinic`. If the user's wording doesn't map
   obviously (e.g. "coworking space" → `office`, "university campus" →
   `university`), pick the closest match yourself rather than blocking —
   only ask if genuinely ambiguous (e.g. it could plausibly be a `gym` or a
   `clinic`, like a wellness/sports-medicine center).
2. **Name** of the place (e.g. "Gold's Gym Zona 7", "WeWork 99, Zona 10").
3. **Address** (e.g. "Av. La Reforma 1-61, Zona 7"). Guatemala City zone
   addressing (`Zona N`) is expected to be part of this — it's how the zone
   filter and id are derived in Step 1 below.
4. **Hours** (e.g. "Lun–Vie 5am–11pm • Sáb–Dom 7am–9pm"). Match the existing
   `•`-separated day-range format when the user gives hours in a looser
   shape (e.g. "weekdays 5am to 11pm, weekends 7 to 9") — don't invent hours
   if the user doesn't give any; ask again rather than guessing operating
   hours for a real business.

Do not ask about the Google Maps link, the internal id, live/soon status,
or the `available` flag — this skill derives all of them (see Steps 1–4).
If the user wants to override a default (e.g. "mark it as coming soon"),
they'll say so; don't block on it.

## Step 1 — derive the zone and extend `LocationZone` if needed

Extract `Zona N` from the address the user gave. `site/src/data/locations.ts`
has a `LocationZone` union (`'zona-7' | 'zona-9' | 'zona-10' | ...`) and a
matching `ZONE_LABELS` map. If the extracted zone isn't already in the
union:

1. Append it to the `LocationZone` type.
2. Add its entry to `ZONE_LABELS` (e.g. `'zona-3': 'Zona 3'`).

If the address has no discernible zone, ask the user for one rather than
guessing — the zone filter bar and card meta line both depend on it.

## Step 2 — derive the id

Slug pattern used by existing entries: kebab-case of the venue's short name
plus `-z{zone number}` (e.g. `"Gold's Gym Zona 7"` → `golds-z7`,
`"WeWork 99, Zona 10"` → `wework-z10`). Build it the same way:

```
<kebab-case name, dropping the "Zona N" part and possessives/punctuation>-z<zone number>
```

Check it's unique against existing `locations[].id` in `locations.ts` — if
a collision would occur (e.g. two locations of the same brand in the same
zone), disambiguate by appending a short distinguishing word instead of a
number suffix (e.g. `golds-z7-norte`).

## Step 3 — derive the Google Maps URL

Existing entries use a plain query-style Maps link, not a place-id/embed
link:

```
https://maps.google.com/?q=<address, spaces as +>+Guatemala+City
```

URL-encode the address (spaces → `+`, keep commas/periods as-is per the
existing entries), then append `+Guatemala+City`. Don't fetch or validate
the link — this project always targets Guatemala City, so the static
pattern is sufficient.

## Step 4 — default `status` and `available`

- `status: 'live'` by default — this shows the card as **"Disponible"**,
  not "Pronto". This is a real, currently-placeable location being added,
  so default to the available state. Only use `'soon'` if the user
  explicitly signals the machine isn't installed yet (e.g. "we're
  launching this next month", "reserve a card for it but it's not live").
  `'soon'` locations still render, just without the "Cómo llegar" CTA and
  with a "Pronto" badge instead — it's a teaser state, not a hidden one.
- `available: true` by default — this is the structural flag
  (`Locations.tsx` filters the whole list down to `available` entries
  before anything else runs). Only a location being retired/removed later
  should flip to `false`; a brand-new location always starts `true`.

## Step 5 — edit `site/src/data/locations.ts`

Up to three edits, all in this one file:

1. **`LocationZone` union** — only if Step 1 found a new zone.
2. **`ZONE_LABELS`** — only if Step 1 found a new zone.
3. **`locations` array** — append a new `Location`:
   ```ts
   {
     id: '<slug-from-step-2>',
     name: '<name from user>',
     address: '<address from user>',
     zone: '<zone-from-step-1>',
     type: '<type from user>',
     hours: '<hours from user>',
     mapsUrl: '<url from step 3>',
     status: 'live',
     available: true,
   },
   ```

Do **not** touch `Locations.tsx` — it's already generic over any number of
`locations` entries (zone filter chips, count text, grid, and empty state
all derive from the array) and needs no changes per new location. The
`TypeIcon` switch in that file only needs a new case if you're introducing
a `LocationType` value outside the existing five (`gym`, `office`,
`university`, `mall`, `clinic`) — that's a rare, explicit ask, not part of
adding a normal location.

## Step 6 — verify

1. `cd site && npm run build` — must complete cleanly (no typecheck
   configured for this project, so this only catches build-breaking
   errors, not type mistakes — read the diff carefully too).
2. Start the dev server on a free port and screenshot the `#ubicaciones`
   section (a headless Playwright script against `localhost` works well —
   Chromium is already cached locally under `~/Library/Caches/ms-playwright`,
   and a working `playwright` node_modules install exists at
   `/private/tmp/pw-check` if the project itself has none). Confirm:
   - The new card appears in the "Todas" filter and, if a new zone was
     added, a new zone chip appears and correctly isolates it.
   - The type icon, name, address, and hours all render correctly.
   - `status: 'live'` shows a working "Cómo llegar" link with an "?q="
     Maps URL that matches the address; `'soon'` shows no CTA and a
     "Pronto" badge instead.
   - The location count text above the grid updates correctly.
3. Kill the dev server and clean up any temp screenshot/script files
   afterward.
