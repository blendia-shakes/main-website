type Props = {
  brandLogo: string;
};

function IconInstagram() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      width="24"
      height="24"
    >
      <defs>
        <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
          <stop offset="0%"  stopColor="#fdf497" />
          <stop offset="5%"  stopColor="#fdf497" />
          <stop offset="45%" stopColor="#fd5949" />
          <stop offset="60%" stopColor="#d6249f" />
          <stop offset="90%" stopColor="#285AEB" />
        </radialGradient>
      </defs>
      <rect x="0" y="0" width="24" height="24" rx="6" ry="6" fill="url(#ig-grad)" />
      <circle cx="12" cy="12" r="4.5" fill="none" stroke="white" strokeWidth="1.75" />
      <circle cx="18" cy="6" r="1.2" fill="white" />
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
