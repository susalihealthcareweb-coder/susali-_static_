import ServicesPage from "@/components/pages/ServicesPage";
import { pageMetadata } from "@/lib/seo";

const L = "en" as const;
export const metadata = pageMetadata(L, "services");

export default function Page() {
  return <ServicesPage lang={L} />;
}
