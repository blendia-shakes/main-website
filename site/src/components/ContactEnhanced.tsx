import React from "react";

export default function ContactEnhanced() {
  return (
    <section id="contacto" className="section contact container">
      <div className="contact-grid">
        <div>
          <h2 className="section-title">Solicita un demo</h2>
          <p className="section-sub">Rellena el formulario y te contactamos en 24 horas hábiles.</p>

          <ul className="contact-badges">
            <li>Respuesta en 24h</li>
            <li>Instalación y onboarding</li>
            <li>Soporte técnico</li>
          </ul>
        </div>

        <form className="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
          <label>Nombre<input name="name" required /></label>
          <label>Empresa / Local<input name="company" /></label>
          <label>Correo<input type="email" name="_replyto" required /></label>
          <label>Teléfono<input name="phone" /></label>
          <label>Mensaje<textarea name="message" rows={4}></textarea></label>
          <input type="hidden" name="_subject" value="Nuevo lead Blendia" />
          <button className="btn primary" type="submit">Enviar</button>
        </form>
      </div>
    </section>
  );
}