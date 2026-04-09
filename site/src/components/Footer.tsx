export default function Footer() {
  return (
    <footer className="w-full border-t border-black/5 bg-[#F5F1E8] text-[#403F45]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <p className="text-xl font-medium tracking-tight">
          © 2026 <span className="font-semibold">Blendia</span>
        </p>

        <nav className="flex flex-wrap items-center gap-6 text-lg text-[#403F45]/70">
          <a
            href="#privacy"
            className="transition-colors duration-200 hover:text-[#403F45]"
          >
            Política de privacidad
          </a>
          <a
            href="#terms"
            className="transition-colors duration-200 hover:text-[#403F45]"
          >
            Términos
          </a>
        </nav>
      </div>
    </footer>
  );
}