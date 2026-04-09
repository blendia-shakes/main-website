export default function Experience() {
  const steps = [
    {
      number: "01",
      title: "Selecciona",
      description:
        "Escoge categoría y sabor desde la pantalla o escaneando el QR.",
      meta: "Categoría + sabor",
    },
    {
      number: "02",
      title: "Personaliza",
      description:
        "Añade proteína extra, leche vegetal o versión sin azúcar.",
      meta: "Opciones modulares",
    },
    {
      number: "03",
      title: "Recibe",
      description:
        "Pago integrado y entrega inmediata con packaging de marca.",
      meta: "Cobro + entrega",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-[#403F45] text-[#F5F1E8]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,241,232,0.10),transparent_36%),radial-gradient(circle_at_80%_20%,rgba(245,241,232,0.07),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(0,0,0,0.10))]" />
      <div className="absolute inset-0 opacity-[0.10] [background-image:linear-gradient(rgba(245,241,232,0.18)_1px,transparent_1px),linear-gradient(90deg,rgba(245,241,232,0.18)_1px,transparent_1px)] [background-size:72px_72px]" />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="max-w-2xl">
            <p className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm tracking-[0.22em] text-[#F5F1E8]/70 uppercase">
              Blendia experience
            </p>

            <h2 className="mt-6 text-4xl font-semibold tracking-tight md:text-5xl lg:text-6xl">
              La experiencia Blendia
            </h2>

            <p className="mt-5 max-w-xl text-lg leading-relaxed text-[#F5F1E8]/70 md:text-xl">
              Problema → elección → resultado. Una experiencia diseñada para
              ser clara, rápida y premium desde el primer contacto.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { k: "1", v: "decisión" },
                { k: "3", v: "pasos" },
                { k: "0", v: "fricción" },
              ].map((item) => (
                <div
                  key={item.v}
                  className="rounded-[24px] border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-sm"
                >
                  <div className="text-3xl font-semibold text-[#F5F1E8]">
                    {item.k}
                  </div>
                  <div className="mt-1 text-sm tracking-[0.18em] text-[#F5F1E8]/55 uppercase">
                    {item.v}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute left-[22px] top-8 bottom-8 w-px bg-gradient-to-b from-transparent via-[#F5F1E8]/25 to-transparent" />

            <div className="space-y-4">
              {steps.map((step) => (
                <article
                  key={step.number}
                  className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-white/6 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.16)] backdrop-blur-md transition-transform duration-300 hover:-translate-y-0.5 hover:bg-white/8 sm:p-6"
                >
                  <div className="flex gap-5">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[#F5F1E8] text-sm font-semibold text-[#403F45] shadow-[0_12px_28px_rgba(0,0,0,0.18)]">
                      {step.number}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] tracking-[0.18em] text-[#F5F1E8]/60 uppercase">
                          {step.meta}
                        </span>
                      </div>

                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#F5F1E8]">
                        {step.title}
                      </h3>

                      <p className="mt-3 max-w-xl text-base leading-relaxed text-[#F5F1E8]/72 md:text-lg">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 rounded-[28px] border border-white/10 bg-white/5 px-6 py-5 backdrop-blur-sm md:px-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-sm tracking-[0.18em] text-[#F5F1E8]/60 uppercase">
              Navegación simple, lectura inmediata
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-[#F5F1E8]/72 md:text-right">
              Pensado para que el usuario entienda el flujo en segundos sin
              competir visualmente con el catálogo.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}