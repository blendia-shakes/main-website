const steps = [
  {
    num: "01",
    title: "Selecciona",
    desc: "Elige categoría y sabor desde la pantalla.",
  },
  {
    num: "02",
    title: "Paga",
    desc: "Pago sin contacto con tu tarjeta.",
  },
  {
    num: "03",
    title: "Observa",
    desc: "Estás a solo unos segundos de sorprenderte.",
  },
  {
    num: "04",
    title: "Recibe",
    desc: "Entrega inmediata en menos de un minuto.",
  },
];

export default function Experience() {
  return (
    <section id="how" className="experience-v2">
      <div className="experience-v2-inner">

        <div className="exp-header">
          <span className="exp-eyebrow">Cómo funciona</span>
          <h2 className="exp-title">Tres taps desde el antojo hasta el vaso en tus manos.</h2>
        </div>

        <div className="exp-steps">
          {steps.map(step => (
            <div key={step.num} className="exp-step">
              <span className="exp-step-num">{step.num}</span>
              <h3 className="exp-step-title">{step.title}</h3>
              <p className="exp-step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
