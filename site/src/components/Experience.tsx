import React from "react";

const Step = ({ n, title, text }: { n: number; title: string; text: string }) => (
  <div className="step">
    <div className="step-num">{n}</div>
    <h4>{title}</h4>
    <p>{text}</p>
  </div>
);

export default function Experience() {
  return (
    <section id="experience" className="section container">
      <h2 className="section-title">La experiencia Blendia</h2>
      <p className="section-sub">Problema → elección → resultado</p>

      <div className="steps">
        <Step n={1} title="Selecciona" text="Escoge la categoría y el sabor desde la pantalla o QR." />
        <Step n={2} title="Personaliza" text="Añade proteína extra, leche vegetal o sin azúcar." />
        <Step n={3} title="Recibe" text="Pago integrado y entrega inmediata con packaging de marca." />
      </div>
    </section>
  );
}