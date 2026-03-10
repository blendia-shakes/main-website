import React from "react";

export default function Hero() {
  return (
    <section id="hero" className="hero hero-apple">
      <div className="container hero-grid">
        <div className="hero-copy">
          <h1 className="hero-title">Wellness que se sirve solo.</h1>
          <p className="hero-lead">
            Máquinas automáticas (modelo ) que preparan bebidas saludables
            con proteína en segundos. Ideal para gimnasios, centros comerciales y
            espacios premium.
          </p>

          <div className="hero-ctas">
            <a className="btn primary" href="#catalogo">Ver catálogo</a>
            <a className="btn ghost" href="#contacto">Solicitar máquina</a>
          </div>

          <ul className="hero-features">
            <li>3 categorías — Latte, Shakes, Essentials</li>
            <li>Personalizable, sin azúcares añadidos</li>
            <li>Rango de precio orientativo: Qxx–Qxx</li>
          </ul>
        </div>

        <figure className="hero-media">
          <img src="/assets/-front.jpg" alt="Máquina  Blendia" />
          <figcaption className="visually-hidden">Máquina </figcaption>
        </figure>
      </div>
    </section>
  );
}