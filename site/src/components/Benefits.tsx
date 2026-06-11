const stats = [
  {
    number: "30g",
    label: "Proteína por vaso",
    desc: "Proteína whey.",
  },
  {
    number: "60s",
    label: "Preparado en el momento",
    desc: "Todo es preparado en el momento en que haces tap en la pantalla.",
  },
  {
    number: "0g",
    label: "Azúcares añadidos",
    desc: "Los endulzantes utilizados son intrínsecos de cada ingrediente.",
  },
  {
    number: "<1.5g",
    label: "Grasas",
    desc: "Perfil nutricional limpio, diseñado para el consumo diario.",
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="benefits-section">
      <div className="benefits-inner">

        {/* Sticky intro */}
        <div className="benefits-intro">
          <span className="benefits-eyebrow">Lo que contiene</span>
          <h2 className="benefits-title">Beneficios reales, no solo sabor.</h2>
          <p className="benefits-sub">
            Cada bebida tiene como base proteína whey e ingredientes naturales — con 0 azúcares añadidos.
          </p>
        </div>

        {/* Stat cards */}
        <div className="benefits-stats">
          {stats.map(stat => (
            <div key={stat.label} className="stat-card">
              <span className="stat-number">{stat.number}</span>
              <p className="stat-label">{stat.label}</p>
              <p className="stat-desc">{stat.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
