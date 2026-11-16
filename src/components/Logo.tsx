"use client";

import { Fragment, createContext, useContext, useEffect, useId, useState, type ReactNode } from "react";
import { asset } from "@/lib/asset";

/*
 * Logo seçenekleri (sunum için). ?logo=orijinal|neon|kok|yukselis ile link verilebilir,
 * seçim localStorage'da hatırlanır. Karar verilince LogoSwitcher kaldırılır, tek logo kalır.
 */
export const LOGOS = [
  { id: "orijinal", label: "Orijinal", group: "Orijinal" },
  { id: "neon", label: "Neon Altıgen", group: "Geliştirilmiş" },
  { id: "kok", label: "Kök", group: "Geliştirilmiş" },
  { id: "yukselis", label: "Yükseliş", group: "Geliştirilmiş" },
] as const;
export type LogoId = (typeof LOGOS)[number]["id"];

const Ctx = createContext<{ logo: LogoId; setLogo: (l: LogoId) => void }>({ logo: "orijinal", setLogo: () => {} });
export const useLogo = () => useContext(Ctx);

const isLogo = (v: string | null): v is LogoId => !!v && LOGOS.some((l) => l.id === v);

export function LogoProvider({ children }: { children: ReactNode }) {
  const [logo, set] = useState<LogoId>("orijinal");
  useEffect(() => {
    const q = new URLSearchParams(location.search).get("logo");
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("gng-logo");
    } catch {}
    const pick = isLogo(q) ? q : isLogo(saved) ? saved : null;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (pick) set(pick);
  }, []);
  useEffect(() => {
    document.documentElement.dataset.logo = logo;
  }, [logo]);
  const setLogo = (l: LogoId) => {
    set(l);
    try {
      localStorage.setItem("gng-logo", l);
    } catch {}
    const u = new URL(location.href);
    u.searchParams.set("logo", l);
    history.replaceState(null, "", u);
  };
  return <Ctx.Provider value={{ logo, setLogo }}>{children}</Ctx.Provider>;
}

const HEX = "M2 52 L31 1.8 L89 1.8 L118 52 L89 102.2 L31 102.2Z";
const hexAt = (r: number) => {
  const h = r * 0.866;
  return `M${60 - r} 52 L${60 - r / 2} ${52 - h} L${60 + r / 2} ${52 - h} L${60 + r} 52 L${60 + r / 2} ${52 + h} L${60 - r / 2} ${52 + h}Z`;
};

