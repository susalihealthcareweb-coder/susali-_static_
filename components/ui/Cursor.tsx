"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Small mauve dot with a soft trailing ring. Desktop / fine pointer only. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const d = dot.current, r = ring.current;
    gsap.set([d, r], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(d, "x", { duration: 0.08, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.08, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.45, ease: "power3" });
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) { gsap.to([d, r], { opacity: 1, duration: 0.3 }); shown = true; }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const hot = (e.target as HTMLElement).closest("a,button,[role=tab],summary,label");
      gsap.to(r, { scale: hot ? 1.8 : 1, backgroundColor: hot ? "rgba(143,115,160,0.10)" : "rgba(143,115,160,0)", duration: 0.3, overwrite: "auto" });
      gsap.to(d, { scale: hot ? 0.5 : 1, duration: 0.3, overwrite: "auto" });
    };
    const leave = () => { gsap.to([d, r], { opacity: 0, duration: 0.3 }); shown = false; };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div ref={ring} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-9 w-9 rounded-full border border-mauve-2/45 md:block" style={{ opacity: 0 }} />
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[101] hidden h-2 w-2 rounded-full bg-mauve-2 md:block" style={{ opacity: 0 }} />
    </>
  );
}
