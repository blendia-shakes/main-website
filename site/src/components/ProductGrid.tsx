import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
type CategoryKey = "essentials" | "shakes" | "latte";
type FlavorKey = "moon" | "midnight" | "zen" | "masala";
type Category = {
  name: CategoryKey;
  label: string;
};
type Flavor = {
  key: FlavorKey;
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
export default function ProductGrid() {
  const gridRef = useRef<HTMLElement | null>(null);
  const [pinnedCardIds, setPinnedCardIds] = useState<string[]>([]);
  const [transientOpenCardIds, setTransientOpenCardIds] = useState<string[]>([]);
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (pinnedCardIds.length === 0 && transientOpenCardIds.length === 0) return;
      const target = event.target as Node;
      if (gridRef.current && !gridRef.current.contains(target)) {
        setPinnedCardIds([]);
        setTransientOpenCardIds([]);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [pinnedCardIds, transientOpenCardIds]);
  const pinCard = (cardId: string) => {
    setPinnedCardIds((prev) => (prev.includes(cardId) ? prev : [...prev, cardId]));
    setTransientOpenCardIds((prev) =>
      prev.includes(cardId) ? prev : [...prev, cardId]
    );
  };
  const unpinCard = (cardId: string) => {
    setPinnedCardIds((prev) => prev.filter((id) => id !== cardId));
    // ✅ FIX: also clear transient state so hover can re-drive the flip on desktop
    setTransientOpenCardIds((prev) => prev.filter((id) => id !== cardId));
  };
  const openTransientCard = (cardId: string) => {
    setTransientOpenCardIds((prev) =>
      prev.includes(cardId) ? prev : [...prev, cardId]
    );
  };
  const closeTransientCard = (cardId: string) => {
    setTransientOpenCardIds((prev) => prev.filter((id) => id !== cardId));
  };
  return (
    <section ref={gridRef} className="container catalog-shell">
      {categories.map((category) => (
        <section key={category.name} className="category-block">
          <div className="category-header">
            <span className="category-chip category-chip-large">
              {category.label}
            </span>
          </div>
          <div className="grid">
            {flavors.map((flavor) => {
              const cardId = `${category.name}-${flavor.key}`;
              return (
                <ProductCard
                  key={cardId}
                  category={category.name}
                  flavorKey={flavor.key}
                  displayName={`— ${flavor.label} —`}
                  isPinned={pinnedCardIds.includes(cardId)}
                  isTransientOpen={transientOpenCardIds.includes(cardId)}
                  onOpenTransient={() => openTransientCard(cardId)}
                  onCloseTransient={() => closeTransientCard(cardId)}
                  onPin={() => pinCard(cardId)}
                  onUnpin={() => unpinCard(cardId)}
                />
              );
            })}
          </div>
        </section>
      ))}
    </section>
  );
}