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

const THEME_SCROLL_KEY = "theme-toggle-scroll";

// Read once at module load — i.e. after index.html's bootstrap script has
// already applied the saved theme, but before React renders. Deliberately
// not a useState initializer: StrictMode double-invokes those, and the
// second pass would find the key already consumed.
const themeReloadScrollY: number | null = (() => {
  try {
    const raw = sessionStorage.getItem(THEME_SCROLL_KEY);
    if (raw === null) return null;
    sessionStorage.removeItem(THEME_SCROLL_KEY);
    const y = Number.parseInt(raw, 10);
    return Number.isNaN(y) ? null : y;
  } catch (_) {
    return null;
  }
})();

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

  // Restore the pre-toggle scroll position so the reload below is invisible.
  // Runs before the deep-link effect so it wins on a /faq-style URL.
  useEffect(() => {
    if (themeReloadScrollY === null) return;

    const restore = () => window.scrollTo(0, themeReloadScrollY);
    restore();
    // Images/fonts settling can shift layout under us — re-apply once the
    // document is fully loaded, same reasoning as the deep-link effect.
    if (document.readyState !== "complete") {
      window.addEventListener("load", restore, { once: true });
      return () => window.removeEventListener("load", restore);
    }
  }, []);

  // Deep-link support: /faq, /menu, etc. land straight on that section.
  // GitHub Pages has no server router, so 404.html serves this same app
  // shell for unknown paths (see site/package.json's "build" script) and
  // we scroll to the matching section id once it's mounted.
  useEffect(() => {
    // A theme reload keeps the current path; restoring exact scroll (above)
    // takes precedence over re-running the deep-link jump.
    if (themeReloadScrollY !== null) return;

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

  // iOS Safari tints the status-bar strip from theme-color, but only resolves
  // it at navigation time. Mutating the meta tag in place, replacing the node
  // outright, and nudging scroll to force a layout pass were each tried and
  // reverted (see the fix(dark-mode) commits) — none repaint the strip while
  // the document is at rest, so it kept showing the previous theme's colour
  // until the next load. A real reload is what does work: index.html's
  // bootstrap script applies the saved theme (data-theme + theme-color)
  // before first paint, so the new document navigates in already correct.
  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";

    // The reload only carries the new theme across if it's persisted — the
    // bootstrap script reads it straight back out of localStorage. If that
    // write fails (Safari Private Browsing throws), reloading would discard
    // the toggle entirely, so fall back to the in-page swap alone.
    let persisted = false;
    try {
      localStorage.setItem("theme", next);
      persisted = true;
    } catch (_) {}

    document.documentElement.setAttribute("data-theme", next);
    const metaTheme = document.querySelector('meta[name="theme-color"]');
    if (metaTheme) metaTheme.setAttribute("content", next === "dark" ? "#26252B" : "#F5F1E8");
    setTheme(next);

    if (!persisted) return;
    try { sessionStorage.setItem(THEME_SCROLL_KEY, String(window.scrollY)); } catch (_) {}
    window.location.reload();
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
