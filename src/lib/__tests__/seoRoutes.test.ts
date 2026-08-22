import { describe, expect, it } from "vitest";
import {
  BLOG_POST_SLUGS,
  PRERENDER_CONTENT_MARKERS,
  PRERENDER_ROUTES,
  SITEMAP_DYNAMIC_ROUTES,
  SITEMAP_EXCLUDE_ROUTES,
} from "../seoRoutes";

describe("seoRoutes", () => {
  it("includes the new organic content in prerender and sitemap coverage", () => {
    expect(BLOG_POST_SLUGS).toEqual(
      expect.arrayContaining([
        "chatbot-vs-ai-agent",
        "how-much-does-ai-automation-cost",
        "how-contractors-use-ai-automation",
        "dfw-ai-automation-guide",
      ])
    );

    expect(PRERENDER_ROUTES).toEqual(
      expect.arrayContaining([
        "/blog/how-much-does-ai-automation-cost",
        "/blog/how-contractors-use-ai-automation",
        "/blog/dfw-ai-automation-guide",
        "/dfw-ai-automation-services",
        "/ai-automation-for-contractors",
      ])
    );

    expect(SITEMAP_DYNAMIC_ROUTES).toEqual(
      expect.arrayContaining([
        "/blog/how-much-does-ai-automation-cost",
        "/blog/how-contractors-use-ai-automation",
        "/blog/dfw-ai-automation-guide",
        "/dfw-ai-automation-services",
        "/ai-automation-for-contractors",
      ])
    );
  });

  it("verifies the governance and cockpit sections actually prerender", () => {
    // These markers are a hard build gate (vite.config.ts prerenderPlugin):
    // if the lazy-loaded sections fail to render, `npm run build` fails rather
    // than silently deploying an empty shell to Google.
    expect(PRERENDER_CONTENT_MARKERS["/"]).toEqual(
      expect.arrayContaining(["Governance Layer", "Mission Control"])
    );
    expect(PRERENDER_CONTENT_MARKERS["/agentvault"]).toEqual(
      expect.arrayContaining(["AgentVault", "Governance Layer"])
    );
  });

  it("keeps intentionally non-indexed routes excluded from the sitemap", () => {
    expect(SITEMAP_EXCLUDE_ROUTES).toEqual(
      expect.arrayContaining(["/alphaai", "/traffic", "/from/instagram", "/from/linkedin"])
    );
  });
});
