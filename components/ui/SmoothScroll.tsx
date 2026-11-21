"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { isScrollLocked } from "@/lib/scroll-lock";

/** Lenis smooth scrolling, synced with GSAP ScrollTrigger. Disabled for reduced-motion users. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    if (isScrollLocked()) lenis.stop();
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // In-page anchor links scroll smoothly
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest("a[href*='#']") as HTMLAnchorElement | null;
      if (!a || a.pathname !== location.pathname || !a.hash) return;
      const el = document.querySelector(a.hash);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80 });
      history.replaceState(null, "", a.hash);
    };
    document.addEventListener("click", onClick);

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) setTimeout(() => lenis.scrollTo(el as HTMLElement, { offset: -80, immediate: true }), 300);
    }
    return () => {
      gsap.ticker.remove(tick);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", onLoad);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);
  return null;
}
