"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, CircleCheck, Building2, UsersRound, UserRound, BarChart3 } from "lucide-react";
import ScrollSequence from "@/components/ui/ScrollSequence";
import Magnetic from "@/components/ui/Magnetic";
import FloatLayer from "@/components/float/FloatLayer";
import Floater from "@/components/float/Floater";
import FloatingCard from "@/components/float/FloatingCard";
import FloatingIconTile from "@/components/float/FloatingIconTile";
import GlassSphere from "@/components/float/GlassSphere";
import { CareJourneyCard, RecordsCard, ConnectedCareCard } from "@/components/float/HeroCards";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { getDict, href, routes, type Lang } from "@/lib/i18n";

/** Hero photo — change this path to swap the photo (file lives in /public/images/original/). */
export const HERO_PHOTO = "/images/original/hero-bg.jpg";

/**
 * Pinned timeline (0 → 1 over ~400vh on desktop):
 *  0.00–0.30  floating cards/tiles drift outward + fade, spheres rise, photo fades → frames take over
 *  0.22–1.00  hero frame sequence scrubs
 *  0.62–0.90  headline column exits
 */
const heroTimeline = (tl: gsap.core.Timeline, root: HTMLElement, { stacked }: { stacked: boolean }) => {
  tl.to(root.querySelector("[data-scroll-ind]"), { autoAlpha: 0, duration: 0.04 }, 0.01);
  if (stacked) return; // mobile: composition scrolls away normally, only the frames are pinned
  root.querySelectorAll<HTMLElement>("[data-exit]").forEach((el, i) => {
    const [x, y] = (el.dataset.exit || "0,-120").split(",").map(Number);
    tl.to(el, { x, y, autoAlpha: 0, duration: 0.2 + (i % 3) * 0.04, ease: "power1.in" }, 0.02 + (i % 5) * 0.012);
  });
  tl.to(root.querySelector("[data-hero-photo]"), { autoAlpha: 0, scale: 1.06, duration: 0.2, ease: "power1.in" }, 0.08);
  tl.to(root.querySelector("[data-hero-bg]"), { autoAlpha: 0, duration: 0.16 }, 0.14);
  tl.to(root.querySelector("[data-hero-copy]"), { y: -90, autoAlpha: 0, scale: 0.97, duration: 0.25, ease: "power1.in" }, 0.64);
  tl.to(root.querySelector("[data-hero-fade]"), { autoAlpha: 0.3, duration: 0.25 }, 0.64);
};

