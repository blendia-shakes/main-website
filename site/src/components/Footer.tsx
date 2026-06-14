type Props = {
  brandLogo: string;
};

function IconInstagram() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" width="22" height="22" fill="none">
      <defs>
        <linearGradient id="ig-g" x1="2" y1="22" x2="22" y2="2" gradientUnits="userSpaceOnUse">
          <stop offset="0%"  stopColor="#fcaf45" />
          <stop offset="35%" stopColor="#e1306c" />
          <stop offset="70%" stopColor="#833ab4" />
          <stop offset="100%" stopColor="#405de6" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="20" height="20" rx="6" ry="6" stroke="url(#ig-g)" strokeWidth="1.75" />
      <circle cx="12" cy="12" r="4.5" stroke="url(#ig-g)" strokeWidth="1.75" />
      <circle cx="17.5" cy="6.5" r="1.1" fill="url(#ig-g)" />
    </svg>
  );
}

export default function Footer({ brandLogo }: Props) {
  return (
    <footer className="footer-v2">
      <div className="footer-inner">

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

          <a
            href="https://www.instagram.com/blendiashakes"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-instagram"
            aria-label="Blendia en Instagram"
          >
            <IconInstagram />
          </a>
        </div>

      </div>
    </footer>
  );
}
