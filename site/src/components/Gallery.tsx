import React from "react";

export default function Gallery() {
  const imgs = ["/assets/vase-1.jpg","/assets/vase-2.jpg","/assets/hero-mockup.jpg"];
  return (
    <section className="section container">
      <h2 className="section-title">Mockups</h2>
      <div className="gallery-grid">
        {imgs.map((s,i) => (
          <div className="gallery-item" key={i}>
            <img src={s} alt={`Mockup ${i+1}`} />
          </div>
        ))}
      </div>
    </section>
  );
}