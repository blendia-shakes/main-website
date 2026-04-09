
export const categories = [
  {
    name: "essentials",
    label: "Essentials",
    display: (flavor: string) => `${flavor} — Essentials`
  },
  {
    name: "shakes",
    label: "Blendia Shakes",
    display: (flavor: string) => `${flavor} — Blendia Shake`
  },
  {
    name: "latte",
    label: "Blendia Latte",
    display: (flavor: string) => `${flavor} — Blendia Latte`
  }
]

export const flavors = [
  { key: "moon", label: "Moon" },
  { key: "midnight", label: "Midnight" },
  { key: "zen", label: "Zen" },
  { key: "masala", label: "Masala" }
]