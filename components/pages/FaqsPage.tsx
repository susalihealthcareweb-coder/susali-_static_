import { MessageCircleQuestion } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import SharedCta from "@/components/ui/SharedCta";
import FaqBrowser from "@/components/ui/FaqBrowser";
import { Container, Eyebrow, IconCircle, PrimaryButton, SplitHeading } from "@/components/ui/primitives";
import { getDict, href, routes, type Lang } from "@/lib/i18n";

export default function FaqsPage({ lang }: { lang: Lang }) {
  const d = getDict(lang), f = d.faqs;
  const faqLd = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: d.faqItems.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <PageHero eyebrow={f.heroTag} l1={f.heroTitle} l2={f.heroAccent} desc={f.heroDesc} chips={[d.heroVisual.connectedCare, d.nav.network]} />
      <Reveal aria-labelledby="all-faqs" className="bg-lavender py-24 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_2fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <div data-fade><Eyebrow>{d.ui.faqIntro}</Eyebrow></div>
            <SplitHeading id="all-faqs" l1={f.introTitle1} l2={f.introTitle2} className="mt-4" />
            <div data-fade className="mt-10 rounded-[22px] border border-white bg-white p-7 shadow-soft">
              <IconCircle icon={MessageCircleQuestion} tone="peach" />
              <h3 className="mt-5 font-heading text-xl font-extrabold text-ink">{f.helpTitle}</h3>
              <p className="mt-2 leading-relaxed text-slate">{f.helpDesc}</p>
              <div className="mt-6"><PrimaryButton href={href(lang, routes.contact)}>{f.helpBtn}</PrimaryButton></div>
            </div>
          </div>
          <div data-fade><FaqBrowser items={d.faqItems} categories={d.faqCategories} /></div>
        </Container>
      </Reveal>
      <SharedCta lang={lang} />
    </>
  );
}
