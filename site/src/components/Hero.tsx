type Props = {
  brandLogo: string;
  scrollTo: (id: string) => void;
};

function ContactlessIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 17H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3" />
      <path d="M13 21l2-2 4 4" opacity="0.5" />
      <path d="M15.7 15.7a4 4 0 0 1 0-5.66" />
      <path d="M18.5 12.9a7 7 0 0 1 0-9.9" opacity="0.4" />
    </svg>
  );
}

export default function Hero({ scrollTo }: Props) {
  return (
    <section className="hero">
      <div className="hero-inner">

        {/* ── Left column: copy ── */}
        <div className="hero-left">

          <div className="hero-eyebrow-pill">
            <span className="hero-eyebrow-dot" aria-hidden="true" />
            <span className="hero-eyebrow-text">Fresh-blended · on demand</span>
          </div>

          <h1 className="hero-headline">
            Real protein shakes.<br />
            Blended in 60 seconds.
          </h1>

          <p className="hero-sub">
            Essentials, shakes & lattes — listo en segundos desde una máquina Blendia cerca de ti.
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
            <span className="hero-chip">9 sabores</span>
            <span className="hero-chip">30g proteína real</span>
            <span className="hero-chip">blend en 60s</span>
          </div>

        </div>

        {/* ── Right column: vending machine ── */}
        <div className="hero-right">
          <div className="vm-glow" aria-hidden="true" />
          <div className="vm-wrap" aria-hidden="true" role="img" aria-label="Máquina dispensadora Blendia">

            <div className="vm-body">

              {/* Header */}
              <div className="vm-header">
                <span style={{ fontFamily: "'Geist', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)" }}>BLENDIA</span>
                <div className="vm-lights">
                  <span /><span /><span />
                </div>
              </div>

              {/* Screen */}
              <div className="vm-screen-wrap">
                <div className="vm-tiles">
                  <div className="vm-tile vm-tile-vanilla">
                    <span className="vm-tile-name">Moon</span>
                    <span className="vm-tile-sub">Vanilla</span>
                  </div>
                  <div className="vm-tile vm-tile-cacao">
                    <span className="vm-tile-name">Midnight</span>
                    <span className="vm-tile-sub">Cacao</span>
                  </div>
                  <div className="vm-tile vm-tile-matcha">
                    <span className="vm-tile-name">Zen</span>
                    <span className="vm-tile-sub">Matcha</span>
                  </div>
                  <div className="vm-tile vm-tile-chai">
                    <span className="vm-tile-name">Masala</span>
                    <span className="vm-tile-sub">Chai</span>
                  </div>
                </div>
                <div className="vm-status">
                  <span className="vm-status-dot" />
                  <span className="vm-status-text">Preparando...</span>
                </div>
              </div>

              {/* Payment row */}
              <div className="vm-pay-row">
                <div className="vm-pay-icon">
                  <ContactlessIcon />
                </div>
                <div className="vm-pay-text">
                  Pago sin contacto<br />
                  <span style={{ opacity: 0.6 }}>Visa · Mastercard</span>
                </div>
              </div>

              {/* Dispense slot */}
              <div className="vm-dispense">
                <div className="vm-dispense-slot" />
                <div className="vm-cup">
                  <div className="vm-cup-lid" />
                  <div className="vm-cup-body">
                    <div className="vm-cup-liquid" />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
