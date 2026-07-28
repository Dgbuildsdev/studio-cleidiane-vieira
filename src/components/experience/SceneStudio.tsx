import { motion, useScroll, useTransform } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Editorial placeholders — swap each `slot` object for a real photo asset.
// Drop files at /public/studio/01.jpg ... 06.jpg and they'll appear automatically.
const GALLERY = [
  {
    id: 1,
    image: "/studio/gallery/01.jpg",
    span: "md:col-span-7 md:row-span-2",
    ratio: "aspect-[4/5]",
  },
  {
    id: 2,
    image: "/studio/gallery/02.jpg",
    span: "md:col-span-5",
    ratio: "aspect-square",
  },
  {
    id: 3,
    image: "/studio/gallery/03.jpg",
    span: "md:col-span-5",
    ratio: "aspect-[4/5]",
  },
  {
    id: 4,
    image: "/studio/gallery/04.jpg",
    span: "md:col-span-7",
    ratio: "aspect-[16/10]",
  },
  {
    id: 5,
    image: "/studio/gallery/05.jpg",
    span: "md:col-span-4",
    ratio: "aspect-[3/4]",
  },
  {
    id: 6,
    image: "/studio/gallery/06.jpg",
    span: "md:col-span-8",
    ratio: "aspect-[16/9]",
  },
];

export function SceneStudio() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".studio-tile").forEach((el, i) => {
        gsap.from(el, {
          y: 80,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
          delay: i * 0.05,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      id="studio"
      className="relative overflow-hidden py-32 md:py-40"
    >
      {/* Section eyebrow */}
      <motion.div
        style={{ y: titleY }}
        className="relative z-10 mx-auto mb-20 max-w-7xl px-6 md:px-10"
      >
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <p className="eyebrow">O Studio</p>
            <h2 className="mt-6 display text-[clamp(2.5rem,5vw,4.5rem)] text-ivory">
              Um espaço para{" "}
              <span className="display-italic text-champagne">acontecer</span>.
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <div className="hairline mb-8 w-16" />
            <p className="text-base leading-relaxed text-ivory-muted">
              Cada detalhe do Studio Cleidiane Vieira foi pensado como cenário —
              luz, textura, silêncio. Um lugar onde o tempo se comporta com
              gentileza e o atendimento é feito a quatro mãos: técnica precisa e
              escuta atenta.
            </p>
            <p className="mt-6 text-base leading-relaxed text-ivory-muted">
              É aqui que o autocuidado deixa de ser uma tarefa e vira
              <span className="text-champagne"> um procedimento</span>.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Editorial gallery */}
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-12 md:gap-6">
          {GALLERY.map((tile) => (
            <figure
              key={tile.id}
              className={`studio-tile group relative overflow-hidden rounded-sm ${tile.span} ${tile.ratio}`}
            >
              {/* Real image */}
              <div className="absolute inset-0 overflow-hidden">
                <img
                  src={tile.image}
                  alt={`Studio Cleidiane Vieira ${tile.id}`}
                  className="
              h-full
              w-full
              object-cover
              transition-transform
              duration-[1400ms]
              ease-[cubic-bezier(0.2,0.8,0.2,1)]
              group-hover:scale-105
            "
                />
              </div>

              {/* Cinematic overlay */}
              <div
                className="
            absolute
            inset-0
            bg-black/10
            transition-colors
            duration-700
            group-hover:bg-black/20
          "
              />

              {/* Grain texture */}
              <div className="absolute inset-0 grain opacity-40" />

              {/* Bottom cinematic fade */}
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-obsidian/70 to-transparent" />

              {/* Caption */}
              <figcaption className="absolute bottom-4 left-4 text-[10px] tracking-[0.35em] uppercase text-ivory/70">
                {String(tile.id).padStart(2, "0")} · Studio
              </figcaption>
            </figure>
          ))}
        </div>
        {/* Signature line */}
        <div className="mt-20 flex flex-col items-center gap-6 text-center">
          <div className="hairline w-32" />
          <p className="max-w-xl font-display text-xl italic text-ivory-muted md:text-2xl">
            &ldquo;Beleza não é destino. É a maneira como você chega até você
            mesma.&rdquo;
          </p>
          <p className="text-[10px] tracking-[0.4em] uppercase text-champagne">
            Cleidiane Vieira
          </p>
        </div>
      </div>
    </section>
  );
}
