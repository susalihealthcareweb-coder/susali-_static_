import LegalPage from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/seo";

const L = "en" as const;
export const metadata = pageMetadata(L, "deletion");

export default function Page() {
  return <LegalPage lang={L} kind="deletion" />;
}
