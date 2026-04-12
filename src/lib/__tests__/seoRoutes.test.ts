import { describe, expect, it } from "vitest";
import {
  BLOG_POST_SLUGS,
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

  it("keeps intentionally non-indexed routes excluded from the sitemap", () => {
    expect(SITEMAP_EXCLUDE_ROUTES).toEqual(
      expect.arrayContaining(["/alphaai", "/traffic", "/from/instagram", "/from/linkedin"])
    );
  });
});
