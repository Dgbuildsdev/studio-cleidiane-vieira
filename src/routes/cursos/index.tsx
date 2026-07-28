import { createFileRoute } from "@tanstack/react-router";

import { CoursesHero } from "@/components/courses/CoursesHero";
import { CourseCard } from "@/components/courses/CourseCard";
import { CourseBenefits } from "@/components/courses/CourseBenefits";
import { CoursesCTA } from "@/components/courses/CoursesCTA";

import { COURSES } from "@/data/cursos";

export const Route = createFileRoute("/cursos/")({
  component: CursosPage,
});

function CursosPage() {
  return (
    <main className="min-h-screen bg-obsidian text-ivory">
      <CoursesHero />

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-16">
          <p className="eyebrow text-champagne">Formação profissional</p>

          <h2 className="mt-6 display text-4xl md:text-6xl">
            Escolha sua{" "}
            <span className="display-italic text-champagne">
              especialização
            </span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {COURSES.map((course) => (
            <CourseCard key={course.slug} course={course} />
          ))}
        </div>
      </section>

      <CourseBenefits />

      <CoursesCTA />
    </main>
  );
}
