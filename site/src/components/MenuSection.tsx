import { useEffect, useRef, useState } from "react";

type Tint     = "vanilla-latte" | "vanilla-shake" | "chocolate" | "matcha" | "chai" | "sakura" | "pumpkin-spice";
type Category = "shakes" | "latte";
type MilkType = "deslactosada" | "descremada";

type MilkFacts = { ingredients: string; calories: string; protein: string };

type MenuItem = {
  id: string;
  category: Category;
  flavor: "vanilla" | "chocolate" | "matcha" | "chai";
  flavorLabel: string;
  name: string;
  price: string;
  tint: Tint;
  milk: Record<MilkType, MilkFacts>;
};

type SeasonalItem = {
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
type NutritionSource =
  | { kind: "menu"; item: MenuItem; milk: MilkType }
  | { kind: "seasonal"; item: SeasonalItem };

const TINT_ACCENT: Record<Tint, string> = {
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
const TINT_BADGE_INK: Partial<Record<Tint, string>> = {
  "vanilla-shake": "#403F45",
  sakura: "#403F45",
  "pumpkin-spice": "#403F45",
};

// The permanent lineup — one product, milk type is a prep choice, not a
// different drink (toggled locally in MenuCard / NutritionModal).
// Display order: Vainilla Latte → Chocolate Latte → Matcha Shake →
// Chai Shake → Chocolate Shake → Vainilla Shake.
const ITEMS: MenuItem[] = [
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
const SEASONAL_DRINKS: SeasonalItem[] = [
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
        "--row-tint-badge-ink": TINT_BADGE_INK[item.tint],
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
          <div className="menu-seasonal-badges">
            <span className="menu-seasonal-badge">Edición limitada</span>
            <span className="menu-card-price-badge">{item.price}</span>
          </div>
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
  const frontImage = `/img-core/drinks/${item.flavor}.webp`;

  return (
    <article
      className="menu-card why-animate"
      style={{
        "--row-tint": TINT_ACCENT[item.tint],
        "--row-tint-badge-ink": TINT_BADGE_INK[item.tint],
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
          {facts.protein} proteína · {facts.calories}
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
  // Seasonal items have no dedicated table yet — they're a limited-edition
  // spin on an existing shake flavor, so they borrow that shake's table.
  const productWord = source.kind === "menu" && source.item.category === "latte" ? "latte" : "shake";
  const tableImage = `/img-core/nutrition-tables/table_${item.flavor}_blendia_${productWord}_${milkSuffix}.webp`;

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
          <h2 className="menu-title why-animate" style={{ transitionDelay: "60ms" }}>
            Hay un Blendia para ti
          </h2>
        </div>

        {/* Seasonal spotlight(s) — each only rendered while that limited release is active */}
        {SEASONAL_DRINKS.filter((item) => item.available).map((item) => (
          <SeasonalPromo
            key={item.name}
            item={item}
            onOpenNutrition={(item) => setActiveNutrition({ kind: "seasonal", item })}
          />
        ))}

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
