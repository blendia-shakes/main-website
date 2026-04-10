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
          backgroundColor: '#403F45',
          zIndex: -1,
          pointerEvents: 'none',
        }}
      />
      <Hero />
      <ProductGrid />
      <Experience />
      <Footer />
    </>
  )
}




// import Nav from "./components/Nav";
// import Hero from "./components/Hero";
// import Experience from "./components/Experience";
// import CatalogCards from "./components/CatalogCards";
// import MachineDetail from "./components/MachineDetail";
// import UseCases from "./components/UseCases";
// import Gallery from "./components/Gallery";
// import ContactEnhanced from "./components/ContactEnhanced";
// import Footer from "./components/Footer";
// import LegalNotice from "./components/LegalNotice";

// export default function App() {
//   return (
//     <>
//       <Nav />
//       <main>
//         <Hero />
//         <Experience />
//         <CatalogCards />
//         <UseCases />
//         <MachineDetail />
//         <Gallery />
//         <ContactEnhanced />
//         <LegalNotice />
//       </main>
//       <Footer />
//     </>
//   );
// }