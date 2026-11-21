"use client";
import { useLayoutEffect, useRef, useState } from "react";
import { UsersRound, Stethoscope, Building2, MessagesSquare, FlaskConical, CalendarClock } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { Eyebrow, IconCircle, type Tone } from "@/components/ui/primitives";
import { getDict, type Lang } from "@/lib/i18n";
import { splitTwo } from "@/lib/text";

// Node layout on a 1000 × 560 canvas (desktop diagram)
const LEFT = [{ x: 140, y: 110 }, { x: 110, y: 280 }, { x: 140, y: 450 }];
const RIGHT = [{ x: 860, y: 110 }, { x: 890, y: 280 }, { x: 860, y: 450 }];
const C = { x: 500, y: 280 };
const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => {
  const mx = (a.x + b.x) / 2;
  return `M${a.x},${a.y} C${mx},${a.y} ${mx},${b.y} ${b.x},${b.y}`;
};

export default function ConnectedCare({ lang }: { lang: Lang }) {
  const v = getDict(lang).heroVisual;
  const [t1, t2] = splitTwo(v.patientsDoctors);
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  const people = [
    { label: v.patients, icon: UsersRound, tone: "lav" as Tone },
    { label: v.doctors, icon: Stethoscope, tone: "mint" as Tone },
    { label: v.hospitals, icon: Building2, tone: "peach" as Tone },
  ];
  const themes = [
    { label: v.consultations, icon: MessagesSquare, tone: "pink" as Tone },
    { label: v.diagnostics, icon: FlaskConical, tone: "lav" as Tone },
    { label: v.followups, icon: CalendarClock, tone: "mint" as Tone },
  ];

  useLayoutEffect(() => {
    const el = root.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const paths = gsap.utils.toArray<SVGPathElement>("[data-draw]");
        paths.forEach((p) => { const L = p.getTotalLength(); gsap.set(p, { strokeDasharray: L, strokeDashoffset: L }); });
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=130%", pin: true, scrub: 0.6, anticipatePin: 1 } });
        tl.from("[data-head] .line-inner", { yPercent: 115, stagger: 0.08, duration: 0.25 }, 0)
          .from("[data-node='l']", { scale: 0.4, autoAlpha: 0, stagger: 0.08, duration: 0.2, ease: "back.out(2)" }, 0.1)
          .to("[data-draw='l']", { strokeDashoffset: 0, stagger: 0.06, duration: 0.35 }, 0.25)
          .from("[data-node='c']", { scale: 0.5, autoAlpha: 0, duration: 0.25, ease: "back.out(1.7)" }, 0.5)
          .to("[data-draw='r']", { strokeDashoffset: 0, stagger: 0.06, duration: 0.35 }, 0.62)
          .from("[data-node='r']", { scale: 0.4, autoAlpha: 0, stagger: 0.08, duration: 0.2, ease: "back.out(2)" }, 0.8);
      });
      mm.add("(max-width: 767px)", () => {
        gsap.from("[data-head] .line-inner", { yPercent: 115, stagger: 0.1, duration: 1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 75%", once: true } });
        gsap.fromTo("[data-mline]", { scaleY: 0 }, { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-mlist]", start: "top 75%", end: "bottom 60%", scrub: true } });
        gsap.utils.toArray<HTMLElement>("[data-mitem]").forEach((it) =>
          gsap.from(it, { x: -20, autoAlpha: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: it, start: "top 85%", once: true } }));
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} aria-labelledby="cc-title" className="wash-hero relative overflow-hidden md:h-svh">
      <div className="mx-auto flex h-full max-w-7xl flex-col px-5 pb-16 pt-24 sm:px-8 md:justify-center md:pb-8 md:pt-[96px]">
        <div data-head className="text-center">
          <Eyebrow center>{v.betterCare}</Eyebrow>
          <h2 id="cc-title" className="mt-4 font-heading text-[2.1rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl lg:text-[3.4rem]">
            <span className="line-mask"><span className="line-inner">{t1}</span></span>
            {t2 && <span className="line-mask"><span className="line-inner text-grad">{t2}</span></span>}
          </h2>
          <div role="group" aria-label={t1 + " " + t2} className="mx-auto mt-6 inline-flex rounded-full border border-line bg-white p-1 shadow-soft">
            {people.map((p, i) => (
              <button key={p.label} type="button" aria-pressed={active === i} onClick={() => setActive(i)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition-colors sm:px-5 ${active === i ? "bg-green text-white" : "text-slate hover:text-ink"}`}>{p.label}</button>
            ))}
          </div>
        </div>

        {/* Desktop diagram */}
        <div className="relative mx-auto mt-6 hidden aspect-[1000/560] w-full max-w-5xl md:block">
          <svg viewBox="0 0 1000 560" className="absolute inset-0 h-full w-full" aria-hidden fill="none">
            {LEFT.map((p, i) => <path key={"dl" + i} d={curve(p, C)} className="dotted-path" stroke="#cbbfdc" strokeWidth="2" />)}
            {RIGHT.map((p, i) => <path key={"dr" + i} d={curve(C, p)} className="dotted-path" stroke="#cbbfdc" strokeWidth="2" />)}
            <defs>
              <linearGradient id="cc-g" x1="0" x2="1"><stop offset="0" stopColor="#615c88" /><stop offset="1" stopColor="#b68bad" /></linearGradient>
            </defs>
            {LEFT.map((p, i) => <path key={"l" + i} data-draw="l" d={curve(p, C)} stroke="url(#cc-g)" strokeWidth={active === i ? 3.5 : 2} strokeLinecap="round" opacity={active === i ? 1 : 0.45} style={{ transition: "opacity .4s, stroke-width .4s" }} />)}
            {RIGHT.map((p, i) => <path key={"r" + i} data-draw="r" d={curve(C, p)} stroke="url(#cc-g)" strokeWidth="2.5" strokeLinecap="round" />)}
          </svg>
          {people.map((p, i) => (
            <div key={p.label} data-node="l" className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2" style={{ left: `${LEFT[i].x / 10}%`, top: `${(LEFT[i].y / 560) * 100}%` }}>
              <IconCircle icon={p.icon} tone={p.tone} size="lg" className={`transition-transform duration-500 ${active === i ? "scale-110 ring-p-lav" : ""}`} />
              <span className={`rounded-full bg-white px-3 py-1 text-sm font-bold shadow-soft ${active === i ? "text-ink" : "text-slate"}`}>{p.label}</span>
            </div>
          ))}
          <div data-node="c" className="absolute flex w-60 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[24px] border border-white bg-white/90 p-6 text-center shadow-lift backdrop-blur" style={{ left: "50%", top: "50%" }}>
            <span className="float grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-grad-from to-grad-to text-white shadow-soft">
              {(() => { const I = people[active].icon; return <I className="h-6 w-6" strokeWidth={1.6} aria-hidden />; })()}
            </span>
            <strong className="mt-3 font-heading text-lg font-extrabold text-ink">{v.connectedCare}</strong>
            <small className="mt-1 text-sm text-muted">{v.simplifiedJourney}</small>
          </div>
          {themes.map((t, i) => (
            <div key={t.label} data-node="r" className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2" style={{ left: `${RIGHT[i].x / 10}%`, top: `${(RIGHT[i].y / 560) * 100}%` }}>
              <IconCircle icon={t.icon} tone={t.tone} size="lg" className={i === 0 ? "float" : i === 1 ? "float-2" : "float-3"} />
              <span className="rounded-full bg-white px-3 py-1 text-sm font-bold text-ink shadow-soft">{t.label}</span>
            </div>
          ))}
        </div>

        {/* Mobile: vertical journey */}
        <div data-mlist className="relative mt-10 md:hidden">
          <span data-mline aria-hidden className="absolute bottom-6 left-[27px] top-6 w-0.5 origin-top bg-gradient-to-b from-grad-from to-grad-to" />
          <ul className="relative space-y-5">
            {[...people.map((p, i) => ({ ...p, hl: active === i })), { label: v.connectedCare, icon: people[active].icon, tone: "lav" as Tone, hl: true, sub: v.simplifiedJourney }, ...themes.map((t) => ({ ...t, hl: false }))].map((n, i) => (
              <li key={i} data-mitem className="flex items-center gap-4">
                <IconCircle icon={n.icon} tone={n.tone} />
                <span className={`rounded-2xl bg-white px-4 py-2.5 shadow-soft ${n.hl ? "ring-1 ring-mauve/40" : ""}`}>
                  <strong className="block text-[15px] font-bold text-ink">{n.label}</strong>
                  {"sub" in n && n.sub ? <small className="text-xs text-muted">{n.sub}</small> : null}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
