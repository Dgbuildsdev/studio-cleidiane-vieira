import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

import { COURSES } from "@/data/cursos";

import { CourseGallery } from "@/components/courses/CourseGallery";
import { CourseAudience } from "@/components/courses/CourseAudience";
import { CoursesTimeline } from "@/components/courses/CoursesTimeline";
import { CoursesCTA } from "@/components/courses/CoursesCTA";
import { CoursesFAQ } from "@/components/courses/CoursesFAQ";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cursos/cabeleireira-profissional")({
  component: CabeleireiraPage,
});

function CabeleireiraPage() {
  const course = COURSES.find(
    (item) => item.slug === "cabeleireira-profissional",
  );

  if (!course) {
    return null;
  }

  return (
    <main
      className="
      min-h-screen
      bg-obsidian
      text-ivory
      "
    >
      {/* HERO */}

      <section className="relative overflow-hidden py-32">
        <div
          className="
          mx-auto
          max-w-7xl
          px-6
          md:px-10
          "
        >
          <Link
            to="/cursos"
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
            initial={{
              opacity: 0,
              y: 30,
            }}

            animate={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 1,
            }}

            className="max-w-4xl"
          >
            <p
              className="
            eyebrow
            text-champagne
            "
            >
              Curso profissional
            </p>

            <h1
              className="
              mt-8
              display
              text-[clamp(2.5rem,6vw,5rem)]
              "
            >
              Cabeleireira{" "}
              <span
                className="
                display-italic
                text-champagne
                "
              >
                Profissional
              </span>
            </h1>

            <p
              className="
              mt-8
              max-w-2xl
              text-lg
              leading-relaxed
              text-ivory-muted
              "
            >
              Aprenda técnicas profissionais de cabelo, tratamentos e
              transformação da beleza em uma nova profissão.
            </p>

            <button
              data-cursor-hover

              onClick={() =>
                window.open(
                  "https://wa.me/5534998407644?text=Olá Cleidiane, quero me inscrever no Curso de Cabeleireira",
                  "_blank",
                )
              }

              className="
              mt-10
              rounded-full
              bg-gradient-to-br
              from-champagne
              to-bronze
              px-10
              py-4
              text-xs
              uppercase
              tracking-[0.3em]
              text-obsidian
              "
            >
              Quero me inscrever
            </button>
          </motion.div>
        </div>
      </section>

      {/* INFORMAÇÕES */}

      <section
        className="
        border-y
        border-white/[0.06]
        py-24
        "
      >
        <div
          className="
          mx-auto
          grid
          max-w-7xl
          gap-10
          px-6
          md:grid-cols-3
          md:px-10
          "
        >
          <Info title="Investimento" value="R$ 2.500" />

          <Info title="Duração" value="5 dias de formação" />

          <Info title="Certificado" value="Incluso" />
        </div>
      </section>

      {/* MÓDULOS */}

      <section className="py-24">
        <div
          className="
          mx-auto
          max-w-7xl
          px-6
          md:px-10
          "
        >
          <Title>
            O que você vai <span className="text-champagne">aprender</span>
          </Title>

          <div
            className="
            mt-12
            grid
            gap-5
            md:grid-cols-2
            "
          >
            {course.modules.map((item, index) => (
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
                  delay: index * 0.1,
                }}

                className="
                  rounded-xl
                  border
                  border-white/[0.08]
                  bg-onyx
                  p-6
                  "
              >
                <span
                  className="
                    text-champagne
                    "
                >
                  0{index + 1}
                </span>

                <p className="mt-3">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERIA */}

      <CourseGallery />

      {/* PARA QUEM É */}

      <CourseAudience audience={course.audience} />

      {/* CRONOGRAMA */}

      <CoursesTimeline
        duration={course.duration}

        modules={course.modules}
      />

      {/* BENEFÍCIOS */}

      <section
        className="
        bg-onyx
        py-24
        "
      >
        <div
          className="
          mx-auto
          max-w-7xl
          px-6
          md:px-10
          "
        >
          <Title>
            O curso inclui{" "}
            <span className="text-champagne">tudo para começar</span>
          </Title>

          <div
            className="
            mt-10
            flex
            flex-wrap
            gap-4
            "
          >
            {course.features.map((feature) => (
              <span
                key={feature}

                className="
                    rounded-full
                    border
                    border-champagne/30
                    px-6
                    py-3
                    text-champagne
                    "
              >
                ✓ {feature}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <CoursesFAQ />

      {/* CTA */}

      <CoursesCTA />
    </main>
  );
}

function Info({
  title,

  value,
}: {
  title: string;

  value: string;
}) {
  return (
    <div>
      <p
        className="
        text-xs
        uppercase
        tracking-[0.3em]
        text-ivory-muted
        "
      >
        {title}
      </p>

      <p
        className="
        mt-3
        display
        text-3xl
        text-champagne
        "
      >
        {value}
      </p>
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h2
      className="
      display
      text-4xl
      md:text-6xl
      "
    >
      {children}
    </h2>
  );
}
