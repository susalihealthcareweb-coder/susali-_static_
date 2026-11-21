"use client";
import { LifeBuoy, UsersRound, HeartPulse, ShieldCheck } from "lucide-react";
import ScrollSequence from "@/components/ui/ScrollSequence";
import { Eyebrow, IconCircle, PrimaryButton, tones } from "@/components/ui/primitives";
import { getDict, href, routes, type Lang } from "@/lib/i18n";
import FloatLayer from "@/components/float/FloatLayer";
import Floater from "@/components/float/Floater";
import SphereField from "@/components/float/SphereField";

const networkTimeline = (tl: gsap.core.Timeline, root: HTMLElement) => {
  tl.fromTo(root.querySelectorAll("[data-ncopy] > *"), { y: 40, autoAlpha: 0 }, { y: 0, autoAlpha: 1, stagger: 0.04, duration: 0.12 }, 0.02);
  tl.fromTo(root.querySelector("[data-ncenter]"), { scale: 0.6, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: 0.14, ease: "back.out(1.6)" }, 0.18);
  tl.fromTo(root.querySelectorAll("[data-ncard]"), { y: 50, autoAlpha: 0, scale: 0.94 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.07, duration: 0.14, ease: "power2.out" }, 0.3);
  tl.to(root.querySelectorAll("[data-ncard], [data-ncenter], [data-ncopy]"), { autoAlpha: 0, y: -30, duration: 0.08 }, 0.92);
};

export default function Network({ lang }: { lang: Lang }) {
  const d = getDict(lang), h = d.home, v = d.heroVisual, nd = d.added.networkDescs;
  const items = [
    { t: v.networkSupport, d: nd.support, i: LifeBuoy },
    { t: v.networkTeams, d: nd.teams, i: UsersRound },
    { t: v.networkCare, d: nd.care, i: HeartPulse },
    { t: v.networkTrust, d: nd.trust, i: ShieldCheck },
  ];
  return (
    <ScrollSequence name="network" length={2} timeline={networkTimeline} aria-label={`${h.networkTitle1} ${h.networkTitle2}`}>
      <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/60 to-white/20 lg:bg-gradient-to-r lg:from-white lg:via-white/75 lg:to-white/0" />
      <SphereField preset="c" />
      <div className="relative z-10 mx-auto grid h-full max-w-7xl content-center gap-4 px-5 pb-6 pt-[84px] sm:gap-6 sm:px-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
        <div data-ncopy className="relative max-w-xl">
          <Eyebrow>{h.networkKicker}</Eyebrow>
          <h2 className="mt-4 font-heading text-[1.6rem] font-extrabold leading-[1.06] tracking-[-0.035em] text-ink sm:text-5xl">
            {h.networkTitle1} <span className="text-grad">{h.networkTitle2}</span>
          </h2>
          <p className="mt-3 text-[13.5px] leading-relaxed text-slate sm:mt-5 sm:text-base">{h.networkDesc}</p>
          <div className="mt-5 sm:mt-7"><PrimaryButton href={href(lang, routes.network)}>{h.networkBtn}</PrimaryButton></div>
        </div>
        <FloatLayer popOnView={false} className="relative">
          <div data-ncenter className="relative z-10 mx-auto mb-3 w-fit rounded-full border border-white bg-white/90 px-4 py-1.5 sm:px-5 sm:py-2.5 text-center shadow-lift backdrop-blur lg:absolute lg:left-1/2 lg:top-1/2 lg:mb-0 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:px-7 lg:py-5">
            <strong className="block font-heading text-base font-extrabold sm:text-lg tracking-tight text-ink lg:text-2xl">SUSALI</strong>
            <small className="text-xs font-bold text-mauve">{v.ecosystem}</small>
          </div>
          <ul className="relative grid grid-cols-2 gap-2.5 sm:gap-5 lg:gap-x-24 lg:gap-y-20">
            {items.map((it, i) => (
              <li key={it.t} data-ncard className={i % 2 ? "lg:translate-y-6" : ""}>
                <Floater place="relative" depth={0.35 + i * 0.12} amp={12} dur={5 + i * 0.9} delay={i * 0.4} pop={false} decorative={false}>
                <div className="glass glass-hover h-full rounded-[18px] p-3 sm:rounded-[22px] sm:p-6">
                <IconCircle icon={it.i} tone={tones[i]} size="sm" className={`hidden sm:grid ${i % 2 ? "float-2" : "float"}`} />
                <h3 className="font-heading text-[15px] sm:mt-3 sm:text-base font-extrabold text-ink sm:text-lg">{it.t}</h3>
                <p className="mt-1 text-[12px] leading-snug text-slate sm:text-sm">{it.d}</p>
                </div>
                </Floater>
              </li>
            ))}
          </ul>
        </FloatLayer>
      </div>
    </ScrollSequence>
  );
}
