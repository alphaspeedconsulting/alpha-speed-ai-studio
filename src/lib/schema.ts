/**
 * Typed schema.org JSON-LD builders for Alpha Speed AI.
 * Uses schema-dts for compile-time type safety.
 *
 * Usage: inject the returned object via <Helmet> as a JSON-LD <script> tag.
 */
import type {
  LocalBusiness,
  WebSite,
  Service,
  BreadcrumbList,
  WithContext,
} from "schema-dts";

const BASE_URL = "https://alphaspeedai.com";
const CONTACT_EMAIL = "alpha.speed.consulting@gmail.com";

// ── LocalBusiness ─────────────────────────────────────────────────────────────

export function buildLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alpha Speed AI",
    description:
      "Dallas-Fort Worth AI automation studio specializing in custom AI agents, workflow automation, and business integration solutions.",
    url: BASE_URL,
    email: CONTACT_EMAIL,
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 32.7767,
        longitude: -96.797,
      },
      geoRadius: "80000",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dallas",
      addressRegion: "TX",
      addressCountry: "US",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "AI Automation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Consulting & Enablement",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Workflow Automation & Project Tracking",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Personal AI Enablement & Agents",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Advanced Agent Development",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "System Integration & Data Pipelines",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "AI Training & Team Enablement",
          },
        },
      ],
    },
    sameAs: ["https://www.instagram.com/alphaspeedai"],
  };
}

// ── WebSite ───────────────────────────────────────────────────────────────────

export function buildWebSiteSchema(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Alpha Speed AI",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    } as never,
  };
}

// ── Service ───────────────────────────────────────────────────────────────────

export function buildServiceSchema(
  name: string,
  description: string
): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    provider: {
      "@type": "LocalBusiness",
      name: "Alpha Speed AI",
      url: BASE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Dallas-Fort Worth",
    },
  };
}

// ── BreadcrumbList ────────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function buildBreadcrumbSchema(
  items: BreadcrumbItem[]
): WithContext<BreadcrumbList> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
