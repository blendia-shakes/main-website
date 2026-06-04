import { useEffect, useRef, useState } from "react";

type Props = {
  theme: "dark" | "light";
  onToggle: () => void;
  brandLogo: string;
  scrollTo: (id: string) => void;
};

const NAV_LINKS = [
  { label: "Sabores",     id: "catalogo",    icon: "✦" },
  { label: "Experiencia", id: "experiencia",  icon: "◈" },
  { label: "Ubicaciones", id: "ubicaciones",  icon: "◎" },
];

// Fan of 3 items below the hamburger: -50°, 0°, +50° from straight-down
const RADIAL_ANGLES = [-50, 0, 50];
const RADIAL_RADIUS = 122;

function getOffset(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(radius * Math.sin(rad)),
    y: Math.round(radius * Math.cos(rad)),
  };
}

export default function Navbar({ theme, onToggle, brandLogo, scrollTo }: Props) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const [hamPos, setHamPos]       = useState<{ x: number; y: number } | null>(null);
  const hamRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Capture hamburger center in viewport coords when menu opens
  useEffect(() => {
    if (menuOpen && hamRef.current) {
      const r = hamRef.current.getBoundingClientRect();
      setHamPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setHamPos(null);
    }
  }, [menuOpen]);

  // Close on Escape
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  // Close on scroll
  useEffect(() => {
    if (!menuOpen) return;
    const handler = () => setMenuOpen(false);
    window.addEventListener("scroll", handler, { passive: true, once: true });
    return () => window.removeEventListener("scroll", handler);
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <nav className={`navbar${scrolled ? " is-scrolled" : ""}`} aria-label="Navegación principal">
      <div className="navbar-inner">
        <div className="navbar-content">

          {/* Logo */}
          <button
            type="button"
            className="navbar-logo-btn"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Ir al inicio"
          >
            <img src={brandLogo} alt="Blendia" className="navbar-logo" loading="eager" decoding="async" fetchPriority="high" />
          </button>

          {/* Hamburger — mobile only */}
          <button
            ref={hamRef}
            type="button"
            className={`navbar-hamburger${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>

          {/* Desktop links */}
          <div className="navbar-links" role="list">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                role="listitem"
                className="navbar-link"
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Right: toggle + CTA */}
          <div className="navbar-right">
            <button
              type="button"
              className="navbar-toggle"
              onClick={onToggle}
              aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
            >
              <span className="navbar-toggle-icon" aria-hidden="true">☽</span>
              <span className="navbar-toggle-label">
                {theme === "dark" ? "Claro" : "Oscuro"}
              </span>
            </button>

            <button
              type="button"
              className="navbar-cta"
              onClick={() => scrollTo("ubicaciones")}
            >
              Encuentra una máquina
            </button>
          </div>

        </div>
      </div>

      {/* ── Launchy-style radial menu (mobile only) ── */}
      {menuOpen && hamPos && (
        <>
          <div
            className="radial-backdrop"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
          <div
            className="radial-menu"
            role="menu"
            aria-label="Menú de navegación"
            style={{ left: hamPos.x, top: hamPos.y } as React.CSSProperties}
          >
            {NAV_LINKS.map(({ label, id, icon }, i) => {
              const { x, y } = getOffset(RADIAL_ANGLES[i], RADIAL_RADIUS);
              return (
                <button
                  key={id}
                  type="button"
                  role="menuitem"
                  className="radial-item"
                  style={{
                    "--rx": `${x}px`,
                    "--ry": `${y}px`,
                    "--delay": `${i * 55}ms`,
                  } as React.CSSProperties}
                  onClick={() => handleNav(id)}
                >
                  <span className="radial-item-icon" aria-hidden="true">{icon}</span>
                  <span className="radial-item-label">{label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </nav>
  );
}
