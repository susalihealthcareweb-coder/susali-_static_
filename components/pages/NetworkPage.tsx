import { CheckCircle2 } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SharedCta from "@/components/ui/SharedCta";
import { Container, Eyebrow, IconCircle, PrimaryButton, SplitHeading, tones } from "@/components/ui/primitives";
import { getIcon } from "@/components/ui/icons";
import { getDict, href, routes, type Lang } from "@/lib/i18n";

export default function NetworkPage({ lang }: { lang: Lang }) {
  const n = getDict(lang).network;
  return (
    <>
      <PageHero eyebrow={n.heroTag} l1={n.heroTitle} l2={n.heroAccent} desc={n.heroDesc} image="/images/original/hero-bg.jpg" />

      <Reveal aria-labelledby="why" className="bg-white py-24 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div>
            <div data-fade><Eyebrow>{n.whyKicker}</Eyebrow></div>
            <SplitHeading id="why" l1={n.whyTitle1} l2={n.whyTitle2} className="mt-4" />
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-slate">
            <p data-fade>{n.whyP1}</p>
            <p data-fade>{n.whyP2}</p>
          </div>
        </Container>
      </Reveal>

      <Reveal aria-labelledby="eco" className="wash-lav py-24 sm:py-32">
        <Container>
          <div className="text-center">
            <div data-fade><Eyebrow center>{n.ecosystemKicker}</Eyebrow></div>
            <SplitHeading id="eco" l1={n.ecosystemTitle1} l2={n.ecosystemTitle2} center className="mt-4" />
          </div>
          <ul data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {n.groups.map((g, i) => {
              const [title, role] = g.title.split(" — ");
              return (
                <li key={g.title} className={`rounded-[22px] border border-white bg-white p-7 shadow-soft transition-[translate,box-shadow,border-color,background-color,rotate] duration-500 hover:-translate-y-1.5 hover:shadow-lift ${i === 0 ? "lg:col-span-1 lg:row-span-1" : ""}`}>
                  <IconCircle icon={getIcon(g.icon)} tone={tones[i % 4]} />
                  <h3 className="mt-6 font-heading text-xl font-extrabold text-ink">
                    {title}{role ? <> <span className="text-muted">—</span> <span className="text-grad">{role}</span></> : null}
                  </h3>
                  <p className="mt-3 leading-relaxed text-slate">{g.desc}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </Reveal>

      <Reveal aria-labelledby="paths" className="bg-white py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <div>
            <div data-fade><Eyebrow>{n.pathwaysKicker}</Eyebrow></div>
            <SplitHeading id="paths" l1={n.pathwaysTitle1} l2={n.pathwaysTitle2} className="mt-4" />
          </div>
          <ul data-stagger className="space-y-3">
            {n.pathwaysList.map((p, i) => (
              <li key={p} className="flex items-center gap-4 rounded-2xl border border-line bg-white px-5 py-4 shadow-soft">
                <span className="font-heading text-sm font-extrabold text-mauve">{String(i + 1).padStart(2, "0")}</span>
                <span className="flex-1 font-heading text-lg font-bold text-ink">{p}</span>
                <CheckCircle2 className="h-5 w-5 text-green" aria-hidden />
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>

      <Reveal aria-labelledby="collab" className="bg-white pb-16">
        <Container>
          <div className="grid gap-10 rounded-[28px] border border-line bg-gradient-to-br from-p-mint/70 via-white to-p-lav/70 p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
            <div>
              <div data-fade><Eyebrow>{n.collabKicker}</Eyebrow></div>
              <SplitHeading id="collab" l1={n.collabTitle1} l2={n.collabTitle2} size="md" className="mt-4" />
              <p data-fade className="mt-5 leading-relaxed text-slate">{n.collabP}</p>
            </div>
            <div data-fade className="rounded-[22px] bg-white p-7 shadow-soft">
              <h3 className="font-heading text-xl font-extrabold text-ink">{n.ctaTitle1} <span className="text-grad">{n.ctaTitle2}</span></h3>
              <p className="mt-3 leading-relaxed text-slate">{n.ctaDesc}</p>
              <div className="mt-6"><PrimaryButton href={href(lang, routes.contact)}>{n.collabBtn}</PrimaryButton></div>
            </div>
          </div>
        </Container>
      </Reveal>

      <SharedCta lang={lang} />
    </>
  );
}
