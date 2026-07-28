export function CourseBenefits() {
  const benefits = [
    "Certificado profissional",
    "Material didático",
    "Apostila completa",
    "Acompanhamento da professora",
    "Grupo exclusivo de alunos",
    "Suporte após o curso",
    "Café durante as aulas",
    "Aula prática em modelo",
  ];

  return (
    <section className="border-y border-white/[0.06] py-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <div className="max-w-2xl mb-16">
          <p className="eyebrow text-champagne">Incluso na formação</p>

          <h2 className="mt-6 display text-4xl text-ivory">
            Tudo para você começar sua{" "}
            <span className="display-italic text-champagne">
              nova profissão.
            </span>
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-4">
          {benefits.map((item) => (
            <div
              key={item}
              className="
              rounded-xl
              border
              border-white/[0.08]
              bg-onyx
              p-6
              "
            >
              <p className="text-sm text-ivory">✓ {item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
