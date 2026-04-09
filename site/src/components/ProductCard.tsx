import { useEffect, useState } from "react";

type Props = {
  category: string;
  displayName: string;
  flavorKey: string;
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
    if (typeof window === "undefined") return;

    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);

    update();

    if (mq.addEventListener) {
      mq.addEventListener("change", update);
      return () => mq.removeEventListener("change", update);
    }

    mq.addListener(update);
    return () => mq.removeListener(update);
  }, []);

  const frontImage = `/img-core/bebidas/${category}/${category}_${flavorKey}.png`;
  const backImage = `/img-core/tablas-nutricionales/${category}/tabla_nutricional_${category}_${flavorKey}.png`;

  const pinIcon = isPinned
    ? "/img-core/extras/pinned.png"
    : "/img-core/extras/unpinned.png";

  const isHovered = canHover && hovered && !isPinned;
  const isFlipped = isPinned || isHovered || isTransientOpen;

  const handleFrontClick = () => {
    if (canHover) return;
    if (isPinned || isTransientOpen) return;
    onOpenTransient();
  };

  const handleBackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;

    if (target?.closest('[data-role="pin"]')) return;
    if (canHover) return;
    if (isPinned) return;

    onCloseTransient();
  };

  const handlePinClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (isPinned) onUnpin();
    else onPin();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Enter" && e.key !== " ") return;

    e.preventDefault();

    if (isPinned) {
      onUnpin();
      return;
    }

    if (canHover) {
      onPin();
      return;
    }

    if (isTransientOpen) onCloseTransient();
    else onOpenTransient();
  };

  return (
    <div
      className={[
        "product-card",
        isHovered ? "is-hovered" : "",
        isFlipped ? "is-flipped" : "",
        isPinned ? "is-locked" : "",
      ]
        .filter(Boolean)
        .join(" ")}
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
        <div className="product-card-face product-card-front" onClick={handleFrontClick}>
          <div className="product-title">{displayName}</div>
          <img
            src={frontImage}
            alt={displayName}
            loading={canHover ? "lazy" : "eager"}
            decoding="async"
            draggable={false}
          />
        </div>

        <div className="product-card-face product-card-back" onClick={handleBackClick}>
          <div className="product-card-back-header">
            <div className="product-title product-title-back">{displayName}</div>

            <button
              type="button"
              className="info-cta"
              data-role="pin"
              onPointerDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              onClick={handlePinClick}
              aria-label="Anclar detalle"
            >
              <img src={pinIcon} alt="" aria-hidden="true" draggable={false} />
            </button>
          </div>

          <img
            src={backImage}
            alt={`Tabla nutricional de ${displayName}`}
            loading={canHover ? "lazy" : "eager"}
            decoding="async"
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}