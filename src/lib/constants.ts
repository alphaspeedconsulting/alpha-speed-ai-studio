import {
  Lightbulb,
  Workflow,
  User,
  Cpu,
  Globe,
  Bot,
  Sparkles,
  MessageSquare,
  BarChart,
  ShieldCheck,
  ClipboardCheck,
  GitBranch,
  Eye,
  Inbox,
  ListChecks,
  LineChart,
  type LucideIcon,
} from "lucide-react";

// ── Contact ──────────────────────────────────────────────────────────
export const CONTACT_EMAIL = "alpha.speed.consulting@gmail.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Free%20Consultation%20Request`;

// ── Social / Reels ────────────────────────────────────────────────────
// Posts are loaded from Supabase published_posts table (written by content gen flow)
export const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/alphaspeedai";
export const TIKTOK_PROFILE_URL = "https://www.tiktok.com/@alphaspeedai";

// ── Service Pillars ──────────────────────────────────────────────────
export interface ServicePillar {
  icon: LucideIcon;
  title: string;
  description: string;
  idealFor: string;
  proofPoint: string;
}

export const SERVICE_PILLARS: ServicePillar[] = [
  {
    icon: Lightbulb,
    title: "AI Consulting & Enablement",
    description:
      "Not sure where to start with AI? We help you understand what's possible, identify high-impact opportunities, and build a roadmap to enable your business with AI — no jargon, no fluff.",
    idealFor: "Businesses exploring AI for the first time",
    proofPoint: "Strategy sessions that turn confusion into clarity",
  },
  {
    icon: Workflow,
    title: "Workflow Automation & Project Tracking",
    description:
      "We build custom automation that replaces manual processes — from lead intake to project tracking to client communication. Your team stops drowning in busywork.",
    idealFor: "Service businesses with repetitive manual workflows",
    proofPoint: "DCR Portal — live production system for construction project tracking",
  },
  {
    icon: User,
    title: "Personal AI Enablement & Agents",
    description:
      "Get your own AI-powered toolset using Claude, custom MCP servers, and purpose-built agents. We set you up with tools that make you and your team dramatically more productive.",
    idealFor: "Small business owners who want AI working for them daily",
    proofPoint: "Claude Cowork + custom-built MCPs and agent toolkits",
  },
  {
    icon: Cpu,
    title: "Advanced Agent Development",
    description:
      "Autonomous AI agents that handle complex tasks end-to-end — from code generation to data analysis to multi-step business processes. Always-on, always learning.",
    idealFor: "Businesses ready for autonomous AI operations",
    proofPoint: "AlphaAI — our Mac Mini-powered agent running 24/7",
  },
  {
    icon: Bot,
    title: "AI Agents as a Service",
    description:
      "Always-on AI team members that work for your business 24/7. From content generation to customer service to sales intelligence — subscribe, deploy, and scale without hiring.",
    idealFor: "Businesses wanting AI capabilities without building in-house",
    proofPoint: "Subscription AI agents powered by MCP servers and custom tooling",
  },
  {
    icon: Globe,
    title: "Rapid Website Development",
    description:
      "Modern, fast, professionally-designed websites built in days, not months. AI-accelerated development means you get a polished site at a fraction of the traditional cost and timeline.",
    idealFor: "Businesses that need a web presence fast",
    proofPoint: "This site + Smokies website — both built with our rapid dev process",
  },
];

// ── Subscription AI Services (Coming Soon) ───────────────────────────
export interface SubscriptionService {
  icon: LucideIcon;
  title: string;
  description: string;
}

export const SUBSCRIPTION_SERVICES: SubscriptionService[] = [
  {
    icon: Sparkles,
    title: "AI Content Calendar & Copy Generator",
    description:
      "Automated content planning and writing for social media, email, and blog posts.",
  },
  {
    icon: MessageSquare,
    title: "Customer Service AI Agent",
    description:
      "24/7 intelligent support that handles inquiries, routes tickets, and resolves issues.",
  },
  {
    icon: BarChart,
    title: "Sales Intelligence & Lead Scoring",
    description:
      "AI-powered lead qualification, scoring, and prioritization for your sales pipeline.",
  },
];

