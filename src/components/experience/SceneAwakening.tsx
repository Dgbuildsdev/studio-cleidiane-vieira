import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroCanvas = lazy(() =>
  import("./three/HeroCanvas").then((m) => ({ default: m.HeroCanvas })),
);

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const WA_HREF =
  "https://wa.me/5534998407644?text=Ol%C3%A1%2C%20Cleidiane.%20Conheci%20o%20Studio%20e%20gostaria%20de%20agendar%20um%20hor%C3%A1rio.";

/**
 * Cinematic Hero.
 * Layers (back → front):
 *   1. Photo/video of Cleidiane (drop asset at /public/hero.mp4 + /public/hero-poster.jpg)
 *   2. Cinematic vignette + veil
 *   3. Three.js particle field (HeroCanvas)
 *   4. Editorial typography + CTA + scroll cue
 *
 * GSAP ScrollTrigger pins the block briefly and parallax-scrolls each layer at
 * a different depth for a cinema-like reveal.
 */
export function SceneAwakening() {
  const rootRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [enable3D, setEnable3D] = useState(false);
  const [hasVideo, setHasVideo] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const wide = window.matchMedia("(min-width: 768px)").matches;
    setEnable3D(!reduce && wide);

    // Probe for hero.mp4 — if the studio hasn't uploaded yet we fall back gracefully.
    fetch("/hero.mp4", { method: "HEAD" })
      .then((r) => setHasVideo(r.ok))
      .catch(() => setHasVideo(false));
  }, []);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Intro reveal — letters + CTA
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
      });
      tl.from(".hero-line", {
        yPercent: 110,
        duration: 1.1,
        stagger: 0.12,
        delay: 0.4,
      })
        .from(".hero-eyebrow", { opacity: 0, y: 20, duration: 1 }, "-=0.9")
        .from(".hero-cta", { opacity: 0, y: 30, duration: 1 }, "-=0.7")
        .from(".hero-cue", { opacity: 0, duration: 1 }, "-=0.6");

      // Scroll-linked cinematic parallax
      gsap
        .timeline({
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        })
        .to(mediaRef.current, { yPercent: 18, scale: 1.08, ease: "none" }, 0)
        .to(canvasRef.current, { yPercent: -8, ease: "none" }, 0)
        .to(veilRef.current, { opacity: 0.9, ease: "none" }, 0)
        .to(contentRef.current, { yPercent: -30, opacity: 0, ease: "none" }, 0)
        .to(cueRef.current, { opacity: 0, ease: "none" }, 0);
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={rootRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-obsidian grain"
    >
      {/* LAYER 1 — Photo / Video of Cleidiane */}
      <div
        ref={mediaRef}
        className="absolute inset-0 will-change-transform"
        aria-hidden
      >
        {hasVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/hero-poster.jpg"
          >
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          // Editorial placeholder — replace by dropping /public/hero.mp4 + /public/hero-poster.jpg
          <div
            className="h-full w-full"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at 35% 40%, oklch(0.35 0.04 60) 0%, transparent 55%), radial-gradient(ellipse at 70% 65%, oklch(0.22 0.02 60) 0%, transparent 60%), linear-gradient(180deg, oklch(0.12 0.005 60), oklch(0.06 0.003 60))",
            }}
          />
        )}
      </div>

      {/* LAYER 2 — Cinematic veil (darkens for legibility) */}
      <div
        ref={veilRef}
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.06 0.003 60 / 0.55) 0%, oklch(0.06 0.003 60 / 0.35) 35%, oklch(0.06 0.003 60 / 0.85) 100%), radial-gradient(ellipse at top, oklch(0.83 0.065 82 / 0.10), transparent 60%)",
        }}
      />

      {/* LAYER 3 — Three.js particle field */}
      {mounted && enable3D && (
        <div ref={canvasRef} className="absolute inset-0 mix-blend-screen">
          <Suspense fallback={null}>
            <HeroCanvas />
          </Suspense>
        </div>
      )}

      {/* Cinematic side bars (letterbox hint) */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-champagne/20 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-champagne/20 to-transparent" />

      {/* LAYER 4 — Content */}
      <div
        ref={contentRef}
        className="relative z-10 mx-auto max-w-5xl px-6 text-center will-change-transform"
      >
        <div className="hero-eyebrow">
          <p className="eyebrow">Studio Cleidiane Vieira · Uberlândia</p>
        </div>

        <h1 className="mt-10 display text-[clamp(2.75rem,8vw,7rem)] text-ivory">
          <span className="reveal-mask">
            <span className="hero-line inline-block">A beleza não</span>
          </span>{" "}
          <span className="reveal-mask">
            <span className="hero-line inline-block">
              <em className="display-italic text-champagne">transforma</em>{" "}
              você.
            </span>
          </span>
          <br />
          <span className="reveal-mask">
            <span className="hero-line inline-block">Ela revela quem</span>
          </span>{" "}
          <span className="reveal-mask">
            <span className="hero-line inline-block">
              você <em className="display-italic text-champagne">sempre foi</em>
              .
            </span>
          </span>
        </h1>

        <div className="hero-cta mt-14 flex flex-col items-center gap-6">
          <a
            href={WA_HREF}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-gradient-to-br from-champagne via-champagne to-bronze px-9 py-5 text-obsidian shadow-[0_30px_80px_-20px_oklch(0.83_0.065_82_/_0.55)] transition-transform duration-500 hover:scale-[1.02]"
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
            <span className="relative text-[11px] tracking-[0.32em] uppercase font-medium">
              Agendar pelo WhatsApp
            </span>
          </a>
          <p className="text-[10px] tracking-[0.35em] uppercase text-ivory-muted">
            Atendimento com hora marcada · Uberlândia — MG
          </p>
        </div>
      </div>

      {/* Scroll cue */}
      <div
        ref={cueRef}
        className="hero-cue pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-4"
      >
        <div className="relative h-14 w-px overflow-hidden">
          <motion.span
            className="absolute inset-x-0 top-0 h-6 bg-gradient-to-b from-champagne to-transparent"
            animate={{ y: ["-100%", "140%"] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <p className="text-[10px] tracking-[0.4em] uppercase text-ivory-muted">
          Role para descobrir
        </p>
      </div>

      {/* Bottom fade into next scene */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-obsidian" />
    </section>
  );
}
