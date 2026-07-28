import { motion } from "framer-motion";

const DETAILS = [
  { label: "Higienização", note: "Protocolo hospitalar em cada sessão." },
  { label: "Curadoria", note: "Materiais selecionados de origem premium." },
  { label: "Personalização", note: "Cada mapa é único, como cada rosto." },
  { label: "Tempo", note: "Nenhum atendimento é apressado." },
];

export function SceneCraftsmanship() {
  return (
    <section className="relative overflow-hidden py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, oklch(0.83 0.065 82 / 0.08), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl px-6 md:px-10">
        <div className="text-center">
          <p className="eyebrow">Ofício</p>
          <h2 className="mt-8 display text-[clamp(2.25rem,5vw,4.5rem)] text-ivory">
            A beleza está{" "}
            <span className="display-italic text-champagne">nos detalhes</span>.
          </h2>
          <p className="mx-auto mt-8 max-w-xl text-base leading-relaxed text-ivory-muted">
            Cada gesto é resultado de anos de prática. Cada ferramenta, uma
            escolha deliberada. O que parece simples é, na verdade, o que exige
            mais cuidado.
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 gap-px border border-white/[0.06] bg-white/[0.04] sm:grid-cols-2 lg:grid-cols-4">
          {DETAILS.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="group relative bg-obsidian p-10 transition-colors hover:bg-onyx"
            >
              <span className="font-display text-xs text-champagne">
                0{i + 1}
              </span>
              <h3 className="mt-8 font-display text-2xl text-ivory">
                {d.label}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory-muted">
                {d.note}
              </p>
              <span className="absolute bottom-0 left-0 h-px w-0 bg-gradient-to-r from-champagne to-transparent transition-all duration-700 group-hover:w-full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