// ── Portfolio / Case Studies ─────────────────────────────────────────
export interface PortfolioItem {
  title: string;
  category: string;
  description: string;
  images: string[];
  /** YouTube video ids, rendered as the card's media in place of screenshots. */
  youtubeIds?: string[];
  link?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    title: "AgentVault",
    category: "AI Platform",
    description:
      "Our own AI platform, running inside Claude's Cowork plugin. Agents, MCP connectors, skills, and workflows behind a governance layer — with the cockpit we use to run the business ourselves.",
    images: [],
    youtubeIds: ["VM13Ys1eJ5c", "rXoIt_SVlOQ"],
  },
  {
    title: "DCR Portal",
    category: "Workflow Automation",
    description:
      "Full-featured project tracking and workflow automation system built for construction companies. Manages daily completion reports, team coordination, and real-time project status.",
    images: ["dcr1.png", "dcr2.png", "dcr3.png"],
  },
  {
    title: "αlphaspeed AI Studio",
    category: "Rapid Website Development",
    description:
      "This site: React marketing site with AI assistant demo, three themes, and AlphaAI. Built in days with our AI-accelerated workflow.",
    images: [],
  },
  {
    title: "Smokies Website",
    category: "Rapid Website Development",
    description:
      "Professional business website designed and deployed rapidly using our AI-powered development process. Clean, modern, and conversion-optimized.",
    images: ["smokies.png"],
  },
];

// ── How We Work Steps ────────────────────────────────────────────────
export interface WorkStep {
  step: number;
  title: string;
  description: string;
}

export const HOW_WE_WORK_STEPS: WorkStep[] = [
  {
    step: 1,
    title: "Free Consultation",
    description:
      "We learn about your business, your challenges, and where AI can make the biggest impact.",
  },
  {
    step: 2,
    title: "Assessment & Proposal",
    description:
      "We map your workflows, identify automation opportunities, and present a clear plan with pricing.",
  },
  {
    step: 3,
    title: "Build & Deploy",
    description:
      "We build your custom AI agents and automation, test thoroughly, and deploy to your environment.",
  },
  {
    step: 4,
    title: "Optimize & Support",
    description:
      "Ongoing optimization, updates, and dedicated support to keep your AI systems performing at their best.",
  },
];

// ── Demo / Explainer Videos ──────────────────────────────────────────
export interface DemoVideo {
  title: string;
  description: string;
  /** Path to a self-hosted mp4 under `public/`. Omit when `youtubeId` is set. */
  src?: string;
  /** YouTube video id, for videos we host on the channel instead of in-repo. */
  youtubeId?: string;
  captionUrl?: string;
  /** Rendered in its own feature section instead of the demo carousel. */
  featured?: boolean;
}

export const DEMO_VIDEOS: DemoVideo[] = [
  {
    title: "Alpha Speed AI",
    description: "Introducing αlphaspeed AI — intelligent automation for your business.",
    src: "Videos/Alpha_Speed_AI.mp4",
  },
  {
    title: "Alpha Speed AI Solution",
    description: "See how αlphaspeed AI brings intelligent automation to your business end-to-end.",
    src: "Videos/Alpha_Speed_AI_Solution.mp4",
  },
  {
    title: "AI Agents: The Future of Automation",
    description: "Why AI agents are transforming how businesses automate workflows and operations.",
    src: "Videos/AI_Agents__The_Future_of_Automation.mp4",
  },
  {
    title: "AI Agents: Workflow Automation",
    description: "How our agents automate multi-step workflows and reduce manual coordination.",
    src: "Videos/AI_Agents__Workflow_Automation.mp4",
  },
  {
    title: "Agents as a Service",
    description: "Subscribe to always-on AI team members that work for your business 24/7.",
    src: "Videos/Agents_as_a_Service.mp4",
  },
  {
    title: "From Insight to Outreach",
    description: "Turn data and insights into targeted outreach and engagement with AI-powered workflows.",
    src: "Videos/From_Insight_to_Outreach.mp4",
  },
  {
    title: "Recon Scout",
    description: "AI-powered reconnaissance and scouting for leads, opportunities, and market intelligence.",
    src: "Videos/Recon_Scout.mp4",
  },
  {
    title: "Agent Vault: Governance Layer",
    description: "Governance and control layer for AI agents — policies, compliance, and safe deployment.",
    src: "Videos/AgentVault_Governance_Layer.mp4",
    featured: true,
  },
  {
    title: "DCR Portal: AI Command Center",
    description: "The DCR Portal AI command center — central control for workflows, automation, and operations.",
    src: "Videos/DCR/DCR_Portal__AI_Command_Center.mp4",
  },
  {
    title: "AgentVault Cockpit Teaser Intro",
    description:
      "A short look at the cockpit we run the business from — the command center behind every engagement.",
    youtubeId: "VM13Ys1eJ5c",
  },
  {
    title: "AgentVault Cockpit Walk",
    description:
      "A walkthrough of the cockpit — how work is captured, queued, approved, and tracked in one place.",
    youtubeId: "rXoIt_SVlOQ",
  },
  {
    title: "The AI Content Studio",
    description: "Create and manage content with AI — your studio for copy, visuals, and campaigns.",
    src: "Videos/The_AI_Content_Studio.mp4",
  },
];

