import { useEffect, useState } from "react";
import { TINT_ACCENT, TINT_BADGE_INK, type MilkType, type NutritionSource } from "../../data/menu";
import MilkToggle from "./MilkToggle";

export default function NutritionModal({
  source,
  onClose,
}: {
  source: NutritionSource;
  onClose: () => void;
}) {
  const [milk, setMilk] = useState<MilkType>(source.milk);

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
        <div
          className="menu-modal-face"
          data-tint={item.tint}
          data-id={source.kind === "menu" ? source.item.id : undefined}
          style={{
            "--row-tint": TINT_ACCENT[item.tint],
            "--row-tint-badge-ink": TINT_BADGE_INK[item.tint],
          } as React.CSSProperties}
        >
          <button type="button" className="menu-modal-close" onClick={onClose} aria-label="Cerrar">
            ×
          </button>

          <h3 className="menu-modal-name">{item.name}</h3>

          <MilkToggle
            milk={milk}
            onChange={setMilk}
            ariaLabel={`Tipo de leche — ${item.name}`}
            className="menu-modal-milk-toggle"
          />

          <div className="menu-modal-table-frame">
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
    </div>
  );
}
