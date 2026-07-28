import { motion } from "framer-motion";

const FAQ = [
  {
    question: "Preciso ter experiência na área da beleza?",
    answer:
      "Não. O curso foi desenvolvido para iniciantes e também para profissionais que desejam aperfeiçoar suas técnicas.",
  },

  {
    question: "O curso possui certificado?",
    answer:
      "Sim. Ao finalizar a formação você recebe certificado profissional.",
  },

  {
    question: "O material está incluso?",
    answer:
      "Sim. Você recebe todo o suporte necessário para acompanhar a formação.",
  },

  {
    question: "Vou praticar durante o curso?",
    answer:
      "Sim. A formação possui prática real para desenvolver segurança e confiança.",
  },
];

export function CoursesFAQ() {
  return (
    <section className="py-24">
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
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          viewport={{
            once: true,
          }}
        >
          <p className="eyebrow text-champagne">Dúvidas frequentes</p>

          <h2
            className="
mt-6
display
text-4xl
text-ivory
md:text-6xl
"
          >
            Tudo que você precisa saber antes de começar.
          </h2>
        </motion.div>

        <div
          className="
mt-12
space-y-4
"
        >
          {FAQ.map((item) => (
            <div
              key={item.question}
              className="
rounded-2xl
border
border-white/[0.08]
bg-onyx
p-6
"
            >
              <h3
                className="
text-lg
text-champagne
"
              >
                {item.question}
              </h3>

              <p
                className="
mt-3
text-sm
leading-relaxed
text-ivory-muted
"
              >
                {item.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
