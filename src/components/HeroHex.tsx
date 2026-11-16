"use client";

import { useRef } from "react";
import { contact, hero } from "@/lib/data";
import { LogoMark } from "./Logo";
import { clamp, ease, inOut, useScrollScene } from "./useScrollScene";

/*
 * Açılış: banner'daki neon altıgen. Ortada logo, iki yanda büyük kelimeler.
 * Kaydırdıkça kelimeler ayrılır, neon şekiller dışarı savrulur, altıgen tüm ekranı kaplar,
 * içindeki koordinat düzleminde grafikler çizilir; sonra başlık ve butonlar gelir.
 */
export function HeroHex() {
  const ref = useRef<HTMLElement>(null);

  useScrollScene(ref, (p, el) => {
    const W = window.innerWidth;
    const H = window.innerHeight;
    const mobile = W < 900;
    const e = inOut(clamp(p / 0.5));
    const r0 = mobile ? Math.min(W * 0.36, H * 0.17) : Math.min(W * 0.13, H * 0.26);
    const r1 = Math.max(W / 2 + H * 0.29, H * 0.58) + 24;
    el.style.setProperty("--r", `${(r0 + (r1 - r0) * e).toFixed(1)}px`);
    el.style.setProperty("--r0", `${r0.toFixed(1)}px`);
    el.style.setProperty("--p", p.toFixed(4));
    el.style.setProperty("--e", e.toFixed(4));
    el.style.setProperty("--d", ease(clamp((p - 0.22) / 0.5)).toFixed(4));
    el.style.setProperty("--ti", ease(clamp((p - 0.5) / 0.2)).toFixed(4));
    const c = ease(clamp((p - 0.62) / 0.16));
    el.style.setProperty("--c", c.toFixed(4));
    el.classList.toggle("is-final", c > 0.5);
  });

  return (
    <section ref={ref} className="hero" id="top">
      <div className="hero-stage">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-ringwrap" aria-hidden="true">
          <div className="hero-ring" />
        </div>
        <div className="hero-hex">
          <svg className="hero-plot" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <defs>
              <pattern id="plotgrid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M50 0H0V50" fill="none" stroke="rgba(150,160,255,.13)" strokeWidth="1" />
              </pattern>
              <linearGradient id="curveA" x1="0" x2="1">
                <stop offset="0" stopColor="#7af2ff" />
                <stop offset="1" stopColor="#6a6cff" />
              </linearGradient>
              <linearGradient id="curveB" x1="0" x2="1">
                <stop offset="0" stopColor="#ff5fa8" />
                <stop offset="1" stopColor="#d93bb8" />
              </linearGradient>
            </defs>
            <rect width="1600" height="1000" fill="url(#plotgrid)" />
            <path d="M0 500H1600M800 0V1000" stroke="rgba(190,195,255,.4)" strokeWidth="2" />
            {/* parabol y = (x-2)^2 - 1 (ölçek 50px) */}
            <path
              className="plot-curve"
              pathLength={1}
              d="M700 -50 Q1000 1350 1300 -50"
              stroke="url(#curveA)"
            />
            {/* sinüs */}
            <path
              className="plot-curve plot-curve--b"
              pathLength={1}
              d="M0 640 C80 640 120 520 200 520 S320 640 400 640 S520 520 600 520 S720 640 800 640 S920 520 1000 520 S1120 640 1200 640 S1320 520 1400 520 S1520 640 1600 640"
              stroke="url(#curveB)"
            />
            {/* doğru */}
            <path className="plot-curve plot-curve--c" pathLength={1} d="M250 900 L1450 150" stroke="#ecdcb0" />
            <g className="plot-pts">
              <circle cx="1000" cy="650" r="9" />
              <circle cx="500" cy="744" r="9" />
              <circle cx="1100" cy="369" r="9" />
              <circle cx="600" cy="520" r="9" />
            </g>
            <g className="plot-labels">
              <text x="1320" y="120">f(x) = x² − 4x + 3</text>
              <text x="160" y="490">g(x) = sin x</text>
              <text x="1135" y="355">T(4, 3)</text>
              <text x="180" y="200">|x − |x|| = 16</text>
              <text x="1240" y="960">∫ 2x dx = x² + c</text>
              <text x="1220" y="800">√48 = 4√3</text>
            </g>
          </svg>
          <div className="hero-dim" />
        </div>

        <div className="hero-logo">
          <LogoMark className="hero-logo-mark" />
        </div>

        <i className="neon neon--tri" aria-hidden="true" />
        <i className="neon neon--plus" aria-hidden="true" />
        <i className="neon neon--dia" aria-hidden="true" />
        <i className="neon neon--ring" aria-hidden="true" />

        <h1 className="hero-words" aria-label={`${hero.left} ${hero.right}`}>
          <span className="hero-word hero-word--l" aria-hidden="true">
            <span>{hero.left}</span>
          </span>
          <span className="hero-word hero-word--r" aria-hidden="true">
            <span>{hero.right}</span>
          </span>
        </h1>

        <p className="hero-meta hero-meta--tl">{hero.metaTL}</p>
        <p className="hero-meta hero-meta--tr">{hero.metaTR}</p>
        <p className="hero-meta hero-meta--bl">{hero.metaBL}</p>
        <div className="hero-meta hero-meta--br hero-scroll" aria-hidden="true">
          <span>Kaydır</span>
          <i />
        </div>

        <div className="hero-title">
          <div>
            <p className="eyebrow">{hero.eyebrow}</p>
            <h2>
              {hero.title.map((t) => (
                <span key={t} className="line">
                  <span>{t}</span>
                </span>
              ))}
            </h2>
          </div>
          <div className="hero-cta">
            <p>{hero.lead}</p>
            <div className="hero-actions">
              <a className="btn btn--glow" href={contact.whatsapp} target="_blank" rel="noreferrer">
                Özel ders için yaz
              </a>
              <a className="btn btn--ghost" href={contact.tel}>
                {contact.phone}
              </a>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
