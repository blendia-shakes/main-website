export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#403F45] text-[#F5F1E8]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10 lg:px-12">
        <p className="text-base text-[#F5F1E8]/75">
          © 2026 <span className="font-semibold text-[#F5F1E8]">Blendia</span>
        </p>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-[#F5F1E8]/65">
          <a href="#privacy" className="transition-colors hover:text-[#F5F1E8]">
            Política de privacidad
          </a>
          <a href="#terms" className="transition-colors hover:text-[#F5F1E8]">
            Términos
          </a>
        </nav>
      </div>
    </footer>
  );
}