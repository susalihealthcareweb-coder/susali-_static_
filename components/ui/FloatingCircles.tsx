import { HeartPulse, Stethoscope, FileText, Building2, UsersRound, FlaskConical } from "lucide-react";
import { IconCircle } from "./primitives";

/** Decorative pastel icon circles joined by a dotted curve, softly floating. */
export default function FloatingCircles({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 500" preserveAspectRatio="none" fill="none">
        <path d="M-20,420 C180,300 260,460 420,380 S760,120 1020,220" stroke="#cbbfdc" strokeWidth="1.5" className="dotted-path" vectorEffect="non-scaling-stroke" />
        <path d="M-20,80 C200,180 360,20 560,90 S860,300 1020,140" stroke="#bfe0d3" strokeWidth="1.5" className="dotted-path" vectorEffect="non-scaling-stroke" />
      </svg>
      <IconCircle icon={HeartPulse} tone="pink" size="sm" className="float absolute left-[6%] top-[66%] hidden sm:grid" />
      <IconCircle icon={Stethoscope} tone="lav" size="md" className="float-2 absolute left-[12%] top-[14%] hidden sm:grid" />
      <IconCircle icon={FileText} tone="mint" size="sm" className="float-3 absolute left-[30%] top-[78%] hidden lg:grid" />
      <IconCircle icon={Building2} tone="peach" size="md" className="float absolute right-[9%] top-[16%] hidden sm:grid" />
      <IconCircle icon={UsersRound} tone="mint" size="sm" className="float-3 absolute right-[5%] top-[62%] hidden sm:grid" />
      <IconCircle icon={FlaskConical} tone="lav" size="sm" className="float-2 absolute right-[26%] top-[82%] hidden lg:grid" />
    </div>
  );
}