export default function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang), h = d.home, v = d.heroVisual;
  const root = useRef<HTMLDivElement>(null);

  // Entrance after the loader: headline lines → photo → cards & tiles pop in one by one
  useEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.set(el.querySelectorAll("[data-hero-copy] .line-inner"), { yPercent: 115 });
      gsap.set(el.querySelectorAll("[data-intro='0'], [data-intro='1']"), { y: 24, autoAlpha: 0 });
      gsap.set(el.querySelectorAll("[data-intro='text']"), { y: 18 });
      gsap.set(el.querySelectorAll("[data-photo-in]"), { autoAlpha: 0, scale: 0.94 });
      gsap.set(el.querySelectorAll("[data-pop]"), { autoAlpha: 0, scale: 0.8 });
    }, el);
    const play = () => ctx.add(() => {
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .to(el.querySelectorAll("[data-intro='0']"), { y: 0, autoAlpha: 1, duration: 0.8 })
        .to(el.querySelectorAll("[data-hero-copy] .line-inner"), { yPercent: 0, duration: 1.2, stagger: 0.14 }, 0.1)
        .to(el.querySelectorAll("[data-intro='text']"), { y: 0, duration: 1 }, 0.45)
        .to(el.querySelectorAll("[data-intro='1']"), { y: 0, autoAlpha: 1, duration: 1, stagger: 0.12 }, 0.55)
        .to(el.querySelectorAll("[data-photo-in]"), { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power3.out" }, 0.45)
        .to(el.querySelectorAll("[data-pop]"), { autoAlpha: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.12 }, 0.8);
    });
    window.addEventListener("susali:loaded", play, { once: true });
    return () => { window.removeEventListener("susali:loaded", play); ctx.revert(); };
  }, []);

  const lineGrad = "bg-clip-text text-transparent [-webkit-background-clip:text] pb-[0.08em]";

  return (
    <ScrollSequence name="hero" length={3} frameStart={0.22} mobileStack priority timeline={heroTimeline} aria-label={`${h.heroTitle1} ${h.heroTitle2}`}>
      {/* covers the canvas until the composition exits (desktop) */}
      <div data-hero-bg aria-hidden className="absolute inset-0 hidden md:block wash-hero" />
      <div data-hero-fade aria-hidden className="absolute inset-0 hidden bg-gradient-to-r from-white via-white/80 to-transparent md:block" />
      <svg aria-hidden data-exit="0,-60" className="pointer-events-none absolute inset-0 hidden h-full w-full md:block" viewBox="0 0 1440 900" preserveAspectRatio="none" fill="none">
        <path d="M640 900 C 760 560, 1120 640, 1460 300" stroke="#cdbfe2" strokeWidth="1.5" className="dotted-path" vectorEffect="non-scaling-stroke" />
        <path d="M700 -20 C 900 200, 1180 120, 1460 260" stroke="#d9cdea" strokeWidth="1.5" className="dotted-path" vectorEffect="non-scaling-stroke" />
        <path d="M520 120 C 760 60, 980 420, 1460 520" stroke="#e6dcf2" strokeWidth="1.2" className="dotted-path" vectorEffect="non-scaling-stroke" />
      </svg>

      <FloatLayer popOnView={false} className="relative overflow-x-clip md:h-full md:overflow-visible">
        <div ref={root} className="relative mx-auto grid max-w-7xl items-center gap-10 px-5 pb-12 pt-[118px] sm:px-8 md:h-full md:grid-cols-[1.02fr_1fr] md:gap-6 md:pb-6 md:pt-[110px] lg:gap-10">
          {/* spheres around the text column — behind it */}
          <GlassSphere kind="teal" size={90} className="bottom-[4%] left-[2%] z-0 md:bottom-[9%] md:left-[1%]" exit="-80,-260" dur={6.5} />
          <GlassSphere kind="glass" size={64} hideMobile className="left-[38%] top-[16%] z-0" exit="0,-320" dur={7.5} delay={0.8} />

          {/* LEFT: exact current content */}
          <div data-hero-copy className="relative z-20 max-w-[40rem]">
            <div data-intro="0">
              <span className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#2e3247] shadow-[0_8px_24px_-12px_rgb(110_90_160/0.35)] sm:text-xs">
                <CircleCheck className="h-4 w-4 text-[#3d7be0]" strokeWidth={2.2} aria-hidden />{h.badge}
              </span>
            </div>
            <h1 className="mt-5 font-heading text-[2.4rem] font-extrabold leading-[1.03] tracking-[-0.045em] sm:text-6xl lg:text-[clamp(3.2rem,7.2vh,4.7rem)]">
              <span className="line-mask"><span className={`line-inner bg-gradient-to-r from-hero-from to-[#8a72a8] ${lineGrad}`}>{h.heroTitle1}</span></span>
              <span className="line-mask"><span className={`line-inner bg-gradient-to-r from-[#7d68a0] to-hero-to ${lineGrad}`}>{h.heroTitle2}</span></span>
            </h1>
            <p data-intro="text" className="mt-5 max-w-xl text-[14px] leading-relaxed text-slate sm:text-base lg:text-[clamp(0.95rem,1.9vh,1.06rem)]">{h.heroDesc}</p>
            <div data-intro="1" className="mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Link href={href(lang, routes.services)} className="group inline-flex items-center gap-2 rounded-full bg-navy-btn px-6 py-3.5 text-[15px] font-bold text-white shadow-[0_14px_30px_-12px_rgb(46_50_71/0.6)] transition-colors hover:bg-[#3a3f5a]">
                  {h.btnPrimary}<ArrowUpRight className="h-4 w-4 transition-[translate] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link href={href(lang, "/#about-preview")} className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-[15px] font-bold text-[#2e3247] shadow-[0_12px_30px_-14px_rgb(110_90_160/0.45)] ring-1 ring-line transition-shadow hover:shadow-[0_18px_36px_-14px_rgb(110_90_160/0.55)]">
                  {h.btnSecondary}<ArrowRight className="h-4 w-4 transition-[translate] group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* RIGHT: photo + floating glass composition */}
          <div className="relative z-10 mx-auto my-20 w-full max-w-[520px] md:my-0 md:max-w-none">
            <div className="relative mx-auto aspect-[4/4.3] w-[86%] md:max-h-[64vh] md:w-[84%]">
              {/* pastel wash behind */}
              <div aria-hidden className="absolute -inset-[12%] rounded-full bg-[radial-gradient(closest-side,rgb(239_232_247/0.95),rgb(253_231_236/0.6)_55%,transparent)]" />
              <GlassSphere kind="lav" size={120} hideMobile className="-right-[14%] -top-[8%]" exit="140,-320" dur={7} delay={0.4} />
              <div data-hero-photo className="absolute inset-0">
                <div data-depth="0.15" className="h-full w-full">
                  <div data-photo-in className="blob-mask relative h-full w-full overflow-hidden shadow-[0_40px_80px_-30px_rgb(110_90_160/0.45)]">
                    <Image src={HERO_PHOTO} alt={v.patientsDoctors} fill priority sizes="(min-width:768px) 42vw, 86vw" className="object-cover object-[78%_center]" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-tr from-[#f6dbe8]/45 via-transparent to-[#e6dcf6]/40 mix-blend-multiply" />
                    <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white/50 to-transparent" />
                  </div>
                </div>
              </div>

              {/* icon tiles (desktop) */}
              <FloatingIconTile icon={BarChart3} tone="purple" faded size={78} hideMobile className="-top-[9%] left-[30%] z-0" exit="-40,-260" dur={7.5} />
              <FloatingIconTile icon={Building2} tone="blue" size={92} hideMobile className="-right-[12%] top-[20%] z-20" exit="260,-80" dur={5.5} delay={0.6} />
              <FloatingIconTile icon={UsersRound} tone="purple" size={84} hideMobile className="-right-[8%] top-[56%] z-20" exit="280,60" dur={6.5} delay={1.2} />
              <FloatingIconTile icon={UserRound} tone="purple" size={72} hideMobile className="-left-[14%] top-[36%] z-20" exit="-280,0" dur={5} delay={0.3} />

              {/* glass cards */}
              <FloatingCard className="-left-[6%] -top-[20%] z-30 md:-left-[22%] md:top-[2%]" exit="-260,-180" dur={6} decorative={false}>
                <CareJourneyCard v={v} />
              </FloatingCard>
              <FloatingCard className="-bottom-[18%] -left-[2%] z-30 md:-left-[16%] md:bottom-[10%]" exit="-300,140" dur={7} delay={0.5} decorative={false}>
                <RecordsCard v={v} />
              </FloatingCard>
              <FloatingCard hideMobile className="-bottom-[7%] -right-[8%] z-30" exit="280,200" dur={5.5} delay={1} decorative={false}>
                <ConnectedCareCard v={v} />
              </FloatingCard>

              {/* spheres & bubbles around the photo */}
              <GlassSphere kind="pink" size={46} className="-bottom-[2%] left-[42%] z-20" exit="0,-380" dur={4.5} delay={0.2} />
              <GlassSphere kind="lav" size={40} hideMobile className="right-[6%] -top-[10%] z-20" exit="60,-420" dur={5} delay={1.4} />
              <GlassSphere kind="glass" size={84} hideMobile className="-right-[20%] bottom-[28%] z-0" exit="200,-300" dur={8} />
              <GlassSphere kind="glass" size={36} hideMobile className="left-[8%] top-[48%] z-20" exit="-60,-360" dur={6} delay={2} />
            </div>
          </div>
        </div>
      </FloatLayer>

      <div data-scroll-ind className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-mauve md:flex">
        <span className="flex h-9 w-5 justify-center rounded-full border border-mauve/40 pt-1.5"><span className="scroll-dot h-1.5 w-1.5 rounded-full bg-mauve" /></span>
        {d.added.scroll}
      </div>
    </ScrollSequence>
  );
}
