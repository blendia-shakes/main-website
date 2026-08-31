import { useEffect, useRef, useState } from "react";
import { faqItems } from "../data/faq";

const FEATURED_IDS = [
  'diferencia-categorias',
  'azucar-vs-cafeteria',
  'tipo-leche',
  'lactosa',
  'cafeina',
  'sabe-a-proteina',
  'diabeticos',
  'embarazo',
  'bebida-o-suplemento',
  'sin-gym',
  'como-funciona-maquina',
  'como-pagar',
  'sin-tienda-online',
];

const featured = FEATURED_IDS.map((id) => faqItems.find((q) => q.id === id)!);

function ChevronIcon() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="faq-chevron"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());
  const sectionRef = useRef<HTMLElement>(null);

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  useEffect(() => {
    // Scroll-reveal state has to live in React, not classList.add() on the
    // DOM node directly — this section's className is already re-rendered
    // by React on every openId change (clicking a question), which would
    // silently wipe any class added outside React's own tracked string,
    // snapping already-revealed items back to their hidden (opacity: 0)
    // state the instant any question is tapped.
    const targets = sectionRef.current?.querySelectorAll<HTMLElement>("[data-reveal-key]");
    if (!targets?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const key = (entry.target as HTMLElement).dataset.revealKey!;
            setVisibleKeys((prev) => (prev.has(key) ? prev : new Set(prev).add(key)));
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
    <section id="faq" ref={sectionRef} className="faq-section">
        <div className="faq-card">

          <div
            className={`faq-card-header why-animate${visibleKeys.has("header") ? " is-visible" : ""}`}
            data-reveal-key="header"
          >
            <div>
              <span className="faq-eyebrow">Preguntas frecuentes</span>
              <h2 className="faq-title">¿Tienes dudas?</h2>
            </div>
          </div>

          <div className="faq-list">
            {featured.map((item, index) => {
              const isOpen = openId === item.id;
              const isVisible = visibleKeys.has(item.id);
              return (
                <div
                  key={item.id}
                  data-reveal-key={item.id}
                  className={`faq-item why-animate${isVisible ? " is-visible" : ""}${isOpen ? " is-open" : ""}`}
                  style={{ transitionDelay: `${Math.min(index, 6) * 35}ms` }}
                >
                  <button
                    type="button"
                    className="faq-question"
                    onClick={() => toggle(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-body-${item.id}`}
                  >
                    <span className="faq-q-text">{item.question}</span>
                    <ChevronIcon />
                  </button>

                  <div
                    id={`faq-body-${item.id}`}
                    className="faq-body"
                    aria-hidden={!isOpen}
                  >
                    <div className="faq-body-inner">
                      <p className="faq-answer">{item.short}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="faq-card-footer">
            <span className="faq-footer-text">¿Tienes una pregunta o sugerencia que no está aquí?</span>
            <a href="mailto:soporte@blendiashakes.com" className="faq-footer-link">
              Escríbenos →
            </a>
          </div>

        </div>
    </section>
  );
}
