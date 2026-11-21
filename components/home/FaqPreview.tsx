import Reveal from "@/components/ui/Reveal";
import Accordion from "@/components/ui/Accordion";
import { Container, Eyebrow, PrimaryButton, SplitHeading } from "@/components/ui/primitives";
import { getDict, href, routes, type Lang } from "@/lib/i18n";

export default function FaqPreview({ lang }: { lang: Lang }) {
  const d = getDict(lang), h = d.home;
  return (
    <Reveal aria-labelledby="faq-title" className="relative bg-lavender py-24 sm:py-32">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div data-fade><Eyebrow>{h.faqsKicker}</Eyebrow></div>
          <SplitHeading id="faq-title" l1={h.faqsTitle1} l2={h.faqsTitle2} className="mt-4" />
          <div data-fade className="mt-8"><PrimaryButton href={href(lang, routes.faqs)}>{h.faqsBtn}</PrimaryButton></div>
        </div>
        <div data-fade><Accordion items={d.faqItems.slice(0, 5)} /></div>
      </Container>
    </Reveal>
  );
}
