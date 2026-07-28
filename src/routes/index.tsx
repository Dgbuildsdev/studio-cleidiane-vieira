import { createFileRoute } from "@tanstack/react-router";
import { SmoothScroll } from "@/components/experience/SmoothScroll";
import { CustomCursor } from "@/components/experience/CustomCursor";
import { Header } from "@/components/experience/Header";
import { WhatsAppFloat } from "@/components/experience/WhatsAppFloat";
import { AIConcierge } from "@/components/experience/AIConcierge";
import { BookingModal } from "@/components/experience/BookingModal";

import { SceneAwakening } from "@/components/experience/SceneAwakening";
import { SceneStudio } from "@/components/experience/SceneStudio";
import { SceneReflection } from "@/components/experience/SceneReflection";
import { SceneTrust } from "@/components/experience/SceneTrust";
import { SceneTransformation } from "@/components/experience/SceneTransformation";
import { SceneCraftsmanship } from "@/components/experience/SceneCraftsmanship";
import { SceneConfidence } from "@/components/experience/SceneConfidence";
import { SceneVoices } from "@/components/experience/SceneVoices";
import { SceneInvitation } from "@/components/experience/SceneInvitation";
import { Footer } from "@/components/experience/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Studio Cleidiane Vieira | Beleza e Estética em Uberlândia",
      },
      {
        name: "description",
        content:
          "Studio Cleidiane Vieira em Uberlândia. Especialista em alongamento de cílios, alisamento saudável e micropigmentação com atendimento personalizado.",
      },
      {
        property: "og:title",
        content: "Studio Cleidiane Vieira | Beleza e Estética em Uberlândia",
      },
      {
        property: "og:description",
        content:
          "Uma experiência cinematográfica de beleza em Uberlândia — cílios, alisamento saudável, micropigmentação e microblading shadow.",
      },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Experience,
});

function Experience() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <Header />
      <WhatsAppFloat />
      <AIConcierge />
      <BookingModal />

      <main className="relative">
        <SceneAwakening />
        <SceneStudio />
        <SceneReflection />
        <SceneTrust />
        <SceneTransformation />
        <SceneCraftsmanship />
        <SceneConfidence />
        <SceneVoices />
        <SceneInvitation />
      </main>

      <Footer />
    </>
  );
}
