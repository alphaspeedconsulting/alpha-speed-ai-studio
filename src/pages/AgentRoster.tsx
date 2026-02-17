import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Wrench, Bot } from "lucide-react";

interface Agent {
  name: string;
  role: string;
  description: string;
  tools: string[];
  image: string; // path relative to public/
}

const agents: Agent[] = [
  {
    name: "Product Owner",
    role: "Vision & Requirements",
    description:
      "Translates business goals into structured PRDs, user stories, and acceptance criteria. Prioritizes the backlog and keeps every sprint aligned with what matters.",
    tools: ["generate_prd", "prioritize_backlog", "write_user_stories"],
    image: "/placeholder.svg",
  },
  {
    name: "Architect",
    role: "System Design & Standards",
    description:
      "Designs scalable system architectures, evaluates technology choices, and enforces design patterns across the codebase.",
    tools: ["architecture_review", "diagram_generate", "tech_stack_evaluate"],
    image: "/placeholder.svg",
  },
  {
    name: "Developer",
    role: "Code Generation & Implementation",
    description:
      "Writes production-quality code, implements features end-to-end, and handles refactoring, migrations, and integrations.",
    tools: ["code_generate", "refactor", "write_tests"],
    image: "/placeholder.svg",
  },
  {
    name: "Quality",
    role: "Testing & Compliance",
    description:
      "Validates code against best practices, runs automated test suites, and ensures architecture compliance before anything ships.",
    tools: ["validate_best_practices", "run_tests", "security_scan"],
    image: "/placeholder.svg",
  },
  {
    name: "Brainstormer",
    role: "Ideation & Strategy",
    description:
      "Generates creative solutions, explores alternatives, and facilitates structured brainstorming sessions to unblock teams.",
    tools: ["brainstorm_session", "swot_analysis", "idea_rank"],
    image: "/placeholder.svg",
  },
  {
    name: "Schedule Optimizer",
    role: "Planning & Coordination",
    description:
      "Optimizes calendars, resolves scheduling conflicts, and finds the best meeting times across time zones and busy schedules.",
    tools: ["optimize_schedule", "find_slots", "resolve_conflicts"],
    image: "/placeholder.svg",
  },
  {
    name: "Content Generator",
    role: "Writing & Brand Voice",
    description:
      "Drafts blog posts, social content, email campaigns, and marketing copy — all consistent with your brand voice and tone.",
    tools: ["draft_post", "content_calendar", "brand_voice_check"],
    image: "/placeholder.svg",
  },
  {
    name: "Operations Manager",
    role: "Workflows & Automation",
    description:
      "Monitors deployments, manages infrastructure, automates repetitive ops tasks, and keeps systems running smoothly.",
    tools: ["deploy_monitor", "incident_triage", "automate_workflow"],
    image: "/placeholder.svg",
  },
  {
    name: "Customer Relationships",
    role: "CRM & Client Success",
    description:
      "Tracks client interactions, scores leads, manages follow-ups, and ensures no relationship falls through the cracks.",
    tools: ["lead_score", "follow_up_remind", "client_summary"],
    image: "/placeholder.svg",
  },
  {
    name: "Personal Assistant",
    role: "Daily Briefings & Inbox",
    description:
      "Manages your inbox, prepares daily briefings, drafts replies, and handles the small tasks that eat up your day.",
    tools: ["daily_briefing", "draft_reply", "task_prioritize"],
    image: "/placeholder.svg",
  },
];

/** Image with graceful fallback to Bot icon when the file hasn't been added yet. */
const AgentImage = ({ src, alt }: { src: string; alt: string }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary/5">
        <Bot className="w-16 h-16 text-primary/30" />
      </div>
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
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {agents.map((agent) => (
                <div
                  key={agent.name}
                  className="group rounded-2xl bg-card border border-border card-hover overflow-hidden flex flex-col"
                >
                  {/* Agent Photo */}
                  <div className="relative aspect-[3/4] bg-muted overflow-hidden">
                    <AgentImage src={agent.image} alt={agent.name} />

                    {/* Name overlay at bottom of image */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-12 pb-4 px-5">
                      <h3 className="text-xl font-bold text-white">
                        {agent.name}
                      </h3>
                      <p className="text-sm text-primary font-medium">
                        {agent.role}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4 flex-1">
                      {agent.description}
                    </p>

                    {/* Tools */}
                    <div className="flex flex-wrap gap-1.5 items-start">
                      <Wrench className="w-3.5 h-3.5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      {agent.tools.map((tool) => (
                        <Badge
                          key={tool}
                          variant="secondary"
                          className="text-xs font-mono"
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
      </main>

      <Footer />
    </div>
  );
};

export default AgentRoster;
