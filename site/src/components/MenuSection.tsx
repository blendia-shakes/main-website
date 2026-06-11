import { useState } from "react";

type Tint   = "vanilla" | "chocolate" | "matcha" | "masala";
type Category = "essentials" | "shakes" | "latte";
type Filter   = "all" | Category;

type MenuItem = {
  id: string;
  category: Category;
  categoryLabel: string;
  flavor: "moon" | "midnight" | "zen" | "masala";
  flavorLabel: string;
  name: string;
  fn: string;
  ingredients: string;
  protein: string;
  calories: string;
  price: string;
  tint: Tint;
  hasNutrition: boolean;
};

const TINT_GRADIENTS: Record<Tint, string> = {
  vanilla: "linear-gradient(145deg, oklch(0.95 0.025 95), oklch(0.90 0.035 88))",
  chocolate:   "linear-gradient(145deg, oklch(0.91 0.04 55),  oklch(0.85 0.05 45))",
  matcha:  "linear-gradient(145deg, oklch(0.91 0.04 145), oklch(0.85 0.05 150))",
  masala:  "linear-gradient(145deg, oklch(0.89 0.04 60),  oklch(0.82 0.05 52))",
};

const TINT_DOT: Record<Tint, string> = {
  vanilla: "oklch(0.6 0.09 90)",
  chocolate:   "oklch(0.55 0.11 50)",
  matcha:  "oklch(0.52 0.10 150)",
  masala:  "oklch(0.48 0.07 55)",
};

const ITEMS: MenuItem[] = [
  // Essentials
  {
    id: "essentials-moon",
    category: "essentials",
    categoryLabel: "Essentials",
    flavor: "moon",
    flavorLabel: "Vainilla",
    name: "Moon Blendia Essential",
    fn: "Post-workout",
    ingredients: "• Proteína whey vainilla",
    protein: "30g",
    calories: "320 kcal",
    price: "Q30",
    tint: "vanilla",
    hasNutrition: true,
  },
  {
    id: "essentials-midnight",
    category: "essentials",
    categoryLabel: "Essentials",
    flavor: "midnight",
    flavorLabel: "chocolate",
    name: "Midnight Blendia Essential",
    fn: "Post-workout",
    ingredients: "• Proteína whey chocolate",
    protein: "30g",
    calories: "320 kcal",
    price: "Q30",
    tint: "chocolate",
    hasNutrition: true,
  },
  // Shakes
  {
    id: "shakes-moon",
    category: "shakes",
    categoryLabel: "Shakes",
    flavor: "moon",
    flavorLabel: "Vainilla",
    name: "Moon Blendia Shake",
    fn: "Post-workout",
    ingredients: "• Proteína whey vainilla • Leche",
    protein: "30g",
    calories: "320 kcal",
    price: "Q35",
    tint: "vanilla",
    hasNutrition: false,
  },
  {
    id: "shakes-midnight",
    category: "shakes",
    categoryLabel: "Shakes",
    flavor: "midnight",
    flavorLabel: "chocolate",
    name: "Midnight Blendia Shake",
    fn: "Post-workout",
    ingredients: "• Proteína whey chocolate • Leche",
    protein: "30g",
    calories: "320 kcal",
    price: "Q35",
    tint: "chocolate",
    hasNutrition: false,
  },
  {
    id: "shakes-zen",
    category: "shakes",
    categoryLabel: "Shakes",
    flavor: "zen",
    flavorLabel: "Matcha",
    name: "Zen Blendia Shake",
    fn: "Post-workout",
    ingredients: "• Proteína whey vainilla • Matcha • Leche",
    protein: "30g",
    calories: "320 kcal",
    price: "Q45",
    tint: "matcha",
    hasNutrition: false,
  },
  {
    id: "shakes-masala",
    category: "shakes",
    categoryLabel: "Shakes",
    flavor: "masala",
    flavorLabel: "Chai",
    name: "Masala Blendia Shake",
    fn: "Post-workout",
    ingredients: "• Proteína whey vainilla • Chai • Leche ",
    protein: "30g",
    calories: "320 kcal",
    price: "Q35",
    tint: "masala",
    hasNutrition: false,
  },
  // Lattes
  {
    id: "latte-moon",
    category: "latte",
    categoryLabel: "Lattes",
    flavor: "moon",
    flavorLabel: "Vainilla",
    name: "Moon Blendia Latte",
    fn: "Post-workout",
    ingredients: "• Proteína whey vainilla • Leche • Café",
    protein: "30g",
    calories: "320 kcal",
    price: "Q40",
    tint: "vanilla",
    hasNutrition: false,
  },
  {
    id: "latte-midnight",
    category: "latte",
    categoryLabel: "Lattes",
    flavor: "midnight",
    flavorLabel: "chocolate",
    name: "Midnight Blendia Latte",
    fn: "Post-workout",
    ingredients: "• Proteína whey chocolate • Leche • Café",
    protein: "30g",
    calories: "320 kcal",
    price: "Q40",
    tint: "chocolate",
    hasNutrition: false,
  },
  {
    id: "latte-masala",
    category: "latte",
    categoryLabel: "Lattes",
    flavor: "masala",
    flavorLabel: "Chai",
    name: "Masala Blendia Latte",
    fn: "Post-workout",
    ingredients: "• Proteína whey vanilla • Chai • Leche • Café",
    protein: "30g",
    calories: "320 kcal",
    price: "Q40",
    tint: "masala",
    hasNutrition: false,
  },
];

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all",        label: "Todos" },
  { key: "essentials", label: "Essentials" },
  { key: "shakes",     label: "Shakes" },
  { key: "latte",      label: "Lattes" },
];

