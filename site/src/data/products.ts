export type CategoryKey = "essentials" | "shakes" | "latte";
export type FlavorKey   = "moon" | "midnight" | "zen" | "masala";

export const categories: { name: CategoryKey; label: string }[] = [
  { name: "essentials", label: "Essentials" },
  { name: "shakes",     label: "Blendia Shakes" },
  { name: "latte",      label: "Blendia Latte" },
];

export const flavors: { key: FlavorKey; label: string }[] = [
  { key: "moon",     label: "Moon" },
  { key: "midnight", label: "Midnight" },
  { key: "zen",      label: "Zen" },
  { key: "masala",   label: "Masala" },
];
