import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SharedCta from "@/components/ui/SharedCta";
import { Container, Eyebrow, IconCircle, SplitHeading, tones } from "@/components/ui/primitives";
import { getIcon } from "@/components/ui/icons";
import { getDict, type Lang } from "@/lib/i18n";

export default function ServicesPage({ lang }: { lang: Lang }) {
  const d = getDict(lang), s = d.services;
  return (
    <>
      <PageHero eyebrow={s.heroTag} l1={s.heroTitle} l2={s.heroAccent} desc={s.heroDesc} chips={[d.heroVisual.connectedCare, d.nav.network]} />

      <Reveal aria-labelledby="philosophy" className="bg-white py-24 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <div>
            <div data-fade><Eyebrow>{s.philosophyKicker}</Eyebrow></div>
            <SplitHeading id="philosophy" l1={s.philosophyTitle1} l2={s.philosophyTitle2} className="mt-4" />
          </div>
          <p data-fade className="text-lg leading-relaxed text-slate">{s.philosophyP}</p>
        </Container>
      </Reveal>

      <div className="bg-white pb-12">
        {s.list.map((x, i) => (
          <Reveal key={x.id} id={`service-${x.id}`} aria-labelledby={`svc-${x.id}`} className="scroll-mt-28 py-10 sm:py-14">
            <Container>
              <div className={`grid items-center gap-10 rounded-[28px] p-5 sm:p-8 lg:grid-cols-2 lg:gap-16 lg:p-10 ${i % 2 ? "bg-lavender" : "bg-white"}`}>
                <div className={`relative ${i % 2 ? "lg:order-2" : ""}`}>
                  <div data-scale className="relative aspect-[16/10] overflow-hidden rounded-[22px] shadow-lift">
                    <div data-parallax="10" className="absolute -inset-y-[6%] inset-x-0">
                      <Image src={`/images/original${x.image}`} alt={x.title} fill sizes="(min-width:1024px) 600px, 100vw" className="object-cover" />
                    </div>
                  </div>
                  <IconCircle icon={getIcon(x.icon)} tone={tones[i % 4]} size="lg" className="float absolute -bottom-6 left-6" />
                </div>
                <div>
                  <p data-fade className="font-heading text-xs font-extrabold tracking-[0.22em] text-mauve">{d.ui.service} <span data-count>{x.id}</span></p>
                  <h2 id={`svc-${x.id}`} className="mt-3 font-heading text-3xl font-extrabold leading-tight tracking-[-0.03em] text-ink sm:text-4xl">
                    <span className="line-mask"><span className="line-inner">{x.title}</span></span>
                  </h2>
                  <p data-fade className="mt-5 text-lg leading-relaxed text-slate">{x.desc}</p>
                  <p data-fade className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white px-5 py-3 font-semibold text-green shadow-soft">
                    <span aria-hidden className="h-2 w-2 rounded-full bg-gold" />{x.detail}
                  </p>
                </div>
              </div>
            </Container>
          </Reveal>
        ))}
      </div>

      <Reveal id="journey" aria-labelledby="steps" className="wash-lav scroll-mt-20 py-24 sm:py-32">
        <Container>
          <div className="text-center">
            <div data-fade><Eyebrow center>{s.journeyKicker}</Eyebrow></div>
            <SplitHeading id="steps" l1={s.journeyTitle1} l2={s.journeyTitle2} center className="mt-4" />
          </div>
          <ol data-stagger className="relative mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {d.journeySteps.map((st, i) => (
              <li key={st.title} className="relative rounded-[22px] border border-white bg-white p-6 shadow-soft transition-[translate,box-shadow,border-color,background-color,rotate] duration-500 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-grad-from to-grad-to font-heading text-sm font-extrabold text-white">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-5 font-heading text-lg font-extrabold text-ink">{st.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate">{st.desc}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Reveal>

      <SharedCta lang={lang} />
    </>
  );
}
