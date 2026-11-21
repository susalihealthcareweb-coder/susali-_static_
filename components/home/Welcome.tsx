import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, PrimaryButton, SplitHeading } from "@/components/ui/primitives";
import { getDict, href, routes, type Lang } from "@/lib/i18n";
import { sentences } from "@/lib/text";

export default function Welcome({ lang }: { lang: Lang }) {
  const d = getDict(lang), h = d.home, v = d.heroVisual;
  const ccc = sentences(v.careClarityConnection);
  return (
    <Reveal id="about-preview" aria-labelledby="welcome-title" className="relative overflow-hidden bg-white py-24 sm:py-32">
      <Container>
        <p className="font-heading text-[3rem] font-extrabold leading-[0.98] tracking-[-0.05em] text-ink sm:text-7xl lg:text-[7.5rem]">
          {ccc.map((s, i) => (
            <span key={s} className="line-mask"><span className={`line-inner ${i === 1 ? "text-grad" : ""} ${i === 2 ? "pl-[8vw]" : i === 1 ? "pl-[4vw]" : ""}`}>{s}</span></span>
          ))}
        </p>

        <div className="mt-20 grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            <div data-scale className="relative aspect-[4/3.4] overflow-hidden rounded-[28px] shadow-lift">
              <div data-parallax="14" className="absolute -inset-y-[8%] inset-x-0">
                <Image src="/images/original/about-intro.jpg" alt={`${v.careClarityConnection} — SUSALI`} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
              </div>
            </div>
            <div data-fade="0.3" className="absolute -bottom-6 left-4 sm:-right-6 sm:left-auto"><div className="float rounded-2xl border border-white bg-white/90 px-5 py-4 shadow-lift backdrop-blur">
              <strong className="block font-heading text-xl font-extrabold tracking-tight text-ink">SUSALI</strong>
              <small className="text-sm font-semibold text-mauve">{v.careClarityConnection}</small>
            </div></div>
            <span aria-hidden className="float-2 absolute -left-5 -top-5 h-16 w-16 rounded-full bg-p-mint" />
            <span aria-hidden className="float-3 absolute -right-3 top-10 h-10 w-10 rounded-full bg-p-peach" />
          </div>

          <div>
            <div data-fade><Eyebrow>{h.welcomeKicker}</Eyebrow></div>
            <SplitHeading id="welcome-title" l1={h.welcomeTitle1} l2={h.welcomeTitle2} className="mt-4" />
            <p data-fade className="mt-6 font-heading text-lg font-semibold leading-relaxed text-ink sm:text-xl">{h.welcomeLead}</p>
            <p data-fade className="mt-5 leading-relaxed text-slate">{h.welcomeP1}</p>
            <p data-fade className="mt-4 leading-relaxed text-slate">{h.welcomeP2}</p>
            <div data-fade className="mt-8"><PrimaryButton href={href(lang, routes.about)}>{h.welcomeBtn}</PrimaryButton></div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
