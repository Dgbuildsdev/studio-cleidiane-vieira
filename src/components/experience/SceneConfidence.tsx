const WORDS = [
  "Autoestima",
  "Presença",
  "Serenidade",
  "Confiança",
  "Leveza",
  "Elegância",
];

export function SceneConfidence() {
  const loop = [...WORDS, ...WORDS];

  return (
    <section className="relative overflow-hidden py-32 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <p className="eyebrow">Resultado</p>
      </div>

      <div className="mt-12 overflow-hidden md:mt-16">
        <div className="marquee-track flex w-max items-center gap-10 whitespace-nowrap md:gap-16">
          {loop.map((w, i) => (
            <span
              key={i}
              className="display flex items-center gap-10 text-[clamp(3rem,9vw,8rem)] leading-none text-ivory md:gap-16"
            >
              {w}
              <span
                aria-hidden
                className="inline-block h-2 w-2 rounded-full bg-champagne/60"
              />
            </span>
          ))}
        </div>
      </div>

      <div className="mx-auto mt-20 max-w-3xl px-6 text-center md:mt-24 md:px-10">
        <p className="font-display text-2xl italic leading-relaxed text-ivory-muted md:text-3xl">
          "O melhor resultado não é o que você vê no espelho.
          <br />É o que <span className="text-champagne">você sente</span> ao
          sair daqui."
        </p>
      </div>
    </section>
  );
}
