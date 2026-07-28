import { motion } from "framer-motion";
import { Star } from "lucide-react";

const REVIEWS = [
  {
    text: "Foi ótimo, adorei — vou voltar com certeza. Excelente profissional.",
    author: "Cliente Google",
  },
  {
    text: "Salão com ambiente muito lindo e agradável.",
    author: "Cliente Google",
  },
  {
    text: "Maravilhoso, ótimo atendimento, espaço maravilhoso.",
    author: "Cliente Google",
  },
];

export function SceneVoices() {
  return (
    <section
      id="voices"
      className="relative overflow-hidden border-y border-white/[0.04] py-32"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="eyebrow">Depoimentos</p>
            <h2 className="mt-8 display text-[clamp(2rem,4.5vw,4rem)] text-ivory">
              Quem viveu,{" "}
              <span className="display-italic text-champagne">conta</span>.
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4 fill-champagne text-champagne"
                strokeWidth={1}
              />
            ))}
            <span className="ml-3 text-xs tracking-[0.3em] uppercase text-ivory-muted">
              Google · 4.9
            </span>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-px bg-white/[0.06] md:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.12,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="relative bg-obsidian p-10 md:p-12"
            >
              <span className="font-display text-6xl leading-none text-champagne/40">
                "
              </span>
              <blockquote className="mt-4 font-display text-xl italic leading-relaxed text-ivory md:text-2xl">
                {r.text}
              </blockquote>
              <figcaption className="mt-10 flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-ivory-muted">
                <span className="h-px w-6 bg-champagne" />
                {r.author}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
