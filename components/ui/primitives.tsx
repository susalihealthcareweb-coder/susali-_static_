import Link from "next/link";
import type { ReactNode, ComponentType, SVGProps } from "react";
import { ArrowRight } from "lucide-react";
import Magnetic from "./Magnetic";

export function Eyebrow({ children, className = "", center = false }: { children: ReactNode; className?: string; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.24em] text-mauve sm:text-xs ${center ? "justify-center" : ""} ${className}`}>
      <span aria-hidden className="h-px w-8 bg-gradient-to-r from-grad-from to-grad-to" />
      {children}
    </p>
  );
}

/** Two-line headline: line 1 ink, line 2 mauve gradient. Each line masked for slide-up reveal. */
export function SplitHeading({
  l1, l2, as: Tag = "h2", size = "lg", className = "", center = false, id,
}: { id?: string; l1: ReactNode; l2?: ReactNode; as?: "h1" | "h2" | "h3"; size?: "xl" | "lg" | "md"; className?: string; center?: boolean }) {
  const sz = {
    xl: "text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[5.2rem]",
    lg: "text-[2.1rem] leading-[1.06] sm:text-5xl lg:text-[3.6rem]",
    md: "text-2xl leading-[1.12] sm:text-3xl lg:text-4xl",
  }[size];
  return (
    <Tag id={id} className={`font-heading font-extrabold tracking-[-0.035em] text-ink ${sz} ${center ? "text-center" : ""} ${className}`}>
      <span className="line-mask"><span className="line-inner">{l1}</span></span>
      {l2 ? <span className="line-mask"><span className="line-inner text-grad">{l2}</span></span> : null}
    </Tag>
  );
}

type BtnProps = { href: string; children: ReactNode; className?: string; external?: boolean; magnetic?: boolean };

/** Dark green button with gold square arrow box (matches the current "Let's connect"). */
export function PrimaryButton({ href, children, className = "", external, magnetic = true }: BtnProps) {
  const cls = `group inline-flex items-center gap-3 rounded-xl bg-green py-2 pl-5 pr-2 text-[15px] font-bold text-white shadow-[0_12px_28px_-10px_rgb(30_74_58/0.55)] transition-colors hover:bg-green-2 ${className}`;
  const inner = (
    <>
      <span>{children}</span>
      <span aria-hidden className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-green transition-transform duration-300 group-hover:translate-x-0.5">
        <ArrowRight className="h-4 w-4" strokeWidth={2.4} />
      </span>
    </>
  );
  const el = external ? <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{inner}</a> : <Link href={href} className={cls}>{inner}</Link>;
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function SecondaryButton({ href, children, className = "", external, magnetic = true }: BtnProps) {
  const cls = `inline-flex items-center gap-2 rounded-xl border border-ink/15 bg-white px-5 py-3 text-[15px] font-bold text-ink transition-[translate,box-shadow,border-color,background-color,rotate] hover:border-mauve/50 hover:shadow-soft ${className}`;
  const el = external ? <a href={href} className={cls} target="_blank" rel="noopener noreferrer">{children}</a> : <Link href={href} className={cls}>{children}</Link>;
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export type Tone = "lav" | "mint" | "peach" | "pink";
const toneCls: Record<Tone, string> = {
  lav: "bg-p-lav text-[#6b4f8c]",
  mint: "bg-p-mint text-[#2e6b55]",
  peach: "bg-p-peach text-[#a0582a]",
  pink: "bg-p-pink text-[#a8405e]",
};
export const tones: Tone[] = ["lav", "mint", "peach", "pink"];

export function IconCircle({ icon: Icon, tone = "lav", size = "md", className = "" }: { icon: ComponentType<SVGProps<SVGSVGElement> & { strokeWidth?: number }>; tone?: Tone; size?: "sm" | "md" | "lg"; className?: string }) {
  const s = { sm: "h-11 w-11 [&>svg]:h-5 [&>svg]:w-5", md: "h-14 w-14 [&>svg]:h-6 [&>svg]:w-6", lg: "h-20 w-20 [&>svg]:h-8 [&>svg]:w-8" }[size];
  return (
    <span className={`grid shrink-0 place-items-center rounded-full ring-4 ring-white shadow-soft ${toneCls[tone]} ${s} ${className}`}>
      <Icon strokeWidth={1.6} aria-hidden />
    </span>
  );
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function Chip({ children }: { children: ReactNode }) {
  return <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-2 text-xs font-bold text-ink shadow-soft backdrop-blur"><span className="h-1.5 w-1.5 rounded-full bg-mauve-2" />{children}</span>;
}
