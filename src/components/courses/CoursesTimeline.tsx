import { motion } from "framer-motion";

interface CoursesTimelineProps {
  duration: string;
  modules: string[];
}

export function CoursesTimeline({ duration, modules }: CoursesTimelineProps) {
  const steps = modules.slice(0, 5);

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
          <p
            className="
          eyebrow
          text-champagne
          "
          >
            Sua jornada
          </p>

          <h2
            className="
          mt-6
          display
          text-4xl
          text-ivory
          md:text-6xl
          "
          >
            Uma formação criada para{" "}
            <span
              className="
            display-italic
            text-champagne
            "
            >
              evoluir.
            </span>
          </h2>

          <p
            className="
          mt-6
          max-w-2xl
          text-ivory-muted
          "
          >
            {duration}. Uma experiência prática, estruturada para desenvolver
            técnica, segurança e confiança.
          </p>
        </motion.div>

        <div
          className="
        relative
        mt-16
        "
        >
          <div
            className="
          absolute
          left-6
          top-0
          h-full
          w-px
          bg-champagne/20
          md:left-1/2
          "
          />

          <div
            className="
          space-y-10
          "
          >
            {steps.map((step, index) => (
              <motion.div
                key={step}

                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -30 : 30,
                }}

                whileInView={{
                  opacity: 1,
                  x: 0,
                }}

                viewport={{
                  once: true,
                }}

                transition={{
                  delay: index * 0.12,
                }}

                className="
            relative
            flex
            items-center
            gap-8
            md:justify-center
            "
              >
                <div
                  className="
              z-10
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-champagne/50
              bg-obsidian
              text-sm
              text-champagne
              "
                >
                  0{index + 1}
                </div>

                <div
                  className="
              w-full
              rounded-2xl
              border
              border-white/[0.08]
              bg-onyx
              p-6
              md:w-[420px]
              "
                >
                  <p
                    className="
                text-lg
                text-ivory
                "
                  >
                    {step}
                  </p>

                  <p
                    className="
                mt-3
                text-sm
                text-ivory-muted
                "
                  >
                    Desenvolvimento técnico acompanhado durante a formação.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
