"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Site-wide effects. Put it once in layout.tsx, after <main>.
 * - .reveal / .clip-reveal → the .is-in class when on screen (for clip-reveal the PARENT is observed:
 *   IntersectionObserver doesn't fire for a fully clipped element)
 * - [data-count="9.1"][data-decimals="1"] → count-up number
 * - [data-parallax="0.12"] → moves at a different speed while scrolling
 * - .swipe (mobile swipe rows) → a progress bar + "1 / 6" counter underneath
 * - html.past-intro → after the opening scene (.intro); for hiding the fixed mobile bars
 */
export function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cleanups: (() => void)[] = [];

    // Fade-ins + count-ups
    const targets = new Map<Element, Element>();
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = targets.get(e.target) ?? e.target;
          el.classList.add("is-in");
          el.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => count(c, reduce));
          if ((el as HTMLElement).dataset.count) count(el as HTMLElement, reduce);
          io.unobserve(e.target);
        }),
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
    );
    document.querySelectorAll(".reveal:not(.is-in), .clip-reveal:not(.is-in)").forEach((el) => {
      const watch = el.classList.contains("clip-reveal") && el.parentElement ? el.parentElement : el;
      targets.set(watch, el);
      io.observe(watch);
    });
    cleanups.push(() => io.disconnect());

    // Parallax
    const items = [...document.querySelectorAll<HTMLElement>("[data-parallax]")];
    let raf = 0;
    const frame = () => {
      raf = 0;
      const vh = window.innerHeight;
      for (const el of items) {
        const r = (el.parentElement ?? el).getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const offset = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax);
        el.style.transform = `translate3d(0,${offset.toFixed(1)}px,0)`;
      }
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };
    if (!reduce && items.length) {
      frame();
      window.addEventListener("scroll", kick, { passive: true });
      window.addEventListener("resize", kick);
      cleanups.push(() => {
        cancelAnimationFrame(raf);
        window.removeEventListener("scroll", kick);
        window.removeEventListener("resize", kick);
      });
    }

    // After the opening scene
    const intro = document.querySelector<HTMLElement>(".intro");
    const onScroll = () => root.classList.toggle("past-intro", !intro || window.scrollY > intro.offsetHeight - window.innerHeight * 1.2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    // Progress bar for swipe rows
    document.querySelectorAll<HTMLElement>(".swipe").forEach((list) => {
      const bar = document.createElement("div");
      bar.className = "swipe-bar";
      bar.innerHTML = '<span class="swipe-track"><i></i></span><span class="swipe-count"></span>';
      list.after(bar);
      const thumb = bar.querySelector("i")!;
      const label = bar.querySelector<HTMLElement>(".swipe-count")!;
      const n = list.children.length;
      const update = () => {
        const max = list.scrollWidth - list.clientWidth;
        bar.classList.toggle("is-hidden", max <= 4);
        if (max <= 4) return;
        const p = list.scrollLeft / max;
        const size = list.clientWidth / list.scrollWidth;
        thumb.style.width = `${size * 100}%`;
        thumb.style.transform = `translateX(${((p * (1 - size)) / size) * 100}%)`;
        label.textContent = `${Math.min(n, Math.round(p * (n - 1)) + 1)} / ${n}`;
      };
      update();
      list.addEventListener("scroll", update, { passive: true });
      window.addEventListener("resize", update);
      cleanups.push(() => {
        list.removeEventListener("scroll", update);
        window.removeEventListener("resize", update);
        bar.remove();
      });
    });

    return () => cleanups.forEach((c) => c());
  }, [pathname]);

  return null;
}

function count(el: HTMLElement, reduce: boolean) {
  if (el.dataset.done) return;
  el.dataset.done = "1";
  const target = Number(el.dataset.count);
  const dec = Number(el.dataset.decimals ?? 0);
  if (reduce) return;
  let start = 0;
  const step = (ts: number) => {
    if (!start) start = ts;
    const p = Math.min(1, (ts - start) / 1600);
    el.textContent = (target * (1 - Math.pow(1 - p, 4))).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
