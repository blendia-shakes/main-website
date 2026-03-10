import React from "react";

const Case = ({ emoji, title, text }: { emoji: string; title: string; text: string }) => (
  <div className="usecase">
    <div className="usecase-emoji" aria-hidden>{emoji}</div>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

export default function UseCases() {
  return (
    <section className="section container">
      <h2 className="section-title">Perfecto para</h2>
      <div className="usecases-grid">
        <Case emoji="🏋️" title="Gimnasios" text="Recuperación post entrenamiento y productos premium para socios."/>
        <Case emoji="🛍️" title="Centros comerciales" text="Experiencias rápidas y recurrentes para visitantes."/>
        <Case emoji="🏨" title="Hoteles & Oficinas" text="Conveniencia premium para huéspedes y empleados."/>
        <Case emoji="🏪" title="Locales y coworks" text="Aumenta tiempo de permanencia y ticket medio."/>
      </div>
    </section>
  );
}