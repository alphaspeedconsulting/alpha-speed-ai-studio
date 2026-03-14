import { describe, it, expect } from "vitest";
import {
  buildLocalBusinessSchema,
  buildWebSiteSchema,
  buildServiceSchema,
  buildBreadcrumbSchema,
} from "../schema";

describe("buildLocalBusinessSchema", () => {
  it("returns correct @type and @context", () => {
    const schema = buildLocalBusinessSchema();
    expect(schema["@context"]).toBe("https://schema.org");
    expect(schema["@type"]).toBe("LocalBusiness");
  });

  it("includes required name and url", () => {
    const schema = buildLocalBusinessSchema();
    expect(schema.name).toBe("Alpha Speed AI");
    expect(schema.url).toBe("https://alphaspeedai.com");
  });

  it("includes sameAs with Instagram link", () => {
    const schema = buildLocalBusinessSchema();
    expect(schema.sameAs).toContain("https://www.instagram.com/alphaspeedai");
  });

  it("includes hasOfferCatalog with at least 4 services", () => {
    const schema = buildLocalBusinessSchema();
    const catalog = schema.hasOfferCatalog as { itemListElement: unknown[] };
    expect(Array.isArray(catalog?.itemListElement)).toBe(true);
    expect(catalog.itemListElement.length).toBeGreaterThanOrEqual(4);
  });
});

describe("buildWebSiteSchema", () => {
  it("returns @type WebSite with correct url", () => {
    const schema = buildWebSiteSchema();
    expect(schema["@type"]).toBe("WebSite");
    expect(schema.url).toBe("https://alphaspeedai.com");
  });

  it("includes potentialAction for search", () => {
    const schema = buildWebSiteSchema();
    expect(schema.potentialAction).toBeDefined();
  });
});

describe("buildServiceSchema", () => {
  it("returns @type Service with provided name and description", () => {
    const schema = buildServiceSchema(
      "AI Consulting & Enablement",
      "We help you understand what's possible."
    );
    expect(schema["@type"]).toBe("Service");
    expect(schema.name).toBe("AI Consulting & Enablement");
    expect(schema.description).toBe("We help you understand what's possible.");
  });

  it("includes provider referencing Alpha Speed AI", () => {
    const schema = buildServiceSchema("Test Service", "Test description.");
    const provider = schema.provider as { name: string };
    expect(provider.name).toBe("Alpha Speed AI");
  });
});

describe("buildBreadcrumbSchema", () => {
  it("returns @type BreadcrumbList", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Home", url: "https://alphaspeedai.com/" },
      { name: "Agents", url: "https://alphaspeedai.com/agents" },
    ]);
    expect(schema["@type"]).toBe("BreadcrumbList");
  });

  it("sets correct position and item values", () => {
    const schema = buildBreadcrumbSchema([
      { name: "Home", url: "https://alphaspeedai.com/" },
      { name: "Agents", url: "https://alphaspeedai.com/agents" },
    ]);
    const items = schema.itemListElement as Array<{
      "@type": string;
      position: number;
      name: string;
      item: string;
    }>;
    expect(items[0].position).toBe(1);
    expect(items[0].name).toBe("Home");
    expect(items[1].position).toBe(2);
    expect(items[1].item).toBe("https://alphaspeedai.com/agents");
  });
});
