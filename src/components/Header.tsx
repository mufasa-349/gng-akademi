"use client";

import { useEffect, useState } from "react";
import { IS_PREVIEW } from "@/lib/asset";
import { contact, nav, socials } from "@/lib/data";
import { Logo } from "./Logo";
import { SocialIcon } from "./Icons";

export function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setSolid(y > 40);
      setHidden(y > last && y > 400);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("no-scroll", open);
  }, [open]);

  return (
    <>
      <header className={`header ${solid ? "is-solid" : ""} ${hidden && !open ? "is-hidden" : ""}`}>
        {IS_PREVIEW && (
          <div className="preview-bar">
            Tasarım önizlemesi<span> — GNG Akademi için hazırlanan yeni web sitesi</span>
          </div>
        )}
        <div className="header-in">
          <a href="#top" className="header-logo" aria-label="GNG Akademi – başa dön">
            <Logo />
          </a>
          <nav className="header-nav" aria-label="Ana menü">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <a className="header-phone" href={contact.tel}>
            <SocialIcon id="phone" />
            {contact.phone}
          </a>
          <a className="btn btn--glow btn--sm header-cta" href={contact.whatsapp} target="_blank" rel="noreferrer">
            Ders talebi
          </a>
          <a className="header-call" href={contact.tel} aria-label={`Ara: ${contact.phone}`}>
            <SocialIcon id="phone" />
          </a>
          <button type="button" className={`burger ${open ? "is-open" : ""}`} aria-label="Menü" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
            <i />
            <i />
          </button>
        </div>
      </header>
      <div className={`drawer ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav>
          {nav.map((n, i) => (
            <a key={n.href} href={n.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
              {n.label}
            </a>
          ))}
        </nav>
        <div className="drawer-foot">
          <a className="drawer-phone" href={contact.tel}>
            <small>Telefon</small>
            {contact.phone}
          </a>
          <a className="btn btn--glow" href={contact.whatsapp} target="_blank" rel="noreferrer">
            <SocialIcon id="whatsapp" /> WhatsApp&apos;tan yaz
          </a>
          <div className="drawer-social">
            {socials.map((s) => (
              <a key={s.id} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                <SocialIcon id={s.id} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
