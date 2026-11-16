"use client";

import { useEffect, type RefObject } from "react";

/*
 * Pinned scroll scene hook.
 * The section must be taller than the screen (e.g. height: 300svh), with a
 * `position: sticky; top: 0; height: 100svh` stage inside it.
 *
 * onFrame(p, el) is called every frame with smoothed progress p (0..1); write the
 * phases there as CSS variables:
 *
 *   useScrollScene(ref, (p, el) => {
 *     const e = inOut(clamp(p / 0.55));
 *     el.style.setProperty("--e", e.toFixed(4));
 *     el.style.setProperty("--ti", ease(clamp((p - 0.5) / 0.2)).toFixed(4));
 *     el.classList.toggle("is-final", p > 0.75);
 *   });
 *
 * With prefers-reduced-motion, p = 1 is passed straight away (final state).
 */

export const clamp = (v: number) => Math.min(1, Math.max(0, v));
export const ease = (v: number) => 1 - Math.pow(1 - v, 3);
export const inOut = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);

export function useScrollScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  onFrame: (p: number, el: T) => void,
  { smooth = 0.12 }: { smooth?: number } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    requestAnimationFrame(() => el.classList.add("is-ready"));

    let raf = 0;
    let shown = 0;
    const progress = () => {
      const r = el.getBoundingClientRect();
      return clamp(-r.top / Math.max(1, r.height - window.innerHeight));
    };

    const frame = () => {
      raf = 0;
      const target = reduce ? 1 : progress();
      // Smoothing: move a little closer to the target each frame (removes mouse-wheel judder)
      shown += (target - shown) * smooth;
      if (Math.abs(target - shown) < 0.0005) shown = target;
      onFrame(shown, el);
      if (shown !== target) raf = requestAnimationFrame(frame);
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    shown = progress();
    frame();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", kick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", kick);
    };
    // onFrame usually stays the same; passing a new function on every render doesn't restart the effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, smooth]);
}