// ── Reels (short-form videos from Alpha) ─────────────────────────────
export const REELS_VIDEOS: DemoVideo[] = [];

// ── AgentVault: Platform Catalog Stats ───────────────────────────────
// SOURCE OF TRUTH #1 — the AgentVault *catalog*: everything that exists on
// the platform, regardless of which plan entitles it.
//
// Verified against cowork_plugin/docs/canonical-workflow-registry.json
// (committed ead20c2, generated 2026-08-19):
//   workflows 83 (54 local / 17 hybrid / 12 remote) · skills 67
//   agents catalogued 31 · MCP servers 10 · AgentVault MCP tools 217
//
// ⚠️ These are CATALOG figures. They are NOT what a customer receives —
// that is TIER_ENTITLEMENTS below. Never use these in pricing copy.
//
// Floor framing ("80+") is deliberate: the registry returned 81 on
// 2026-08-10 and 83 on 2026-08-19. Hard-coded exact counts have gone
// stale twice already (38 on-site, 73 in the sales kit).

export interface PlatformStat {
  value: string;
  label: string;
  detail?: string;
}

export const PLATFORM_STATS_SOURCE =
  "cowork_plugin/docs/canonical-workflow-registry.json";
export const PLATFORM_STATS_VERIFIED_ON = "2026-08-19";

export const PLATFORM_STATS: PlatformStat[] = [
  { value: "30+", label: "Agents", detail: "31 catalogued" },
  { value: "65+", label: "Skills", detail: "67 catalogued" },
  { value: "10", label: "MCP Servers", detail: "first-party + bundled" },
  { value: "80+", label: "Workflows", detail: "54 local · 17 hybrid · 12 remote" },
];

/** Exact catalog counts behind the floor-framed stats above. */
export const PLATFORM_CATALOG_COUNTS = {
  workflows: 83,
  workflowsLocal: 54,
  workflowsHybrid: 17,
  workflowsRemote: 12,
  skills: 67,
  agents: 31,
  mcpServers: 10,
  mcpTools: 217,
} as const;

// ── AgentVault: Per-Tier Entitlements ────────────────────────────────
// SOURCE OF TRUTH #2 — what each paying plan actually grants.
//
// Verified 2026-08-22 against cowork_plugin/agentvault_platform/server.py
// → TIER_MANIFESTS, by counting the real `skills` / `connectors` / `agents` /
// `workflows` lists. Corroborated by agentvault_platform/tier_access.py.
//
// ⚠️ Read the LISTS, never the tier `description` strings — server.py's own
// Advanced description says "28 workflows" while its list holds 34. The
// upstream description strings have drifted from the lists they describe.
//
// ⚠️ These figures are contractual: they state what $99 and $199 buy.
// Any change here must be checked against TIER_MANIFESTS first.

export interface TierEntitlement {
  skills: number | "all";
  connectors: number | "all";
  /** Orchestrated AI Product Agents. Basic entitles none. */
  agents: number | "all";
  workflows: number | "all";
  rateLimit: number;
  /** Included product-agent workflow runs per month. -1 = unlimited. */
  workflowRuns?: number;
  overageRate?: number;
}

export const TIER_ENTITLEMENTS_SOURCE =
  "cowork_plugin/agentvault_platform/server.py → TIER_MANIFESTS";
export const TIER_ENTITLEMENTS_VERIFIED_ON = "2026-08-22";

export const TIER_ENTITLEMENTS: Record<
  "basic" | "advanced" | "custom" | "developer_license",
  TierEntitlement
> = {
  basic: {
    skills: 7,
    connectors: 8,
    agents: 0,
    workflows: 8,
    rateLimit: 100,
    workflowRuns: 0,
  },
  advanced: {
    skills: 23,
    connectors: 17,
    agents: 9,
    workflows: 34,
    rateLimit: 1000,
    workflowRuns: 20,
    overageRate: 0.15,
  },
  custom: {
    skills: "all",
    connectors: "all",
    agents: "all",
    workflows: "all",
    rateLimit: 10000,
    workflowRuns: -1,
  },
  developer_license: {
    skills: "all",
    connectors: "all",
    agents: "all",
    workflows: "all",
    rateLimit: 5000,
    workflowRuns: -1,
  },
};

