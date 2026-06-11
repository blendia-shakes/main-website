type Props = {
  brandLogo: string;
};

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      width="20"
      height="20"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
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
