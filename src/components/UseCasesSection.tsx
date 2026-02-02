import { MessageCircle, Calendar, Clock, FileText, BarChart } from "lucide-react";

const useCases = [
  {
    icon: MessageCircle,
    title: "Lead Follow-Up That Never Sleeps",
    description: "Every new lead gets an instant response—day or night. Your AI assistant qualifies them, answers questions, and schedules next steps automatically.",
    outcome: "Turn more inquiries into appointments without lifting a finger.",
  },
  {
    icon: Calendar,
    title: "Scheduling & Reminders",
    description: "Your team stays on track with smart scheduling that handles bookings, sends reminders, and reschedules when plans change.",
    outcome: "Fewer no-shows and a calendar that manages itself.",
  },
  {
    icon: Clock,
    title: "24/7 Customer Chat",
    description: "Whether it's text, WhatsApp, or web chat, your customers get helpful answers instantly—even outside business hours.",
    outcome: "Happy customers and more time for your team to focus on high-value work.",
  },
  {
    icon: FileText,
    title: "Estimates & Intake Automation",
    description: "Collect project details, generate estimates, and gather documents automatically—no more back-and-forth emails.",
    outcome: "Faster quotes and a smoother customer experience.",
  },
  {
    icon: BarChart,
    title: "Reporting You Can Trust",
    description: "Get real-time insights into leads, appointments, and workflow status—all in one dashboard you can check anytime.",
    outcome: "Make better decisions with data that's always up to date.",
  },
];

const UseCasesSection = () => {
  return (
    <section id="use-cases" className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What You Can <span className="gradient-text">Automate</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real scenarios, real outcomes. See how Alpha Speed AI helps small businesses like yours save time and grow.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6">
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
                  <h3 className="text-xl font-bold mb-2">{useCase.title}</h3>
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