/**
 * All 13 AI Product Agents run under the Developer License via the local
 * Development_agents runtime. The Advanced tier entitles 9. Do not print
 * 13 against Advanced.
 */
export const DEVELOPER_LICENSE_PRODUCT_AGENTS = 13;

// ── AgentVault: Governance Layer ─────────────────────────────────────
// Verified 2026-08-22 against the canonical workflow registry (see
// PLATFORM_STATS_SOURCE) and the tier manifests:
//   required_controls: audit_chain on 82 of 83 workflows, evidence_gate on 29
//   autonomy_level:    L1 13 · L2 52 · L3 17
//   risk_tier:         low 7 · medium 53 · high 22
//   governance_visibility connector: entitled on every paying tier (2026-08-03)

export interface GovernanceFact {
  icon: LucideIcon;
  stat: string;
  title: string;
  description: string;
}

export const GOVERNANCE_FACTS: GovernanceFact[] = [
  {
    icon: ClipboardCheck,
    stat: "82 of 83",
    title: "Workflows write an audit chain",
    description:
      "Almost every canonical workflow carries a required audit-chain control. What the agent did, when, and on whose authority is recorded as the work happens — not reconstructed afterwards.",
  },
  {
    icon: ShieldCheck,
    stat: "29",
    title: "Workflows require an evidence gate",
    description:
      "The higher-stakes workflows cannot act on an assumption. They must produce supporting evidence before the step is allowed to proceed, so nothing consequential runs on a guess.",
  },
  {
    icon: GitBranch,
    stat: "3 levels",
    title: "Autonomy is graded, not all-or-nothing",
    description:
      "Every workflow is assigned an autonomy level and a risk tier. Routine work runs unattended; anything sensitive stops for a human. You decide where that line sits — it is configuration, not a rewrite.",
  },
  {
    icon: Eye,
    stat: "Every plan",
    title: "Governance visibility is not an upsell",
    description:
      "The governance connector is entitled on every paying tier. Oversight is not something you buy back later — it ships with the platform from the first plan up.",
  },
];

/** Already-public governance line, reused from the sales kit. */
export const GOVERNANCE_HEADLINE =
  "Nothing sends without your approval — every workflow has a human gate built in.";

// ── AgentVault: Cockpit & Mission Control ────────────────────────────
// ⚠️ CAPABILITY-LEVEL COPY ONLY. The underlying system holds live client
// and commercial data. Never add client names, deal terms, contact details,
// account-tied metrics, or internal screenshots to this file.
// Capability categories map to cowork_plugin/agentvault_platform/cockpit/
// (capture, brief, portfolio, cost, task_launch, actions, read_api).

export interface CockpitCapability {
  icon: LucideIcon;
  title: string;
  description: string;
  outcome: string;
}

/**
 * Videos shown in the Cockpit section, in display order (teaser, then the
 * full walkthrough). Ids reference DEMO_VIDEOS so titles and descriptions
 * are written once.
 */
export const COCKPIT_VIDEO_IDS = ["VM13Ys1eJ5c", "rXoIt_SVlOQ"];

export const getDemoVideoByYouTubeId = (id: string) =>
  DEMO_VIDEOS.find((video) => video.youtubeId === id);

export const COCKPIT_CAPABILITIES: CockpitCapability[] = [
  {
    icon: Inbox,
    title: "One place to capture the work",
    description:
      "Requests arrive from everywhere — email, chat, a hallway conversation, a form on the site. Everything lands in a single capture point instead of scattering across inboxes and notes apps, and each item is routed to the agent or person who owns it.",
    outcome: "Nothing depends on someone remembering it.",
  },
  {
    icon: ListChecks,
    title: "A backlog that tells you what is actually blocked",
    description:
      "Work is separated into what is ready to start and what is waiting on someone else, then rolled into a standing brief. The queue distinguishes between work that is stalled and work that simply has not been picked up yet.",
    outcome: "The daily question becomes what to do next, not what is going on.",
  },
  {
    icon: ShieldCheck,
    title: "Approval gates on the consequential steps",
    description:
      "Agents run the routine work unattended, but anything that spends money, sends on your behalf, or touches a client record stops at a gate first. Approvals happen in the same place the work is tracked, with the context attached.",
    outcome: "Autonomy where it is safe, a human where it is not.",
  },
  {
    icon: LineChart,
    title: "Delivery and cost tracked as the work moves",
    description:
      "Every engagement carries its own progress and spend view, updated as agents complete steps rather than assembled for a status meeting. Cost per workflow run is tracked alongside delivery so throughput and spend are read together.",
    outcome: "Status is a page you open, not a report someone writes.",
  },
];
