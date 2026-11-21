"use client";
import { useLayoutEffect, useRef, type ElementType, type ReactNode, type ComponentPropsWithoutRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props<T extends ElementType> = { as?: T; children: ReactNode } & Omit<ComponentPropsWithoutRef<T>, "as" | "children">;

/**
 * Scroll-triggered reveals for server-rendered content inside it:
 *  .line-inner        masked line slide-up (grouped per heading)
 *  [data-fade]        fade + rise
 *  [data-stagger]     children fade + rise in sequence
 *  [data-scale]       soft scale-in
 *  [data-parallax=N]  gentle parallax (N = % of own height, e.g. 12)
 *  [data-count]       number counter (text content is the final value)
 */
export default function Reveal<T extends ElementType = "section">({ as, children, ...rest }: Props<T>) {
  const Tag = (as ?? "section") as ElementType;
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const st = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });
      const heads = new Set<Element>();
      root.querySelectorAll(".line-inner").forEach((l) => heads.add(l.closest("h1,h2,h3,p,div")!));
      heads.forEach((hd) => {
        if (hd.closest("[data-no-reveal]")) return;
        gsap.from(hd.querySelectorAll(".line-inner"), { yPercent: 115, rotate: 1.5, duration: 1.1, ease: "power4.out", stagger: 0.12, scrollTrigger: st(hd) });
      });
      root.querySelectorAll("[data-fade]").forEach((el) => {
        const delay = Number((el as HTMLElement).dataset.fade) || 0;
        // already on screen at load: slide only, never hide (keeps LCP fast)
        if (el.getBoundingClientRect().top < window.innerHeight) gsap.from(el, { y: 22, duration: 1, ease: "power3.out", delay });
        else gsap.from(el, { y: 28, autoAlpha: 0, duration: 1, ease: "power3.out", delay, scrollTrigger: st(el) });
      });
      root.querySelectorAll("[data-stagger]").forEach((el) =>
        gsap.from(el.children, { y: 44, autoAlpha: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, scrollTrigger: st(el, "top 88%") }));
      root.querySelectorAll("[data-scale]").forEach((el) =>
        gsap.from(el, { scale: 0.92, autoAlpha: 0, duration: 1.2, ease: "power3.out", scrollTrigger: st(el) }));
      root.querySelectorAll<HTMLElement>("[data-parallax]").forEach((el) =>
        gsap.fromTo(el, { yPercent: -Number(el.dataset.parallax || 10) / 2 }, { yPercent: Number(el.dataset.parallax || 10) / 2, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } }));
      root.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
        const end = parseInt(el.textContent || "0", 10), pad = (el.textContent || "").length, o = { v: 0 };
        gsap.to(o, { v: end, duration: 1.4, ease: "power2.out", scrollTrigger: st(el), onUpdate: () => { el.textContent = String(Math.round(o.v)).padStart(pad, "0"); } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return <Tag ref={ref} {...rest}>{children}</Tag>;
}
