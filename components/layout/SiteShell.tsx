import type { ReactNode } from "react";
import { Plus_Jakarta_Sans, Inter, Noto_Sans_Telugu } from "next/font/google";
import { getDict, type Lang } from "@/lib/i18n";
import { jsonLd } from "@/lib/seo";
import Navbar from "./Navbar";
import NoticeBar from "./NoticeBar";
import Footer from "./Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import { IconGradients } from "@/components/float/FloatingIconTile";
import "@/app/globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-jakarta", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: ["400", "600", "700", "800"], variable: "--font-telugu", display: "swap", preload: false });

/** <html>/<body> wrapper shared by the English (/) and Telugu (/te) root layouts. */
export default function SiteShell({ lang, children }: { lang: Lang; children: ReactNode }) {
  const d = getDict(lang);
  return (
    <html lang={lang} className={`${jakarta.variable} ${inter.variable} ${telugu.variable}`}>
      <body>
        <a href="#main" className="sr-only z-[200] rounded-lg bg-white px-4 py-2 font-bold text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">{d.added.skip}</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }} />
        <IconGradients />
        <SmoothScroll />
        <Cursor />
        <Navbar lang={lang} />
        <NoticeBar lang={lang} />
        <main id="main">{children}</main>
        <Footer lang={lang} />
      </body>
    </html>
  );
}
