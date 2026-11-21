import Link from "next/link";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";
import { getDict, href, routes, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang), f = d.footer;
  const cols = [
    { title: f.col1, links: [[d.nav.home, routes.home], [d.nav.about, routes.about], [d.nav.services, routes.services], [d.nav.network, routes.network]] },
    { title: f.col2, links: [[d.nav.faqs, routes.faqs], [d.nav.contact, routes.contact]] },
    { title: f.col3, links: [[f.privacy, routes.privacy], [f.terms, routes.terms], [d.added.legal.deletionTitle, routes.deletion]] },
  ];
  return (
    <footer className="relative overflow-hidden border-t border-line bg-lavender">
      <div aria-hidden className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full bg-p-mint/60 blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-p-pink/60 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div className="max-w-sm">
            <Image src="/brand/susali-logo.webp" alt="SUSALI Logo" width={566} height={270} className="h-20 w-auto" />
            <p className="mt-5 leading-relaxed text-slate">{f.desc}</p>
            <p className="mt-4 font-heading text-sm font-extrabold text-mauve">{f.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-[1fr_1fr_1fr_1.5fr]">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink">{c.title}</h2>
                <ul className="mt-4 space-y-3">
                  {c.links.map(([label, p]) => (
                    <li key={p}><Link href={href(lang, p)} className="text-sm text-slate transition-colors hover:text-mauve">{label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-2 sm:col-span-1">
              <h2 className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink">{d.nav.cta}</h2>
              <p className="mt-4 text-sm text-slate">{f.tagline}</p>
              <Link href={href(lang, routes.contact)} className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-green hover:text-mauve">
                {d.nav.contact}<ArrowRight className="h-3.5 w-3.5" aria-hidden />
              </Link>
              <a href={`mailto:${site.contact.email}`} className="mt-3 flex items-start gap-2 [overflow-wrap:anywhere] text-sm text-slate hover:text-mauve">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-mauve" aria-hidden />{site.contact.email}
              </a>
            </div>
          </div>
        </div>
        <div className="mt-14 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          <p className="max-w-4xl">{f.disclaimer}</p>
          <p className="mt-4">© 2026 SUSALI. {f.copyright} · {site.legalName}</p>
        </div>
      </div>
    </footer>
  );
}
