import { Mail } from "lucide-react";
import PageHero from "@/components/ui/PageHero";
import { Container } from "@/components/ui/primitives";
import { getDict, type Lang } from "@/lib/i18n";
import { site } from "@/lib/site";

export type LegalKind = "privacy" | "terms" | "deletion";

/**
 * Placeholder legal pages.
 * TODO-REVIEW: new content — replace the placeholder block below with the reviewed legal text
 * (see README → "Legal text").
 */
export default function LegalPage({ lang, kind }: { lang: Lang; kind: LegalKind }) {
  const d = getDict(lang), l = d.added.legal;
  const title = kind === "privacy" ? d.footer.privacy : kind === "terms" ? d.footer.terms : l.deletionTitle;
  return (
    <>
      <PageHero eyebrow={l.kicker} l1={title} />
      <section className="bg-white pb-24">
        <Container>
          <article className="mx-auto max-w-3xl rounded-[24px] border border-line bg-lavender p-8 sm:p-12">
            {/* ↓↓↓ LEGAL TEXT GOES HERE ↓↓↓ */}
            <p className="font-heading text-xl font-extrabold text-ink">{l.pending}</p>
            <p className="mt-3 leading-relaxed text-slate">{l.pendingDesc}</p>
            <a href={`mailto:${site.contact.email}`} className="mt-6 inline-flex items-center gap-2 font-bold text-green hover:text-mauve">
              <Mail className="h-4 w-4" aria-hidden />{site.contact.email}
            </a>
            {/* ↑↑↑ LEGAL TEXT GOES HERE ↑↑↑ */}
          </article>
        </Container>
      </section>
    </>
  );
}
