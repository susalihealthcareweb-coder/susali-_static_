import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, IconCircle, PrimaryButton, SplitHeading, tones } from "@/components/ui/primitives";
import { getIcon } from "@/components/ui/icons";
import { getDict, href, routes, type Lang } from "@/lib/i18n";
import SphereField from "@/components/float/SphereField";

export default function ServicesGrid({ lang }: { lang: Lang }) {
  const d = getDict(lang), h = d.home;
  return (
    <Reveal aria-labelledby="svc-title" className="wash-lav relative overflow-hidden py-24 sm:py-32">
      <SphereField preset="a" />
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <div data-fade><Eyebrow>{h.servicesKicker}</Eyebrow></div>
            <SplitHeading id="svc-title" l1={h.servicesTitle1} l2={h.servicesTitle2} className="mt-4" />
          </div>
          <p data-fade className="text-lg leading-relaxed text-slate">{h.servicesDesc}</p>
        </div>

        <ul data-stagger className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {d.services.list.map((s, i) => (
            <li key={s.id}>
              <Link href={href(lang, `${routes.services}#service-${s.id}`)}
                className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-white bg-white shadow-soft transition-[translate,box-shadow,border-color,background-color,rotate] duration-500 hover:-translate-y-2 hover:shadow-lift">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image src={`/images/original${s.image}`} alt={s.title} fill sizes="(min-width:1024px) 400px, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                  <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 font-heading text-xs font-extrabold text-mauve backdrop-blur">{s.id}</span>
                </div>
                <div className="relative flex flex-1 flex-col px-6 pb-6 pt-10">
                  <IconCircle icon={getIcon(s.icon)} tone={tones[i % 4]} className="absolute -top-7 left-6" />
                  <h3 className="font-heading text-lg font-extrabold leading-snug tracking-tight text-ink">{s.title}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-slate">{s.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-green transition-colors group-hover:text-mauve">
                    {d.ui.viewDetails}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div data-fade className="mt-12 flex flex-col items-center justify-between gap-5 rounded-[22px] bg-white/70 px-6 py-5 shadow-soft backdrop-blur sm:flex-row">
          <span className="font-heading text-lg font-extrabold text-ink">{d.ui.oneEcosystem}</span>
          <PrimaryButton href={href(lang, routes.services)}>{h.servicesBtn}</PrimaryButton>
        </div>
      </Container>
    </Reveal>
  );
}
