import { useState } from "react";
import { TINT_ACCENT, TINT_BADGE_INK, type MenuItem, type MilkType } from "../../data/menu";
import MilkToggle from "./MilkToggle";

export default function MenuCard({
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
      data-tint={item.tint}
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

        <MilkToggle milk={milk} onChange={setMilk} ariaLabel={`Tipo de leche — ${item.name}`} />

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
