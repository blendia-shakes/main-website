import { useEffect, useState } from "react";
import FloatingCta from "./components/FloatingCta";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyBlendia from "./components/WhyBlendia";
import ProductGrid from "./components/ProductGrid";
import Experience from "./components/Experience";
import Locations from "./components/Locations";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const THEME_COLORS = { dark: "#403F45", light: "#F5F1E8" };

  const applyTheme = (t: "dark" | "light") => {
    document.documentElement.setAttribute("data-theme", t);
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (meta) meta.content = THEME_COLORS[t];
  };

  useEffect(() => {
    let initial: "dark" | "light" = "dark";
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") initial = saved;
    } catch (_) {}
    applyTheme(initial);
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    applyTheme(next);
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch (_) {}
  };

  const brandLogo =
    theme === "light"
      ? "/img-core/logos/text.webp"
      : "/img-core/logos/text-white.webp";

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "var(--bg)",
          zIndex: -1,
          pointerEvents: "none",
          transition: "background-color 0.3s ease",
        }}
      />

      <FloatingCta />

      <Navbar
        theme={theme}
        onToggle={toggleTheme}
        brandLogo={brandLogo}
        scrollTo={scrollTo}
      />

      <Hero brandLogo={brandLogo} scrollTo={scrollTo} />

      <WhyBlendia />

      <ProductGrid />

      {/* ── Contextual CTA — converts product intent into machine search ── */}
      <div className="section-cta-strip">
        <p className="section-cta-text">¿Ya encontraste tu sabor?</p>
        <button
          type="button"
          className="section-cta-btn"
          onClick={() => scrollTo("ubicaciones")}
        >
          Encuentra dónde conseguirlo →
        </button>
      </div>

      <Experience />

      <Locations />

      <Faq />

      <Footer brandLogo={brandLogo} scrollTo={scrollTo} />
    </>
  );
}
