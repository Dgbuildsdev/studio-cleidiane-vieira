import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { openBooking } from "./BookingModal";

const NAV = [
  { label: "Filosofia", href: "#reflection", type: "anchor" },
  { label: "Studio", href: "#trust", type: "anchor" },
  { label: "Procedimentos", href: "#transformation", type: "anchor" },
  { label: "Depoimentos", href: "#voices", type: "anchor" },
  { label: "Contato", href: "#invitation", type: "anchor" },

  {
    label: "Cursos",
    href: "/cursos",
    type: "route",
  },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const ids = NAV.filter((n) => n.type === "anchor").map((n) =>
        n.href.slice(1),
      );

      let current = "";

      for (const id of ids) {
        const el = document.getElementById(id);

        if (!el) continue;

        const rect = el.getBoundingClientRect();

        if (rect.top <= 140 && rect.bottom >= 140) {
          current = id;
          break;
        }
      }

      setActive(current);
    };

    onScroll();

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 1.2,
        delay: 0.4,
        ease: [0.2, 0.8, 0.2, 1],
      }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-700 ${
          scrolled
            ? "mx-auto mt-3 max-w-6xl px-4"
            : "mx-auto mt-6 max-w-7xl px-8"
        }`}
      >
        <div
          className={`flex items-center justify-between transition-all duration-700 ${
            scrolled
              ? "surface-glass rounded-full py-2.5 pl-5 pr-2.5 shadow-[0_20px_60px_-20px_oklch(0_0_0_/_0.6)]"
              : "border-b border-white/[0.04] py-5"
          }`}
        >
          {/* LOGO */}

          <Link
            to="/"
            className="group flex items-center gap-3"
            data-cursor-hover
          >
            <span
              className="
              relative grid h-9 w-9 place-items-center 
              rounded-full border border-champagne/40
              text-[10px] tracking-[0.2em]
              text-champagne
            "
            >
              <span
                className="
                absolute inset-0 rounded-full
                bg-champagne/0 
                transition-colors
                group-hover:bg-champagne/10
              "
              />
              CV
            </span>

            <span
              className="
              hidden font-display text-base 
              tracking-wide text-ivory sm:block
            "
            >
              Studio Cleidiane
              <span className="italic text-champagne">Vieira</span>
            </span>
          </Link>

          {/* MENU */}

          <nav className="hidden items-center md:flex">
            {NAV.map((item, i) => {
              const isActive = active === item.href.slice(1);

              return (
                <div key={item.href} className="flex items-center">
                  {item.type === "route" ? (
                    <Link
                      to={item.href}
                      data-cursor-hover
                      className="
                        group relative px-4 py-2
                        text-[11px]
                        tracking-[0.28em]
                        uppercase
                        text-ivory-muted
                        hover:text-ivory
                        transition-colors
                        "
                    >
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      data-cursor-hover
                      className={`
                        group relative px-4 py-2
                        text-[11px]
                        tracking-[0.28em]
                        uppercase
                        transition-colors

                        ${
                          isActive
                            ? "text-champagne"
                            : "text-ivory-muted hover:text-ivory"
                        }

                        `}
                    >
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  )}

                  {i < NAV.length - 1 && (
                    <span
                      className="
                        h-1 w-1 rounded-full
                        bg-champagne/25
                        "
                    />
                  )}
                </div>
              );
            })}
          </nav>

          {/* AGENDAR */}

          <button
            onClick={openBooking}
            data-cursor-hover
            className={`
            group inline-flex items-center gap-2
            rounded-full border border-champagne/40
            bg-champagne/[0.03]
            text-[11px]
            tracking-[0.25em]
            uppercase
            text-champagne
            transition-all
            hover:bg-champagne
            hover:text-obsidian

            ${scrolled ? "px-4 py-2" : "px-5 py-2.5"}

            `}
          >
            <Calendar className="h-3.5 w-3.5" strokeWidth={1.5} />

            <span>Agendar</span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
