import { useState } from "react";
import { faqItems } from "../data/faq";

const FEATURED_IDS = [
  'sabe-a-proteina',
  'bebida-o-suplemento',
  'azucar-vs-cafeteria',
  'sin-gym',
  'como-funciona-maquina',
  'como-pagar',
  'diferencia-categorias',
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

  const toggle = (id: string) =>
    setOpenId((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="faq-section">
        <div className="faq-card">

          <div className="faq-card-header">
            <div>
              <span className="faq-eyebrow">Preguntas frecuentes</span>
              <h2 className="faq-title">¿Tenés dudas?</h2>
            </div>
            <p className="faq-subtitle">
              Sin letra pequeña.<br />Sin lenguaje de suplemento.
            </p>
          </div>

          <div className="faq-list">
            {featured.map((item) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`faq-item${isOpen ? " is-open" : ""}`}
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
            <span className="faq-footer-text">¿Tienes una pregunta que no está aquí?</span>
            <a href="mailto:hola@blendia.gt" className="faq-footer-link">
              Escríbenos →
            </a>
          </div>

        </div>
    </section>
  );
}
