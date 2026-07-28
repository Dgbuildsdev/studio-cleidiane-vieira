import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GOOGLE_CALENDAR_ID,
  GOOGLE_REDIRECT_URI,
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
  throw new Error(
    "Variáveis do Google Calendar não configuradas corretamente.",
  );
}

const auth = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URI,
);

auth.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
});

export const calendar = google.calendar({
  version: "v3",
  auth,
});

interface CalendarEvent {
  summary: string;
  description: string;
  start: string;
  end: string;
}

export async function createCalendarEvent(event: CalendarEvent) {
  try {
    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID || "primary",

      requestBody: {
        summary: event.summary,

        description: event.description,

        start: {
          dateTime: event.start,
          timeZone: "America/Sao_Paulo",
        },

        end: {
          dateTime: event.end,
          timeZone: "America/Sao_Paulo",
        },
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar evento no Google Calendar:", error);

    throw error;
  }
}
