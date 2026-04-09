export default function Footer() {
  return (
    <footer className="footer-v2">
      <div className="footer-inner">
        
        {/* LEFT */}
        <div className="footer-left">
          <span className="footer-brand">Blendia</span>
          <p className="footer-copy">
            © 2026 · Diseño enfocado en simplicidad, claridad y experiencia premium.
          </p>
        </div>

        {/* RIGHT */}
        <nav className="footer-nav">
          <a href="#privacy">Política de privacidad</a>
          <a href="#terms">Términos</a>
        </nav>

      </div>
    </footer>
  );
}