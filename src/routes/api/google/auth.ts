import { createFileRoute } from "@tanstack/react-router";
import { google } from "googleapis";

export const Route = createFileRoute("/api/google/auth")({
  server: {
    handlers: {
      GET: async () => {
        const oauth2Client = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET,
          process.env.GOOGLE_REDIRECT_URI,
        );

        const url = oauth2Client.generateAuthUrl({
          access_type: "offline",

          prompt: "consent",

          scope: ["https://www.googleapis.com/auth/calendar"],
        });

        return Response.redirect(url);
      },
    },
  },
});
