"use client";
import { useId, useRef, useState } from "react";
import { Plus } from "lucide-react";
import { gsap } from "@/lib/gsap";

export type QA = { q: string; a: string; category?: string };

export default function Accordion({ items, defaultOpen = 0 }: { items: QA[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number>(defaultOpen);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-[22px] border border-line bg-white shadow-soft">
      {items.map((it, i) => <Item key={it.q} qa={it} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />)}
    </div>
  );
}

function Item({ qa, open, onToggle }: { qa: QA; open: boolean; onToggle: () => void }) {
  const id = useId();
  const panel = useRef<HTMLDivElement>(null);
  const toggle = () => {
    const el = panel.current;
    if (el && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (open) gsap.fromTo(el, { height: el.scrollHeight }, { height: 0, duration: 0.45, ease: "power3.inOut" });
      else gsap.fromTo(el, { height: 0 }, { height: "auto", duration: 0.55, ease: "power3.out" });
    }
    onToggle();
  };
  return (
    <div className={`transition-colors ${open ? "bg-lavender/70" : ""}`}>
      <h3>
        <button type="button" aria-expanded={open} aria-controls={id} onClick={toggle}
          className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-heading text-base font-bold text-ink sm:px-8 sm:text-lg">
          <span>{qa.q}</span>
          <span aria-hidden className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-[translate,box-shadow,border-color,background-color,rotate] duration-300 ${open ? "rotate-45 border-mauve bg-mauve text-white" : "border-line text-mauve"}`}>
            <Plus className="h-4 w-4" />
          </span>
        </button>
      </h3>
      <div id={id} ref={panel} role="region" inert={!open} className="overflow-hidden" style={{ height: open ? "auto" : 0 }}>
        <p className="max-w-3xl px-6 pb-6 leading-relaxed text-slate sm:px-8">{qa.a}</p>
      </div>
    </div>
  );
}
