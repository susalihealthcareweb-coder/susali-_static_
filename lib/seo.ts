import type { Metadata } from "next";
import { site } from "./site";
import { getDict, href, type Lang, routes, type RouteKey } from "./i18n";

export function pageMetadata(lang: Lang, key: RouteKey, titleOverride?: string): Metadata {
  const d = getDict(lang);
  const navTitle: Partial<Record<RouteKey, string>> = {
    about: d.nav.about, services: d.nav.services, network: d.nav.network, faqs: d.nav.faqs,
    contact: d.nav.contact, privacy: d.footer.privacy, terms: d.footer.terms, deletion: d.added.legal.deletionTitle,
  };
  const t = titleOverride ?? navTitle[key];
  const title = t ? `${t} | ${site.name}` : site.title;
  const path = routes[key];
  return {
    metadataBase: new URL(site.url),
    title,
    description: site.description,
    keywords: [...site.keywords],
    applicationName: site.name,
    authors: [{ name: site.name }],
    creator: site.name,
    publisher: site.name,
    category: "healthcare",
    robots: { index: true, follow: true },
    alternates: {
      canonical: href(lang, path),
      languages: { "en-IN": href("en", path), "te-IN": href("te", path), "x-default": href("en", path) },
    },
    openGraph: {
      title, description: site.description, siteName: site.name, type: "website",
      locale: lang === "te" ? "te_IN" : "en_IN", url: href(lang, path),
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description: site.description, images: ["/og-image.png"] },
    icons: { icon: "/brand/icon-64.png", apple: "/brand/apple-icon.png" },
  };
}

export function jsonLd() {
  const c = site.contact;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${site.url}/#organization`,
        name: site.name,
        legalName: site.legalName,
        url: site.url,
        logo: `${site.url}/brand/susali-logo.png`,
        email: c.email,
        description: site.description,
      },
      {
        "@type": "MedicalBusiness",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        image: `${site.url}/og-image.png`,
        email: c.email,
        telephone: c.phone,
        parentOrganization: { "@id": `${site.url}/#organization` },
        address: {
          "@type": "PostalAddress",
          streetAddress: c.address.street,
          addressLocality: c.address.city,
          addressRegion: c.address.region,
          postalCode: c.address.postalCode,
          addressCountry: c.address.country,
        },
        areaServed: "IN",
        availableLanguage: ["English", "Telugu"],
        description: site.description,
      },
    ],
  };
}