function MenuCard({ item }: { item: MenuItem }) {
  const [flipped, setFlipped] = useState(false);

  const frontImage     = `/img-core/bebidas/${item.category}/${item.category}_${item.flavor}.webp`;
  const nutritionImage = `/img-core/tablas-nutricionales/${item.category}/tabla_nutricional_${item.category}_${item.flavor}.webp`;

  return (
    <article className="menu-card">
      <div className={`menu-card-flip-inner${flipped ? " is-flipped" : ""}`}>

        {/* ── FRONT ── */}
        <div className="menu-card-front">
          {/* Image well */}
          <div
            className="menu-card-image-well"
            style={{ background: TINT_GRADIENTS[item.tint] }}
          >
            <span className="menu-card-category">{item.categoryLabel}</span>
            <img
              className="menu-card-img"
              src={frontImage}
              alt={item.name}
              loading="lazy"
              decoding="async"
              draggable={false}
            />
            <span className="menu-card-price">{item.price}</span>
          </div>

          {/* Body */}
          <div className="menu-card-body">
            <div className="menu-card-fn">
              <span className="menu-fn-dot" style={{ background: TINT_DOT[item.tint] }} />
              <span className="menu-fn-label">{item.fn}</span>
            </div>

            <h3 className="menu-card-name">{item.name}</h3>
            <p className="menu-card-ingredients">{item.ingredients}</p>

            <div className="menu-card-macros">
              <div className="menu-card-macros-pills">
                <span className="menu-macro">{item.protein} proteína</span>
                <span className="menu-macro">{item.calories}</span>
              </div>

              {item.hasNutrition && (
                <button
                  type="button"
                  className="menu-card-expand-btn"
                  onClick={() => setFlipped(true)}
                >
                  Ver más
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        {item.hasNutrition && (
          <div className="menu-card-back">
            <img
              className="menu-nutrition-img-flip"
              src={nutritionImage}
              alt={`Tabla nutricional ${item.name}`}
              loading="lazy"
              decoding="async"
            />
            <div className="menu-card-back-footer">
              <span className="menu-card-back-name">{item.name}</span>
              <button
                type="button"
                className="menu-card-expand-btn"
                onClick={() => setFlipped(false)}
              >
                Regresar
              </button>
            </div>
          </div>
        )}

      </div>
    </article>
  );
}

export default function MenuSection() {
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const visible =
    activeFilter === "all"
      ? ITEMS
      : ITEMS.filter(i => i.category === activeFilter);

  return (
    <section id="menu" className="menu-section">
      <div className="menu-inner">

        {/* Header */}
        <div className="menu-header">
          <span className="menu-eyebrow">Menú</span>
          <h2 className="menu-title">Nueve bebidas. Diseñadas para lo que necesitas.</h2>
        </div>

        {/* Filter pills */}
        <div
          className="menu-filters"
          role="group"
          aria-label="Filtrar bebidas por categoría"
        >
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              className={`menu-filter-pill${activeFilter === key ? " is-active" : ""}`}
              onClick={() => setActiveFilter(key)}
              aria-pressed={activeFilter === key}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="menu-grid-wrap">
          <div className="menu-grid">
            {visible.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
