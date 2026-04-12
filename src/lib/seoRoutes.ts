export const BLOG_POST_SLUGS = [
  "chatbot-vs-ai-agent",
  "how-much-does-ai-automation-cost",
  "how-contractors-use-ai-automation",
  "dfw-ai-automation-guide",
] as const;

export const BLOG_POST_ROUTES = BLOG_POST_SLUGS.map((slug) => `/blog/${slug}`);

export const PRERENDER_ROUTES = [
  "/",
  "/assistant",
  "/agentvault",
  "/reels",
  "/roi-calculator",
  "/case-studies",
  "/blog",
  ...BLOG_POST_ROUTES,
  "/dfw-ai-automation-services",
  "/ai-automation-for-contractors",
  "/from/instagram",
  "/from/linkedin",
  "/privacy-policy",
  "/terms-of-service",
  "/privacy-request",
] as const;

export const SITEMAP_DYNAMIC_ROUTES = [
  "/roi-calculator",
  "/case-studies",
  "/blog",
  ...BLOG_POST_ROUTES,
  "/assistant",
  "/agentvault",
  "/reels",
  "/dfw-ai-automation-services",
  "/ai-automation-for-contractors",
  "/privacy-policy",
  "/terms-of-service",
  "/privacy-request",
] as const;

export const SITEMAP_EXCLUDE_ROUTES = [
  "/alphaai",
  "/traffic",
  "/404",
  "/from/instagram",
  "/from/linkedin",
] as const;

export const PRERENDER_CONTENT_MARKERS: Record<string, string[]> = {
  "/": ["Alpha Speed AI", "DFW", "AI Automation"],
  "/roi-calculator": ["ROI Calculator", "Save with AI"],
  "/case-studies": ["Case Studies", "Real Work"],
  "/agentvault": ["AgentVault"],
  "/assistant": ["Assistant"],
  "/blog": ["Alpha Speed AI Blog", "DFW business owners"],
  "/blog/chatbot-vs-ai-agent": ["Chatbot vs AI Agent", "What's the Difference"],
  "/blog/how-much-does-ai-automation-cost": ["How Much Does AI Automation Cost", "small business"],
  "/blog/how-contractors-use-ai-automation": ["How Contractors Use AI Automation", "Contractors"],
  "/blog/dfw-ai-automation-guide": ["DFW AI Automation Guide", "Dallas-Fort Worth"],
  "/dfw-ai-automation-services": ["DFW AI Automation Services", "Dallas-Fort Worth businesses"],
  "/ai-automation-for-contractors": ["AI Automation for Contractors", "roofing"],
  "/privacy-policy": ["Privacy Policy"],
  "/terms-of-service": ["Terms of Service"],
};

export const SITEMAP_CHANGEFREQ: Record<string, string> = {
  "/": "weekly",
  "/agentvault": "weekly",
  "/blog": "weekly",
  "/blog/chatbot-vs-ai-agent": "monthly",
  "/blog/how-much-does-ai-automation-cost": "monthly",
  "/blog/how-contractors-use-ai-automation": "monthly",
  "/blog/dfw-ai-automation-guide": "monthly",
  "/case-studies": "monthly",
  "/assistant": "monthly",
  "/roi-calculator": "monthly",
  "/reels": "monthly",
  "/dfw-ai-automation-services": "monthly",
  "/ai-automation-for-contractors": "monthly",
  "/privacy-policy": "yearly",
  "/terms-of-service": "yearly",
  "/privacy-request": "yearly",
};

export const SITEMAP_PRIORITY: Record<string, number> = {
  "/": 1.0,
  "/blog": 0.9,
  "/blog/chatbot-vs-ai-agent": 0.8,
  "/blog/how-much-does-ai-automation-cost": 0.8,
  "/blog/how-contractors-use-ai-automation": 0.8,
  "/blog/dfw-ai-automation-guide": 0.8,
  "/agentvault": 0.9,
  "/case-studies": 0.9,
  "/assistant": 0.8,
  "/roi-calculator": 0.7,
  "/reels": 0.6,
  "/dfw-ai-automation-services": 0.8,
  "/ai-automation-for-contractors": 0.8,
  "/privacy-policy": 0.2,
  "/terms-of-service": 0.2,
  "/privacy-request": 0.1,
};
