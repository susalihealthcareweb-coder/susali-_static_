import type { ComponentType, SVGProps } from "react";
import Floater, { type FloatOpts } from "./Floater";

export type TileTone = "blue" | "purple" | "pink" | "mint";
type Icon = ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>;

/** Frosted rounded-square tile with a pastel-gradient line icon (gradients defined in <IconGradients/>). */
export default function FloatingIconTile({ icon: I, tone = "purple", size = 88, faded, ...opts }: { icon: Icon; tone?: TileTone; size?: number; faded?: boolean } & Omit<FloatOpts, "children">) {
  return (
    <Floater depth={0.7} {...opts}>
      <span className={`glass grid place-items-center rounded-[24px] ${faded ? "opacity-45" : ""}`} style={{ width: size, height: size }}>
        <I strokeWidth={1.7} className="h-[42%] w-[42%]" style={{ stroke: `url(#ig-${tone})` }} aria-hidden />
      </span>
    </Floater>
  );
}

/** Hidden SVG defs with the gradient strokes used by tiles. Render once per page. */
export function IconGradients() {
  const g: [string, string, string][] = [["blue", "#4f8df5", "#7cc8ff"], ["purple", "#6e56a8", "#c09ce0"], ["pink", "#e0668e", "#f7a6c1"], ["mint", "#1f9e7e", "#6fd6b5"]];
  return (
    <svg width="0" height="0" aria-hidden className="absolute">
      <defs>
        {g.map(([id, a, b]) => (
          <linearGradient key={id} id={`ig-${id}`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient>
        ))}
      </defs>
    </svg>
  );
}
