import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Selecciona",
    desc: "Elige categoría y tipo de leche desde la pantalla.",
  },
  {
    num: "02",
    title: "Paga",
    desc: "Pago sin contacto con tu tarjeta.",
  },
  {
    num: "03",
    title: "Observa",
    desc: "Tu Blendia preparado en el momento.",
  },
  {
    num: "04",
    title: "Recibe",
    desc: "Entrega inmediata en menos de dos minutos.",
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>(".why-animate");
    if (!targets?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px 80px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="how" ref={sectionRef} className="experience-v2">
      <div className="experience-v2-inner">

        <div className="exp-header why-animate">
          <span className="exp-eyebrow">Cómo funciona</span>
          <h2 className="exp-title">Cuatro pasos desde el antojo hasta el vaso en tus manos.</h2>
        </div>

        <div className="exp-steps">
          {steps.map((step, index) => (
            <div
              key={step.num}
              className="exp-step why-animate"
              style={{ transitionDelay: `${80 + index * 100}ms` }}
            >
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
