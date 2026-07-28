import { createFileRoute } from "@tanstack/react-router";

import { calendar } from "@/lib/google-calendar";

const HORARIOS = [
  "08:00",
  "09:30",
  "11:00",
  "13:30",
  "15:00",
  "16:30",
  "18:00",
  "19:30",
];

export const Route = createFileRoute("/api/public/availability")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);

        const date = url.searchParams.get("date");

        if (!date) {
          return Response.json(
            {
              ok: false,
              error: "date-required",
            },

            {
              status: 400,
            },
          );
        }

        try {
          const startDay = new Date(`${date}T00:00:00`);

          const endDay = new Date(`${date}T23:59:59`);

          const events = await calendar.events.list({
            calendarId: process.env.GOOGLE_CALENDAR_ID || "primary",

            timeMin: startDay.toISOString(),

            timeMax: endDay.toISOString(),

            singleEvents: true,

            orderBy: "startTime",
          });

          const busy =
            events.data.items
              ?.map((event) => {
                const start = event.start?.dateTime;

                if (!start) return null;

                return new Date(start).toLocaleTimeString("pt-BR", {
                  hour: "2-digit",
                  minute: "2-digit",
                });
              })

              .filter(Boolean) ?? [];

          const available = HORARIOS.filter((hour) => !busy.includes(hour));

          return Response.json({
            ok: true,

            date,

            busy,

            available,
          });
        } catch (error) {
          console.error("[availability]", error);

          return Response.json(
            {
              ok: false,

              error: "calendar-error",
            },

            {
              status: 500,
            },
          );
        }
      },
    },
  },
});
