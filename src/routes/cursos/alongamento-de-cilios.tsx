import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { COURSES } from "@/data/cursos";
import { CourseGallery } from "@/components/courses/CourseGallery";
import { CourseAudience } from "@/components/courses/CourseAudience";
import { CoursesTimeline } from "@/components/courses/CoursesTimeline";
import { CoursesCTA } from "@/components/courses/CoursesCTA";
import { CoursesFAQ } from "@/components/courses/CoursesFAQ";
import { Info } from "@/components/courses/Info";
import { Title } from "@/components/courses/Title";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/cursos/alongamento-de-cilios")({
  component: AlongamentoCiliosPage,
});

function AlongamentoCiliosPage() {
  const course = COURSES.find((item) => item.slug === "alongamento-de-cilios");

  if (!course) {
    return null;
  }

  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      {/* HERO */}

      <section className="relative overflow-hidden py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
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
            <p className="eyebrow text-champagne">Curso profissional</p>

            <h1
              className="
            mt-8
            display
            text-[clamp(2.5rem,6vw,5rem)]
            "
            >
              Alongamento de{" "}
              <span className="display-italic text-champagne">Cílios</span>
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
              Do básico ao avançado. Aprenda uma técnica profissional,
              atendimento personalizado e como transformar a beleza em uma nova
              profissão.
            </p>

            <button
              data-cursor-hover
              onClick={() =>
                window.open(
                  "https://wa.me/5534998407644?text=Olá Cleidiane, quero me inscrever no Curso de Alongamento de Cílios",
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
          <Info title="Investimento" value="R$ 1.500" />

          <Info title="Duração" value="2 dias de formação" />

          <Info title="Certificado" value="Incluso" />
        </div>
      </section>

      {/* MÓDULOS */}

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <Title>
            O que você vai <span>aprender</span>
          </Title>

          <div
            className="
          mt-12
          grid
          gap-4
          md:grid-cols-2
          "
          >
            {course.modules.map((module, index) => (
              <div
                key={module}
                className="
            rounded-xl
            border
            border-white/[0.08]
            bg-onyx
            p-6
            "
              >
                <p className="text-champagne">0{index + 1}</p>

                <p className="mt-3 text-ivory">{module}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CourseGallery />

      <CourseAudience audience={course.audience} />

      <CoursesTimeline duration={course.duration} modules={course.modules} />

      {/* INCLUSO */}

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
            O curso inclui <span>tudo para começar</span>
          </Title>

          <div
            className="
                        mt-12
                        flex
                        flex-wrap
                        gap-4
                        "
          >
            {course.features.map((item) => (
              <div
                key={item}
                className="
                                rounded-full
                                border
                                border-champagne/30
                                px-6
                                py-3
                                text-sm
                                text-champagne
                                "
              >
                ✓ {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}

      <CoursesFAQ />

      {/* CTA FINAL */}

      <CoursesCTA />
    </main>
  );
}
