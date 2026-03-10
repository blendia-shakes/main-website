import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>© {new Date().getFullYear()} <strong>Blendia</strong></div>
        <nav className="footer-nav">
          <a href="/privacy.html">Política de privacidad</a>
          <a href="/terms.html">Términos</a>
        </nav>
      </div>
    </footer>
  );
}