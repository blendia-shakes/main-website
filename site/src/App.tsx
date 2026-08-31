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

  // Deep-link support: /faq, /menu, etc. land straight on that section.
  // GitHub Pages has no server router, so 404.html serves this same app
  // shell for unknown paths (see site/package.json's "build" script) and
  // we scroll to the matching section id once it's mounted.
  useEffect(() => {
    const sectionId = window.location.pathname.replace(/^\/+|\/+$/g, "");
    if (!sectionId) return;

    const scrollToSection = () =>
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "auto" });

    // Wait for window "load" (styles/fonts settled) — scrolling right on
    // mount can measure pre-stylesheet layout and land short.
    if (document.readyState === "complete") {
      scrollToSection();
    } else {
      window.addEventListener("load", scrollToSection, { once: true });
      return () => window.removeEventListener("load", scrollToSection);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) {
      // iOS Safari doesn't reliably repaint its chrome (status bar / bottom
      // toolbar) from an attribute mutation on an already-parsed meta tag —
      // swapping the node itself makes it pick up the new color.
      const next2 = metaTheme.cloneNode() as HTMLMetaElement;
      next2.setAttribute("content", next === "dark" ? "#26252B" : "#F5F1E8");
      metaTheme.replaceWith(next2);
    }
    setTheme(next);
    try { localStorage.setItem("theme", next); } catch (_) {}

    // iOS Safari only recomputes its chrome-extends-into-the-status-bar
    // color as part of a scroll-driven layout pass — a bare attribute/meta
    // change while at rest doesn't trigger it, so the top strip keeps
    // showing whatever it painted on load. Nudging scrollY forces that
    // pass to re-run against the new color. Only matters at/near the top;
    // scrolled further down the status bar isn't blended with the page
    // anyway, and this restores the exact original position either way.
    const y = window.scrollY;
    window.scrollTo(0, y + 1);
    requestAnimationFrame(() => window.scrollTo(0, y));
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
          zIndex: -2,
          pointerEvents: "none",
          transition: "background-color 0.3s ease",
        }}
      />
      <div aria-hidden="true" className="bg-grain" />

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
