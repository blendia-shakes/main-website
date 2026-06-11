type Props = {
  brandLogo: string;
  scrollTo: (id: string) => void;
};

const FOOTER_NAV = [
  { label: "Menú",        id: "menu"        },
  { label: "Beneficios",  id: "benefits"    },
  { label: "Ubicaciones", id: "ubicaciones" },
];

export default function Footer({ brandLogo, scrollTo }: Props) {
  return (
    <footer className="footer-v2">
      <div className="footer-inner">

        {/* Bottom bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <button
              type="button"
              className="footer-logo-btn"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Ir al inicio"
            >
              <img src={brandLogo} alt="Blendia" className="footer-logo" loading="lazy" />
            </button>
            <span className="footer-copy">© 2026 Blendia</span>
          </div>

          <nav className="footer-nav" aria-label="Pie de página">
            {FOOTER_NAV.map(({ label, id }) => (
              <button
                key={id}
                type="button"
                className="footer-nav-link"
                onClick={() => scrollTo(id)}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

      </div>
    </footer>
  );
}
