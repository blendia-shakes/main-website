import { useEffect, useState } from "react";

function PinIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      style={{ width: 14, height: 14, flexShrink: 0 }}
    >
      <path d="M8 1.5C5.5 1.5 4 4 4 6.5c0 3.5 4 8 4 8s4-4.5 4-8C12 4 10.5 1.5 8 1.5z" />
      <circle cx="8" cy="6.5" r="1.5" />
    </svg>
  );
}

export default function FloatingCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const loc = document.getElementById("ubicaciones");
      const locEnd = loc ? loc.offsetTop + loc.offsetHeight : Infinity;
      setVisible(y > 360 && y < locEnd - 80);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  const go = () =>
    document.getElementById("ubicaciones")?.scrollIntoView({ behavior: "smooth" });

  return (
    <div className={`float-cta${visible ? " is-visible" : ""}`} aria-hidden={!visible}>
      <button
        type="button"
        className="float-cta-btn"
        onClick={go}
        tabIndex={visible ? 0 : -1}
        aria-label="Encuentra una máquina Blendia"
      >
        <PinIcon />
        Encuentra una máquina
      </button>
    </div>
  );
}
