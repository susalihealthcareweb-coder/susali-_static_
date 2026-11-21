import Reveal from "@/components/ui/Reveal";
import { Container, Eyebrow, PrimaryButton, SecondaryButton, SplitHeading } from "@/components/ui/primitives";
import { getDict, href, routes, type Lang } from "@/lib/i18n";
import FloatingCircles from "@/components/ui/FloatingCircles";
import SphereField from "@/components/float/SphereField";

export default function ClosingCta({ lang }: { lang: Lang }) {
  const h = getDict(lang).home;
  return (
    <Reveal aria-labelledby="cta-title" className="bg-white py-20 sm:py-28">
      <Container>
        <div data-scale className="wash-lav relative overflow-hidden rounded-[32px] border border-line px-6 py-16 text-center sm:px-12 sm:py-24">
          <FloatingCircles />
          <SphereField preset="b" />
          <div className="relative z-10">
            <div data-fade><Eyebrow center>SUSALI</Eyebrow></div>
            <SplitHeading id="cta-title" l1={h.ctaTitle1} l2={h.ctaTitle2} center className="mx-auto mt-5 max-w-4xl" />
            <p data-fade className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate">{h.ctaDesc}</p>
            <div data-fade className="mt-9 flex flex-wrap justify-center gap-3">
              <PrimaryButton href={href(lang, routes.services)}>{h.ctaBtnPrimary}</PrimaryButton>
              <SecondaryButton href={href(lang, routes.contact)}>{h.ctaBtnSecondary}</SecondaryButton>
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
