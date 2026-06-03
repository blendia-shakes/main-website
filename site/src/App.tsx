import Hero from "./components/Hero"
import ProductGrid from "./components/ProductGrid"
import Experience from "./components/Experience";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--bg)',
          zIndex: -1,
          pointerEvents: 'none',
          transition: 'background-color 0.3s ease',
        }}
      />
      <Hero />
      <ProductGrid />
      <Experience />
      <Footer />
    </>
  )
}