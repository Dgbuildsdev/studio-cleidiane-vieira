import { motion } from "framer-motion";
import { useState } from "react";
import lashesImg from "@/assets/ritual-lashes.jpg";
import hairImg from "@/assets/ritual-hair.jpg";
import microImg from "@/assets/ritual-micro.jpg";
import shadowImg from "@/assets/ritual-shadow.jpg";

const SERVICES = [
  {
    idx: "I",
    title: "Transformação Capilar",
    subtitle: "Progressiva · Selagem · Botox · Mechas",
    body: "Tratamentos personalizados para transformar seus cabelos mantendo saúde, brilho e movimento natural dos fios.",
    price: "a partir de R$ 80",
    duration: "Avaliação personalizada",
    image: hairImg,
  },
  {
    idx: "II",
    title: "Olhar & Sobrancelhas",
    subtitle: "Cílios · Designer · Henna · Micropigmentação",
    body: "Procedimentos para valorizar o olhar com técnicas personalizadas respeitando sua beleza natural.",
    price: "a partir de R$ 35",
    duration: "Conforme procedimento",
    image: microImg,
  },
  {
    idx: "III",
    title: "Harmonização Facial",
    subtitle: "Micropigmentação · Micro Labial · Limpeza de Pele",
    body: "Cuidados estéticos pensados para realçar seus traços e trazer equilíbrio para sua imagem.",
    price: "a partir de R$ 120",
    duration: "Avaliação personalizada",
    image: shadowImg,
  },
  {
    idx: "IV",
    title: "Rituais de Beleza",
    subtitle: "Manicure · Pedicure · Depilação · Escova",
    body: "Momentos de cuidado e renovação com atendimento personalizado.",
    price: "a partir de R$ 40",
    duration: "Conforme serviço",
    image: lashesImg,
  },
];

export function SceneTransformation() {
  const [active, setActive] = useState(0);

  return (
    <section id="transformation" className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-20 max-w-2xl">
          <p className="eyebrow">Procedimentos</p>
          <h2 className="mt-8 display text-[clamp(2.25rem,5vw,4.5rem)] text-ivory">
            Quatro procedimentos.{" "}
            <span className="display-italic text-champagne">
              Uma assinatura.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
          {/* List */}
          <ul className="md:col-span-7">
            {SERVICES.map((s, i) => {
              const open = active === i;
              return (
                <li
                  key={s.idx}
                  className="border-t border-white/[0.06] last:border-b"
                  onMouseEnter={() => setActive(i)}
                >
                  <button
                    onClick={() => setActive(i)}
                    className="group flex w-full items-center gap-6 py-8 text-left transition-colors md:py-10"
                    data-cursor-hover
                  >
                    <span
                      className={`font-display text-sm transition-colors ${
                        open ? "text-champagne" : "text-ivory-muted"
                      }`}
                    >
                      {s.idx}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-baseline justify-between gap-6">
                        <h3
                          className={`display text-[clamp(1.5rem,3vw,2.5rem)] transition-all duration-500 ${
                            open ? "text-ivory" : "text-ivory/50"
                          }`}
                          style={{
                            transform: open
                              ? "translateX(8px)"
                              : "translateX(0)",
                          }}
                        >
                          {s.title}
                        </h3>
                        <span
                          className={`hidden shrink-0 text-[10px] tracking-[0.3em] uppercase transition-colors md:inline ${
                            open ? "text-champagne" : "text-ivory-muted/60"
                          }`}
                        >
                          0{i + 1} / {String(SERVICES.length).padStart(2, "0")}
                        </span>
                      </div>
                      <motion.div
                        initial={false}
                        animate={{
                          height: open ? "auto" : 0,
                          opacity: open ? 1 : 0,
                        }}
                        transition={{
                          duration: 0.7,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 max-w-xl">
                          <p className="text-sm leading-relaxed text-ivory-muted">
                            <span className="mr-3 text-champagne">
                              {s.subtitle}
                            </span>
                            <br className="hidden md:block" />
                            {s.body}
                          </p>
                          {/* Mobile image */}
                          <div className="mt-6 aspect-[16/10] overflow-hidden rounded-sm md:hidden">
                            <img
                              src={s.image}
                              alt={s.title}
                              loading="lazy"
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/[0.06] pt-5">
                            <div>
                              <p className="text-[9px] tracking-[0.35em] uppercase text-ivory-muted/70">
                                Investimento
                              </p>
                              <p className="mt-1 font-display text-xl text-champagne">
                                {s.price}
                              </p>
                            </div>
                            <div className="h-8 w-px bg-white/[0.08]" />
                            <div>
                              <p className="text-[9px] tracking-[0.35em] uppercase text-ivory-muted/70">
                                Duração
                              </p>
                              <p className="mt-1 text-sm text-ivory">
                                {s.duration}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Visual */}
          <div className="hidden md:col-span-4 md:col-start-9 md:block">
            <div className="sticky top-32 aspect-[3/4] overflow-hidden rounded-sm">
              <motion.img
                key={active}
                src={SERVICES[active].image}
                alt={SERVICES[active].title}
                loading="lazy"
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1] }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/30 to-transparent" />
              <div className="absolute inset-4 border border-champagne/15" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="eyebrow text-champagne">
                  Procedimento {SERVICES[active].idx}
                </p>
                <p className="mt-2 font-display text-2xl italic text-ivory">
                  {SERVICES[active].title}
                </p>
                <p className="mt-3 font-display text-lg text-champagne">
                  {SERVICES[active].price}
                </p>
              </div>
              <div className="absolute inset-0 grain opacity-30" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
