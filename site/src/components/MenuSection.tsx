import { useEffect, useRef, useState } from "react";

type Tint     = "vanilla" | "chocolate" | "matcha" | "masala";
type Category = "shakes" | "latte";
type MilkType = "deslactosada" | "descremada";

type MilkFacts = { ingredients: string; calories: string };

type MenuItem = {
  id: string;
  category: Category;
  flavor: "moon" | "midnight" | "zen" | "masala";
  flavorLabel: string;
  name: string;
  protein: string;
  price: string;
  tint: Tint;
  milk: Record<MilkType, MilkFacts>;
};

type SeasonalItem = {
  name: string;
  description: string;
  image: string;
  category: "essentials";
  flavor: string;
  tint: Tint;
  flavorLabel: string;
  protein: string;
  ingredients: string;
  calories: string;
};

// A modal can be opened from a permanent MenuCard (which carries a milk-type
// toggle) or from the seasonal spotlight (a single fixed profile, no toggle).
type NutritionSource =
  | { kind: "menu"; item: MenuItem; milk: MilkType }
  | { kind: "seasonal"; item: SeasonalItem };

const TINT_ACCENT: Record<Tint, string> = {
  vanilla:   "oklch(0.6 0.09 90)",
  chocolate: "oklch(0.55 0.11 50)",
  matcha:    "oklch(0.52 0.10 150)",
  masala:    "oklch(0.48 0.07 55)",
};

// The permanent lineup — one product, milk type is a prep choice, not a
// different drink (toggled locally in MenuCard / NutritionModal).
// Display order: café (Latte) first, then Shakes — within each, Matcha →
// Chai → Chocolate → Vainilla last.
const ITEMS: MenuItem[] = [
  {
    id: "latte-masala",
    category: "latte",
    flavor: "masala",
    flavorLabel: "Chai",
    name: "Masala Blendia Latte",
    protein: "30g",
    price: "Q40",
    tint: "masala",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Chai • Leche deslactosada • Café", calories: "320 kcal" },
      descremada:   { ingredients: "• Proteína whey vainilla • Chai • Leche descremada • Café",   calories: "290 kcal" },
    },
  },
  {
    id: "latte-midnight",
    category: "latte",
    flavor: "midnight",
    flavorLabel: "Chocolate",
    name: "Midnight Blendia Latte",
    protein: "30g",
    price: "Q40",
    tint: "chocolate",
    milk: {
      deslactosada: { ingredients: "• Proteína whey chocolate • Leche deslactosada • Café", calories: "320 kcal" },
      descremada:   { ingredients: "• Proteína whey chocolate • Leche descremada • Café",   calories: "290 kcal" },
    },
  },
  {
    id: "latte-moon",
    category: "latte",
    flavor: "moon",
    flavorLabel: "Vainilla",
    name: "Moon Blendia Latte",
    protein: "30g",
    price: "Q40",
    tint: "vanilla",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Leche deslactosada • Café", calories: "320 kcal" },
      descremada:   { ingredients: "• Proteína whey vainilla • Leche descremada • Café",   calories: "290 kcal" },
    },
  },
  {
    id: "shakes-zen",
    category: "shakes",
    flavor: "zen",
    flavorLabel: "Matcha",
    name: "Zen Blendia Shake",
    protein: "30g",
    price: "Q45",
    tint: "matcha",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Matcha • Leche deslactosada", calories: "320 kcal" },
      descremada:   { ingredients: "• Proteína whey vainilla • Matcha • Leche descremada",   calories: "290 kcal" },
    },
  },
  {
    id: "shakes-masala",
    category: "shakes",
    flavor: "masala",
    flavorLabel: "Chai",
    name: "Masala Blendia Shake",
    protein: "30g",
    price: "Q35",
    tint: "masala",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Chai • Leche deslactosada", calories: "320 kcal" },
      descremada:   { ingredients: "• Proteína whey vainilla • Chai • Leche descremada",   calories: "290 kcal" },
    },
  },
  {
    id: "shakes-midnight",
    category: "shakes",
    flavor: "midnight",
    flavorLabel: "Chocolate",
    name: "Midnight Blendia Shake",
    protein: "30g",
    price: "Q35",
    tint: "chocolate",
    milk: {
      deslactosada: { ingredients: "• Proteína whey chocolate • Leche deslactosada", calories: "320 kcal" },
      descremada:   { ingredients: "• Proteína whey chocolate • Leche descremada",   calories: "290 kcal" },
    },
  },
  {
    id: "shakes-moon",
    category: "shakes",
    flavor: "moon",
    flavorLabel: "Vainilla",
    name: "Moon Blendia Shake",
    protein: "30g",
    price: "Q35",
    tint: "vanilla",
    milk: {
      deslactosada: { ingredients: "• Proteína whey vainilla • Leche deslactosada", calories: "320 kcal" },
      descremada:   { ingredients: "• Proteína whey vainilla • Leche descremada",   calories: "290 kcal" },
    },
  },
];

