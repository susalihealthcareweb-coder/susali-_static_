"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Globe, Menu, X, ArrowRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";
import { getDict, href, routes, switchHref, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import Magnetic from "@/components/ui/Magnetic";

export default function Navbar({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const pathname = usePathname() || "/";
  const bar = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const links = [
    { k: "home", label: d.nav.home, path: routes.home },
    { k: "about", label: d.nav.about, path: routes.about },
    { k: "services", label: d.nav.services, path: routes.services },
    { k: "network", label: d.nav.network, path: routes.network },
    { k: "faqs", label: d.nav.faqs, path: routes.faqs },
    { k: "contact", label: d.nav.contact, path: routes.contact },
  ];
  const current = (p: string) => {
    const here = switchHref(pathname, "en");
    return p === "/" ? here === "/" : here.startsWith(p);
  };

  // hide on scroll down, show on scroll up
  useEffect(() => {
    let last = window.scrollY, hidden = false;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      const down = y > last && y > 140;
      if (down !== hidden && !open) {
        hidden = down;
        gsap.to(bar.current, { yPercent: down ? -110 : 0, duration: 0.45, ease: "power3.out" });
      }
      last = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => { window.removeEventListener("keydown", onKey); unlockScroll(); };
  }, [open]);

  const LangPill = ({ className = "" }: { className?: string }) => (
    <div role="group" aria-label={d.added.langLabel} className={`flex items-center gap-1 rounded-full border border-line bg-white px-2 py-1 text-xs font-bold ${className}`}>
      <Globe className="mx-1 h-3.5 w-3.5 text-mauve" aria-hidden />
      <Link href={switchHref(pathname, "en")} hrefLang="en" lang="en" aria-current={lang === "en" ? "true" : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${lang === "en" ? "bg-p-lav text-ink" : "text-muted hover:text-ink"}`}>EN</Link>
      <span aria-hidden className="text-line">/</span>
      <Link href={switchHref(pathname, "te")} hrefLang="te" lang="te" aria-current={lang === "te" ? "true" : undefined}
        className={`rounded-full px-2.5 py-1 transition-colors ${lang === "te" ? "bg-p-lav text-ink" : "text-muted hover:text-ink"}`}>తెలుగు</Link>
    </div>
  );

  return (
    <div ref={bar} className="fixed inset-x-0 top-0 z-50">
      <header className={`border-b transition-[background,box-shadow,border-color] duration-300 ${scrolled || open ? "border-line bg-white/95 shadow-[0_6px_24px_-16px_rgb(43_48_60/0.25)] backdrop-blur-md" : "border-transparent bg-white/80 backdrop-blur-sm"}`}>
        <nav aria-label="Main" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <Link href={href(lang, "/")} className="flex shrink-0 items-center" aria-label={`${site.name} — ${d.nav.home}`}>
            <Image src="/brand/susali-logo.webp" alt="SUSALI Health Care Services Pvt Ltd" width={566} height={270} priority className="h-12 w-auto sm:h-14" />
          </Link>

          <ul className="hidden items-center gap-1 xl:flex">
            {links.map((l) => (
              <li key={l.k}>
                <Link href={href(lang, l.path)} aria-current={current(l.path) ? "page" : undefined}
                  className={`relative rounded-lg px-3 py-2 text-[14px] font-semibold transition-colors ${current(l.path) ? "text-ink" : "text-slate hover:text-ink"}`}>
                  {l.label}
                  <span aria-hidden className={`absolute inset-x-3 -bottom-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-grad-from to-grad-to transition-transform duration-300 ${current(l.path) ? "scale-x-100" : "scale-x-0"}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <LangPill className="hidden sm:flex" />
            <span className="hidden md:inline-block"><Magnetic>
              <Link href={href(lang, routes.contact)} className="group inline-flex items-center gap-2.5 rounded-xl bg-green py-1.5 pl-4 pr-1.5 text-sm font-bold text-white transition-colors hover:bg-green-2">
                {d.nav.cta}
                <span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-green"><ArrowRight className="h-4 w-4" strokeWidth={2.4} /></span>
              </Link>
            </Magnetic></span>
            <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-menu" aria-label="Menu"
              className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-ink xl:hidden">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </header>

      <div id="mobile-menu" hidden={!open} className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-line bg-white px-5 pb-10 pt-4 xl:hidden">
        <ul className="flex flex-col">
          {links.map((l) => (
            <li key={l.k}>
              <Link href={href(lang, l.path)} aria-current={current(l.path) ? "page" : undefined}
                className="flex items-center justify-between border-b border-line py-4 font-heading text-xl font-extrabold tracking-tight text-ink">
                {l.label}<ArrowRight className="h-4 w-4 text-mauve" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <LangPill />
          <Link href={href(lang, routes.contact)} className="inline-flex items-center gap-2 rounded-xl bg-green py-1.5 pl-4 pr-1.5 text-sm font-bold text-white">
            {d.nav.cta}<span aria-hidden className="grid h-8 w-8 place-items-center rounded-lg bg-gold text-green"><ArrowRight className="h-4 w-4" /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
