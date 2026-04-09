import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";

type Category = {
  name: string;
  label: string;
};

type Flavor = {
  key: "moon" | "midnight" | "zen" | "masala";
  label: string;
};

const categories: Category[] = [
  { name: "essentials", label: "Essentials" },
  { name: "shakes", label: "Blendia Shakes" },
  { name: "latte", label: "Blendia Latte" },
];

const flavors: Flavor[] = [
  { key: "moon", label: "Moon" },
  { key: "midnight", label: "Midnight" },
  { key: "zen", label: "Zen" },
  { key: "masala", label: "Masala" },
];

const brandLogo = "/img-core/extras/logo-texto-completo.png";

export default function ProductGrid() {
  const gridRef = useRef<HTMLElement | null>(null);
  const [openCardIds, setOpenCardIds] = useState<string[]>([]);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (openCardIds.length === 0) return;

      const target = event.target as Node;
      if (gridRef.current && !gridRef.current.contains(target)) {
        setOpenCardIds([]);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [openCardIds]);

  const toggleCard = (cardId: string) => {
    setOpenCardIds((prev) =>
      prev.includes(cardId) ? prev.filter((id) => id !== cardId) : [...prev, cardId]
    );
  };

  return (
    <section ref={gridRef} className="container catalog-shell">
      <header className="catalog-hero">
        <div className="brand-lockup">
          <div className="brand-mark" aria-label="Blendia">
            <img
              src={brandLogo}
              alt="Blendia"
              className="brand-logo"
              onError={(e) => {
                const img = e.currentTarget;
                img.style.display = "none";
                const fallback = img.parentElement?.querySelector<HTMLElement>(".brand-fallback");
                if (fallback) fallback.style.display = "inline-flex";
              }}
            />
            <span className="brand-fallback">Blendia</span>
          </div>

          <div className="hero-pills" aria-hidden="true">
            <span className="hero-pill">Dark mode</span>
            <span className="hero-pill">Premium catalog</span>
            <span className="hero-pill">Multi-pin compare</span>
          </div>
        </div>

        <h1 className="catalog-heading">Discover the Blendia lineup</h1>
        <p className="catalog-copy">
          Hover to preview, pin to keep it open, and compare several cards at the same time.
        </p>
      </header>

      {categories.map((category) => (
        <section key={category.name} className="category-block">
          <div className="category-header">
            <span className="category-chip category-chip-large">{category.label}</span>
          </div>

          <div className="grid">
            {flavors.map((flavor) => {
              const cardId = `${category.name}-${flavor.key}`;

              return (
                <ProductCard
                  key={cardId}
                  category={category.name}
                  flavorKey={flavor.key}
                  displayName={`${flavor.label} — ${category.label}`}
                  isOpen={openCardIds.includes(cardId)}
                  onOpen={() => toggleCard(cardId)}
                  onClose={() => toggleCard(cardId)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}