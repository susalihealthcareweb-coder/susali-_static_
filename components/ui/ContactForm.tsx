"use client";
import { useState, type FormEvent } from "react";
import { site } from "@/lib/site";
import type { Dict } from "@/lib/i18n";

type C = Dict["contact"]; type F = Dict["form"];

/** General enquiry form (same fields as the live site). Posts to Formspree — set site.formEndpoint. */
export default function ContactForm({ c, f }: { c: C; f: F }) {
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const field = "mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 text-ink shadow-[inset_0_1px_2px_rgb(0_0_0/0.03)] outline-none transition focus:border-mauve focus:ring-4 focus:ring-p-lav";
  const label = "text-sm font-bold text-ink";

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (data.get("website")) return; // honeypot
    setStatus("sending");
    try {
      const res = await fetch(site.formEndpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("ok"); form.reset();
    } catch { setStatus("err"); }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2" noValidate={false}>
      <div><label htmlFor="cf-name" className={label}>{c.labels.name} <span className="text-mauve">*</span></label>
        <input id="cf-name" name="name" required autoComplete="name" className={field} /></div>
      <div><label htmlFor="cf-email" className={label}>{c.labels.email} <span className="text-mauve">*</span></label>
        <input id="cf-email" name="email" type="email" required autoComplete="email" className={field} /></div>
      <div><label htmlFor="cf-phone" className={label}>{c.labels.phone}</label>
        <input id="cf-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" className={field} /></div>
      <div><label htmlFor="cf-topic" className={label}>{c.labels.topic}</label>
        <select id="cf-topic" name="topic" className={field} defaultValue={c.topics[0]}>
          {c.topics.map((t) => <option key={t}>{t}</option>)}
        </select></div>
      <div className="sm:col-span-2"><label htmlFor="cf-msg" className={label}>{c.labels.message} <span className="text-mauve">*</span></label>
        <textarea id="cf-msg" name="message" required rows={5} className={field} /></div>
      <div aria-hidden className="absolute -left-[9999px]"><label htmlFor="cf-web">Website</label><input id="cf-web" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div className="flex flex-col gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "sending"} className="group inline-flex w-fit items-center gap-3 rounded-xl bg-green py-2 pl-5 pr-2 font-bold text-white transition-colors hover:bg-green-2 disabled:opacity-70">
          {status === "sending" ? f.sending : f.submit}
          <span aria-hidden className="grid h-9 w-9 place-items-center rounded-lg bg-gold text-green">→</span>
        </button>
        <p role="status" aria-live="polite" className={`text-sm font-semibold ${status === "ok" ? "text-green" : "text-[#a8405e]"}`}>
          {status === "ok" ? f.success : status === "err" ? f.error : ""}
        </p>
        <p className="rounded-xl bg-p-peach/60 px-4 py-3 text-sm leading-relaxed text-slate">{c.privacyDisclaimer}</p>
      </div>
    </form>
  );
}
