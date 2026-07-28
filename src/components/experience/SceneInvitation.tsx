import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Calendar,
  Instagram,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { openBooking } from "./BookingModal";

const WA_URL =
  "https://wa.me/5534998407644?text=Ol%C3%A1%2C%20Cleidiane.%20Conheci%20o%20Studio%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20atendimentos.";
const IG_URL = "https://www.instagram.com/studio_cleidianevieira/";
// Coordenadas exatas do Studio Cleidiane Vieira (Uberlândia — MG)
const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Studio+Cleidiane+Vieira+Uberl%C3%A2ndia&query_place_id=ChIJ-1GzupdEpJQRvH6JlV7fkicC";

export function SceneInvitation() {
  return (
    <section id="invitation" className="relative overflow-hidden py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 60%, oklch(0.83 0.065 82 / 0.15), transparent 65%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 text-center md:px-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}
          className="eyebrow"
        >
          Convite
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15, ease: [0.2, 0.8, 0.2, 1] }}
          className="mt-10 display text-[clamp(2.5rem,7vw,6.5rem)] text-ivory"
        >
          Reserve um{" "}
          <span className="display-italic text-champagne">momento</span>
          <br />
          para você.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-16 flex flex-col items-center gap-6"
        >
          <button
            onClick={openBooking}
            data-cursor-hover
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-gradient-to-br from-champagne to-bronze px-10 py-5 text-obsidian shadow-[0_20px_80px_-15px_oklch(0.83_0.065_82_/_0.5)] transition-transform hover:scale-[1.02]"
          >
            <Calendar className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-[12px] tracking-[0.35em] uppercase">
              Agendar meu procedimento
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              strokeWidth={1.5}
            />
          </button>

          <a
            href={WA_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor-hover
            className="group inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase text-ivory-muted transition-colors hover:text-champagne"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span>ou fale direto pelo WhatsApp</span>
          </a>

          <p className="text-xs tracking-[0.3em] uppercase text-ivory-muted/60">
            (34) 99840-7644
          </p>
        </motion.div>

        <div className="hairline mx-auto mt-24 w-40" />

        <div className="mt-16 grid grid-cols-1 gap-10 text-left md:grid-cols-3">
          <InfoCard
            icon={<MapPin className="h-4 w-4" strokeWidth={1.5} />}
            label="Endereço"
            value={
              <a
                href={MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory transition-colors hover:text-champagne"
              >
                Studio Cleidiane Vieira
                <br />
                Uberlândia — MG
                <br />
                <span className="text-[10px] tracking-[0.3em] uppercase text-champagne">
                  Ver no Google Maps →
                </span>
              </a>
            }
          />
          <InfoCard
            icon={<Instagram className="h-4 w-4" strokeWidth={1.5} />}
            label="Instagram"
            value={
              <a
                href={IG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory transition-colors hover:text-champagne"
              >
                @studio_cleidianevieira
              </a>
            }
          />
          <InfoCard
            icon={<MessageCircle className="h-4 w-4" strokeWidth={1.5} />}
            label="WhatsApp"
            value={
              <a
                href={WA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ivory transition-colors hover:text-champagne"
              >
                (34) 99840-7644
              </a>
            }
          />
        </div>
      </div>
    </section>
  );
}

function InfoCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="border-t border-white/[0.08] pt-6">
      <div className="flex items-center gap-3 text-champagne">
        {icon}
        <span className="text-[10px] tracking-[0.35em] uppercase">{label}</span>
      </div>
      <div className="mt-4 text-sm leading-relaxed text-ivory-muted">
        {value}
      </div>
    </div>
  );
}
