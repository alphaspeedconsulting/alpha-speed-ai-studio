export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "cta"; text: string; to: string; trackingName: string };

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedAt: string; // ISO 8601 date string
  updatedAt?: string;
  author: string;
  category: string;
  tags: string[];
  readingTimeMinutes: number;
  blocks: BlogBlock[];
}
