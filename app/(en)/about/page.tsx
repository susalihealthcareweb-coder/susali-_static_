import AboutPage from "@/components/pages/AboutPage";
import { pageMetadata } from "@/lib/seo";

const L = "en" as const;
export const metadata = pageMetadata(L, "about");

export default function Page() {
  return <AboutPage lang={L} />;
}
