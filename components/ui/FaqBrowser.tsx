"use client";
import { useState } from "react";
import Accordion, { type QA } from "./Accordion";

/** Category filter + accordion (categories and labels from the live site). */
export default function FaqBrowser({ items, categories }: { items: QA[]; categories: Record<string, string> }) {
  const keys = Object.keys(categories);
  const [cat, setCat] = useState("all");
  const shown = cat === "all" ? items : items.filter((i) => i.category === cat);
  return (
    <div>
      <div role="group" className="mb-6 flex flex-wrap gap-2">
        {keys.map((k) => (
          <button key={k} type="button" aria-pressed={cat === k} onClick={() => setCat(k)}
            className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${cat === k ? "border-green bg-green text-white" : "border-line bg-white text-slate hover:text-ink"}`}>
            {categories[k]}
          </button>
        ))}
      </div>
      <Accordion key={cat} items={shown} />
    </div>
  );
}
