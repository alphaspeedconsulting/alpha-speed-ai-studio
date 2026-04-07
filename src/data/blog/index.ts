import chatbotVsAiAgent from "./chatbot-vs-ai-agent";
import type { BlogPost } from "./types";

// All blog posts in reverse chronological order (newest first).
// Add new posts to the top of this array.
export const BLOG_POSTS: BlogPost[] = [
  chatbotVsAiAgent,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export type { BlogPost };
