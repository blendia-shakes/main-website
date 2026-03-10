import React from "react";

export default function Nav() {
  return (
    <header className="nav-root" role="banner">
      <div className="container nav-inner">
        <a className="brand" href="#hero" aria-label="Blendia home">
          <img src="/assets/logo.svg" alt="" className="logo" />
          <span className="brand-text">Blendia</span>
        </a>

        <nav className="nav-links" role="navigation" aria-label="Main">
          <a href="#catalogo">Catálogo</a>
          <a href="#experience">Experiencia</a>
          <a href="#machine">Máquina</a>
          <a href="#contacto" className="btn small ghost">Contacto</a>
        </nav>
      </div>
    </header>
  );
}