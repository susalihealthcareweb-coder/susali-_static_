"use client";
// Locks page scrolling, including Lenis smooth scroll (which ignores overflow:hidden).
// Counted, so the loader and the mobile menu can't release each other's lock.
let locks = 0;
type LenisLike = { stop: () => void; start: () => void };
const lenis = () => (window as unknown as { __lenis?: LenisLike }).__lenis;

export function lockScroll() {
  locks++;
  document.documentElement.style.overflow = "hidden";
  lenis()?.stop();
}
export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks > 0) return;
  document.documentElement.style.overflow = "";
  lenis()?.start();
}
export const isScrollLocked = () => locks > 0;
