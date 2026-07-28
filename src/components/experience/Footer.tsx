export function Footer() {
  return (
    <footer className="relative border-t border-white/[0.06] py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 md:flex-row md:px-10">
        <div className="flex items-center gap-3">
          <span className="grid h-7 w-7 place-items-center rounded-full border border-champagne/30 text-[9px] tracking-[0.2em] text-champagne">
            CV
          </span>
          <span className="font-display text-sm text-ivory-muted">
            Studio Cleidiane{" "}
            <span className="italic text-champagne">Vieira</span>
          </span>
        </div>
        <p className="text-[10px] tracking-[0.3em] uppercase text-ivory-muted/70">
          © {new Date().getFullYear()} · Uberlândia — MG · Todos os direitos
          reservados
        </p>
        <a
          href="https://www.instagram.com/studio_cleidianevieira/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] tracking-[0.3em] uppercase text-ivory-muted/70 transition-colors hover:text-champagne"
        >
          @studio_cleidianevieira
        </a>
      </div>
    </footer>
  );
}
