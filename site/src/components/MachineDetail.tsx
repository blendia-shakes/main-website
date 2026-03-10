import React from "react";

export default function MachineDetail() {
  return (
    <section id="machine" className="section container alt">
      <div className="machine-grid">
        <div className="machine-media">
          <img src="/assets/-side.jpg" alt=" perfil" />
        </div>

        <div className="machine-copy">
          <h2 className="section-title">Máquina  — automática self-service</h2>
          <p className="section-sub">Modelo comercial : diseñada para bebidas proteicas y alto tráfico.</p>

          <ul className="feature-list">
            <li><strong>Capacidad:</strong> repositorio para múltiples ingredientes y 30+ variantes</li>
            <li><strong>Interfaz:</strong> pantalla táctil + QR ordering</li>
            <li><strong>Mantenimiento:</strong> reposición simple y alertas remotas</li>
            <li><strong>Integración:</strong> pagos integrados y analítica de consumo</li>
          </ul>

          <div className="machine-cta">
            <a className="btn primary" href="#contacto">Solicitar demo</a>
            <a className="btn ghost" href="/assets/-specs.pdf" target="_blank" rel="noreferrer">Ficha técnica</a>
          </div>
        </div>
      </div>
    </section>
  );
}