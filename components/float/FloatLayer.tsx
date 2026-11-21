"use client";
import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Mouse parallax on [data-depth] children (desktop, fine pointer only) */
  parallax?: boolean;
  /** Max parallax travel in px at depth 1 */
  strength?: number;
  /** Pop [data-pop] children in when the layer scrolls into view (off for the hero, which runs its own entrance) */
  popOnView?: boolean;
  as?: "div" | "section";
  "aria-hidden"?: boolean;
};

/**
 * Handles the floating style for everything inside it:
 *  - idle float on [data-float] (GSAP, sine.inOut yoyo, per-element amp/dur/delay/rot)
 *  - mouse parallax on [data-depth] (gsap.quickTo)
 *  - pauses all of it while the layer is off screen (IntersectionObserver)
 *  - prefers-reduced-motion: everything static
 */
export default function FloatLayer({ children, className = "", style, parallax = true, strength = 26, popOnView = true, as = "div", ...rest }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {}, root);
    const floats: gsap.core.Tween[] = [];
    const isMobile = window.innerWidth < 768;

    ctx.add(() => {
      root.querySelectorAll<HTMLElement>("[data-float]").forEach((el, i) => {
        const amp = Number(el.dataset.amp || 12) * (isMobile ? 0.6 : 1);
        const rot = Number(el.dataset.rot || 1.5);
        const dir = i % 2 ? -1 : 1;
        gsap.set(el, { y: amp / 2, rotation: -rot * dir * 0.5 });
        floats.push(gsap.to(el, {
          y: -amp / 2, rotation: rot * dir * 0.5, duration: Number(el.dataset.dur || 6), delay: Number(el.dataset.delay || 0),
          ease: "sine.inOut", yoyo: true, repeat: -1, paused: true,
        }));
      });
      if (popOnView) {
        const pops = root.querySelectorAll("[data-pop]");
        if (pops.length) gsap.from(pops, { scale: 0.8, autoAlpha: 0, duration: 0.8, ease: "back.out(1.7)", stagger: 0.12, scrollTrigger: { trigger: root, start: "top 80%", once: true } });
      }
    });

    // pause idle floats off screen
    let visible = false;
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      floats.forEach((t) => (visible ? t.play() : t.pause()));
    }, { rootMargin: "100px 0px" });
    io.observe(root);

    // mouse parallax (desktop only)
    let onMove: ((e: PointerEvent) => void) | undefined;
    if (parallax && !isMobile && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      const items = [...root.querySelectorAll<HTMLElement>("[data-depth]")].filter((el) => Number(el.dataset.depth) > 0).map((el) => ({
        d: Number(el.dataset.depth),
        x: gsap.quickTo(el, "x", { duration: 1.1, ease: "power3" }),
        y: gsap.quickTo(el, "y", { duration: 1.1, ease: "power3" }),
      }));
      onMove = (e) => {
        if (!visible) return;
        const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
        items.forEach((it) => { it.x(nx * strength * it.d * 2); it.y(ny * strength * it.d * 2); });
      };
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    return () => {
      io.disconnect();
      if (onMove) window.removeEventListener("pointermove", onMove);
      floats.forEach((t) => t.kill());
      ctx.revert();
    };
  }, [parallax, strength, popOnView]);

  const Tag = as;
  return <Tag ref={ref as React.RefObject<HTMLDivElement>} className={className} style={style} {...rest}>{children}</Tag>;
}
