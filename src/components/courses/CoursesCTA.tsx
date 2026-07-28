import { motion } from "framer-motion";

interface CoursesCTAProps {
  courseName: string;
}

export function CoursesCTA({ courseName }: CoursesCTAProps) {
  function handleWhatsApp() {
    const message = encodeURIComponent(
      `Olá Cleidiane, quero fazer minha matrícula no ${courseName}`,
    );

    window.open(`https://wa.me/5534998407644?text=${message}`, "_blank");
  }

  return (
    <section className="py-32">
      <div
        className="
        mx-auto
        max-w-5xl
        px-6
        md:px-10
        "
      >
        <motion.div
          initial={{
            opacity: 0,
            y: 40,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}

          transition={{
            duration: 0.8,
          }}

          className="
          rounded-3xl
          bg-gradient-to-br
          from-champagne
          to-bronze
          px-8
          py-20
          text-center
          "
        >
          <h2
            className="
            display
            text-4xl
            text-obsidian
            md:text-6xl
            "
          >
            Transforme sua paixão pela beleza em profissão.
          </h2>

          <p
            className="
            mx-auto
            mt-6
            max-w-xl
            text-obsidian/70
            "
          >
            Faça sua matrícula e comece sua jornada profissional com uma
            formação completa.
          </p>

          <button
            data-cursor-hover

            onClick={handleWhatsApp}

            className="
            mt-10
            rounded-full
            bg-obsidian
            px-10
            py-4
            text-xs
            uppercase
            tracking-[0.3em]
            text-champagne
            transition
            hover:scale-105
            "
          >
            Quero fazer minha matrícula
          </button>
        </motion.div>
      </div>
    </section>
  );
}
