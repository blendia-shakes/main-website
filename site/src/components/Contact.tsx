export default function Contact() {
  return (
    <section className="container">

      <h2>Contacto</h2>

      <form
        action="https://formspree.io/f/YOUR_ID"
        method="POST"
      >

        <input
          name="name"
          placeholder="Nombre"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Correo"
          required
        />

        <textarea
          name="message"
          placeholder="Mensaje"
        />

        <button type="submit">
          Enviar
        </button>

      </form>

    </section>
  )
}