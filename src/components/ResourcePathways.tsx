import { ArrowRight, BarChart3, BookOpen, Briefcase, Bot } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "@/lib/analytics";

const PATHWAYS = [
  {
    title: "Browse AI Automation Insights",
    description: "Practical articles on AI agents, pricing, ROI, and workflow automation for small businesses.",
    to: "/blog",
    trackingName: "resource_path_blog",
    icon: BookOpen,
  },
  {
    title: "Review Client Case Studies",
    description: "See the workflows, results, and before-and-after outcomes from real Alpha Speed AI projects.",
    to: "/case-studies",
    trackingName: "resource_path_case_studies",
    icon: Briefcase,
  },
  {
    title: "Estimate Your AI ROI",
    description: "Use the calculator to estimate how much manual time and budget your team could recover.",
    to: "/roi-calculator",
    trackingName: "resource_path_roi",
    icon: BarChart3,
  },
  {
    title: "Explore AgentVault",
    description: "See the agent roster, workflows, and connectors behind the Alpha Speed AI platform.",
    to: "/agentvault",
    trackingName: "resource_path_agentvault",
    icon: Bot,
  },
];

const ResourcePathways = () => {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <p className="text-sm font-semibold tracking-wide uppercase text-primary/80 mb-3">
            Explore by Intent
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Start with the <span className="gradient-text">right entry point</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you want proof, pricing context, implementation ideas, or the product itself, these are the fastest paths through the site.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 max-w-5xl mx-auto">
          {PATHWAYS.map((pathway) => {
            const Icon = pathway.icon;

            return (
              <Link
                key={pathway.to}
                to={pathway.to}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
                onClick={() =>
                  trackEvent("cta_click", pathway.trackingName, {
                    placement: "homepage_resource_pathways",
                    destination: pathway.to,
                  })
                }
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {pathway.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {pathway.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Go there
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ResourcePathways;
