import { describe, expect, it } from "vitest";
import { buildCanonicalUrl, SITE_URL } from "../site";

describe("buildCanonicalUrl", () => {
  it("returns the root URL with trailing slash", () => {
    expect(buildCanonicalUrl("/")).toBe("https://alphaspeedai.com/");
  });

  it("normalizes top-level paths to trailing-slash canonical URLs", () => {
    expect(buildCanonicalUrl("/blog")).toBe("https://alphaspeedai.com/blog/");
    expect(buildCanonicalUrl("/case-studies")).toBe("https://alphaspeedai.com/case-studies/");
    expect(buildCanonicalUrl("/roi-calculator")).toBe("https://alphaspeedai.com/roi-calculator/");
  });

  it("normalizes nested paths to trailing-slash canonical URLs", () => {
    expect(buildCanonicalUrl("/blog/chatbot-vs-ai-agent")).toBe(
      "https://alphaspeedai.com/blog/chatbot-vs-ai-agent/"
    );
  });

  it("keeps SITE_URL host stable", () => {
    expect(SITE_URL).toBe("https://alphaspeedai.com");
  });
});
