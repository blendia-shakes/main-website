import type { MilkFacts, MilkType, Tint } from "./menu";

export type SeasonalItem = {
  name: string;
  description: string;
  image: string;
  category: "seasonal";
  flavor: string;
  tint: Tint;
  flavorLabel: string;
  price: string;
  milk: Record<MilkType, MilkFacts>;
  available: boolean;
};

// The current limited releases. Each item's `available` toggles just that
// spotlight card on/off (it renders nothing, no reserved space, when
// false) — flip it instead of deleting/commenting out the entry when a
// run ends. `flavor` here drives the nutrition-table image path (borrows
// an existing shake's table — see NutritionModal), not the display name.
// `milk` borrows both the deslactosada and descremada facts from that same
// shake flavor's ITEMS entry (see menu.ts), same as the permanent lineup.
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
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Sakura • Leche deslactosada", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Sakura • Leche descremada",   calories: "249 kcal", protein: "35g" },
    },
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
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Pumpkin spice • Leche deslactosada", calories: "348 kcal", protein: "30g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Pumpkin spice • Leche descremada",   calories: "314 kcal", protein: "33g" },
    },
    available: false,
  },
  {
    name: "Horchata Blendia",
    description: "Canela y arroz en un batido cremoso y nostálgico — edición limitada, solo mientras dure.",
    image: "/img-core/drinks/horchata.webp",
    category: "seasonal",
    flavor: "chai",
    tint: "horchata",
    flavorLabel: "Horchata",
    price: "Q44",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Horchata • Leche deslactosada", calories: "348 kcal", protein: "30g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Horchata • Leche descremada",   calories: "314 kcal", protein: "33g" },
    },
    available: true,
  },
  {
    name: "Coconut Blendia",
    description: "Coco cremoso y tropical en un batido refrescante — edición limitada, solo mientras dure.",
    image: "/img-core/drinks/coco.webp",
    category: "seasonal",
    flavor: "vanilla",
    tint: "coco",
    flavorLabel: "Coconut",
    price: "Q44",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Coconut • Leche deslactosada", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Coconut • Leche descremada",   calories: "249 kcal", protein: "35g" },
    },
    available: false,
  },
  {
    name: "Piña Colada Blendia",
    description: "Piña y coco en un batido tropical que sabe a vacaciones — edición limitada, solo mientras dure.",
    image: "/img-core/drinks/pina-colada.webp",
    category: "seasonal",
    flavor: "vanilla",
    tint: "pina-colada",
    flavorLabel: "Piña Colada",
    price: "Q44",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Piña Colada • Leche deslactosada", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Piña Colada • Leche descremada",   calories: "249 kcal", protein: "35g" },
    },
    available: false,
  },
  {
    name: "Apple Pie Blendia",
    description: "Manzana horneada y canela en un batido que sabe a pastel recién hecho — edición limitada, solo mientras dure.",
    image: "/img-core/drinks/apple-pie.webp",
    category: "seasonal",
    flavor: "chai",
    tint: "apple-pie",
    flavorLabel: "Apple Pie",
    price: "Q44",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Apple Pie • Leche deslactosada", calories: "348 kcal", protein: "30g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Apple Pie • Leche descremada",   calories: "314 kcal", protein: "33g" },
    },
    available: false,
  },
  {
    name: "Strawberry Blendia",
    description: "Fresas frescas en un batido dulce y cremoso — edición limitada, solo mientras dure.",
    image: "/img-core/drinks/strawberry.webp",
    category: "seasonal",
    flavor: "vanilla",
    tint: "strawberry",
    flavorLabel: "Strawberry",
    price: "Q44",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Strawberry • Leche deslactosada", calories: "283 kcal", protein: "33g" },
      descremada:   { ingredients: "• Proteína whey vainilla • Strawberry • Leche descremada",   calories: "249 kcal", protein: "35g" },
    },
    available: false,
  },
];
