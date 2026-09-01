import { useEffect, useRef } from "react";

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

        <h2 className="why-title why-animate">¿Por qué Blendia?</h2>

        <p className="why-statement-body why-animate">
          Nace para demostrar que elegir algo práctico y delicioso
          no debería costarte tu bienestar. Convertimos bebidas tradicionales
          en opciones funcionales, porque hay productos cuyo precio es tu
          salud.
        </p>
        <p className="why-statement-line why-animate">Blendia no.</p>

      </div>
    </section>
  );
}
