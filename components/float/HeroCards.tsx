import { Stethoscope, ShieldCheck, Activity, UserRound, Building2, Check } from "lucide-react";
import type { Dict } from "@/lib/i18n";

type V = Dict["heroVisual"];
const tile = "grid shrink-0 place-items-center rounded-2xl";

/** "A better care journey — Patients & Doctors, Connected." with chip rows. Text from heroVisual (live site). */
export function CareJourneyCard({ v }: { v: V }) {
  const chips = [{ t: v.patients, I: UserRound }, { t: v.doctors, I: Stethoscope }, { t: v.hospitals, I: Building2 }];
  return (
    <div className="w-[300px] p-4 sm:w-[330px] sm:p-5">
      <div className="flex items-center gap-3">
        <span className={`${tile} h-11 w-11 bg-gradient-to-br from-p-pink to-[#f9cfdc] text-[#c2496f]`}><Stethoscope className="h-5 w-5" strokeWidth={1.8} /></span>
        <div className="min-w-0">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-mauve">{v.betterCare}</p>
          <p className="font-heading text-[15px] font-extrabold leading-tight text-ink sm:text-base">{v.patientsDoctors}</p>
        </div>
      </div>
      <div className="mt-3.5 flex flex-wrap gap-1.5">
        {chips.map(({ t, I }) => (
          <span key={t} className="inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-2.5 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-p-lav">
            <I className="h-3.5 w-3.5 text-mauve" strokeWidth={2} />{t}
          </span>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {[v.consultations, v.diagnostics, v.followups].map((t) => (
          <span key={t} className="rounded-full bg-lavender px-2.5 py-1 text-[11px] font-semibold text-slate transition-colors hover:bg-p-lav">{t}</span>
        ))}
      </div>
    </div>
  );
}

/** "Digital health profile — Your Records, Together." */
export function RecordsCard({ v }: { v: V }) {
  return (
    <div className="flex w-[270px] items-center gap-3 p-4 sm:w-[290px]">
      <span className={`${tile} h-11 w-11 bg-gradient-to-br from-p-mint to-[#c7ecdf] text-[#24806a]`}><ShieldCheck className="h-5 w-5" strokeWidth={1.8} /></span>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-mauve">{v.digitalProfile}</p>
        <p className="font-heading text-[15px] font-extrabold leading-tight text-ink">{v.recordsTitle}</p>
        <p className="text-xs text-muted">{v.recordsSub}</p>
      </div>
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#2bb38a] text-white shadow-[0_6px_14px_-4px_rgb(43_179_138/0.6)]"><Check className="h-4 w-4" strokeWidth={3} /></span>
    </div>
  );
}

/** "Connected Care — Simplified healthcare journey." with a looping ECG line. */
export function ConnectedCareCard({ v }: { v: V }) {
  return (
    <div className="w-[250px] p-4">
      <div className="flex items-center gap-3">
        <span className={`${tile} h-11 w-11 bg-gradient-to-br from-[#e3f0ff] to-[#cfe4ff] text-[#3d7be0]`}><Activity className="h-5 w-5" strokeWidth={1.8} /></span>
        <div>
          <p className="font-heading text-[15px] font-extrabold leading-tight text-ink">{v.connectedCare}</p>
          <p className="text-xs text-muted">{v.simplifiedJourney}</p>
        </div>
      </div>
      <svg viewBox="0 0 220 44" className="mt-3 h-10 w-full" fill="none" aria-hidden>
        <defs><linearGradient id="ecg-g" x1="0" x2="1"><stop offset="0" stopColor="#ef7aa1" /><stop offset="1" stopColor="#5b9cf5" /></linearGradient></defs>
        <path d="M0 26 H52 L60 26 L67 12 L75 38 L84 4 L93 32 L100 26 H134 L141 18 L148 30 L154 26 H220" stroke="#eef0f7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path className="ecg-line" pathLength={100} d="M0 26 H52 L60 26 L67 12 L75 38 L84 4 L93 32 L100 26 H134 L141 18 L148 30 L154 26 H220" stroke="url(#ecg-g)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
