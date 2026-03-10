export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">

        <div>
          <h1>Blendia</h1>
          <p>
            Vending de bebidas wellness con proteína.
            Experiencia premium desde la máquina.
          </p>

          <a href="#catalogo" className="btn">
            Catálogo
          </a>

          <ul>
            <li>3 categorías</li>
            <li>5 productos cada una</li>
            <li>Q35–Q45</li>
          </ul>
        </div>

        <img
          src="/assets/hero-mockup.jpg"
          className="hero-img"
        />

      </div>
    </section>
  )
}