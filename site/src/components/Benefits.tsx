import { useEffect, useRef } from "react";

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const targets =
      sectionRef.current?.querySelectorAll<HTMLElement>(".why-animate");
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
    <section id="benefits" ref={sectionRef} className="benefits-section">
      <div className="benefits-inner">

        <h3 className="benefits-headline why-animate">
          Real. Rápido. <em>Natural.</em>
        </h3>

        <div className="benefits-stats">
          <div className="benefits-stat why-animate" style={{ transitionDelay: "80ms" }}>
            <span className="benefits-stat-value">
              +28<small>g</small>
            </span>
            <span className="benefits-stat-label">Proteína real</span>
          </div>
          <div className="benefits-stat why-animate" style={{ transitionDelay: "180ms" }}>
            <span className="benefits-stat-value">
              &lt;28<small>g</small>
            </span>
            <span className="benefits-stat-label">carbs totales</span>
          </div>
          <div className="benefits-stat why-animate" style={{ transitionDelay: "280ms" }}>
            <span className="benefits-stat-value">
              0<small>g</small>
            </span>
            <span className="benefits-stat-label">Azúcar añadida</span>
          </div>
          <div className="benefits-stat why-animate" style={{ transitionDelay: "380ms" }}>
            <span className="benefits-stat-value">
              &lt;11<small>g</small>
            </span>
            <span className="benefits-stat-label">Grasas totales</span>
          </div>
        </div>

        <p className="benefits-line why-animate">Así de simple.</p>

      </div>
    </section>
  );
}
