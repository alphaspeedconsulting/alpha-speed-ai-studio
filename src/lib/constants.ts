import {
  Lightbulb,
  Workflow,
  User,
  Cpu,
  Globe,
  Sparkles,
  MessageSquare,
  BarChart,
  type LucideIcon,
} from "lucide-react";

// ── Contact ──────────────────────────────────────────────────────────
export const CONTACT_EMAIL = "alpha.speed.consulting@gmail.com";
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}?subject=Free%20Consultation%20Request`;

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
  link?: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
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
      "This very site — a modern React marketing site with interactive AI assistant demo, three theme options, and a full AlphaAI subsystem. Built in days using our AI-accelerated workflow.",
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
