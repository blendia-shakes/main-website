import { useEffect, useState } from "react";
import FloatingCta from "./components/FloatingCta";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MenuSection from "./components/MenuSection";
import Experience from "./components/Experience";
import Benefits from "./components/Benefits";
import Locations from "./components/Locations";
import Faq from "./components/Faq";
import Footer from "./components/Footer";

export default function App() {
  // Lazy initializer, not a plain default + effect — reads the same
  // localStorage value index.html's bootstrap script already applied to
  // <html> before React mounted. Without this, `theme` starts as "light"
  // regardless of the saved preference and only corrects itself once the
  // mount effect runs, flashing the wrong logo/toggle-icon for one frame
  // on a dark-mode page load (the background itself is fine, since that's
  // driven directly by the data-theme attribute, not this state).
  const [theme, setTheme] = useState<"dark" | "light">(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch (_) {}
    return "light";
  });

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
    if (metaTheme) metaTheme.setAttribute("content", next === "dark" ? "#26252B" : "#F5F1E8");
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
      {/* Single fixed compositor layer for the page backdrop. The grain
          texture used to be its own sibling position:fixed + mix-blend-mode
          element — two independently GPU-promoted full-viewport layers.
          Safari defers CSS-variable invalidation on composited layers until
          a compositor flush (see the June bc65e62 incident), so stacking a
          second one made the toggle's background-color transition miss its
          repaint. Nesting the grain inside this div keeps it to one
          top-level fixed layer; the blend still targets this div's own
          background-color underneath it. */}
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
      >
        <div aria-hidden="true" className="bg-grain" />
      </div>

      <FloatingCta />

      <Navbar
        theme={theme}
        onToggle={toggleTheme}
        brandLogo={brandLogo}
        scrollTo={scrollTo}
      />

      <Hero scrollTo={scrollTo} brandLogo={brandLogo} />

      <MenuSection />

      <Experience />

      <Benefits />

      <Locations />

      <Faq />

      <Footer brandLogo={brandLogo} />
    </>
  );
}
