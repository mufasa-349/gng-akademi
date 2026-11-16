"use client";

import { useEffect, useRef, type ReactNode } from "react";

/*
 * Pinned horizontal track (Amiral "Rooms & Suites"):
 * at 900px and above, the section is pinned and scrolling down slides the cards sideways.
 * Below 900px it switches to a native swipe row (CSS: .htrack in base.css).
 *
 * <HorizontalTrack head={<h2>Rooms</h2>}>{cards}</HorizontalTrack>
 * Give the track a `key` (e.g. the tab) so it re-measures when the tab changes.
 */
export function HorizontalTrack({ head, children, label = "scroll to browse" }: { head?: ReactNode; children: ReactNode; label?: string }) {
  const pin = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const p = pin.current!;
    const t = track.current!;
    const mq = window.matchMedia("(min-width: 900px)");
    let overflow = 0;
    let raf = 0;

    const frame = () => {
      raf = 0;
      if (!mq.matches) {
        const max = t.scrollWidth - t.clientWidth;
        bar.current!.style.transform = `scaleX(${max > 0 ? Math.max(0.08, t.scrollLeft / max) : 1})`;
        return;
      }
      const r = p.getBoundingClientRect();
      const prog = overflow ? Math.min(1, Math.max(0, -r.top / overflow)) : 0;
      t.style.transform = `translate3d(${-prog * overflow}px,0,0)`;
      bar.current!.style.transform = `scaleX(${Math.max(0.08, prog)})`;
    };
    const measure = () => {
      if (!mq.matches) {
        p.style.height = "";
        t.style.transform = "";
        overflow = 0;
      } else {
        overflow = Math.max(0, t.scrollWidth - t.parentElement!.clientWidth);
        p.style.height = `${window.innerHeight + overflow}px`;
      }
      frame();
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(frame);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(t);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", kick, { passive: true });
    t.addEventListener("scroll", kick, { passive: true });
    mq.addEventListener("change", measure);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", kick);
      t.removeEventListener("scroll", kick);
      mq.removeEventListener("change", measure);
    };
  }, [children]);

  return (
    <div ref={pin} className="htrack-pin">
      <div className="htrack-stage">
        {head && <div className="htrack-head wrap">{head}</div>}
        <div className="htrack-viewport">
          <div ref={track} className="htrack">
            {children}
          </div>
        </div>
        <div className="htrack-progress wrap" aria-hidden="true">
          <span className="htrack-bar">
            <span ref={bar} />
          </span>
          <span className="htrack-label">{label}</span>
        </div>
      </div>
    </div>
  );
}
