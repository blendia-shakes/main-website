import { useEffect, useRef, useState } from "react";
import ProductCard from "./ProductCard";
import { categories, flavors } from "../data/products";

export default function ProductGrid() {
  const gridRef = useRef<HTMLElement | null>(null);
  const [pinnedIds,    setPinnedIds]    = useState<string[]>([]);
  const [transientIds, setTransientIds] = useState<string[]>([]);

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!pinnedIds.length && !transientIds.length) return;
      if (!gridRef.current?.contains(e.target as Node)) {
        setPinnedIds([]);
        setTransientIds([]);
      }
    };
    document.addEventListener("pointerdown", handlePointerDown, true);
    return () => document.removeEventListener("pointerdown", handlePointerDown, true);
  }, [pinnedIds, transientIds]);

  const addId    = (set: React.Dispatch<React.SetStateAction<string[]>>, id: string) =>
    set((prev) => prev.includes(id) ? prev : [...prev, id]);

  const removeId = (set: React.Dispatch<React.SetStateAction<string[]>>, id: string) =>
    set((prev) => prev.filter((x) => x !== id));

  const pinCard   = (id: string) => { addId(setPinnedIds, id); addId(setTransientIds, id); };
  const unpinCard = (id: string) => { removeId(setPinnedIds, id); removeId(setTransientIds, id); };

  return (
    <section id="catalogo" ref={gridRef} className="container catalog-shell">
      {categories.map(({ name, label }, catIndex) => (
        <section key={name} className="category-block">
          <div className="category-header">
            <span className="category-chip category-chip-large">{label}</span>
          </div>

          {/*
            .carousel-track  — visual container: transparent bg + rounded corners.
                               On desktop this is invisible (reset via media query).
            .grid            — scrollable flex row on mobile/tablet, 4-col grid on desktop.
          */}
          <div className="carousel-track">
            <div
              className="grid"
              role="region"
              aria-label={`${label} — desliza para ver más`}
            >
              {flavors.map(({ key, label: flavorLabel }) => {
                const id = `${name}-${key}`;
                return (
                  <ProductCard
                    key={id}
                    category={name}
                    flavorKey={key}
                    displayName={`— ${flavorLabel} —`}
                    eager={catIndex === 0}
                    isPinned={pinnedIds.includes(id)}
                    isTransientOpen={transientIds.includes(id)}
                    onOpenTransient={() => addId(setTransientIds, id)}
                    onCloseTransient={() => removeId(setTransientIds, id)}
                    onPin={() => pinCard(id)}
                    onUnpin={() => unpinCard(id)}
                  />
                );
              })}
            </div>
          </div>
        </section>
      ))}
    </section>
  );
}
