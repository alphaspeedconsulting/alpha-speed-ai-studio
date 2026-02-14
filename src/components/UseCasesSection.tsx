import { Workflow, Bot, Mail, Brain, Code, BarChart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const useCases = [
  {
    icon: Workflow,
    title: "Multi-Step Workflow Automation",
    description:
      "We built a production workflow engine that manages 11-step construction processes end-to-end — from project creation through scheduling, daily completion reports, invoicing, and payment. Each step triggers the next automatically with built-in email notifications and status tracking.",
    outcome: "Projects that used to take hours of manual coordination now run themselves.",
    builtWith: "DCR Portal",
  },
  {
    icon: Bot,
    title: "Multi-Agent AI Systems",
    description:
      "Our roofing chatbot runs 6 specialized AI agents — customer, roof, gutter, email, status, and scheduling — all coordinated by a supervisor that routes requests to the right agent. It handles lead qualification, project creation, workflow advancement, and customer communication autonomously.",
    outcome: "One AI system replaces an entire operations coordinator.",
    builtWith: "DCR Agent System",
  },
  {
    icon: Mail,
    title: "Intelligent Email Processing",
    description:
      "We built email automation that reads inbound messages, detects intent using keyword analysis (measurements, invoices, completion confirmations), and automatically advances workflow steps. It generates context-aware replies, manages drafts, and handles multi-channel communication via Gmail and WhatsApp.",
    outcome: "Emails that trigger real business actions — not just auto-replies.",
    builtWith: "DCR Portal",
  },
  {
    icon: Brain,
    title: "Personal AI Executive Assistant",
    description:
      "AlphaAI runs 24/7 on a Mac Mini with persistent memory, a task board, and a workflow engine. It remembers context across sessions, tracks deliverables, and manages daily operations — all with hard-stop safety rules and a privacy-first architecture.",
    outcome: "An always-on AI team member that actually knows your business.",
    builtWith: "AlphaAI",
  },
  {
    icon: Code,
    title: "AI-Powered Development Tools",
    description:
      "Our MCP server gives Claude the ability to generate PRDs, analyze architecture options across 8 platforms, create sales pitches from company research, and batch-process leads from CSV files. Custom slash commands handle code review, production debugging, and deployment — all from the terminal.",
    outcome: "Development and sales workflows that run in minutes instead of days.",
    builtWith: "AI Product Agents + Claude Skills",
  },
  {
    icon: BarChart,
    title: "Real-Time Dashboards & Project Tracking",
    description:
      "Live dashboards showing workflow status, pending items, team assignments, and project timelines. Filter by workflow type, track daily completion reports, and monitor agent health — all updating in real time as work moves through the system.",
    outcome: "Complete visibility into every project without asking anyone for updates.",
    builtWith: "DCR Portal",
  },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-12 md:py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What We've <span className="gradient-text">Built</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real capabilities from production systems we've shipped. Not mockups — working software running in businesses today.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border card-hover"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <useCase.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">{useCase.title}</h3>
                  <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                    {useCase.builtWith}
                  </Badge>
                </div>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {useCase.description}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-primary">
                  → {useCase.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
