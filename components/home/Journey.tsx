"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { UserPlus, Hospital, FileHeart, RefreshCcw } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow, IconCircle, PrimaryButton, tones } from "@/components/ui/primitives";
import { getDict, href, routes, type Lang } from "@/lib/i18n";
import SphereField from "@/components/float/SphereField";

const icons = [UserPlus, Hospital, FileHeart, RefreshCcw];
const washes = ["from-p-lav", "from-p-mint", "from-p-peach", "from-p-pink"];

/** Pinned horizontal scroll through the 4 journey phases. */
export default function Journey({ lang }: { lang: Lang }) {
  const d = getDict(lang), h = d.home, phases = d.interactiveJourney, ui = d.journeyUi;
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLOListElement>(null);
  const [phase, setPhase] = useState(0);

  useLayoutEffect(() => {
    const el = root.current, tr = track.current;
    if (!el || !tr || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-jhead] .line-inner", { yPercent: 115, stagger: 0.1, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 70%", once: true } });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
      const dist = () => tr.scrollWidth - window.innerWidth + 40;
      const tween = gsap.to(tr, {
        x: () => -dist(), ease: "none",
        scrollTrigger: {
          trigger: el, start: "top top", end: () => `+=${dist()}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: (s) => { setPhase(Math.min(phases.length - 1, Math.floor(s.progress * phases.length * 0.999))); gsap.set("[data-jbar]", { scaleX: s.progress }); },
        },
      });
      gsap.utils.toArray<HTMLElement>("[data-jcard]").forEach((card) => {
        gsap.from(card.querySelectorAll("[data-jin]"), {
          y: 40, autoAlpha: 0, stagger: 0.08, ease: "power3.out",
          scrollTrigger: { trigger: card, containerAnimation: tween, start: "left 85%", end: "left 45%", scrub: true },
        });
      });
      });
    }, el);
    return () => ctx.revert();
  }, [phases.length]);

  return (
    <section ref={root} aria-labelledby="journey-title" className="relative overflow-hidden bg-white md:h-svh">
      <SphereField preset="c" />
      <div className="relative z-10 flex h-full flex-col justify-center gap-8 pb-16 pt-24 md:pb-8 md:pt-[96px]">
        <div data-jhead className="mx-auto grid w-full max-w-7xl gap-6 px-5 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <Eyebrow>{h.journeyKicker}</Eyebrow>
            <h2 id="journey-title" className="mt-4 font-heading text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
              <span className="line-mask"><span className="line-inner">{h.journeyTitle1}</span></span>
              <span className="line-mask"><span className="line-inner text-grad">{h.journeyTitle2}</span></span>
            </h2>
          </div>
          <div>
            <p className="leading-relaxed text-slate">{h.journeyDesc}</p>
            <div className="mt-5 flex items-center gap-4">
              <span className="font-heading text-xs font-extrabold tracking-[0.2em] text-mauve" aria-live="polite">
                {ui.phase} {String(phase + 1).padStart(2, "0")} / {String(phases.length).padStart(2, "0")}
              </span>
              <span className="h-0.5 flex-1 overflow-hidden rounded bg-line"><span data-jbar className="block h-full origin-left scale-x-0 bg-gradient-to-r from-grad-from to-grad-to" /></span>
            </div>
          </div>
        </div>

        <ol ref={track} aria-label={ui.stagesLabel}
          className="flex snap-x gap-5 overflow-x-auto px-5 pb-2 will-change-transform sm:px-8 md:overflow-visible md:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {phases.map((p, i) => {
            const Icon = icons[i];
            return (
              <li key={p.title} data-jcard className={`relative flex w-[82vw] shrink-0 snap-start flex-col justify-between overflow-hidden rounded-[26px] border border-line bg-gradient-to-br ${washes[i]} to-white p-7 shadow-soft sm:w-[60vw] sm:p-10 md:h-[min(52vh,440px)] md:w-[44vw] lg:w-[38vw]`}>
                <span aria-hidden className="pointer-events-none absolute -right-4 -top-10 font-heading text-[10rem] font-extrabold leading-none tracking-tighter text-white/80">{String(i + 1).padStart(2, "0")}</span>
                <div data-jin className="relative"><IconCircle icon={Icon} tone={tones[i]} size="lg" /></div>
                <div className="relative mt-10">
                  <p data-jin className="font-heading text-xs font-extrabold tracking-[0.2em] text-mauve">{ui.phase} {String(i + 1).padStart(2, "0")} / 04</p>
                  <h3 data-jin className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{p.title}</h3>
                  <strong data-jin className="mt-2 block text-lg font-bold text-green">{p.sub}</strong>
                  <p data-jin className="mt-3 max-w-md leading-relaxed text-slate">{p.desc}</p>
                </div>
              </li>
            );
          })}
          <li className="flex w-[82vw] shrink-0 snap-start items-center justify-center sm:w-[50vw] md:w-[34vw]">
            <PrimaryButton href={href(lang, `${routes.services}#journey`)}>{h.journeyBtn}</PrimaryButton>
          </li>
        </ol>
      </div>
    </section>
  );
}
