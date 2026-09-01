import { MILK_LABELS, type MilkType } from "../../data/menu";

export default function MilkToggle({
  milk,
  onChange,
  ariaLabel,
  className = "menu-row-milk-toggle",
}: {
  milk: MilkType;
  onChange: (milk: MilkType) => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div className={className} role="group" aria-label={ariaLabel}>
      <button
        type="button"
        className={`menu-row-milk-btn${milk === "deslactosada" ? " is-active" : ""}`}
        aria-pressed={milk === "deslactosada"}
        onClick={() => onChange("deslactosada")}
      >
        {MILK_LABELS.deslactosada}
      </button>
      <span className="menu-row-milk-sep" aria-hidden="true">/</span>
      <button
        type="button"
        className={`menu-row-milk-btn${milk === "descremada" ? " is-active" : ""}`}
        aria-pressed={milk === "descremada"}
        onClick={() => onChange("descremada")}
      >
        {MILK_LABELS.descremada}
      </button>
    </div>
  );
}
