import { useState } from "react";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhyAgentsSection from "@/components/WhyAgentsSection";
import { Badge } from "@/components/ui/badge";
import { Wrench, Bot } from "lucide-react";

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
              Meet the Team
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4">
              Agent <span className="gradient-text">Roster</span>
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
              Every agent on our platform has a clear role, a defined set of
              tools, and one job — making your workflows faster. Here's who's on
              the team.
            </p>
          </div>
        </section>

        {/* Agent Grid */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="group rounded-2xl bg-card border border-border card-hover overflow-hidden flex flex-col"
                >
                  {/* Agent Avatar — circular crop with white bg */}
                  <div className="flex justify-center pt-8 pb-3 bg-primary/5">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 bg-white">
                      <AgentImage src={agent.image} alt={agent.name} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1 text-center">
                    <h3 className="text-base font-bold text-foreground">
                      {agent.name}
                    </h3>
                    <p className="text-sm text-primary font-medium mb-2">
                      {agent.role}
                    </p>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-3 flex-1">
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

        {/* Why Agents vs ChatGPT comparison */}
        <WhyAgentsSection />
      </main>

      <Footer />
    </div>
  );
};

export default AgentRoster;
