import LegalPage from "@/components/pages/LegalPage";
import { pageMetadata } from "@/lib/seo";

const L = "en" as const;
export const metadata = pageMetadata(L, "terms");

export default function Page() {
  return <LegalPage lang={L} kind="terms" />;
}
