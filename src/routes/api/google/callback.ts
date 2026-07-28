import { createFileRoute } from "@tanstack/react-router";
import { google } from "googleapis";

export const Route = createFileRoute("/api/google/callback")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        try {
          const url = new URL(request.url);

          const code = url.searchParams.get("code");

          if (!code) {
            return new Response("Código OAuth não encontrado.", {
              status: 400,
            });
          }

          const oauth2Client = new google.auth.OAuth2(
            process.env.GOOGLE_CLIENT_ID,
            process.env.GOOGLE_CLIENT_SECRET,
            process.env.GOOGLE_REDIRECT_URI,
          );

          const { tokens } = await oauth2Client.getToken(code);

          return new Response(
            `
            <!DOCTYPE html>
            <html lang="pt-BR">
            <head>
                <meta charset="UTF-8" />
                <title>Studio Cleidiane Vieira</title>

                <style>
                    body{
                        font-family:Arial,Helvetica,sans-serif;
                        display:flex;
                        justify-content:center;
                        align-items:center;
                        height:100vh;
                        margin:0;
                        background:#faf7f2;
                    }

                    .card{
                        background:#fff;
                        padding:40px;
                        border-radius:16px;
                        box-shadow:0 10px 30px rgba(0,0,0,.08);
                        text-align:center;
                        max-width:520px;
                    }

                    h1{
                        color:#1f9d55;
                        margin-bottom:15px;
                    }

                    p{
                        color:#555;
                        line-height:1.6;
                    }
                </style>
            </head>

            <body>

                <div class="card">
                    <h1>✅ Google Calendar conectado!</h1>

                    <p>
                        A autorização foi concluída com sucesso.
                    </p>

                    <p>
                        Agora volte ao terminal da aplicação e copie o
                        <strong>GOOGLE_REFRESH_TOKEN</strong>.
                    </p>

                    <p>
                        Depois atualize seu arquivo <strong>.env</strong>.
                    </p>
                </div>

            </body>
            </html>
            `,
            {
              headers: {
                "Content-Type": "text/html",
              },
            },
          );
        } catch (error) {
          console.error(error);

          return new Response("Erro ao obter os tokens do Google.", {
            status: 500,
          });
        }
      },
    },
  },
});
