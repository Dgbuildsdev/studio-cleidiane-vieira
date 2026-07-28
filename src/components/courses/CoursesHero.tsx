import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

export function CoursesHero() {
  return (
    <section className="relative overflow-hidden py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <Link
          to="/"
          className="
    inline-flex
    items-center
    gap-2
    mb-8
    rounded-full
    border
    border-champagne/40
    px-5
    py-2
    text-xs
    uppercase
    tracking-widest
    text-champagne
    transition
    hover:bg-champagne
    hover:text-black
  "
        >
          ← Voltar para início
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-3xl"
        >
          <p className="eyebrow text-champagne">Formação profissional</p>

          <h1 className="mt-8 display text-[clamp(2.5rem,6vw,5rem)] text-ivory">
            Formando profissionais de excelência na{" "}
            <span className="display-italic text-champagne">
              área da beleza.
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ivory-muted">
            Aprenda técnicas modernas, atendimento, marketing e prática real
            para iniciar sua carreira com segurança.
          </p>

          <button
            data-cursor-hover
            onClick={() =>
              window.open(
                "https://wa.me/5534998407644?text=Olá Cleidiane, quero saber mais sobre os Cursos",
                "_blank",
              )
            }
            className="
            mt-10
            rounded-full
            bg-gradient-to-br
            from-champagne
            to-bronze
            px-8
            py-4
            text-xs
            uppercase
            tracking-[0.3em]
            text-obsidian
            "
          >
            Quero saber mais
          </button>
        </motion.div>
      </div>
    </section>
  );
}
