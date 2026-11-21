import NetworkPage from "@/components/pages/NetworkPage";
import { pageMetadata } from "@/lib/seo";

const L = "te" as const;
export const metadata = pageMetadata(L, "network");

export default function Page() {
  return <NetworkPage lang={L} />;
}
