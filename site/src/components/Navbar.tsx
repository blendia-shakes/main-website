import { useEffect, useRef, useState } from "react";

type Props = {
  theme: "dark" | "light";
  onToggle: () => void;
  brandLogo: string;
  scrollTo: (id: string) => void;
};

const NAV_LINKS = [
  { label: "Sabores",     id: "catalogo"   },
  { label: "Experiencia", id: "experiencia" },
  { label: "Ubicaciones", id: "ubicaciones" },
];

export default function Navbar({ theme, onToggle, brandLogo, scrollTo }: Props) {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleNav = (id: string) => {
    setMenuOpen(false);
    scrollTo(id);
  };

  return (
    <nav className={`navbar${scrolled ? " is-scrolled" : ""}`} aria-label="Navegación principal">
      <div className="navbar-inner" ref={menuRef}>
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

          {/* Hamburger — mobile only (col 2) */}
          <button
            type="button"
            className={`navbar-hamburger${menuOpen ? " is-open" : ""}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
          >
            <span /><span /><span />
          </button>

          {/* Desktop links (col 2) */}
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

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="navbar-mobile-menu" role="menu">
            {NAV_LINKS.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                role="menuitem"
                className="navbar-mobile-link"
                onClick={() => handleNav(id)}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
