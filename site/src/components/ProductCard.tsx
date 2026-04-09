import { useEffect, useState } from "react";

type Props = {
  category: string;
  displayName: string;
  flavorKey: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export default function ProductCard({
  category,
  displayName,
  flavorKey,
  isOpen,
  onOpen,
  onClose,
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

  const isHovered = canHover && hovered && !isOpen;
  const isFlipped = isOpen || isHovered;

  const handleCardClick = () => {
    if (canHover) return;
    if (isOpen) onClose();
    else onOpen();
  };

  const handlePinPointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOpen) onClose();
    else onOpen();
  };

  return (
    <div
      className={[
        "product-card",
        isHovered ? "is-hovered" : "",
        isFlipped ? "is-flipped" : "",
        isOpen ? "is-locked" : "",
      ]
        .filter(Boolean)
        .join(" ")}
      onClick={handleCardClick}
      onMouseEnter={() => canHover && setHovered(true)}
      onMouseLeave={() => canHover && setHovered(false)}
      role="button"
      tabIndex={0}
      aria-pressed={isOpen}
      aria-expanded={isFlipped}
      aria-label={displayName}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (isOpen) onClose();
          else onOpen();
        }
      }}
    >
      <div className="product-card-inner">
        <div className="product-card-face product-card-front">
          <div className="product-title">{displayName}</div>
          <img src={frontImage} alt={displayName} loading="lazy" />
        </div>

        <div className="product-card-face product-card-back">
          <div className="product-title">{displayName}</div>

          <button
            type="button"
            className="info-cta"
            onPointerDown={handlePinPointerDown}
            aria-label="Anclar detalle"
          />

          <img
            src={backImage}
            alt={`Tabla nutricional de ${displayName}`}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}