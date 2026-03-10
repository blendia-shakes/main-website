export default function Catalog() {

  const categories = {
    Latte: [
      "Latte Proteico Vainilla",
      "Latte Chai",
      "Latte Matcha",
      "Latte Chocolate",
      "Latte Café"
    ],

    Shakes: [
      "Shake Fresa",
      "Shake Banana",
      "Shake Mango",
      "Shake Verde",
      "Shake Tropical"
    ],

    Essentials: [
      "Colágeno",
      "Electrolitos",
      "Digestive",
      "Immunity",
      "Calm"
    ]
  }

  return (
    <section id="catalogo" className="container">

      <h2>Catálogo</h2>

      <div className="catalog-grid">

        {Object.entries(categories).map(([name, items]) => (

          <div className="card" key={name}>

            <h3>{name}</h3>

            <ul>
              {items.map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>

          </div>

        ))}

      </div>

    </section>
  )
}