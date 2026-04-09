export default function Experience() {
  const steps = [
    {
      number: "01",
      title: "Selecciona",
      description:
        "Escoge categoría y sabor desde la pantalla o escaneando el QR.",
      meta: "Categoría + sabor",
    },
    {
      number: "02",
      title: "Personaliza",
      description:
        "Añade proteína extra, leche vegetal o versión sin azúcar.",
      meta: "Opciones modulares",
    },
    {
      number: "03",
      title: "Recibe",
      description:
        "Pago integrado y entrega inmediata con packaging de marca.",
      meta: "Cobro + entrega",
    },
  ];

  return (
    <section className="experience-v2">
      <div className="experience-v2-inner">
        
        {/* HEADER */}
        <div className="experience-v2-header">
          <span className="exp-eyebrow">Blendia experience</span>

          <h2 className="exp-title">
            La experiencia Blendia
          </h2>

          <p className="exp-description">
            Problema → elección → resultado. Una experiencia diseñada para ser
            clara, rápida y premium desde el primer contacto.
          </p>

          <div className="exp-metrics">
            {[
              { k: "1", v: "decisión" },
              { k: "3", v: "pasos" },
              { k: "0", v: "fricción" },
            ].map((item) => (
              <div key={item.v}>
                <strong>{item.k}</strong>
                <span>{item.v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* TIMELINE */}
        <div className="exp-timeline">
          <div className="exp-rail" />

          {steps.map((step, i) => (
            <div key={step.number} className="exp-step">
              
              <div className="exp-node">
                <span>{step.number}</span>
              </div>

              <div className="exp-card">
                <span className="exp-meta">{step.meta}</span>

                <h3>{step.title}</h3>

                <p>{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}