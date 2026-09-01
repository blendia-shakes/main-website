type Props = {
  brandLogo: string;
  scrollTo: (id: string) => void;
};

export default function Hero({ scrollTo }: Props) {
  return (
    <section className="hero">
      <div className="hero-inner">

        {/* ── Left column: copy ── */}
        <div className="hero-left">

          <h1 className="hero-headline">
            Saben a antojo.<br />
            Tienen proteína.
          </h1>

          <p className="hero-sub">
            Shakes & lattes — listo en segundos desde una máquina Blendia cerca de ti.
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
              onClick={() => scrollTo("menu")}
            >
              Ver el catálogo
            </button>
          </div>

          <div className="hero-chips" aria-hidden="true">
            <span className="hero-chip">6 sabores</span>
            <span className="hero-chip">+30g proteína real</span>
            <span className="hero-chip">listo en 2 mins</span>
          </div>

        </div>

        {/* ── Right column: signature illustration ── */}
        <div className="hero-right">
          <img
            className="hero-visual"
            src="/img-core/illustrations/hero-vending-machine.webp"
            alt="Ilustración de una máquina dispensadora Blendia sirviendo una bebida"
            width={620}
            height={920}
            loading="eager"
            decoding="async"
          />
        </div>

      </div>
    </section>
  );
}
