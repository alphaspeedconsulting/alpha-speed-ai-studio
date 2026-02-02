import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const workflows = [
  {
    title: "Roofing Lead Flow",
    description: "From inquiry to appointment in minutes",
    steps: [
      { label: "Lead submits form or sends message", status: "trigger" },
      { label: "AI qualifies lead & asks key questions", status: "active" },
      { label: "System checks availability & offers times", status: "active" },
      { label: "Appointment confirmed & reminders sent", status: "complete" },
    ],
  },
  {
    title: "Estimate Request",
    description: "Automated quote generation and delivery",
    steps: [
      { label: "Customer requests estimate via chat", status: "trigger" },
      { label: "AI collects project details & photos", status: "active" },
      { label: "System generates estimate & PDF", status: "active" },
      { label: "Estimate sent & follow-up scheduled", status: "complete" },
    ],
  },
  {
    title: "Appointment Confirmation",
    description: "Smart reminders that reduce no-shows",
    steps: [
      { label: "Appointment scheduled in system", status: "trigger" },
      { label: "24hr reminder sent via SMS/WhatsApp", status: "active" },
      { label: "2hr reminder with directions & contact", status: "active" },
      { label: "Post-visit follow-up & feedback request", status: "complete" },
    ],
  },
  {
    title: "Follow-Up Automation",
    description: "Stay top of mind without manual effort",
    steps: [
      { label: "Lead goes cold or doesn't respond", status: "trigger" },
      { label: "AI sends personalized follow-up", status: "active" },
      { label: "System tracks engagement & adjusts timing", status: "active" },
      { label: "Lead re-engages or gets archived", status: "complete" },
    ],
  },
];

const WorkflowExamplesSection = () => {
  return (
    <section id="workflows" className="py-12 md:py-24 relative">
      <div className="absolute inset-0 hero-gradient rotate-180 opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How <span className="gradient-text">Automation Works</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Visual examples of real workflows running on Alpha Speed AI. See how each step connects to deliver results.
          </p>
        </div>

        {/* Workflows Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8">
          {workflows.map((workflow, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border card-hover"
            >
              {/* Workflow Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{workflow.title}</h3>
                <p className="text-muted-foreground">{workflow.description}</p>
              </div>

              {/* Workflow Steps */}
              <div className="space-y-4">
                {workflow.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start gap-4">
                    {/* Step Icon/Status */}
                    <div className="flex-shrink-0 mt-1">
                      {step.status === "trigger" && (
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-primary" />
                        </div>
                      )}
                      {step.status === "active" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4 text-primary" />
                        </div>
                      )}
                      {step.status === "complete" && (
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <CheckCircle2 className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-1">
                      <p className="text-foreground leading-relaxed">{step.label}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Optional Demo Link */}
              <div className="mt-6 pt-6 border-t border-border">
                <a
                  href="/#demos"
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
                >
                  See this workflow in action <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Badge variant="outline" className="px-4 py-2 text-sm border-primary/50">
            Every workflow is customizable to your business needs
          </Badge>
        </div>
      </div>
    </section>
  );
};

export default WorkflowExamplesSection;
