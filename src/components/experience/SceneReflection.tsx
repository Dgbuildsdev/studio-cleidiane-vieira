import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import selfcareImg from "@/assets/selfcare.jpg";

export function SceneReflection() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={ref}
      id="reflection"
      className="relative min-h-[100svh] overflow-hidden py-32"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 px-6 md:grid-cols-12 md:gap-8 md:px-10">
        <motion.div style={{ y }} className="md:col-span-5 md:col-start-1">
          <p className="eyebrow">Reflexo</p>
          <h2 className="mt-8 display text-[clamp(2.25rem,4.5vw,4rem)] text-ivory">
            O autocuidado é um{" "}
            <span className="display-italic text-champagne">instante seu</span>.
          </h2>
          <div className="hairline mt-10 w-24" />
          <p className="mt-8 max-w-md text-base leading-relaxed text-ivory-muted">
            Aqui, o tempo desacelera. A luz encontra a pele. O olhar encontra o
            espelho. Cada gesto tem uma intenção — e cada detalhe existe para
            devolver a você aquilo que sempre esteve lá.
          </p>
        </motion.div>

        <div className="md:col-span-6 md:col-start-7">
          <figure className="relative aspect-[3/4] overflow-hidden rounded-sm">
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-0 scale-110"
            >
              <img
                src={selfcareImg}
                alt="Momento de autocuidado no Studio Cleidiane Vieira"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/80 via-obsidian/10 to-transparent" />
            <div className="absolute inset-0 grain opacity-30" />
            <div className="absolute inset-4 border border-champagne/15" />
            {/* caption removed per direction — was: "I. Silence · Light · Skin" */}
          </figure>
        </div>
      </div>
    </section>
  );
}
