import { getDict, type Lang } from "@/lib/i18n";

/** Last sentence of the live footer disclaimer ("This promotional website does not provide emergency assistance.") + emergency numbers. */
export function emergencySentence(lang: Lang) {
  const parts = getDict(lang).footer.disclaimer.split(/(?<=\.)\s+/);
  return parts[parts.length - 1];
}

export default function NoticeBar({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <div role="note" className="relative z-40 mt-[72px] bg-p-pink px-5 py-2 text-center text-[12.5px] font-semibold leading-snug text-ink sm:text-[13px]">
      {emergencySentence(lang)} <strong className="font-extrabold">{d.added.emergencyCall}</strong>
    </div>
  );
}
