import { useEffect, useRef } from "react";

function IconSabor() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 14h14l-2 12H11L9 14z" />
      <path d="M23 18h2a3 3 0 0 1 0 6h-2" />
      <path d="M13 8Q14 5 13 3M16 8Q17 5 16 3M19 8Q20 5 19 3" />
    </svg>
  );
}

function IconProteina() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 4L11 18h7L13 28l13-14h-7L18 4z" />
    </svg>
  );
}

function IconMenosAzucar() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 25Q12 8 25 7Q24 10 22 18Q16 24 7 25Z" />
      <path d="M7 25Q18 22 22 16" />
      <path d="M7 25L5 28" />
    </svg>
  );
}

function IconConveniencia() {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 3C10.5 3 7 8 7 13c0 7 9 16 9 16s9-9 9-16c0-5-3.5-10-9-10z" />
      <circle cx="16" cy="13" r="3" />
    </svg>
  );
}

const reasons = [
  {
    id: "sabor",
    kicker: "Sabor",
    title: "Sabe a lo que quieres tomar",
    copy: "Diseñado para saber a latte, shake o esencial — no a suplemento. El sabor es la razón; la proteína es el bonus.",
    stat: "12 sabores",
    Icon: IconSabor,
  },
  {
    id: "proteina",
    kicker: "Proteína",
    title: "La proteína que no se nota",
    copy: "Proteína real en cada sorbo. La diferencia es que no lo parece. Tu paladar disfruta; tu cuerpo aprovecha.",
    stat: "Proteína real",
    Icon: IconProteina,
  },
  {
    id: "azucar",
    kicker: "Sin azúcares añadidos",
    title: "Menos culpa, mismo placer",
    copy: "Menos azúcar que un frappé de cafetería. El antojo que no te pasa factura después de tomarlo.",
    stat: "Menos que un frappé",
    Icon: IconMenosAzucar,
  },
  {
    id: "conveniencia",
    kicker: "Conveniencia",
    title: "Listo en segundos, donde estás",
    copy: "Sin fila, sin barista, sin esperar. Encuentra la máquina Blendia más cercana y en segundos tienes tu bebida.",
    stat: "Sin filas • Sin esperas",
    Icon: IconConveniencia,
  },
] as const;

export default function WhyBlendia() {
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
    <section id="por-que" ref={sectionRef} className="why-blendia">
      <div className="container why-inner">

        <div className="why-header why-animate">
          <span className="why-eyebrow">La diferencia que se nota en el primer sorbo</span>
          <h2 className="why-title">¿Por qué Blendia?</h2>
          <p className="why-subtitle">
            Para las personas que no están dispuestas a elegir
            entre lo que quieren y lo que les hace bien.
          </p>
        </div>

        <div className="why-grid" role="list">
          {reasons.map(({ id, kicker, title, copy, stat, Icon }, i) => (
            <article
              key={id}
              className="why-card why-animate"
              role="listitem"
              style={{ transitionDelay: `${0.08 + i * 0.1}s` }}
            >
              <div className="why-icon-wrap" aria-hidden="true">
                <Icon />
              </div>
              <div className="why-card-content">
                <span className="why-kicker">{kicker}</span>
                <h3 className="why-card-title">{title}</h3>
                <p className="why-card-copy">{copy}</p>
                <span className="why-stat">{stat}</span>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
