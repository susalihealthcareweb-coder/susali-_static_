import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { href, routes } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const abs = (p: string) => `${site.url}${p === "/" ? "" : p}`;
  return Object.entries(routes).flatMap(([key, path]) =>
    (["en", "te"] as const).map((lang) => ({
      url: abs(href(lang, path)),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: key === "home" ? (lang === "en" ? 1 : 0.9) : ["privacy", "terms", "deletion"].includes(key) ? 0.3 : 0.7,
      alternates: { languages: { en: abs(href("en", path)), te: abs(href("te", path)) } },
    })),
  );
}
