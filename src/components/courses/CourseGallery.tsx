import { motion } from "framer-motion";

import aulaCilios from "@/assets/courses/aula-cilios.jpg";
import certificado from "@/assets/courses/certificado.jpg";
import turma from "@/assets/courses/turma.jpg";

const IMAGES = [
  {
    src: aulaCilios,
    title: "Aula prática",
  },
  {
    src: turma,
    title: "Prática em modelo",
  },
  {
    src: certificado,
    title: "Certificação profissional",
  },
];

export function CourseGallery() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="mb-16 max-w-3xl">
          <p className="eyebrow text-champagne">Experiência real</p>

          <h2
            className="
            mt-6
            display
            text-4xl
            text-ivory
            md:text-6xl
            "
          >
            Aprenda na{" "}
            <span className="display-italic text-champagne">prática.</span>
          </h2>

          <p className="mt-6 text-ivory-muted">
            Uma formação criada para você desenvolver segurança, técnica e
            confiança para atender suas próprias clientes.
          </p>
        </div>

        <div
          className="
          grid
          gap-6
          md:grid-cols-3
          "
        >
          {IMAGES.map((image, index) => (
            <motion.div
              key={image.title}

              initial={{
                opacity: 0,
                y: 30,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              viewport={{
                once: true,
              }}

              transition={{
                delay: index * 0.15,
              }}

              className="
              group
              overflow-hidden
              rounded-2xl
              border
              border-white/[0.08]
              "
            >
              <div
                className="
                aspect-[4/5]
                overflow-hidden
                "
              >
                <img
                  src={image.src}

                  alt={image.title}

                  className="
                  h-full
                  w-full
                  object-cover
                  transition-transform
                  duration-700
                  group-hover:scale-110
                  "
                />
              </div>

              <div
                className="
                bg-onyx
                p-6
                "
              >
                <p className="text-sm text-champagne">{image.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
