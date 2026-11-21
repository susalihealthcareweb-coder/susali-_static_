import LegalPage from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/seo";

const L = "te" as const;
export const metadata = pageMetadata(L, "privacy");

export default function Page() {
  return <LegalPage lang={L} kind="privacy" />;
}
