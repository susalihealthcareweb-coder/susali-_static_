import HomePage from "@/components/pages/HomePage";
import { pageMetadata } from "@/lib/seo";

const L = "te" as const;
export const metadata = pageMetadata(L, "home");

export default function Page() {
  return <HomePage lang={L} />;
}
