"use client";
import ScrollSequence from "@/components/ui/ScrollSequence";
import { Eyebrow } from "@/components/ui/primitives";
import { getDict, type Lang } from "@/lib/i18n";
import { FileText, FileHeart } from "lucide-react";
import FloatLayer from "@/components/float/FloatLayer";
import FloatingCard from "@/components/float/FloatingCard";
import FloatingIconTile from "@/components/float/FloatingIconTile";
import SphereField from "@/components/float/SphereField";
import { RecordsCard } from "@/components/float/HeroCards";

const recordsTimeline = (tl: gsap.core.Timeline, root: HTMLElement) => {
  const panel = root.querySelector("[data-panel]");
  tl.fromTo(panel, { autoAlpha: 0, y: 40, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.14, ease: "power2.out" }, 0.04);
  tl.fromTo(root.querySelectorAll("[data-panel] .line-inner"), { yPercent: 115 }, { yPercent: 0, duration: 0.12, stagger: 0.05, ease: "power3.out" }, 0.08);
  tl.fromTo(root.querySelectorAll("[data-word]"), { opacity: 0.12 }, { opacity: 1, duration: 0.02, stagger: 0.45 / Math.max(1, root.querySelectorAll("[data-word]").length) }, 0.22);
  tl.to(panel, { autoAlpha: 0, y: -30, duration: 0.1 }, 0.9);
};

export default function Records({ lang }: { lang: Lang }) {
  const d = getDict(lang), v = d.heroVisual;
  const words = d.home.profileDesc.split(" ");
  return (
    <ScrollSequence name="records" length={2} timeline={recordsTimeline} aria-label={v.recordsTitle}>
      <SphereField preset="b" />
      {/* decorative floating card + document tiles over the frames (right side, behind nothing important) */}
      <FloatLayer aria-hidden className="pointer-events-none absolute inset-0 z-[5] hidden md:block">
        <FloatingCard className="right-[6%] top-[20%]" dur={6.5}><RecordsCard v={v} /></FloatingCard>
        <FloatingIconTile icon={FileText} tone="blue" size={78} className="right-[24%] top-[58%]" dur={5.5} delay={0.6} />
        <FloatingIconTile icon={FileHeart} tone="pink" size={66} className="right-[9%] bottom-[14%]" dur={7} delay={1.1} />
      </FloatLayer>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl items-end px-5 pb-10 pt-[96px] sm:px-8 md:items-center md:pb-0">
        <div data-panel className="max-w-xl rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-lift backdrop-blur-md sm:p-9">
          <Eyebrow>{v.digitalProfile}</Eyebrow>
          <h2 className="mt-4 font-heading text-[2rem] font-extrabold leading-[1.05] tracking-[-0.035em] text-ink sm:text-5xl">
            <span className="line-mask"><span className="line-inner">{v.recordsTitle}</span></span>
            <span className="line-mask"><span className="line-inner text-grad">{v.recordsSub}</span></span>
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-slate sm:text-lg">
            {words.map((w, i) => <span key={i} data-word className="inline">{w}{i < words.length - 1 ? " " : ""}</span>)}
          </p>
        </div>
      </div>
    </ScrollSequence>
  );
}
