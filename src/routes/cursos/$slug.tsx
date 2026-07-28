import { createFileRoute } from "@tanstack/react-router";
import { COURSES } from "@/data/cursos";

export const Route = createFileRoute("/cursos/$slug")({
  component: CursoDetalhePage,
});

function CursoDetalhePage() {
  const { slug } = Route.useParams();

  const course = COURSES.find((item) => item.slug === slug);

  if (!course) {
    return (
      <main className="min-h-screen bg-obsidian text-ivory flex items-center justify-center">
        Curso não encontrado
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-obsidian text-ivory px-8 py-32">
      <h1 className="display text-5xl">{course.title}</h1>

      <p className="mt-5 text-ivory-muted">{course.subtitle}</p>
    </main>
  );
}
