import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Check, MessageCircle, X } from "lucide-react";

import { useEffect, useMemo, useState } from "react";

import { PROCEDIMENTOS } from "@/data/procedimentos";

const HORARIOS = [
  "08:00",
  "08:30",
  "09:00",
  "09:30",
  "10:00",
  "10:30",
  "11:00",

  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",

  "18:00",
  "18:30",
  "19:00",
];

const WA_PHONE = "5534998407644";

export function BookingModal() {
  const [open, setOpen] = useState(false);

  const [step, setStep] = useState<"form" | "done">("form");

  const [name, setName] = useState("");

  const [phone, setPhone] = useState("");

  const [procedimento, setProcedimento] = useState(PROCEDIMENTOS[0].id);

  const [date, setDate] = useState("");

  const [time, setTime] = useState("");

  const [notes, setNotes] = useState("");

  const [busy, setBusy] = useState<string[]>([]);

  const [loadingTimes, setLoadingTimes] = useState(false);

  const [error, setError] = useState("");

  useEffect(() => {
    const openHandler = () => setOpen(true);

    window.addEventListener("scv:open-booking", openHandler);

    const hashHandler = () => {
      if (window.location.hash === "#agendar") {
        setOpen(true);

        history.replaceState(null, "", window.location.pathname);
      }
    };

    hashHandler();

    window.addEventListener("hashchange", hashHandler);

    return () => {
      window.removeEventListener("scv:open-booking", openHandler);

      window.removeEventListener("hashchange", hashHandler);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep("form");
      }, 300);
    }
  }, [open]);

  useEffect(() => {
    async function loadAvailability() {
      if (!date) {
        setBusy([]);

        setTime("");

        return;
      }

      try {
        setLoadingTimes(true);

        setTime("");

        const response = await fetch(`/api/public/availability?date=${date}`);

        const data = await response.json();

        if (data.ok) {
          setBusy(data.busy ?? []);
        }
      } catch {
        setBusy([]);
      } finally {
        setLoadingTimes(false);
      }
    }

    loadAvailability();
  }, [date]);

  const canSubmit =
    name.trim().length > 1 && phone.trim().length >= 8 && date && time;
  const waUrl = useMemo(() => {
    const procedimentoLabel =
      PROCEDIMENTOS.find((x) => x.id === procedimento)?.label ?? "";

    const d = date
      ? new Date(date + "T00:00:00").toLocaleDateString("pt-BR", {
          weekday: "long",
          day: "2-digit",
          month: "long",
          year: "numeric",
        })
      : "";

    const msg = [
      "Olá, Cleidiane! Gostaria de agendar um horário no Studio.",

      "",

      `*Nome:* ${name}`,

      `*Telefone:* ${phone}`,

      `*Procedimento:* ${procedimentoLabel}`,

      `*Data:* ${d}`,

      `*Horário:* ${time}`,

      notes ? `*Observações:* ${notes}` : null,

      "",

      "Aguardo sua confirmação. Obrigada!",
    ]

      .filter(Boolean)

      .join("\n");

    return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg)}`;
  }, [name, phone, procedimento, date, time, notes]);

  const resetForm = () => {
    setName("");

    setPhone("");

    setProcedimento(PROCEDIMENTOS[0].id);

    setDate("");

    setTime("");

    setNotes("");

    setBusy([]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    setError("");

    try {
      const response = await fetch("/api/public/booking", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name,

          phone,

          procedimento,

          date,

          time,

          notes,
        }),
      });

      const data = await response.json();

      if (!data.ok) {
        setError("Esse horário não está mais disponível.");

        return;
      }
    } catch {
      setError("Não foi possível verificar o horário.");

      return;
    }

    setStep("done");

    window.open(waUrl, "_blank", "noopener,noreferrer");

    resetForm();
  };

  const today = new Date().toISOString().split("T")[0];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
          }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          data-lenis-prevent
        >
          <button
            className="absolute inset-0 bg-obsidian/80 backdrop-blur-md"
            onClick={() => setOpen(false)}
            aria-label="Fechar"
          />

          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}

            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}

            exit={{
              opacity: 0,
              y: 20,
              scale: 0.96,
            }}

            className="
            relative
            w-full
            max-w-lg
            overflow-hidden
            rounded-2xl
            border
            border-white/[0.08]
            bg-onyx/95
            "
          >
            <button
              onClick={() => setOpen(false)}

              className="
            absolute
            right-4
            top-4
            z-10
            grid
            h-9
            w-9
            place-items-center
            rounded-full
            text-ivory-muted
            "
            >
              <X className="h-4 w-4" />
            </button>

            <div
              className="
          border-b
          border-white/[0.06]
          px-8
          py-6
          "
            >
              <div
                className="
            flex
            items-center
            gap-3
            "
              >
                <span
                  className="
              grid
              h-9
              w-9
              place-items-center
              rounded-full
              border
              border-champagne/40
              text-champagne
              "
                >
                  <Calendar className="h-4 w-4" />
                </span>

                <div>
                  <p
                    className="
                eyebrow
                text-champagne
                "
                  >
                    Agendamento
                  </p>

                  <p
                    className="
                mt-1
                font-display
                text-xl
                italic
                text-ivory
                "
                  >
                    Reserve seu momento
                  </p>
                </div>
              </div>
            </div>

            {step === "form" ? (
              <form
                onSubmit={handleSubmit}
                className="
            max-h-[70vh]
            space-y-5
            overflow-y-auto
            px-8
            py-6
            "
              >
                <Field label="Seu nome">
                  <input
                    required

                    value={name}

                    onChange={(e) => setName(e.target.value)}

                    className="input-field"

                    placeholder="Como podemos te chamar"
                  />
                </Field>

                <Field label="WhatsApp / Telefone">
                  <input
                    required

                    type="tel"

                    value={phone}

                    onChange={(e) => setPhone(e.target.value)}

                    className="input-field"

                    placeholder="(34) 9 9999-9999"
                  />
                </Field>

                <Field label="Procedimento">
                  <select
                    value={procedimento}

                    onChange={(e) => setProcedimento(e.target.value)}

                    className="input-field"
                  >
                    {PROCEDIMENTOS.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Data">
                  <input
                    required

                    type="date"

                    min={today}

                    value={date}

                    onChange={(e) => setDate(e.target.value)}

                    className="input-field"
                  />
                </Field>

                <Field label="Horário disponível">
                  {loadingTimes ? (
                    <p className="text-sm text-ivory-muted">
                      Consultando horários...
                    </p>
                  ) : (
                    <div
                      className="
                grid
                grid-cols-3
                gap-2
                "
                    >
                      {HORARIOS.map((hour) => {
                        const occupied = busy.some(
                          (busyHour) => busyHour.slice(0, 5) === hour,
                        );

                        return (
                          <button
                            key={hour}

                            type="button"

                            disabled={occupied}

                            onClick={() => {
                              if (occupied) {
                                setError(
                                  "Este horário já está reservado. Escolha outro horário.",
                                );

                                return;
                              }

                              setError("");

                              setTime(hour);
                            }}

                            className={`

                      rounded-md
                      border
                      px-3
                      py-3
                      text-xs
                      transition-all


                      ${
                        occupied
                          ? "cursor-not-allowed opacity-30 border-white/10"
                          : time === hour
                            ? "border-champagne bg-champagne/10 text-champagne"
                            : "border-white/10 text-ivory-muted"
                      }

                      `}
                          >
                            {hour}

                            {occupied && (
                              <span className="block text-[9px]">
                                Reservado
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Field>

                {error && (
                  <p
                    className="
              text-sm
              text-red-400
              "
                  >
                    {error}
                  </p>
                )}

                <Field label="Observações">
                  <textarea
                    value={notes}

                    onChange={(e) => setNotes(e.target.value)}

                    rows={3}

                    className="input-field resize-none"
                  />
                </Field>

                <button
                  disabled={!canSubmit}

                  className="
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-full
              bg-gradient-to-br
              from-champagne
              to-bronze
              py-4
              text-obsidian
              disabled:opacity-40
              "
                >
                  <MessageCircle className="h-4 w-4" />
                  Enviar solicitação
                </button>
              </form>
            ) : (
              <div
                className="
          px-8
          py-12
          text-center
          "
              >
                <Check
                  className="
              mx-auto
              h-10
              w-10
              text-champagne
              "
                />

                <p
                  className="
            mt-5
            text-xl
            text-ivory
            "
                >
                  Solicitação enviada
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span
        className="
      mb-2
      block
      text-[10px]
      uppercase
      text-ivory-muted
      "
      >
        {label}
      </span>

      {children}
    </label>
  );
}

export function openBooking() {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("scv:open-booking"));
  }
}
