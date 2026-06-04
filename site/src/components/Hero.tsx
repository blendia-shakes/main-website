type Props = {
  brandLogo: string;
  scrollTo: (id: string) => void;
};

export default function Hero({ scrollTo }: Props) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">

          <span className="hero-eyebrow">Bebidas funcionales · Guatemala</span>

          <h1 className="hero-headline">
            Saben a antojo.<br />
            Tienen proteína.
          </h1>

          <p className="hero-sub">
            Shake, latte o esencial — listo en segundos
            desde una máquina Blendia cerca de ti.
          </p>

          <div className="hero-ctas">
            <button
              className="hero-cta-primary"
              type="button"
              onClick={() => scrollTo("ubicaciones")}
            >
              Encuentra una máquina
            </button>
            <button
              className="hero-cta-secondary"
              type="button"
              onClick={() => scrollTo("catalogo")}
            >
              Ver el catálogo
            </button>
          </div>

          <div className="hero-trust" aria-hidden="true">
            <span className="hero-trust-chip">12 sabores</span>
            <span className="hero-trust-chip">Proteína real</span>
            <span className="hero-trust-chip">Solo en Guatemala</span>
          </div>

        </div>
      </div>
    </section>
  );
}
