import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { CustomCursor } from "@/components/experience/CustomCursor";

import appCss from "../styles.css?url";
import { reportRuntimeError } from "../lib/error-reporting";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-6">404</p>

        <h1 className="display text-5xl text-ivory">Página não encontrada</h1>

        <p className="mt-4 text-sm text-ivory-muted">
          A página que você procura não existe ou foi movida.
        </p>

        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full border border-champagne/40 px-6 py-3 text-xs tracking-[0.3em] uppercase text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
          >
            Voltar ao início
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);

  const router = useRouter();

  useEffect(() => {
    reportRuntimeError(error, {
      boundary: "tanstack_root_error_component",
    });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow mb-6">Erro</p>

        <h1 className="display text-4xl text-ivory">Algo não carregou</h1>

        <p className="mt-4 text-sm text-ivory-muted">
          Tente novamente em alguns instantes.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-champagne px-6 py-3 text-xs tracking-[0.3em] uppercase text-obsidian transition-opacity hover:opacity-90"
          >
            Tentar novamente
          </button>

          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-ivory/20 px-6 py-3 text-xs tracking-[0.3em] uppercase text-ivory transition-colors hover:border-champagne"
          >
            Início
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        name: "theme-color",
        content: "#050505",
      },
      {
        title: "Studio Cleidiane Vieira | Beleza e Estética em Uberlândia",
      },
      {
        name: "description",
        content:
          "Studio Cleidiane Vieira em Uberlândia. Especialista em alongamento de cílios, alisamento saudável e micropigmentação com atendimento personalizado.",
      },
      {
        name: "author",
        content: "Studio Cleidiane Vieira",
      },
      {
        property: "og:title",
        content: "Studio Cleidiane Vieira | Beleza e Estética em Uberlândia",
      },
      {
        property: "og:description",
        content:
          "Uma experiência de beleza cinematográfica em Uberlândia. Cílios, alisamento saudável, micropigmentação e microblading shadow.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        property: "og:site_name",
        content: "Studio Cleidiane Vieira",
      },
      {
        name: "twitter:card",
        content: "summary_large_image",
      },
    ],

    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "icon",
        href: "/favicon.png",
        type: "image/x-icon",
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@200;300;400;500;600&display=swap",
      },
    ],

    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BeautySalon",

          name: "Studio Cleidiane Vieira",

          image:
            "https://project--9eac0968-8247-47f5-ab13-3b1f4c6b91f5.lovable.app/og.jpg",

          "@id":
            "https://project--9eac0968-8247-47f5-ab13-3b1f4c6b91f5.lovable.app",

          telephone: "+55 34 98444-9130",

          address: {
            "@type": "PostalAddress",
            streetAddress: "Rua da Telefonista, 155",
            addressLocality: "Uberlândia",
            addressRegion: "MG",
            addressCountry: "BR",
          },

          sameAs: [
            "https://www.instagram.com/studio_cleidianevieira/",
            "https://wa.me/5534998407644",
          ],

          priceRange: "$$",

          description:
            "Studio de beleza especializado em alongamento de cílios, alisamento saudável, micropigmentação e microblading shadow.",
        }),
      },
    ],
  }),

  shellComponent: RootShell,

  component: RootComponent,

  notFoundComponent: NotFoundComponent,

  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <HeadContent />
      </head>

      <body>
        {children}

        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <CustomCursor />

      <Outlet />
    </QueryClientProvider>
  );
}
