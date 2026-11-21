"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { loaderStore } from "@/lib/loader-store";
import { lockScroll, unlockScroll } from "@/lib/scroll-lock";

/** White intro screen with logo, mauve % counter and thin progress line — waits for the first 30 hero frames. */
export default function Loader({ label }: { label: string }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const shown = useRef({ v: 0 });

  useEffect(() => {
    lockScroll();
    let locked = true;
    const release = () => { if (locked) { locked = false; unlockScroll(); } };
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      gsap.to(shown.current, {
        v: 100, duration: 0.35, onUpdate: () => setPct(Math.round(shown.current.v)),
        onComplete: () => {
          gsap.to(root.current, {
            autoAlpha: 0, duration: 0.7, ease: "power2.inOut", delay: 0.1,
            onComplete: () => { release(); setGone(true); window.dispatchEvent(new Event("susali:loaded")); },
          });
        },
      });
    };
    const unsub = loaderStore.subscribe((s) => {
      if (finished) return;
      const target = Math.min(99, (s.loaded / Math.max(1, s.target)) * 100);
      gsap.to(shown.current, { v: target, duration: 0.4, overwrite: true, onUpdate: () => setPct(Math.round(shown.current.v)) });
      if (s.done || s.loaded >= s.target) finish();
    });
    const st = loaderStore.get();
    if (st.done || st.loaded >= st.target) finish();
    const safety = setTimeout(finish, 4000); // never block the page on a slow network
    return () => { unsub(); clearTimeout(safety); release(); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} role="status" aria-live="polite" aria-label={label} className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-white">
      <Image src="/brand/susali-logo.webp" alt="SUSALI Health Care Services Pvt Ltd" width={566} height={270} priority className="h-auto w-44 sm:w-56" />
      <div className="mt-8 font-heading text-sm font-bold tabular-nums tracking-[0.3em] text-mauve">{String(pct).padStart(2, "0")}%</div>
      <div className="mt-3 h-px w-48 overflow-hidden bg-line">
        <div className="h-full origin-left bg-gradient-to-r from-grad-from to-grad-to" style={{ transform: `scaleX(${pct / 100})` }} />
      </div>
    </div>
  );
}
