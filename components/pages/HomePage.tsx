import Loader from "@/components/ui/Loader";
import Hero from "@/components/home/Hero";
import Records from "@/components/home/Records";
import ConnectedCare from "@/components/home/ConnectedCare";
import Welcome from "@/components/home/Welcome";
import ServicesGrid from "@/components/home/ServicesGrid";
import Journey from "@/components/home/Journey";
import Network from "@/components/home/Network";
import FaqPreview from "@/components/home/FaqPreview";
import ClosingCta from "@/components/home/ClosingCta";
import { getDict, type Lang } from "@/lib/i18n";

export default function HomePage({ lang }: { lang: Lang }) {
  return (
    <>
      <Loader label={getDict(lang).added.loading} />
      <div className="-mt-[calc(72px+2.25rem)]">{/* hero sits under the fixed navbar + notice bar */}
        <Hero lang={lang} />
      </div>
      <Records lang={lang} />
      <ConnectedCare lang={lang} />
      <Welcome lang={lang} />
      <ServicesGrid lang={lang} />
      <Journey lang={lang} />
      <Network lang={lang} />
      <FaqPreview lang={lang} />
      <ClosingCta lang={lang} />
    </>
  );
}
