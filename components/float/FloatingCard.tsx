import type { ReactNode } from "react";
import Floater, { type FloatOpts } from "./Floater";

/** Glassmorphism card (white 76%, blur 16px, 1px white border, 22px radius, lavender shadow) that floats. */
export default function FloatingCard({ children, cardClassName = "", ...opts }: { children: ReactNode; cardClassName?: string } & Omit<FloatOpts, "children">) {
  return (
    <Floater depth={0.45} amp={10} rot={1} {...opts}>
      <div className={`glass glass-hover rounded-[22px] ${cardClassName}`}>{children}</div>
    </Floater>
  );
}
