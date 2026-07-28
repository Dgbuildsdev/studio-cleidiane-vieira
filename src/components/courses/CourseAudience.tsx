import { motion } from "framer-motion";

interface CourseAudienceProps {
  audience: string[];
}

export function CourseAudience({ audience }: CourseAudienceProps) {
  return (
    <section className="py-24">
      <div
        className="
  mx-auto
  max-w-7xl
  px-6
  md:px-10
  "
      >
        <motion.div
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
            duration: 0.8,
          }}
        >
          <p className="eyebrow text-champagne">Para quem é</p>

          <h2
            className="
      mt-6
      display
      text-4xl
      text-ivory
      md:text-6xl
      "
          >
            Transforme sua paixão
            <br />
            em uma{" "}
            <span className="display-italic text-champagne">profissão.</span>
          </h2>

          <p
            className="
      mt-6
      max-w-2xl
      text-ivory-muted
      "
          >
            Uma formação criada para quem deseja aprender uma nova habilidade,
            profissionalizar seus atendimentos e conquistar independência
            financeira.
          </p>
        </motion.div>

        <div
          className="
    mt-12
    grid
    gap-6
    md:grid-cols-3
    "
        >
          {audience.map((item, index) => (
            <motion.div
              key={item}

              initial={{
                opacity: 0,
                y: 20,
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
        rounded-2xl
        border
        border-white/[0.08]
        bg-onyx
        p-8
        "
            >
              <div
                className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-champagne/40
          text-champagne
          "
              >
                0{index + 1}
              </div>

              <h3
                className="
          mt-6
          text-xl
          text-ivory
          "
              >
                {item}
              </h3>

              <p
                className="
          mt-4
          text-sm
          leading-relaxed
          text-ivory-muted
          "
              >
                Desenvolva conhecimento, técnica e confiança para atuar
                profissionalmente.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
