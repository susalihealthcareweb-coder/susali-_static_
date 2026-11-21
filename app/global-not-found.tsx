import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Plus_Jakarta_Sans, Inter, Noto_Sans_Telugu } from "next/font/google";
import { getDict } from "@/lib/i18n";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-jakarta" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const telugu = Noto_Sans_Telugu({ subsets: ["telugu"], weight: ["400", "700"], variable: "--font-telugu", preload: false });

export const metadata: Metadata = { title: "404 | SUSALI Healthcare Services", robots: { index: false } };

/** Site-wide 404 (any unknown URL, English or Telugu). Uses only existing site text plus "404". */
export default function GlobalNotFound() {
  const en = getDict("en"), te = getDict("te");
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable} ${telugu.variable}`}>
      <body>
        <main className="wash-hero flex min-h-svh flex-col items-center justify-center px-5 text-center">
          <Image src="/brand/susali-logo.webp" alt="SUSALI Health Care Services Pvt Ltd" width={566} height={270} priority className="h-16 w-auto" />
          <p className="mt-10 font-heading text-[6rem] font-extrabold leading-none tracking-tighter text-grad sm:text-[8rem]">404</p>
          <p className="mt-4 font-heading text-xl font-extrabold text-ink">{en.footer.tagline}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="rounded-xl bg-green px-5 py-3 text-sm font-bold text-white hover:bg-green-2">{en.nav.home}</Link>
            <Link href="/te" lang="te" className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink">{te.nav.home}</Link>
            <Link href="/contact" className="rounded-xl border border-line bg-white px-5 py-3 text-sm font-bold text-ink">{en.nav.contact}</Link>
          </div>
        </main>
      </body>
    </html>
  );
}
