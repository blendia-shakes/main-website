import React from "react";

type Cat = { title: string; subtitle?: string; items: string[]; img?: string };

const C = ({ c }: { c: Cat }) => (
  <article className="card catalog-card">
    <div className="catalog-head">
      <h3>{c.title}</h3>
      {c.subtitle && <p className="card-sub">{c.subtitle}</p>}
    </div>
    <ul className="items">
      {c.items.map(i => <li key={i}>{i}</li>)}
    </ul>
  </article>
);

export default function CatalogCards() {
  const categories: Cat[] = [
    {
      title: "Latte",
      subtitle: "Bebidas cremosas a base de leches con proteína",
      items: ["Latte Vainilla", "Latte Chai", "Matcha + Proteína", "Chocolate oscuro", "Café frío"]
    },
    {
      title: "Shakes",
      subtitle: "Smoothies y batidos para energía y recuperación",
      items: ["Shake Fresa", "Shake Banana", "Shake Mango", "Shake Verde", "Shake Tropical"]
    },
    {
      title: "Essentials",
      subtitle: "Funcionales: colágeno, electrolitos y shots",
      items: ["Colágeno + Proteína", "Electrolitos", "Digestive", "Immunity Shot", "Calm & Restore"]
    }
  ];

  return (
    <section id="catalogo" className="section container">
      <h2 className="section-title">Catálogo</h2>
      <p className="section-sub">Tres líneas pensadas para distintos momentos del día.</p>

      <div className="catalog-grid">
        {categories.map(c => <C key={c.title} c={c} />)}
      </div>
    </section>
  );
}