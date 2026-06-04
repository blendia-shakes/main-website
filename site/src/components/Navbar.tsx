import { useEffect, useState } from "react";

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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handle, { passive: true });
    handle();
    return () => window.removeEventListener("scroll", handle);
  }, []);

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
    </nav>
  );
}
