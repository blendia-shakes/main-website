import { useEffect, useRef, useState } from "react";

type Props = {
  theme: "dark" | "light";
  onToggle: () => void;
  brandLogo: string;
  scrollTo: (id: string) => void;
};

const NAV_LINKS = [
  { label: "Sabores",     id: "menu",        icon: "✦" },
  { label: "Experiencia", id: "how",          icon: "◈" },
  { label: "Ubicaciones", id: "ubicaciones",  icon: "◎" },
];

const RADIAL_ANGLES = [-50, 0, 50];
const RADIAL_RADIUS = 122;

function getOffset(angleDeg: number, radius: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: Math.round(radius * Math.sin(rad)),
    y: Math.round(radius * Math.cos(rad)),
  };
}

function MoonIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  );
}

export default function Navbar({ theme, onToggle, brandLogo, scrollTo }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hamPos, setHamPos]     = useState<{ x: number; y: number } | null>(null);
  const hamRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  useEffect(() => {
    if (menuOpen && hamRef.current) {
      const r = hamRef.current.getBoundingClientRect();
      setHamPos({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
    } else {
      setHamPos(null);
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

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
            <img src={brandLogo} alt="Blendia" className="navbar-logo" loading="eager" decoding="async" />
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
              aria-label={theme === "light" ? "Cambiar a modo oscuro" : "Cambiar a modo claro"}
            >
              <span className="navbar-toggle-icon">
                {theme === "light" ? <MoonIcon /> : <SunIcon />}
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

      {/* Radial menu — mobile only */}
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
