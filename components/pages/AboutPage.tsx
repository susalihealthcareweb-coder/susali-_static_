import { Target, Telescope } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SharedCta from "@/components/ui/SharedCta";
import AboutHeroVisual from "@/components/float/AboutHeroVisual";
import { Container, Eyebrow, IconCircle, SplitHeading, tones } from "@/components/ui/primitives";
import { valueIcons } from "@/components/ui/icons";
import { getDict, type Lang } from "@/lib/i18n";

export default function AboutPage({ lang }: { lang: Lang }) {
  const a = getDict(lang).about;
  return (
    <>
      <PageHero eyebrow={a.heroTag} l1={a.heroTitle} l2={a.heroAccent} desc={a.heroDesc} image="/images/about-hero-blur.jpg" imageClassName="object-[80%_center]" aside={<AboutHeroVisual />} />

      <Reveal aria-labelledby="story" className="bg-white py-24 sm:py-32">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-fade><Eyebrow>{a.storyKicker}</Eyebrow></div>
            <SplitHeading id="story" l1={a.storyTitle1} l2={a.storyTitle2} className="mt-4" />
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-slate">
            <p data-fade>{a.storyP1}</p>
            <p data-fade className="border-l-2 border-mauve-2/50 pl-5 font-heading font-semibold text-ink">{a.storyP2}</p>
            <p data-fade>{a.storyP3}</p>
          </div>
        </Container>
      </Reveal>

      <Reveal aria-label={`${a.missionTag} / ${a.visionTag}`} className="wash-lav py-24 sm:py-28">
        <Container>
          <div data-stagger className="grid gap-6 md:grid-cols-2">
            {[
              { tag: a.missionTag, t: a.missionTitle, d: a.missionDesc, i: Target, tone: "mint" as const },
              { tag: a.visionTag, t: a.visionTitle, d: a.visionDesc, i: Telescope, tone: "lav" as const },
            ].map((c) => (
              <article key={c.tag} className="rounded-[24px] border border-white bg-white p-8 shadow-soft transition-[translate,box-shadow,border-color,background-color,rotate] duration-500 hover:-translate-y-1.5 hover:shadow-lift sm:p-10">
                <IconCircle icon={c.i} tone={c.tone} size="lg" />
                <Eyebrow className="mt-7">{c.tag}</Eyebrow>
                <h3 className="mt-3 font-heading text-2xl font-extrabold leading-tight tracking-tight text-ink sm:text-3xl">{c.t}</h3>
                <p className="mt-4 leading-relaxed text-slate">{c.d}</p>
              </article>
            ))}
          </div>
        </Container>
      </Reveal>

      <Reveal aria-labelledby="values" className="bg-white py-24 sm:py-32">
        <Container>
          <div className="text-center">
            <div data-fade><Eyebrow center>{a.valuesKicker}</Eyebrow></div>
            <SplitHeading id="values" l1={a.valuesTitle1} l2={a.valuesTitle2} center className="mt-4" />
          </div>
          <ul data-stagger className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {a.values.map((v, i) => (
              <li key={v.title} className="group rounded-[22px] border border-line bg-white p-7 shadow-soft transition-[translate,box-shadow,border-color,background-color,rotate] duration-500 hover:-translate-y-1.5 hover:border-white hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <IconCircle icon={valueIcons[i]} tone={tones[i % 4]} />
                  <span className="font-heading text-sm font-extrabold text-line transition-colors group-hover:text-mauve-2">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 font-heading text-xl font-extrabold text-ink">{v.title}</h3>
                <p className="mt-3 leading-relaxed text-slate">{v.desc}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Reveal>

      <SharedCta lang={lang} />
    </>
  );
}
