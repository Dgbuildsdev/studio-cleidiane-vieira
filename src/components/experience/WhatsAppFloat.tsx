import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WA_URL =
  "https://wa.me/5534998407644?text=Ol%C3%A1%2C%20Cleidiane.%20Conheci%20o%20Studio%20e%20gostaria%20de%20saber%20mais%20sobre%20os%20atendimentos.";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={WA_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agendar pelo WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 2.4, duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.05 }}
      className="fixed bottom-6 right-6 z-40 md:bottom-8 md:right-8"
      data-cursor-hover
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-champagne/30" />
      <span className="relative flex items-center gap-3 rounded-full bg-gradient-to-br from-champagne to-bronze px-5 py-4 text-obsidian shadow-[0_20px_60px_-10px_oklch(0.83_0.065_82_/_0.5)]">
        <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
        <span className="hidden text-[11px] tracking-[0.25em] uppercase sm:inline">
          Agendar
        </span>
      </span>
    </motion.a>
  );
}
