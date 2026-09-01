export type Tint     = "vanilla-latte" | "vanilla-shake" | "chocolate" | "matcha" | "chai" | "sakura" | "pumpkin-spice";
export type Category = "shakes" | "latte";
export type MilkType = "deslactosada" | "descremada";

export type MilkFacts = { ingredients: string; calories: string; protein: string };

export type MenuItem = {
  id: string;
  category: Category;
  flavor: "vanilla" | "chocolate" | "matcha" | "chai";
  flavorLabel: string;
  name: string;
  price: string;
  tint: Tint;
  milk: Record<MilkType, MilkFacts>;
};

export type SeasonalItem = {
  name: string;
  description: string;
  image: string;
  category: "seasonal";
  flavor: string;
  tint: Tint;
  flavorLabel: string;
  price: string;
  protein: string;
  ingredients: string;
  calories: string;
  available: boolean;
};

// A modal can be opened from a permanent MenuCard (which carries a milk-type
// toggle) or from the seasonal spotlight (a single fixed profile, no toggle).
export type NutritionSource =
  | { kind: "menu"; item: MenuItem; milk: MilkType }
  | { kind: "seasonal"; item: SeasonalItem };

export const TINT_ACCENT: Record<Tint, string> = {
  "vanilla-shake": "#F5E7C9",
  "vanilla-latte": "#CF9149",
  chocolate: "#886E5A",
  matcha:    "#C5D098",
  chai:      "#B1832F",
  sakura:    "#FCA5B4",
  "pumpkin-spice": "#EAA271",
};

// Badge text (menu-card-price-badge / menu-seasonal-badge) defaults to a
// light color because it sits on solid --row-tint. vanilla-shake's,
// sakura's, and pumpkin-spice's tints are too pale for that to read —
// force dark badge text for those.
export const TINT_BADGE_INK: Partial<Record<Tint, string>> = {
  "vanilla-shake": "#403F45",
  sakura: "#403F45",
  "pumpkin-spice": "#403F45",
};

export const MILK_LABELS: Record<MilkType, string> = {
  deslactosada: "Deslactosada",
  descremada:   "Descremada",
};

// The permanent lineup — one product, milk type is a prep choice, not a
// different drink (toggled locally in MenuCard / NutritionModal).
// Display order: Vainilla Latte → Chocolate Latte → Matcha Shake →
// Chai Shake → Chocolate Shake → Vainilla Shake.
export const ITEMS: MenuItem[] = [
  {
    id: "latte-vanilla",
    category: "latte",
    flavor: "vanilla",
    flavorLabel: "Vainilla",
    name: "Vanilla Blendia Latte",
    price: "Q42",
    tint: "vanilla-latte",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Leche deslactosada • Café", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Leche descremada • Café",   calories: "249 kcal", protein: "35g" },
    },
  },
  {
    id: "latte-chocolate",
    category: "latte",
    flavor: "chocolate",
    flavorLabel: "Chocolate",
    name: "Chocolate Blendia Latte",
    price: "Q42",
    tint: "chocolate",
    milk: {
      deslactosada: { ingredients: "• Proteína whey chocolate • Leche deslactosada • Café", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey chocolate • Leche descremada • Café",   calories: "249 kcal", protein: "35g" },
    },
  },
  {
    id: "shakes-matcha",
    category: "shakes",
    flavor: "matcha",
    flavorLabel: "Matcha",
    name: "Matcha Blendia Shake",
    price: "Q48",
    tint: "matcha",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Matcha • Leche deslactosada", calories: "283 kcal", protein: "30g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Matcha • Leche descremada",   calories: "249 kcal", protein: "33g" },
    },
  },
  {
    id: "shakes-chai",
    category: "shakes",
    flavor: "chai",
    flavorLabel: "Chai",
    name: "Chai Blendia Shake",
    price: "Q42",
    tint: "chai",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Chai • Leche deslactosada", calories: "348 kcal", protein: "30g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Chai • Leche descremada",   calories: "314 kcal", protein: "33g" },
    },
  },
  {
    id: "shakes-chocolate",
    category: "shakes",
    flavor: "chocolate",
    flavorLabel: "Chocolate",
    name: "Chocolate Blendia Shake",
    price: "Q38",
    tint: "chocolate",
    milk: {
      deslactosada: { ingredients: "• Proteína whey chocolate • Leche deslactosada", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey chocolate • Leche descremada",   calories: "249 kcal", protein: "35g" },
    },
  },
  {
    id: "shakes-vanilla",
    category: "shakes",
    flavor: "vanilla",
    flavorLabel: "Vainilla",
    name: "Vanilla Blendia Shake",
    price: "Q38",
    tint: "vanilla-shake",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Leche deslactosada", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Leche descremada",   calories: "249 kcal", protein: "35g" },
    },
  },
];

// The current limited releases. Each item's `available` toggles just that
// spotlight card on/off (it renders nothing, no reserved space, when
// false) — flip it instead of deleting/commenting out the entry when a
// run ends. `flavor` here drives the nutrition-table image path (borrows
// an existing shake's table — see NutritionModal), not the display name.
export const SEASONAL_DRINKS: SeasonalItem[] = [
  {
    name: "Sakura Blendia",
    description: "Un toque floral y afrutado inspirado en la temporada sakura — edición limitada, solo mientras dure.",
    image: "/img-core/drinks/sakura.webp",
    category: "seasonal",
    flavor: "vanilla",
    tint: "sakura",
    flavorLabel: "Sakura",
    price: "Q48",
    protein: "33g",
    ingredients: "• Proteína whey vainilla • Sakura • Leche deslactosada",
    calories: "283 kcal",
    available: false,
  },
  {
    name: "Pumpkin Spice Blendia",
    description: "Especias cálidas de temporada en un batido cremoso — edición limitada, solo mientras dure.",
    image: "/img-core/drinks/pumpkin-spice.webp",
    category: "seasonal",
    flavor: "chai",
    tint: "pumpkin-spice",
    flavorLabel: "Pumpkin Spice",
    price: "Q48",
    protein: "30g",
    ingredients: "• Proteína whey vainilla • Pumpkin spice • Leche deslactosada",
    calories: "348 kcal",
    available: true,
  },
];
