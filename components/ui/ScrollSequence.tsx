"use client";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";
import { loaderStore } from "@/lib/loader-store";
import frames from "@/lib/frames.json";

type SeqName = keyof typeof frames;

type Props = {
  /** Folder name in /public/frames */
  name: SeqName;
  /** Extra scroll distance while pinned, in viewport heights (2 → section occupies ~300vh) */
  length?: number;
  /** Drives the page loader (first 30 frames) — use on the hero only */
  priority?: boolean;
  id?: string;
  className?: string;
  /** Overlay HTML (real text, never baked into frames) */
  children?: ReactNode;
  /** Add overlay tweens to the scrubbed timeline. Timeline runs 0 → 1 across the pinned scroll. */
  timeline?: (tl: gsap.core.Timeline, root: HTMLElement, info: { stacked: boolean }) => void;
  /** Timeline position (0–1) where the frames start scrubbing (lets an intro play first). Desktop only. */
  frameStart?: number;
  /** Below 768px: overlay content flows above the canvas and only the canvas is pinned. */
  mobileStack?: boolean;
  "aria-label"?: string;
};

const PRELOAD = 30;

/**
 * Full-screen canvas frame sequence scrubbed by scroll.
 * - Preloads frames (first 30 first), draws with cover-fit, resize + devicePixelRatio aware.
 * - Mobile (<768px) uses the lighter 960px / every-second-frame set in /frames/<name>/m/.
 * - prefers-reduced-motion: shows a static first frame, no pinning.
 */
export default function ScrollSequence({ name, length = 2, priority, id, className = "", children, timeline, frameStart = 0, mobileStack, ...rest }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current!, canvas = canvasRef.current!;
    const c2d = canvas.getContext("2d", { alpha: false })!;
    const reduce = prefersReducedMotion();
    const mobile = window.innerWidth < 768;
    const stacked = !!mobileStack && mobile;
    const fs = stacked ? 0 : frameStart;
    const meta = frames[name];
    const count = Math.max(1, mobile ? meta.mobile : meta.desktop);
    const base = `/frames/${name}/${mobile ? "m/" : ""}`;
    const url = (i: number) => `${base}${String(i + 1).padStart(4, "0")}.webp`;
    const imgs: (HTMLImageElement | null)[] = new Array(count).fill(null);
    let current = 0, w = 0, h = 0, alive = true;

    const render = (i: number) => {
      let k = i;
      while (k > 0 && !imgs[k]) k--; // nearest loaded frame at or before i
      const img = imgs[k] ?? imgs.find(Boolean);
      c2d.fillStyle = "#fff";
      c2d.fillRect(0, 0, w, h);
      if (!img) return;
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      c2d.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
      c2d.setTransform(dpr, 0, 0, dpr, 0, 0);
      c2d.imageSmoothingQuality = "high";
      render(current);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    const loadOne = (i: number) =>
      new Promise<void>((res) => {
        const im = new Image();
        im.decoding = "async";
        im.onload = () => {
          if (!alive) return res();
          imgs[i] = im;
          if (i === current || (i < current && !imgs[current])) render(current);
          res();
        };
        im.onerror = () => res();
        im.src = url(i);
      });

    let firstLoaded = 0;
    const loadAll = async () => {
      const first = reduce ? [0] : Array.from({ length: Math.min(PRELOAD, count) }, (_, i) => i);
      if (priority) loaderStore.set({ loaded: 0, target: first.length, done: false });
      // first frames with modest concurrency, reporting progress to the loader
      for (let i = 0; i < first.length; i += 6) {
        await Promise.all(first.slice(i, i + 6).map((n) => loadOne(n).then(() => { if (priority) loaderStore.set({ loaded: ++firstLoaded }); })));
        if (!alive) return;
      }
      if (priority) loaderStore.set({ done: true });
      if (reduce) return;
      // remaining frames: every 4th first (coarse scrub quickly), then fill gaps
      const rest: number[] = [];
      for (let step of [4, 2, 1]) for (let i = first.length; i < count; i += step) if (!rest.includes(i)) rest.push(i);
      // wait for an idle moment so the remaining frames never compete with first paint / interaction
      await new Promise<void>((r) => ("requestIdleCallback" in window ? (window as Window & { requestIdleCallback: (cb: () => void, o?: { timeout: number }) => void }).requestIdleCallback(() => r(), { timeout: 2500 }) : setTimeout(r, 600)));
      for (let i = 0; i < rest.length && alive; i += 8) await Promise.all(rest.slice(i, i + 8).map(loadOne));
    };

    // Hero loads immediately; others start when within ~1.5 screens
    let io: IntersectionObserver | undefined;
    if (priority) loadAll();
    else {
      io = new IntersectionObserver((e) => { if (e[0].isIntersecting) { io?.disconnect(); loadAll(); } }, { rootMargin: "150% 0px" });
      io.observe(section);
    }

    const ctx = gsap.context(() => {
      if (reduce) return;
      const state = { frame: 0 };
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: stacked ? stageRef.current! : section, start: "top top", end: () => `+=${window.innerHeight * (stacked ? Math.min(length, 2) : length)}`,
          pin: true, scrub: 0.5, anticipatePin: 1, invalidateOnRefresh: true,
        },
      });
      tl.to(state, {
        frame: count - 1, duration: 1 - fs,
        onUpdate: () => { const f = Math.round(state.frame); if (f !== current) { current = f; render(f); } },
      }, fs);
      timeline?.(tl, section, { stacked });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("susali:loaded", refresh);
    return () => {
      alive = false;
      ro.disconnect(); io?.disconnect();
      window.removeEventListener("susali:loaded", refresh);
      ctx.revert();
    };
  }, [name, length, priority, timeline, frameStart, mobileStack]);

  return (
    <section ref={sectionRef} id={id}
      className={`relative w-full bg-white ${mobileStack ? "md:h-svh md:overflow-hidden" : "h-svh overflow-hidden"} ${className}`} {...rest}>
      {mobileStack ? (
        <>
          {/* mobile: content flows first, then the pinned canvas stage; desktop: stage sits behind content */}
          <div className="relative z-10 md:h-full">{children}</div>
          <div ref={stageRef} className="relative h-svh w-full overflow-hidden md:absolute md:inset-0 md:z-0 md:h-auto">
            <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
            <div aria-hidden className="seq-fade pointer-events-none absolute inset-0" />
          </div>
        </>
      ) : (
        <>
          <div ref={stageRef} className="absolute inset-0">
            <canvas ref={canvasRef} aria-hidden className="absolute inset-0 h-full w-full" />
            <div aria-hidden className="seq-fade pointer-events-none absolute inset-0" />
          </div>
          <div className="relative z-10 h-full">{children}</div>
        </>
      )}
    </section>
  );
}
