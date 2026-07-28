import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { createCalendarEvent, calendar } from "@/lib/google-calendar";

const BookingSchema = z.object({
  name: z.string().min(2).max(120),

  phone: z.string().min(8).max(30),

  procedimento: z.string().min(2).max(60),

  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),

  time: z.string().regex(/^\d{2}:\d{2}$/),

  notes: z.string().max(600).optional().default(""),
});

const PROCEDIMENTO_LABEL: Record<string, string> = {
  cilios: "Alongamento de Cílios",

  alisamento: "Alisamento Saudável",

  micro: "Micropigmentação",

  shadow: "Microblading Shadow",

  avaliacao: "Avaliação personalizada",
};

async function tryCreateCalendarEvent(payload: z.infer<typeof BookingSchema>) {
  const procedimentoLabel =
    PROCEDIMENTO_LABEL[payload.procedimento] ?? payload.procedimento;

  const startDate = new Date(`${payload.date}T${payload.time}:00`);

  const endDate = new Date(startDate);

  // duração padrão do atendimento
  // depois podemos ajustar por procedimento
  endDate.setHours(endDate.getHours() + 2);

  try {
    /*
      VERIFICA SE EXISTE EVENTO NO MESMO HORÁRIO
    */

    const existingEvents = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",

      timeMin: startDate.toISOString(),

      timeMax: endDate.toISOString(),

      singleEvents: true,

      orderBy: "startTime",
    });

    if (existingEvents.data.items && existingEvents.data.items.length > 0) {
      return {
        created: false,

        reason: "horario-indisponivel",
      };
    }

    /*
      CRIA EVENTO
    */

    const event = await createCalendarEvent({
      summary: `[SOLICITAÇÃO] ${procedimentoLabel} — ${payload.name}`,

      description: [
        `Cliente: ${payload.name}`,

        `WhatsApp: ${payload.phone}`,

        `Procedimento: ${procedimentoLabel}`,

        `Data: ${payload.date}`,

        `Horário: ${payload.time}`,

        payload.notes ? `Observações: ${payload.notes}` : "",

        "",

        "Solicitação recebida pelo site do Studio Cleidiane Vieira.",

        "Confirmar horário final pelo WhatsApp.",
      ]

        .filter(Boolean)

        .join("\n"),

      start: startDate.toISOString(),

      end: endDate.toISOString(),
    });

    return {
      created: true,

      id: event.id,

      htmlLink: event.htmlLink,
    };
  } catch (error) {
    console.error("[booking] Google Calendar error:", error);

    return {
      created: false,

      reason: "calendar-error",
    };
  }
}

export const Route = createFileRoute("/api/public/booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;

        try {
          json = await request.json();
        } catch {
          return Response.json(
            {
              ok: false,

              error: "invalid-json",
            },

            {
              status: 400,
            },
          );
        }

        const parsed = BookingSchema.safeParse(json);

        if (!parsed.success) {
          return Response.json(
            {
              ok: false,

              error: "invalid-payload",

              details: parsed.error.flatten(),
            },

            {
              status: 400,
            },
          );
        }

        const result = await tryCreateCalendarEvent(parsed.data);

        return Response.json({
          ok: result.created,

          calendar: result,
        });
      },

      OPTIONS: async () => {
        return new Response(
          null,

          {
            status: 204,

            headers: {
              "Access-Control-Allow-Origin": "*",

              "Access-Control-Allow-Methods": "POST, OPTIONS",

              "Access-Control-Allow-Headers": "Content-Type",
            },
          },
        );
      },
    },
  },
});
