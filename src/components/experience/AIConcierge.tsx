"use client";

import { useChat } from "@ai-sdk/react";
import { AnimatePresence, motion } from "framer-motion";

import { Sparkles, X, Send, RotateCcw, ArrowLeft } from "lucide-react";

import { useEffect, useRef, useState } from "react";

import ReactMarkdown from "react-markdown";
import { openBooking } from "./BookingModal";

const WELCOME = {
  id: "welcome",
  role: "assistant" as const,
  content:
    "Olá! Sou sua **Assistente Virtual IA** ✨\n\n" +
    "Estou aqui para ajudar com informações, serviços, valores e agendamentos.\n\n" +
    "Como posso ajudar você?",
};

const SUGGESTIONS = [
  "Quero agendar um horário",
  "Quanto custa o alongamento de cílios?",
  "Como funciona o alisamento saudável?",
  "Sobre a micropigmentação",
  "Cuidados pré e pós procedimento",
  "Onde fica o Studio?",
];

export function AIConcierge() {
  const { messages, append, status, setMessages } = useChat({
    id: "ai-concierge",

    api: "/api/chat",

    initialMessages: [WELCOME],
  });

  const [open, setOpen] = useState(false);

  const [input, setInput] = useState("");

  const [view, setView] = useState<"menu" | "chat">("menu");

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 200);
    }
  }, [open, view]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  function backToMenu() {
    setMessages([WELCOME]);

    setInput("");

    setView("menu");
  }

  function send(text: string) {
    const value = text.trim();

    if (!value || isLoading) return;

    setView("chat");

    append({
      role: "user",
      content: value,
    });

    setInput("");
  }

  const answered = view === "chat" && !isLoading && messages.length > 1;

  return (
    <>
      {/* Trigger */}
      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.6, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
        whileHover={{ scale: 1.05 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Fechar assistente" : "Abrir assistente"}
        data-cursor-hover
        className="fixed bottom-6 left-6 z-40 md:bottom-8 md:left-8"
      >
        <span className="absolute inset-0 -z-10 animate-pulse rounded-full bg-champagne/20 blur-xl" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full border border-champagne/40 bg-onyx/80 backdrop-blur-xl text-champagne shadow-[0_20px_60px_-10px_oklch(0_0_0_/_0.6)] transition-colors hover:bg-champagne hover:text-obsidian">
          {open ? (
            <X className="h-5 w-5" strokeWidth={1.5} />
          ) : (
            <Sparkles className="h-5 w-5" strokeWidth={1.5} />
          )}
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed bottom-24 left-4 right-4 z-40 flex h-[min(78vh,640px)] max-w-md flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-onyx/95 backdrop-blur-2xl shadow-[0_40px_80px_-20px_oklch(0_0_0_/_0.7)] md:left-8 md:right-auto md:w-[420px]"
            data-lenis-prevent
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
              <div className="flex items-center gap-3">
                {view === "chat" ? (
                  <button
                    onClick={backToMenu}
                    aria-label="Voltar ao menu"
                    className="grid h-9 w-9 place-items-center rounded-full border border-champagne/30 bg-champagne/[0.05] text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
                    data-cursor-hover
                  >
                    <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
                  </button>
                ) : (
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-champagne/40 bg-champagne/[0.05] text-champagne">
                    <Sparkles className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                )}
                <div>
                  <p className="font-display text-sm text-ivory">
                    Assistente da{" "}
                    <span className="italic text-champagne">
                      Cleidiane Vieira
                    </span>
                  </p>
                  <p className="text-[10px] tracking-[0.25em] uppercase text-ivory-muted/70">
                    {view === "chat" ? "Conversando" : "Como posso te ajudar?"}
                  </p>
                </div>
              </div>
              {view === "chat" && (
                <button
                  onClick={backToMenu}
                  aria-label="Nova pergunta"
                  className="grid h-8 w-8 place-items-center rounded-full text-ivory-muted transition-colors hover:bg-white/[0.05] hover:text-champagne"
                  data-cursor-hover
                  title="Nova pergunta"
                >
                  <RotateCcw className="h-3.5 w-3.5" strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/* Body */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5"
              data-lenis-prevent
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {messages.map((m) => {
                const isUser = m.role === "user";
                if (view === "menu" && m.id !== "welcome") return null;
                const text = m.parts
                  .map((p) => (p.type === "text" ? p.text : ""))
                  .join("");
                return (
                  <div
                    key={m.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                        isUser
                          ? "bg-champagne text-obsidian"
                          : "border border-white/[0.06] bg-graphite/60 text-ivory"
                      }`}
                    >
                      {isUser ? (
                        <p className="whitespace-pre-wrap">{text}</p>
                      ) : (
                        <div className="prose prose-sm prose-invert max-w-none prose-p:my-1.5 prose-strong:text-champagne prose-a:text-champagne prose-a:no-underline hover:prose-a:underline prose-ul:my-2 prose-li:my-0.5">
                          <ReactMarkdown
                            components={{
                              a: ({ href, children, ...props }) => {
                                if (href === "#agendar") {
                                  return (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpen(false);
                                        openBooking();
                                      }}
                                      className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-champagne/10 px-3 py-1 text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
                                    >
                                      ✨ {children}
                                    </button>
                                  );
                                }
                                return (
                                  <a
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    {...props}
                                  >
                                    {children}
                                  </a>
                                );
                              },
                            }}
                          >
                            {text}
                          </ReactMarkdown>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1.5 rounded-2xl border border-white/[0.06] bg-graphite/60 px-4 py-3">
                    <Dot delay={0} />
                    <Dot delay={0.15} />
                    <Dot delay={0.3} />
                  </div>
                </div>
              )}

              {view === "menu" && !isLoading && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      data-cursor-hover
                      className="rounded-full border border-champagne/25 bg-champagne/[0.03] px-3 py-1.5 text-[11px] text-ivory-muted transition-all hover:border-champagne/60 hover:bg-champagne/10 hover:text-champagne"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {answered && (
                <div className="flex flex-col gap-2 border-t border-white/[0.06] pt-4">
                  <p className="text-center text-[10px] tracking-[0.3em] uppercase text-ivory-muted/60">
                    Leia com calma — sem pressa ✨
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={backToMenu}
                      data-cursor-hover
                      className="flex-1 rounded-full border border-champagne/40 bg-champagne/10 px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase text-champagne transition-colors hover:bg-champagne hover:text-obsidian"
                    >
                      ← Voltar ao menu
                    </button>
                    <button
                      onClick={() => inputRef.current?.focus()}
                      data-cursor-hover
                      className="flex-1 rounded-full border border-white/10 px-4 py-2.5 text-[11px] tracking-[0.2em] uppercase text-ivory-muted transition-colors hover:border-white/30 hover:text-ivory"
                    >
                      Continuar aqui
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Composer — only in chat view, so cada resposta volta ao menu inicial */}
            {view === "chat" && (
              <div className="border-t border-white/[0.06] p-4">
                <div className="flex items-end gap-2 rounded-xl border border-white/[0.08] bg-obsidian/60 p-2 focus-within:border-champagne/40">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send(input);
                      }
                    }}
                    placeholder="Continue a conversa…"
                    rows={1}
                    className="max-h-32 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-ivory placeholder:text-ivory-muted/60 focus:outline-none"
                  />
                  <button
                    onClick={() => send(input)}
                    disabled={!input.trim() || isLoading}
                    aria-label="Enviar"
                    data-cursor-hover
                    className="grid h-9 w-9 place-items-center rounded-lg bg-champagne text-obsidian transition-opacity hover:opacity-90 disabled:opacity-30"
                  >
                    <Send className="h-4 w-4" strokeWidth={1.75} />
                  </button>
                </div>
                <p className="mt-2 text-center text-[10px] tracking-[0.25em] uppercase text-ivory-muted/60">
                  Assistente com IA · respostas orientativas
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="block h-1.5 w-1.5 rounded-full bg-champagne"
      animate={{ opacity: [0.3, 1, 0.3], y: [0, -2, 0] }}
      transition={{ duration: 1, repeat: Infinity, delay, ease: "easeInOut" }}
    />
  );
}
