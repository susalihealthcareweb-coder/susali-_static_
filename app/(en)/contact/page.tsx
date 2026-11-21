import ContactPage from "@/components/pages/ContactPage";
import { pageMetadata } from "@/lib/seo";

const L = "en" as const;
export const metadata = pageMetadata(L, "contact");

export default function Page() {
  return <ContactPage lang={L} />;
}
