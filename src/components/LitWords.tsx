"use client";

import { useEffect, useRef } from "react";

/** Paragraph whose words light up one by one as you scroll (Amiral "Story"). CSS: .lit-words span in base.css */
export function LitWords({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current!;
    const spans = [...el.querySelectorAll<HTMLElement>("span")];
    let raf = 0;
    const frame = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Fills from when the paragraph is at 85% of the screen height until it reaches about 35%
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (vh * 0.5 + r.height * 0.6)));
      const lit = p * spans.length;
      spans.forEach((s, i) => s.style.setProperty("--w", String(Math.min(1, Math.max(0, lit - i)))));
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    frame();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
  }, [text]);

  return (
    <p ref={ref} className={`lit-words ${className}`}>
      {text.split(" ").map((w, i) => (
        <span key={i}>{w} </span>
      ))}
    </p>
  );
}
