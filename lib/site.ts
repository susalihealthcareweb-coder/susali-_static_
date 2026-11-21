// ─────────────────────────────────────────────────────────────────────────────
// SUSALI — single source of truth for company details, contacts and links.
// Edit values here; every page, the footer, the JSON-LD and the sitemap use them.
// Values marked PLACEHOLDER are not yet published on the current susali.in.
// ─────────────────────────────────────────────────────────────────────────────

export const site = {
  name: "SUSALI Healthcare Services",
  legalName: "SUSALI HEALTH CARE SERVICES PVT LTD",
  shortName: "SUSALI",
  url: "https://www.susali.in", // canonical domain used for sitemap, OG and JSON-LD

  // SEO — copied from the current site's <head>
  title: "SUSALI Healthcare Services | Patient & Hospital Coordination",
  description:
    "Discover SUSALI Healthcare Services, connecting patients, doctors and hospitals through referral coordination, appointment assistance, digital health profiles, medical records and continued care.",
  keywords: [
    "SUSALI", "SUSALI Healthcare", "SUSALI Healthcare Services", "SUSALI Health Care Services",
    "patient healthcare coordination", "hospital appointment assistance", "patient doctor connection",
    "healthcare referrals", "digital health profiles", "digital medical records",
    "hospital coordination", "continued healthcare",
  ],

  contact: {
    email: "support@susalihealthcareservices.in",
    phone: "+91 00000 00000", // PLACEHOLDER — display format
    phoneHref: "+910000000000", // PLACEHOLDER — digits only, used for tel: links
    whatsapp: "910000000000", // PLACEHOLDER — country code + number, no "+" (wa.me format)
    address: {
      street: "[Street address]", // PLACEHOLDER
      city: "[CITY]", // PLACEHOLDER
      region: "Andhra Pradesh", // PLACEHOLDER — confirm state
      postalCode: "[PIN]", // PLACEHOLDER
      country: "IN",
    },
    // Google Maps embed URL (Google Maps → Share → Embed a map → copy the src="…")
    mapEmbed: "https://www.google.com/maps?q=India&output=embed", // PLACEHOLDER
  },

  // Contact form endpoint (https://formspree.io → New form → copy the endpoint)
  formEndpoint: "https://formspree.io/f/FORMSPREE_ENDPOINT", // PLACEHOLDER

  app: {
    url: "https://app.susali.in",
  },

  emergencyNumbers: ["108", "112"],
} as const;

export type Site = typeof site;
