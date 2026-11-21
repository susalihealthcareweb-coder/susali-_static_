import { Mail, Phone, MessageCircle, MapPin, AlertTriangle } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import Reveal from "@/components/ui/Reveal";
import ContactForm from "@/components/ui/ContactForm";
import { Container, Eyebrow, IconCircle, SplitHeading } from "@/components/ui/primitives";
import { getDict, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function ContactPage({ lang }: { lang: Lang }) {
  const d = getDict(lang), c = d.contact, s = site.contact;
  const a = s.address;
  const wa = `https://wa.me/${s.whatsapp}?text=${encodeURIComponent(d.added.contact.whatsappMessage)}`;
  return (
    <>
      <PageHero eyebrow={c.heroTag} l1={c.heroTitle} l2={c.heroAccent} desc={c.heroDesc} chips={[d.heroVisual.connectedCare, d.nav.network]} />

      <Reveal aria-labelledby="contact-aside" className="bg-white py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <div>
            <div data-fade><Eyebrow>{c.asideKicker}</Eyebrow></div>
            <SplitHeading l1={c.asideTitle1} l2={c.asideTitle2} size="md" className="mt-4" />
            <p data-fade className="mt-5 leading-relaxed text-slate">{c.asideP1}</p>
            <p data-fade className="mt-4 leading-relaxed text-slate">{c.asideP2}</p>

            <ul data-stagger className="mt-8 space-y-3">
              <li><a href={`mailto:${s.email}`} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
                <IconCircle icon={Mail} tone="lav" size="sm" /><span className="min-w-0"><small className="block text-[11px] font-extrabold tracking-[0.18em] text-mauve">{d.ui.emailUs}</small><strong className="block break-all text-ink">{s.email}</strong></span></a></li>
              <li><a href={`tel:${s.phoneHref}`} className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
                <IconCircle icon={Phone} tone="mint" size="sm" /><span><small className="block text-[11px] font-extrabold tracking-[0.18em] text-mauve">{d.ui.callUs}</small><strong className="text-ink">{s.phone}</strong></span></a></li>
              <li><a href={wa} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift">
                <IconCircle icon={MessageCircle} tone="mint" size="sm" /><strong className="text-ink">{d.added.contact.whatsapp}</strong></a></li>
              <li className="flex items-center gap-4 rounded-2xl border border-line bg-white p-4 shadow-soft">
                <IconCircle icon={MapPin} tone="peach" size="sm" /><span><small className="block text-[11px] font-extrabold tracking-[0.18em] text-mauve">{d.ui.visitUs}</small><span className="text-ink">{a.street}, {a.city}, {a.region} {a.postalCode}</span></span></li>
            </ul>

            <p data-fade role="note" className="mt-6 flex gap-3 rounded-2xl bg-p-pink px-5 py-4 text-sm font-semibold leading-relaxed text-ink">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-[#a8405e]" aria-hidden />
              <span>{c.asideEmergencyNote} {d.added.emergencyCall}</span>
            </p>
          </div>

          <div data-fade className="rounded-[26px] border border-line bg-lavender p-6 shadow-soft sm:p-10">
            <Eyebrow>{c.formKicker}</Eyebrow>
            <h2 id="contact-aside" className="mt-3 font-heading text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">{c.formTitle}</h2>
            <p className="mt-2 text-slate">{c.formDesc}</p>
            <div className="relative mt-8"><ContactForm c={c} f={d.form} /></div>
          </div>
        </Container>
      </Reveal>

      <Reveal aria-label={d.added.contact.mapTitle} className="bg-white pb-24">
        <Container>
          <div data-scale className="overflow-hidden rounded-[26px] border border-line shadow-soft">
            <iframe title={d.added.contact.mapTitle} src={s.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="block h-[360px] w-full grayscale-[30%]" />
          </div>
        </Container>
      </Reveal>
    </>
  );
}