/** Yalnızca amblem (altıgen / işaret). viewBox 120×104 – her seçenek aynı kutuya oturur. */
export function LogoMark({ id: forced, className = "" }: { id?: LogoId; className?: string }) {
  const { logo } = useLogo();
  const id = forced ?? logo;
  const u = useId().replace(/:/g, "");
  const common = { viewBox: "0 0 120 104", className: `logo-mark ${className}`, role: "img", "aria-label": "GNG Akademi" } as const;

  if (id === "orijinal")
    return (
      <svg {...common}>
        <defs>
          <clipPath id={`c${u}`}>
            <path d={hexAt(50)} />
          </clipPath>
        </defs>
        <path d={HEX} fill="#3a49b4" />
        <path d={hexAt(54)} fill="none" stroke="#5767d8" strokeWidth="1" opacity=".7" />
        <image href={asset("/logos/gng-original.png")} x="10" y="8.7" width="100" height="86.6" preserveAspectRatio="xMidYMid slice" clipPath={`url(#c${u})`} />
      </svg>
    );

  if (id === "neon")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id={`s${u}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5b6bff" />
            <stop offset=".55" stopColor="#8a5cff" />
            <stop offset="1" stopColor="#ff4fb0" />
          </linearGradient>
          <radialGradient id={`f${u}`} cx=".5" cy=".38" r=".75">
            <stop offset="0" stopColor="#202a66" />
            <stop offset="1" stopColor="#0d1031" />
          </radialGradient>
          <linearGradient id={`g${u}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#fff6dc" />
            <stop offset=".6" stopColor="#ecd9a6" />
            <stop offset="1" stopColor="#c8a462" />
          </linearGradient>
        </defs>
        <path d={hexAt(53)} fill={`url(#f${u})`} stroke={`url(#s${u})`} strokeWidth="5" strokeLinejoin="round" />
        <path d={hexAt(46)} fill="none" stroke={`url(#s${u})`} strokeWidth=".8" opacity=".55" />
        <rect x="56.5" y="17" width="7" height="7" transform="rotate(45 60 20.5)" fill="none" stroke="#e3c98e" strokeWidth="1.2" />
        <text x="60" y="61" textAnchor="middle" fill={`url(#g${u})`} style={{ font: "700 31px var(--font-cinzel), serif", letterSpacing: "-0.5px" }}>
          GNG
        </text>
        <text x="60" y="76" textAnchor="middle" fill="#ecdcb0" style={{ font: "600 9.6px var(--font-cinzel), serif", letterSpacing: "2.6px" }}>
          AKADEMİ
        </text>
        <rect x="58" y="84" width="4" height="4" transform="rotate(45 60 86)" fill="#e3c98e" />
      </svg>
    );

  if (id === "kok")
    return (
      <svg {...common}>
        <defs>
          <linearGradient id={`k${u}`} x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#7af2ff" />
            <stop offset=".5" stopColor="#6a6cff" />
            <stop offset="1" stopColor="#ff4fb0" />
          </linearGradient>
        </defs>
        <path d="M6 60 L18 53 L33 88 L52 16 L114 16" fill="none" stroke={`url(#k${u})`} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
        <text x="84" y="76" textAnchor="middle" fill="currentColor" style={{ font: "800 37px var(--font-display), sans-serif", letterSpacing: "-1.5px" }}>
          GNG
        </text>
      </svg>
    );

  // yukselis
  return (
    <svg {...common}>
      <defs>
        <linearGradient id={`y${u}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4b5bff" />
          <stop offset="1" stopColor="#d93bb8" />
        </linearGradient>
      </defs>
      <path d={hexAt(56)} fill={`url(#y${u})`} stroke={`url(#y${u})`} strokeWidth="8" strokeLinejoin="round" />
      <path d="M73 40 A24 24 0 1 0 80 57 L62 57" fill="none" stroke="#fff" strokeWidth="9.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M79 44 L100 23 M88 22.5 L100.5 22.5 L100.5 35" fill="none" stroke="#7af2ff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Amblem + yazı (menü ve footer). */
export function Logo({ id: forced, className = "", sub = true }: { id?: LogoId; className?: string; sub?: boolean }) {
  const { logo } = useLogo();
  const id = forced ?? logo;
  return (
    <span className={`logo logo--${id} ${className}`}>
      <LogoMark id={id} />
      {id === "orijinal" && (
        <span className="logo-word">
          <b>GNG AKADEMİ</b>
          {sub && <small>Yusuf Gündoğan</small>}
        </span>
      )}
      {id === "neon" && (
        <span className="logo-word">
          <b>GNG Akademi</b>
          {sub && <small>Matematik</small>}
        </span>
      )}
      {id === "kok" && (
        <span className="logo-word">
          <b>AKADEMİ</b>
          {sub && <small>Yusuf Gündoğan</small>}
        </span>
      )}
      {id === "yukselis" && (
        <span className="logo-word">
          <b>gng akademi</b>
          {sub && <small>matematik · özel ders</small>}
        </span>
      )}
    </span>
  );
}

export function LogoSwitcher() {
  const { logo, setLogo } = useLogo();
  const [open, setOpen] = useState(false);
  return (
    <div className={`logo-switch ${open ? "is-open" : ""}`} role="group" aria-label="Logo seçenekleri">
      <button type="button" className="logo-switch-toggle" onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        <LogoMark id={logo} />
        <span>
          Logo
          <b>{LOGOS.find((l) => l.id === logo)?.label}</b>
        </span>
      </button>
      <div className="logo-switch-list">
        {LOGOS.map((l, i) => (
          <Fragment key={l.id}>
            {(i === 0 || LOGOS[i - 1].group !== l.group) && <em>{l.group}</em>}
            <button
              type="button"
              className={l.id === logo ? "is-active" : ""}
              onClick={() => {
                setLogo(l.id);
                setOpen(false);
              }}
              title={l.label}
            >
              <LogoMark id={l.id} />
              <span>{l.label}</span>
            </button>
          </Fragment>
        ))}
      </div>
    </div>
  );
}
