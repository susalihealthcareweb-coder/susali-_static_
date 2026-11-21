import type { CSSProperties, ReactNode } from "react";

export type FloatOpts = {
  /** Positioning classes for the outer wrapper (e.g. "left-[4%] top-[10%]") */
  className?: string;
  /** "absolute" (default) or "relative" for in-flow items */
  place?: "absolute" | "relative";
  /** Mouse-parallax depth: 0 = none, 0.2 photo, 0.5 cards, 1 spheres */
  depth?: number;
  /** Idle float amplitude in px (8–16) */
  amp?: number;
  /** Idle float duration in seconds (4–8) */
  dur?: number;
  delay?: number;
  /** Max rotation in degrees (±) */
  rot?: number;
  /** Hero scroll-exit vector "x,y" in px (e.g. "-160,-40") */
  exit?: string;
  /** Pops in with the entrance stagger */
  pop?: boolean;
  /** Hide below 768px */
  hideMobile?: boolean;
  decorative?: boolean;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Three nested layers so animations never fight over the same transform:
 *  outer  [data-exit]   — position + scroll exit
 *  middle [data-depth]  — mouse parallax
 *  inner  [data-float]  — idle float (y, rotation) + entrance (scale, opacity)
 * Driven by <FloatLayer>.
 */
export default function Floater({
  className = "", place = "absolute", depth = 0.5, amp = 12, dur = 6, delay = 0, rot = 1.5,
  exit, pop = true, hideMobile, decorative = true, style, children,
}: FloatOpts) {
  return (
    <div className={`${place} ${hideMobile ? "hidden md:block" : ""} ${className}`} data-exit={exit} aria-hidden={decorative || undefined} style={style}>
      <div data-depth={depth}>
        <div data-float="" data-amp={amp} data-dur={dur} data-delay={delay} data-rot={rot} data-pop={pop ? "" : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
