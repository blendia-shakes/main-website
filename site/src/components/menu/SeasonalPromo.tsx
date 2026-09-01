import { TINT_ACCENT, TINT_BADGE_INK, type SeasonalItem } from "../../data/menu";

export default function SeasonalPromo({
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
