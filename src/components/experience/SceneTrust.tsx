import { motion } from "framer-motion";
import founderImg from "@/assets/founder.jpg";

const STATS = [
  { value: "8+", label: "Anos de estúdio" },
  { value: "1.2k", label: "Olhares realçados" },
  { value: "4.9", label: "Avaliação média" },
];

export function SceneTrust() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden border-y border-white/[0.04] py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
              className="relative aspect-[4/5] overflow-hidden rounded-sm"
            >
              <img
                src={founderImg}
                alt="Cleidiane Vieira, fundadora do Studio"
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/20 to-transparent" />
              <div className="absolute inset-6 border border-champagne/20" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="eyebrow text-champagne">Fundadora</p>
                <p className="mt-3 font-display text-3xl italic text-ivory">
                  Cleidiane Vieira
                </p>
                <p className="mt-2 text-[11px] tracking-[0.25em] uppercase text-ivory-muted">
                  Especialista em beleza · Uberlândia — MG
                </p>
              </div>
            </motion.div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p className="eyebrow">Confiança</p>
            <h2 className="mt-8 display text-[clamp(2rem,4vw,3.5rem)] text-ivory">
              Um encontro entre{" "}
              <span className="display-italic text-champagne">técnica</span> e
              intuição.
            </h2>

            <p className="mt-8 max-w-lg text-base leading-relaxed text-ivory-muted">
              Cleidiane transforma cada atendimento em um procedimento único.
              Escuta antes de agir. Observa antes de definir. Cria uma beleza
              que nunca disputa — que apenas revela quem você já é, com
              discrição e precisão.
            </p>

            <div className="mt-16 grid grid-cols-3 gap-6 border-t border-white/[0.06] pt-10">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 * i,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  <p className="font-display text-4xl text-champagne">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[10px] tracking-[0.3em] uppercase text-ivory-muted">
                    {s.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
