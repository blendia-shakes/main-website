import { useEffect, useState } from "react";

export default function Hero() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const html = document.documentElement;
    let initial: "dark" | "light" = "dark";
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") initial = saved;
    } catch (_) {}
    html.setAttribute("data-theme", initial);
    setTheme(initial);
  }, []);

  function toggleTheme() {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch (_) {}
  }

  const brandLogo =
    theme === "light"
      ? "/img-core/logos/text.png"
      : "/img-core/logos/text-white.png";

  return (
    <section className="hero">
      <div className="container hero-inner">

        {/* ── Large brandmark — now uses dynamic brandLogo, no hardcoded path ── */}
        <div className="hero-brandmark" aria-label="Blendia">
          <img
            src={brandLogo}
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

          {/* ── Pills ── */}
          <div className="hero-pills" aria-hidden="true">

            <button
              className="hero-pill-toggle"
              onClick={toggleTheme}
              aria-label="Toggle colour theme"
              type="button"
            >
              <span className="pill-icon" aria-hidden="true">☽</span>
              <span className="pill-label-dark">Dark mode</span>
              <span className="pill-label-light">Light mode</span>
            </button>

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
