export default function Experience() {
  const steps = [
    {
      number: "1",
      title: "Selecciona",
      description: "Escoge la categoría y el sabor desde la pantalla o QR.",
    },
    {
      number: "2",
      title: "Personaliza",
      description: "Añade proteína extra, leche vegetal o sin azúcar.",
    },
    {
      number: "3",
      title: "Recibe",
      description: "Pago integrado y entrega inmediata con packaging de marca.",
    },
  ];

  return (
    <section className="w-full bg-[#F5F1E8] text-[#403F45]">
      <div className="mx-auto w-full max-w-7xl px-6 py-10 md:px-10 md:py-14 lg:px-12">
        <div className="mb-8 md:mb-10">
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">
            La experiencia Blendia
          </h2>
          <p className="mt-5 text-lg text-[#403F45]/65 md:text-xl">
            Problema → elección → resultado
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-3 md:gap-6">
          {steps.map((step) => (
            <article
              key={step.number}
              className="relative min-h-[250px] rounded-[28px] bg-white/90 p-6 shadow-[0_18px_50px_rgba(64,63,69,0.06)] ring-1 ring-black/5 backdrop-blur-sm md:p-7"
            >
              <div className="mb-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#403F45] text-xl font-semibold text-[#F5F1E8] shadow-[0_10px_24px_rgba(64,63,69,0.12)]">
                {step.number}
              </div>

              <h3 className="text-2xl font-semibold tracking-tight text-[#403F45]">
                {step.title}
              </h3>

              <p className="mt-6 max-w-sm text-lg leading-relaxed text-[#403F45]/78">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}