import { useEffect, useState } from "react";
import FloatingCta from "./components/FloatingCta";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WhyBlendia from "./components/WhyBlendia";
import MenuSection from "./components/MenuSection";
import Experience from "./components/Experience";
import Benefits from "./components/Benefits";
import Locations from "./components/Locations";
import Faq from "./components/Faq";
import CtaBand from "./components/CtaBand";
import Footer from "./components/Footer";

export default function App() {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const html = document.documentElement;
    let initial: "dark" | "light" = "light";
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") initial = saved;
    } catch (_) {}
    html.setAttribute("data-theme", initial);
    setTheme(initial);
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", next === "dark" ? "#403F45" : "#F5F1E8");
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch (_) {}
  };

  const brandLogo =
    theme === "dark"
      ? "/img-core/logos/text-white.webp"
      : "/img-core/logos/text.webp";

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

      <Hero scrollTo={scrollTo} brandLogo={brandLogo} />

      <WhyBlendia />

      <MenuSection />

      <Experience />

      <Benefits />

      <Locations />

      <Faq />

      <Footer brandLogo={brandLogo} />
    </>
  );
}
