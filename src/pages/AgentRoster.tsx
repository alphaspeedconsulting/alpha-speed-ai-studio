import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { buildBreadcrumbSchema, buildFAQPageSchema } from "@/lib/schema";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyAgentsSection from "@/components/WhyAgentsSection";
import { Badge } from "@/components/ui/badge";
import { Wrench, Bot } from "lucide-react";
import CalendlyBooking from "@/components/CalendlyBooking";
import AgentVaultPricing from "@/components/AgentVaultPricing";

interface Agent {
  name: string;
  role: string;
  description: string;
  tools: string[];
  image: string;
}

const agents: Agent[] = [
  {
    name: "Product Owner",
    role: "Vision & Requirements",
    description:
      "Translates business goals into structured PRDs, user stories, and acceptance criteria. Prioritizes the backlog and keeps every sprint aligned with what matters.",
    tools: ["Write PRDs", "Prioritize Backlog", "Create User Stories"],
    image: "/agents/product-owner.png",
  },
  {
    name: "Architect",
    role: "System Design & Standards",
    description:
      "Designs scalable system architectures, evaluates technology choices, and enforces design patterns across the codebase.",
    tools: ["Review Architecture", "Generate Diagrams", "Evaluate Tech Stack"],
    image: "/agents/architect.png",
  },
  {
    name: "Developer",
    role: "Code Generation & Implementation",
    description:
      "Writes production-quality code, implements features end-to-end, and handles refactoring, migrations, and integrations.",
    tools: ["Write Code", "Refactor", "Write Tests"],
    image: "/agents/developer.png",
  },
  {
    name: "Quality",
    role: "Testing & Compliance",
    description:
      "Validates code against best practices, runs automated test suites, and ensures architecture compliance before anything ships.",
    tools: ["Enforce Best Practices", "Run Test Suites", "Security Scanning"],
    image: "/agents/quality.png",
  },
  {
    name: "Brainstormer",
    role: "Ideation & Strategy",
    description:
      "Generates creative solutions, explores alternatives, and facilitates structured brainstorming sessions to unblock teams.",
    tools: ["Run Brainstorms", "SWOT Analysis", "Rank Ideas"],
    image: "/agents/brainstormer.png",
  },
  {
    name: "Schedule Optimizer",
    role: "Planning & Coordination",
    description:
      "Optimizes calendars, resolves scheduling conflicts, and finds the best meeting times across time zones and busy schedules.",
    tools: ["Optimize Calendars", "Find Open Slots", "Resolve Conflicts"],
    image: "/agents/schedule-optimizer.png",
  },
  {
    name: "Content Generator",
    role: "Writing & Brand Voice",
    description:
      "Drafts blog posts, social content, email campaigns, and marketing copy — all consistent with your brand voice and tone.",
    tools: ["Draft Posts", "Plan Content Calendar", "Check Brand Voice"],
    image: "/agents/content-generator.png",
  },
  {
    name: "Operations Manager",
    role: "Workflows & Automation",
    description:
      "Monitors deployments, manages infrastructure, automates repetitive ops tasks, and keeps systems running smoothly.",
    tools: ["Monitor Deploys", "Triage Incidents", "Automate Workflows"],
    image: "/agents/operations-manager.png",
  },
  {
    name: "Customer Relationships",
    role: "CRM & Client Success",
    description:
      "Tracks client interactions, scores leads, manages follow-ups, and ensures no relationship falls through the cracks.",
    tools: ["Score Leads", "Send Follow-Ups", "Summarize Clients"],
    image: "/agents/customer-relationships.png",
  },
  {
    name: "Personal Assistant",
    role: "Daily Briefings & Inbox",
    description:
      "Manages your inbox, prepares daily briefings, drafts replies, and handles the small tasks that eat up your day.",
    tools: ["Daily Briefings", "Draft Replies", "Prioritize Tasks"],
    image: "/agents/personal-assistant.png",
  },
];

/** Image with graceful fallback to Bot icon when the file hasn't been added yet. */
const AgentImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <Bot className="w-12 h-12 text-primary/30" />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
};