// No active seasonal drink right now — the "essentials" line is retired
// from the permanent grid, so its assets/copy stand in as a placeholder
// example of what a future limited release looks like. Set this to a real
// SeasonalItem when one launches, or to `null` to hide the section again
// (it renders nothing, no reserved space, when there's nothing to show).
const SEASONAL_DRINK: SeasonalItem | null = {
  name: "Zen Blendia",
  description: "Nuestra receta con matcha real vuelve por tiempo limitado — solo mientras dure.",
  image: "/img-core/bebidas/essentials/essentials_zen.webp",
  category: "essentials",
  flavor: "zen",
  tint: "matcha",
  flavorLabel: "Matcha",
  protein: "30g",
  ingredients: "• Proteína whey vainilla • Matcha",
  calories: "320 kcal",
};

const MILK_LABELS: Record<MilkType, string> = {
  deslactosada: "Deslactosada",
  descremada:   "Descremada",
};

function SeasonalPromo({
  item,
  onOpenNutrition,
}: {
  item: SeasonalItem;
  onOpenNutrition: (item: SeasonalItem) => void;
}) {
  return (
    <div
      className="menu-seasonal why-animate"
      style={{
        "--row-tint": TINT_ACCENT[item.tint],
        transitionDelay: "120ms",
      } as React.CSSProperties}
    >
      <div className="menu-seasonal-card">
        <div className="menu-seasonal-image">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </div>
        <div className="menu-seasonal-body">
          <span className="menu-seasonal-badge">Edición limitada</span>
          <h3 className="menu-seasonal-name">{item.name}</h3>
          <p className="menu-seasonal-desc">{item.description}</p>
          <button
            type="button"
            className="menu-seasonal-info-btn"
            onClick={() => onOpenNutrition(item)}
          >
            Información nutricional
          </button>
        </div>
      </div>
    </div>
  );
}

function MenuCard({
  item,
  onOpenNutrition,
  revealDelay,
}: {
  item: MenuItem;
  onOpenNutrition: (item: MenuItem, milk: MilkType) => void;
  revealDelay: number;
}) {
  const [milk, setMilk] = useState<MilkType>("deslactosada");

  const facts = item.milk[milk];
  const frontImage = `/img-core/bebidas/${item.category}/${item.category}_${item.flavor}.webp`;

  return (
    <article
      className="menu-card why-animate"
      style={{
        "--row-tint": TINT_ACCENT[item.tint],
        transitionDelay: `${revealDelay}ms`,
      } as React.CSSProperties}
    >
      <div className="menu-card-image">
        <img
          className="menu-card-image-img"
          src={frontImage}
          alt={item.name}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      </div>

      <div className="menu-card-body">
        <span className="menu-card-price-badge">{item.price}</span>
        <h3 className="menu-card-name">{item.name}</h3>

        <div className="menu-row-milk-toggle" role="group" aria-label={`Tipo de leche — ${item.name}`}>
          <button
            type="button"
            className={`menu-row-milk-btn${milk === "deslactosada" ? " is-active" : ""}`}
            aria-pressed={milk === "deslactosada"}
            onClick={() => setMilk("deslactosada")}
          >
            {MILK_LABELS.deslactosada}
          </button>
          <span className="menu-row-milk-sep" aria-hidden="true">/</span>
          <button
            type="button"
            className={`menu-row-milk-btn${milk === "descremada" ? " is-active" : ""}`}
            aria-pressed={milk === "descremada"}
            onClick={() => setMilk("descremada")}
          >
            {MILK_LABELS.descremada}
          </button>
        </div>

        <span className="menu-card-macros">
          {item.protein} proteína · {facts.calories}
        </span>
        <button
          type="button"
          className="menu-card-info-btn"
          onClick={() => onOpenNutrition(item, milk)}
        >
          Información nutricional
        </button>
      </div>
    </article>
  );
}

