import { useEffect, useRef, useState } from "react";
import { ITEMS, SEASONAL_DRINKS, type NutritionSource } from "../data/menu";
import MenuCard from "./menu/MenuCard";
import NutritionModal from "./menu/NutritionModal";
import SeasonalPromo from "./menu/SeasonalPromo";

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
            Descubre Blendia
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
