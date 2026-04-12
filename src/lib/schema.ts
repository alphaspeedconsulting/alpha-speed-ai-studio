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
  FAQPage,
  ItemList,
  WithContext,
} from "schema-dts";
import { SITE_URL } from "@/lib/site";

const CONTACT_EMAIL = "alpha.speed.consulting@gmail.com";

// ── LocalBusiness ─────────────────────────────────────────────────────────────

export function buildLocalBusinessSchema(): WithContext<LocalBusiness> {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Alpha Speed AI",
    description:
      "Dallas-Fort Worth AI automation studio specializing in custom AI agents, workflow automation, and business integration solutions.",
    url: SITE_URL,
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
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/?q={search_term_string}`,
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
      url: SITE_URL,
    },
    areaServed: {
      "@type": "City",
      name: "Dallas-Fort Worth",
    },
  };
}

// ── FAQPage ──────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export function buildFAQPageSchema(
  items: FAQItem[]
): WithContext<FAQPage> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question" as const,
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: item.answer,
      },
    })),
  };
}

// ── ItemList (Case Studies) ──────────────────────────────────────────────────

export interface CaseStudyItem {
  headline: string;
  description: string;
  url: string;
}

export function buildCaseStudyListSchema(
  studies: CaseStudyItem[]
): WithContext<ItemList> {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Alpha Speed AI Case Studies",
    description: "Real AI automation results for DFW businesses",
    url: `${SITE_URL}/case-studies/`,
    itemListElement: studies.map((study, index) => ({
      "@type": "ListItem" as const,
      position: index + 1,
      item: {
        "@type": "Article" as const,
        headline: study.headline,
        description: study.description,
        author: {
          "@type": "Organization" as const,
          name: "Alpha Speed AI",
        },
        publisher: {
          "@type": "Organization" as const,
          name: "Alpha Speed AI",
          url: SITE_URL,
        },
        url: study.url,
      },
    })),
  } as WithContext<ItemList>;
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
