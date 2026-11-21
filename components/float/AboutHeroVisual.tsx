"use client";
import { useEffect, useRef } from "react";
import { HeartPulse, Stethoscope, FileText, UsersRound, Building2, FlaskConical } from "lucide-react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import FloatLayer from "./FloatLayer";
import Floater from "./Floater";
import { IconCircle, type Tone } from "@/components/ui/primitives";

// Points on a 600 × 500 canvas, joined by a smooth dotted curve (matches the current About hero art).
const NODES: { x: number; y: number; icon: typeof HeartPulse; tone: Tone }[] = [
  { x: 70, y: 390, icon: HeartPulse, tone: "pink" },
  { x: 165, y: 250, icon: Stethoscope, tone: "lav" },
  { x: 295, y: 140, icon: FileText, tone: "lav" },
  { x: 435, y: 118, icon: UsersRound, tone: "mint" },
  { x: 535, y: 235, icon: Building2, tone: "peach" },
  { x: 540, y: 385, icon: FlaskConical, tone: "lav" },
];
const PATH = "M70,390 C 92,322 118,288 165,250 S 245,162 295,140 S 392,96 435,118 S 522,172 535,235 S 566,334 540,385";

/** Pastel icon circles floating along a dotted line that draws itself on load (desktop). */
export default function AboutHeroVisual() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const draw = el.querySelector<SVGPathElement>("[data-draw]")!;
      const L = draw.getTotalLength();
      gsap.set(draw, { strokeDasharray: L, strokeDashoffset: L });
      gsap.set("[data-node]", { scale: 0.6, autoAlpha: 0 });
      gsap.timeline({ delay: 0.3 })
        .to(draw, { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" })
        .to("[data-node]", { scale: 1, autoAlpha: 1, duration: 0.7, ease: "back.out(1.8)", stagger: 0.3 }, 0.15);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-y-0 right-0 z-[5] hidden w-[50%] items-center md:flex">
      <FloatLayer popOnView={false} className="relative mx-auto aspect-[6/5] w-full max-w-[640px]">
        <svg viewBox="0 0 600 500" className="absolute inset-0 h-full w-full" fill="none">
          <defs>
            <mask id="about-draw"><path data-draw d={PATH} stroke="#fff" strokeWidth="8" strokeLinecap="round" /></mask>
          </defs>
          <path d={PATH} stroke="#ffffff" strokeWidth="3" strokeOpacity="0.9" mask="url(#about-draw)" />
          <path d={PATH} stroke="#b9a6d6" strokeWidth="2" className="dotted-path" mask="url(#about-draw)" />
          {[[118, 318], [228, 186], [365, 116], [496, 168], [548, 312]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="#fff" stroke="#9fd6e8" strokeWidth="2.5" mask="url(#about-draw)" />
          ))}
        </svg>
        {NODES.map((n, i) => (
          <div key={i} data-node className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${(n.x / 600) * 100}%`, top: `${(n.y / 500) * 100}%` }}>
            <Floater place="relative" depth={0.3 + (i % 3) * 0.2} amp={12} dur={4.5 + i * 0.6} delay={i * 0.35} pop={false}>
              <IconCircle icon={n.icon} tone={n.tone} size="lg" className="ring-[6px] ring-white/80 shadow-lift" />
            </Floater>
          </div>
        ))}
      </FloatLayer>
    </div>
  );
}
