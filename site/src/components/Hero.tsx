export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">

        <div className="hero-brandmark" aria-label="Blendia">
          <img
            src="/img-core/logos/text.png"
            alt="Blendia"
            className="hero-brandmark-img"
            loading="eager"
            decoding="async"
          />
        </div>
        
        <h1>Wellness que se sirve solo</h1>

        <p>
          Bebidas funcionales preparadas al instante.
          Diseñadas para espacios premium.
        </p>

      </div>
    </section>
  )
}