const brandLogo = "/img-core/extras/logo-texto-completo.png";

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

        <header className="catalog-hero">

          {/* ── Logo row ── */}
          <div className="brand-lockup">
            <div className="brand-mark" aria-label="Blendia">
              <img
                src={brandLogo}
                alt="Blendia"
                className="brand-logo"
                loading="eager"
                decoding="async"
                onError={(e) => {
                  const img = e.currentTarget;
                  img.style.display = "none";
                  const fallback = img.parentElement?.querySelector<HTMLElement>(".brand-fallback");
                  if (fallback) fallback.style.display = "inline-flex";
                }}
              />
            </div>
          </div>

          {/* ── Pills — now their own centered row ── */}
          <div className="hero-pills" aria-hidden="true">
            <span className="hero-pill">Dark mode</span>
            <span className="hero-pill">Premium catalog</span>
            <span className="hero-pill">Multi-pin compare</span>
          </div>

          <h1 className="catalog-heading">Discover the Blendia lineup</h1>
          <p className="catalog-copy">
            Hover to preview, pin to keep it open, and compare several cards at the same time.
          </p>

        </header>

      </div>
    </section>
  );
}
