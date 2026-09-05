import type { SeasonalItem } from "./seasonalDrinks";

export type Tint     = "vanilla-latte" | "vanilla-shake" | "chocolate" | "matcha" | "chai" | "sakura" | "pumpkin-spice" | "horchata" | "coco" | "pina-colada" | "apple-pie" | "strawberry";
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

// A modal can be opened from a permanent MenuCard or from the seasonal
// spotlight — both now carry a milk-type toggle.
export type NutritionSource =
  | { kind: "menu"; item: MenuItem; milk: MilkType }
  | { kind: "seasonal"; item: SeasonalItem; milk: MilkType };

export const TINT_ACCENT: Record<Tint, string> = {
  "vanilla-shake": "#F5E7C9",
  "vanilla-latte": "#CF9149",
  chocolate: "#886E5A",
  matcha:    "#C5D098",
  chai:      "#B1832F",
  sakura:    "#FCA5B4",
  "pumpkin-spice": "#EAA271",
  horchata:  "#E3D1B0",
  coco:      "#D1C6B0",
  "pina-colada": "#E8D9A0",
  "apple-pie": "#D89B6A",
  strawberry: "#E86E7D",
};

// Badge text (menu-card-price-badge / menu-seasonal-badge) defaults to a
// light color because it sits on solid --row-tint. vanilla-shake's,
// sakura's, pumpkin-spice's, horchata's, coco's, pina-colada's, and
// apple-pie's tints are too pale for that to read — force dark badge text
// for those.
export const TINT_BADGE_INK: Partial<Record<Tint, string>> = {
  "vanilla-shake": "#403F45",
  sakura: "#403F45",
  "pumpkin-spice": "#403F45",
  horchata: "#403F45",
  coco: "#403F45",
  "pina-colada": "#403F45",
  "apple-pie": "#403F45",
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
    price: "Q44",
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
    price: "Q44",
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
    price: "Q44",
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
    price: "Q40",
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
    price: "Q40",
    tint: "vanilla-shake",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Leche deslactosada", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Leche descremada",   calories: "249 kcal", protein: "35g" },
    },
  },
];
