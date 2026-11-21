import Reveal from "./Reveal";
import { Container, Eyebrow, PrimaryButton, SplitHeading } from "./primitives";
import FloatingCircles from "./FloatingCircles";
import { getDict, href, routes, type Lang } from "@/lib/i18n";

/** "Let's move healthcare forward" block used at the end of the inner pages on the live site. */
export default function SharedCta({ lang }: { lang: Lang }) {
  const c = getDict(lang).sharedCta;
  return (
    <Reveal aria-label={c.kicker} className="bg-white pb-24 pt-8">
      <Container>
        <div data-scale className="wash-lav relative overflow-hidden rounded-[32px] border border-line px-6 py-14 sm:px-14 sm:py-20">
          <FloatingCircles />
          <div className="relative grid items-center gap-8 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div data-fade><Eyebrow>{c.kicker}</Eyebrow></div>
              <SplitHeading l1={c.title1} l2={c.title2} className="mt-4" />
            </div>
            <div>
              <p data-fade className="text-lg leading-relaxed text-slate">{c.desc}</p>
              <div data-fade className="mt-7"><PrimaryButton href={href(lang, routes.contact)}>{c.button}</PrimaryButton></div>
            </div>
          </div>
        </div>
      </Container>
    </Reveal>
  );
}
