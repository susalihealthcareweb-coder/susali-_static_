import FaqsPage from "@/components/pages/FaqsPage";
import { pageMetadata } from "@/lib/seo";

const L = "te" as const;
export const metadata = pageMetadata(L, "faqs");

export default function Page() {
  return <FaqsPage lang={L} />;
}
