import { Link } from "@tanstack/react-router";

interface CourseCardProps {
  course: {
    slug: string;
    title: string;
    subtitle: string;
    price: number;
    image: string;
  };
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Link
      to="/cursos/$slug"
      params={{
        slug: course.slug,
      }}
      className="
    group
    block
    overflow-hidden
    rounded-3xl
    border
    border-white/10
    bg-white/[0.03]
    transition-all
    duration-500
    hover:border-champagne/50
  "
    >
      <div className="overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="
            h-72
            w-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
        />
      </div>

      <div className="p-8">
        <h3
          className="
            display
            text-3xl
            text-ivory
          "
        >
          {course.title}
        </h3>

        <p
          className="
            mt-4
            text-ivory-muted
          "
        >
          {course.subtitle}
        </p>

        <div
          className="
            mt-8
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              text-xl
              text-champagne
            "
          >
            R$ {course.price}
          </span>

          <span
            className="
              text-xs
              uppercase
              tracking-[0.25em]
              text-champagne
            "
          >
            Ver curso →
          </span>
        </div>
      </div>
    </Link>
  );
}