function NutritionModal({
  source,
  onClose,
}: {
  source: NutritionSource;
  onClose: () => void;
}) {
  const [milk, setMilk] = useState<MilkType>(source.kind === "menu" ? source.milk : "deslactosada");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  const { item } = source;
  const milkSuffix = milk === "deslactosada" ? "dl" : "dc";
  const tableImage =
    source.kind === "menu"
      ? `/img-core/tablas-nutricionales/${source.item.category}/tabla_nutricional_${source.item.category}_${source.item.flavor}_${milkSuffix}.png`
      : `/img-core/tablas-nutricionales/${source.item.category}/tabla_nutricional_${source.item.category}_${source.item.flavor}.png`;

  return (
    <div className="menu-modal-overlay" onClick={onClose}>
      <div
        className="menu-modal"
        role="dialog"
        aria-modal="true"
        aria-label={`Información nutricional — ${item.name}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="menu-modal-face">
          <button type="button" className="menu-modal-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>

          <h3 className="menu-modal-name">{item.name}</h3>

          {source.kind === "menu" && (
            <div className="menu-modal-milk-toggle" role="group" aria-label={`Tipo de leche — ${item.name}`}>
              <button
                type="button"
                className={`menu-row-milk-btn${milk === "deslactosada" ? " is-active" : ""}`}
                aria-pressed={milk === "deslactosada"}
                onClick={() => setMilk("deslactosada")}
              >
                {MILK_LABELS.deslactosada}
              </button>
              <span className="menu-row-milk-sep" aria-hidden="true">/</span>
              <button
                type="button"
                className={`menu-row-milk-btn${milk === "descremada" ? " is-active" : ""}`}
                aria-pressed={milk === "descremada"}
                onClick={() => setMilk("descremada")}
              >
                {MILK_LABELS.descremada}
              </button>
            </div>
          )}

          <img
            className="menu-modal-table-img"
            src={tableImage}
            alt={`Tabla nutricional — ${item.name}`}
            loading="eager"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

export default function MenuSection() {
  const [activeNutrition, setActiveNutrition] = useState<NutritionSource | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>(".why-animate");
    if (!targets?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="menu-section">
      <div className="menu-inner">

        {/* Header */}
        <div className="menu-header">
          <span className="menu-eyebrow why-animate">Menú</span>
          <h2 className="menu-title why-animate" style={{ transitionDelay: "60ms" }}>
            Hay un Blendia para ti
          </h2>
        </div>

        {/* Seasonal spotlight — only rendered while a limited release is active */}
        {SEASONAL_DRINK && (
          <SeasonalPromo
            item={SEASONAL_DRINK}
            onOpenNutrition={(item) => setActiveNutrition({ kind: "seasonal", item })}
          />
        )}

        <h3 className="menu-sabores-heading why-animate">Nuestros sabores</h3>

        {/* Unified grid — no categories, no filters */}
        <div className="menu-list">
          {ITEMS.map((item, index) => (
            <MenuCard
              key={item.id}
              item={item}
              revealDelay={Math.min(index, 5) * 60}
              onOpenNutrition={(item, milk) => setActiveNutrition({ kind: "menu", item, milk })}
            />
          ))}
        </div>

      </div>

      {activeNutrition && (
        <NutritionModal
          source={activeNutrition}
          onClose={() => setActiveNutrition(null)}
        />
      )}
    </section>
  );
}
