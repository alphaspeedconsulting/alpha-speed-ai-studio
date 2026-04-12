import { describe, expect, it } from "vitest";
import { BLOG_POSTS, getBlogPost } from "../index";

describe("blog registry", () => {
  it("includes the planned high-intent organic content slugs", () => {
    expect(BLOG_POSTS.map((post) => post.slug)).toEqual(
      expect.arrayContaining([
        "chatbot-vs-ai-agent",
        "how-much-does-ai-automation-cost",
        "how-contractors-use-ai-automation",
        "dfw-ai-automation-guide",
      ])
    );
  });

  it("resolves the new post slugs through getBlogPost", () => {
    expect(getBlogPost("how-much-does-ai-automation-cost")?.title).toMatch(/AI Automation Cost/i);
    expect(getBlogPost("how-contractors-use-ai-automation")?.title).toMatch(/Contractors/i);
    expect(getBlogPost("dfw-ai-automation-guide")?.title).toMatch(/DFW/i);
  });
});
