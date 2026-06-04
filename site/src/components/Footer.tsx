type Props = {
  brandLogo: string;
  scrollTo: (id: string) => void;
};

const FOOTER_NAV = [
  { label: "Sabores",     id: "catalogo"    },
  { label: "Experiencia", id: "experiencia" },
  { label: "Ubicaciones", id: "ubicaciones" },
  { label: "FAQ",         id: "faq"         },
];

export default function Footer({ brandLogo, scrollTo }: Props) {
  return (
    <footer className="footer-v2">
      <div className="footer-inner">

        {/* ── Conversion block ── */}
        <div className="footer-conversion">
          <p className="footer-conversion-headline">
            Ya sabés lo que querés.
          </p>
          <button
            type="button"
            className="footer-conversion-cta"
            onClick={() => scrollTo("ubicaciones")}
          >
            Encuentra una máquina cerca de ti
          </button>
          <a href="mailto:hola@blendia.gt" className="footer-suggest">
            ¿No hay una cerca? Sugerí una ubicación →
          </a>
        </div>

        {/* ── Bottom bar ── */}
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
            <span className="footer-copy">© 2026 · Guatemala City</span>
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
