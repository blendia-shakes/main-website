import { useEffect, useState, type MouseEvent, type KeyboardEvent } from "react";

type CategoryKey = "essentials" | "shakes" | "latte";
type FlavorKey = "moon" | "midnight" | "zen" | "masala";

type Props = {
  category: CategoryKey;
  displayName: string;
  flavorKey: FlavorKey;
  isPinned: boolean;
  isTransientOpen: boolean;
  onOpenTransient: () => void;
  onCloseTransient: () => void;
  onPin: () => void;
  onUnpin: () => void;
};

export default function ProductCard({
  category,
  displayName,
  flavorKey,
  isPinned,
  isTransientOpen,
  onOpenTransient,
  onCloseTransient,
  onPin,
  onUnpin,
}: Props) {
  const [hovered, setHovered] = useState(false);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const frontImage = `/img-core/bebidas/${category}/${category}_${flavorKey}.png`;
  const backImage  = `/img-core/tablas-nutricionales/${category}/tabla_nutricional_${category}_${flavorKey}.png`;
  const pinIcon    = isPinned ? "/img-core/extras/pinned.png" : "/img-core/extras/unpinned.png";

  const isHovered = canHover && hovered;
  const isFlipped = isPinned || isHovered || isTransientOpen;

  const openAfterUnpin = () => window.requestAnimationFrame(onOpenTransient);

  const handleFrontClick = () => {
    if (canHover || isPinned || isTransientOpen) return;
    onOpenTransient();
  };

  const handleBackClick = (e: MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('[data-role="pin"]')) return;
    if (canHover || isPinned) return;
    onCloseTransient();
  };

  const handlePinClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isPinned) { onUnpin(); if (!canHover) openAfterUnpin(); return; }
    onPin();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    if (isPinned) { onUnpin(); if (!canHover) openAfterUnpin(); return; }
    if (canHover) { onPin(); return; }
    isTransientOpen ? onCloseTransient() : onOpenTransient();
  };

  const imgProps = {
    loading: canHover ? ("lazy" as const) : ("eager" as const),
    decoding: "async" as const,
    draggable: false,
  };

  return (
    <div
      className={[
        "product-card",
        isHovered  && "is-hovered",
        isFlipped  && "is-flipped",
        isPinned   && "is-locked",
      ].filter(Boolean).join(" ")}
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => canHover && setHovered(false)}
      role="button"
      tabIndex={0}
      aria-pressed={isPinned}
      aria-expanded={isFlipped}
      aria-label={displayName}
      onKeyDown={handleKeyDown}
    >
      <div className="product-card-inner">
        {/* FRONT */}
        <div className="product-card-face product-card-front" onClick={handleFrontClick}>
          <div className="product-title">{displayName}</div>
          <img src={frontImage} alt={displayName} {...imgProps} />
        </div>

        {/* BACK */}
        <div className="product-card-face product-card-back" onClick={handleBackClick}>
          <div className="product-card-back-header">
            <div className="product-title product-title-back">{displayName}</div>
            <button
              type="button"
              className="info-cta"
              data-role="pin"
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={handlePinClick}
              aria-label="Anclar detalle"
            >
              <img src={pinIcon} alt="" aria-hidden="true" draggable={false} />
            </button>
          </div>
          <img src={backImage} alt={`Tabla nutricional de ${displayName}`} {...imgProps} />
        </div>
      </div>
    </div>
  );
}
