import chatbotVsAiAgent from "./chatbot-vs-ai-agent";
import dfwAiAutomationGuide from "./dfw-ai-automation-guide";
import howContractorsUseAiAutomation from "./how-contractors-use-ai-automation";
import howMuchDoesAiAutomationCost from "./how-much-does-ai-automation-cost";
import type { BlogPost } from "./types";

// All blog posts in reverse chronological order (newest first).
// Add new posts to the top of this array.
export const BLOG_POSTS: BlogPost[] = [
  dfwAiAutomationGuide,
  howContractorsUseAiAutomation,
  howMuchDoesAiAutomationCost,
  chatbotVsAiAgent,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export type { BlogPost };
