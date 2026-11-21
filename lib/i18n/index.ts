import en, { type Dict } from "./en";
import te from "./te";

export type Lang = "en" | "te";
export const langs: Lang[] = ["en", "te"];
export type { Dict };

export function getDict(lang: Lang): Dict {
  return lang === "te" ? te : en;
}

/** Route path (without language prefix) for each page — identical to the current susali.in URLs. */
export const routes = {
  home: "/",
  about: "/about",
  services: "/services",
  network: "/healthcare-network",
  faqs: "/faqs",
  contact: "/contact",
  privacy: "/privacy",
  terms: "/terms",
  deletion: "/account-deletion",
} as const;
export type RouteKey = keyof typeof routes;

/** Prefixes a path with /te for Telugu. */
export function href(lang: Lang, path: string): string {
  if (lang === "en") return path;
  const [p, hash] = path.split("#");
  const base = p === "/" ? "/te" : `/te${p}`;
  return hash !== undefined ? `${base}#${hash}` : base;
}

/** Same page in the other language. */
export function switchHref(pathname: string, to: Lang): string {
  const clean = pathname.replace(/\/$/, "") || "/";
  const stripped = clean === "/te" ? "/" : clean.startsWith("/te/") ? clean.slice(3) : clean;
  return href(to, stripped);
}
