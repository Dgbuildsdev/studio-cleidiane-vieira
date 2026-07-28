import { useEffect, useRef, useState } from "react";

const visibleRef = { current: false };

/**
 * Premium spotlight cursor. Two layers: a soft glow that trails
 * and a precise inner dot. Grows on interactive elements.
 */
export function CustomCursor() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    setEnabled(canHover);
    if (!canHover) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visibleRef.current) {
        visibleRef.current = true;
        setVisible(true);
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest("a, button, [data-cursor-hover]");
      setHover(Boolean(interactive));
    };

    let rafId = 0;
    const tick = () => {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX}px, ${glowY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[100] h-[420px] w-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.83 0.065 82 / 0.10) 0%, transparent 55%)",
          mixBlendMode: "screen",
          transition: "opacity 400ms ease",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[101] rounded-full bg-champagne"
        style={{
          width: hover ? 44 : 8,
          height: hover ? 44 : 8,
          mixBlendMode: "difference",
          transition:
            "width 300ms cubic-bezier(0.2,0.8,0.2,1), height 300ms cubic-bezier(0.2,0.8,0.2,1), background 300ms, opacity 200ms",
          opacity: visible ? (hover ? 0.6 : 1) : 0,
        }}
      />
    </>
  );
}