const AgentRoster = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AgentVault — AI Agents, MCP Connectors &amp; Workflows | Alpha Speed AI</title>
        <meta name="description" content="AgentVault is the AI workflow automation platform from Alpha Speed AI. Get 10+ specialized agents, MCP connectors, 30+ skills, and canonical workflows — installed in minutes via Claude's Cowork plugin." />
        <link rel="canonical" href="https://alphaspeedai.com/agentvault" />
        <meta property="og:title" content="AgentVault — AI Agents, MCP Connectors &amp; Workflows | Alpha Speed AI" />
        <meta property="og:description" content="AgentVault gives your team 10+ AI agents, 30+ skills, and 38 canonical workflows. Works inside Claude's Cowork plugin." />
        <meta property="og:url" content="https://alphaspeedai.com/agentvault" />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AgentVault — AI Agents, MCP Connectors &amp; Workflows | Alpha Speed AI" />
        <meta name="twitter:description" content="AgentVault gives your team 10+ AI agents, 30+ skills, and 38 canonical workflows." />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify(buildBreadcrumbSchema([
            { name: "Home", url: "https://alphaspeedai.com/" },
            { name: "AgentVault", url: "https://alphaspeedai.com/agentvault" },
          ]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(buildFAQPageSchema([
            {
              question: "What is AgentVault?",
              answer: "AgentVault is an AI workflow automation platform that installs into Claude's Cowork plugin. It gives your team specialized AI agents, MCP connectors, skills, and canonical workflows — all manageable from a single license key.",
            },
            {
              question: "How do I install AgentVault?",
              answer: "After subscribing, you'll receive a license key. Run the AgentVault CLI installer and the Cowork plugin automatically connects your agents and MCP connectors to Claude.",
            },
            {
              question: "What's included in every AgentVault plan?",
              answer: "Every plan includes the full agent roster (Product Owner, Developer, Architect, and more), the Cowork plugin installer, and at least 5 canonical workflows. Higher tiers add more connectors, skills, and workflow runs per month.",
            },
          ]))}
        </script>
      </Helmet>
      <Header />

      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 md:py-24 relative overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-30" />
          <div className="container mx-auto px-6 relative z-10 text-center max-w-3xl">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary"
            >
              AI Workflow Automation
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Agent<span className="gradient-text">Vault</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              A complete AI platform that lives inside Claude's Cowork plugin.
              Agents, MCP connectors, skills, and workflows — activated with a
              single license key.
            </p>
          </div>
        </section>

        {/* Value proposition */}
        <section className="pb-8">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-center">
              {[
                { stat: "10+", label: "AI Agents" },
                { stat: "30+", label: "Skills" },
                { stat: "18", label: "MCP Connectors" },
                { stat: "38", label: "Workflows" },
              ].map(({ stat, label }) => (
                <div key={label} className="rounded-xl bg-card border border-border p-4">
                  <p className="text-3xl font-extrabold gradient-text">{stat}</p>
                  <p className="text-sm text-muted-foreground mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Agent Grid */}
        <section className="py-8 md:py-16">
          <div className="container mx-auto px-6 text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Your <span className="gradient-text">Agent Roster</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Every agent has a defined role and toolset. They're included in every AgentVault plan.
            </p>
          </div>
        </section>
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="group rounded-2xl bg-card border border-border card-hover overflow-hidden flex flex-col"
                >
                  {/* Agent Avatar — circular crop with white bg */}
                  <div className="flex justify-center pt-5 sm:pt-8 pb-2 sm:pb-3 bg-primary/5">
                    <div className="w-20 h-20 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-primary/20 bg-white">
                      <AgentImage src={agent.image} alt={agent.name} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-3 sm:p-5 flex flex-col flex-1 text-center">
                    <h3 className="text-base font-bold text-foreground">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {agent.role}
                    </p>
                    <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed mb-3 flex-1 line-clamp-3 sm:line-clamp-none">
                      {agent.description}
                    </p>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      <Wrench className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      {agent.tools.map((tool) => (
                        <Badge
                          key={tool}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tool}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <AgentVaultPricing />

        {/* CTA */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-6 text-center">
            <div className="max-w-2xl mx-auto p-10 rounded-2xl bg-card border border-border">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Ready to Put These Agents to Work?
              </h2>
              <p className="text-muted-foreground mb-6">
                Book a free strategy call and we'll show you which agents fit your business.
              </p>
              <CalendlyBooking placement="agent_roster_cta" />
            </div>
          </div>
        </section>

        {/* Why Agents vs ChatGPT comparison */}
        <WhyAgentsSection />
      </main>

      <Footer />
    </div>
  );
};

export default AgentRoster;
