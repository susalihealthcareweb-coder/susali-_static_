import ContactPage from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/seo";

const L = "te" as const;
export const metadata = pageMetadata(L, "contact");

export default function Page() {
  return <ContactPage lang={L} />;
}
