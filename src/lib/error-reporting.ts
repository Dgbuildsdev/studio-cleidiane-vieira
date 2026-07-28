export function reportRuntimeError(
  error: unknown,
  context: Record<string, unknown> = {},
) {
  if (typeof window === "undefined") return;

  const payload = {
    message:
      error instanceof Error
        ? error.message
        : error instanceof Response
          ? `Response ${error.status} ${error.url ?? ""}`
          : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    route: window.location.pathname,
    timestamp: new Date().toISOString(),
    ...context,
  };

  console.error("[Runtime Error]", payload);

  // Futuramente podemos enviar isso para:
  // - Sentry
  // - PostHog
  // - nosso próprio endpoint /api/errors
}
