import type { Metadata } from "next";
import { Audiowide, Cinzel, Inter, Sora } from "next/font/google";
import { Effects } from "@/components/Effects";
import { Header } from "@/components/Header";
import { LogoProvider, LogoSwitcher } from "@/components/Logo";
import { IS_PREVIEW } from "@/lib/asset";
import "./globals.css";

const display = Sora({ weight: ["400", "600", "700", "800"], subsets: ["latin", "latin-ext"], variable: "--font-display", display: "swap" });
const sans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans", display: "swap" });
const cinzel = Cinzel({ weight: ["600", "700"], subsets: ["latin", "latin-ext"], variable: "--font-cinzel", display: "swap" });
const tech = Audiowide({ weight: "400", subsets: ["latin", "latin-ext"], variable: "--font-tech", display: "swap" });

export const metadata: Metadata = {
  title: "GNG Akademi | KPSS · YKS · LGS Matematik – Yusuf Gündoğan",
  description: "GNG Akademi: KPSS, YKS ve LGS matematik özel ders, konu anlatımı ve soru çözüm videoları. Yusuf Gündoğan.",
  robots: IS_PREVIEW ? { index: false, follow: false } : undefined,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr" className={`${display.variable} ${sans.variable} ${cinzel.variable} ${tech.variable}`} data-scroll-behavior="smooth">
      <body>
        <LogoProvider>
          <Header />
          <main>{children}</main>
          <LogoSwitcher />
          <Effects />
        </LogoProvider>
      </body>
    </html>
  );
}
