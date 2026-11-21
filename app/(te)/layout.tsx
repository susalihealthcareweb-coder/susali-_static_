import type { ReactNode } from "react";
import SiteShell from "@/components/layout/SiteShell";

// Root layout for Telugu (/te) pages
export default function Layout({ children }: { children: ReactNode }) {
  return <SiteShell lang="te">{children}</SiteShell>;
}
