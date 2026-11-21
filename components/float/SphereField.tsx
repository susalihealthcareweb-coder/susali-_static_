import FloatLayer from "./FloatLayer";
import GlassSphere from "./GlassSphere";

/** Background layer of 2–4 floating spheres / glass bubbles, always behind content (z-0). */
const presets = {
  a: [
    { kind: "lav", size: 110, className: "right-[4%] top-[8%]", dur: 7 },
    { kind: "glass", size: 70, className: "left-[3%] bottom-[14%]", dur: 5.5, delay: 1 },
    { kind: "pink", size: 34, className: "right-[18%] bottom-[10%] hidden md:block", dur: 4.5, delay: 0.5 },
  ],
  b: [
    { kind: "glass", size: 90, className: "left-[2%] top-[12%]", dur: 6.5 },
    { kind: "lav", size: 46, className: "right-[6%] top-[30%]", dur: 5, delay: 0.8 },
    { kind: "teal", size: 38, className: "right-[30%] bottom-[6%] hidden md:block", dur: 6, delay: 1.6 },
    { kind: "glass", size: 54, className: "left-[40%] bottom-[18%] hidden lg:block", dur: 7.5, delay: 0.3 },
  ],
  c: [
    { kind: "pink", size: 54, className: "left-[5%] top-[18%]", dur: 5.5 },
    { kind: "glass", size: 120, className: "right-[-2%] bottom-[8%]", dur: 8, delay: 0.6 },
    { kind: "lav", size: 30, className: "right-[22%] top-[12%] hidden md:block", dur: 4.5, delay: 1.2 },
  ],
} as const;

export default function SphereField({ preset = "a", className = "" }: { preset?: keyof typeof presets; className?: string }) {
  return (
    <FloatLayer aria-hidden className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}>
      {presets[preset].map((s, i) => (
        <GlassSphere key={i} kind={s.kind} size={s.size} className={s.className} dur={s.dur} delay={"delay" in s ? s.delay : 0} amp={14} />
      ))}
    </FloatLayer>
  );
}
