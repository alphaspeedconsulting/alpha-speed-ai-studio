import {
  MessageSquare,
  X,
  Check,
  Mail,
  CalendarDays,
  UserCheck,
  Workflow,
  Moon,
  Brain,
  ArrowRight,
  FileText,
  ShieldCheck,
  BarChart3,
  Users,
  Sparkles,
  Phone,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

interface ComparisonRow {
  capability: string;
  icon: LucideIcon;
  chatgpt: boolean;
  agent: boolean;
  pro?: boolean; // Pro package feature
}

const comparisonRows: ComparisonRow[] = [
  // --- Both can do ---
  {
    capability: "Answer questions",
    icon: MessageSquare,
    chatgpt: true,
    agent: true,
  },
  // --- Agent basics ---
  {
    capability: "Send emails on your behalf",
    icon: Mail,
    chatgpt: false,
    agent: true,
  },
  {
    capability: "Check your calendar & book meetings",
    icon: CalendarDays,
    chatgpt: false,
    agent: true,
  },
  {
    capability: "Follow up with leads automatically",
    icon: UserCheck,
    chatgpt: false,
    agent: true,
  },
  {
    capability: "Run multi-step business processes",
    icon: Workflow,
    chatgpt: false,
    agent: true,
  },
  {
    capability: "Work while you sleep",
    icon: Moon,
    chatgpt: false,
    agent: true,
  },
  {
    capability: "Remember your business context",
    icon: Brain,
    chatgpt: false,
    agent: true,
  },
  // --- Pro package ---
  {
    capability: "Run business workflows autonomously",
    icon: Workflow,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Create polished docs, decks, and spreadsheets",
    icon: FileText,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Learn your email habits & auto-organize your inbox",
    icon: Mail,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Plan your family's schedule across calendars",
    icon: CalendarDays,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Manage your CRM pipeline end-to-end",
    icon: Users,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Run security scans & code quality audits",
    icon: ShieldCheck,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Generate product specs from a feature request",
    icon: Sparkles,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Draft & send sales pitches automatically",
    icon: BarChart3,
    chatgpt: false,
    agent: true,
    pro: true,
  },
  {
    capability: "Capture tasks on your phone, execute on desktop",
    icon: Phone,
    chatgpt: false,
    agent: true,
    pro: true,
  },
];

const WhyAgentsSection = () => {
  const baseUrl = import.meta.env.BASE_URL;

  const basicRows = comparisonRows.filter((r) => !r.pro);
  const proRows = comparisonRows.filter((r) => r.pro);

  return (
    <section className="py-12 md:py-24 relative">
      <div className="absolute inset-0 hero-gradient rotate-180 opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary"
          >
            The Difference
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            You've Used ChatGPT.{" "}
            <span className="gradient-text">Here's What It Can't Do.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            ChatGPT talks to you. Our agents work for you. They don't just
            suggest — they send the email, book the meeting, and move your
            projects forward while you focus on what matters.
          </p>
        </div>

        {/* Side-by-Side Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {/* ChatGPT Side */}
          <div className="p-8 rounded-2xl bg-card border border-border relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-muted-foreground/30" />
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-1">
                What you have now
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                A Chatbot
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                A smart conversation partner — but the work still falls on you.
              </p>
            </div>
            <div className="space-y-4">
              {basicRows.map((row) => (
                <div key={row.capability} className="flex items-center gap-3">
                  {row.chatgpt ? (
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </div>
                  )}
                  <span
                    className={
                      row.chatgpt
                        ? "text-sm text-foreground"
                        : "text-sm text-muted-foreground"
                    }
                  >
                    {row.capability}
                  </span>
                </div>
              ))}
            </div>

            {/* Pro section — all X's */}
            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
                Pro capabilities
              </p>
              <div className="space-y-4">
                {proRows.map((row) => (
                  <div key={row.capability} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <X className="w-3.5 h-3.5 text-destructive" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {row.capability}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground italic">
                "It gave me a great answer. Now I have to go do everything
                myself."
              </p>
            </div>
          </div>

          {/* Agent Side */}
          <div className="p-8 rounded-2xl bg-card border border-primary/50 relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-primary" />
            <div className="mb-6">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">
                What we build for you
              </p>
              <h3 className="text-2xl font-bold text-foreground">
                An AI Agent
              </h3>
              <p className="text-sm text-muted-foreground mt-2">
                A digital employee with access to your tools — it does the work.
              </p>
            </div>
            <div className="space-y-4">
              {basicRows.map((row) => (
                <div key={row.capability} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-sm text-foreground">
                    {row.capability}
                  </span>
                </div>
              ))}
            </div>

            {/* Pro section — all checks with Pro badge */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Pro capabilities
                </p>
                <Badge className="text-[10px] px-1.5 py-0 bg-primary/20 text-primary border-primary/30">
                  PRO
                </Badge>
              </div>
              <div className="space-y-4">
                {proRows.map((row) => (
                  <div key={row.capability} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <span className="text-sm text-foreground">
                      {row.capability}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-border">
              <p className="text-sm text-primary font-medium">
                "It sent the follow-up, booked the meeting, and updated the
                CRM — before I finished my coffee."
              </p>
            </div>
          </div>
        </div>

        {/* The Analogy */}
        <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-card border border-border text-center">
          <h3 className="text-xl font-bold mb-4">Think of it this way</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="font-semibold text-foreground">
                  A chatbot
                </span>{" "}
                is like calling a really smart friend for advice. Great ideas —
                but then you still have to go do everything.
              </p>
            </div>
            <div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                <span className="font-semibold text-primary">An agent</span> is
                like hiring an assistant who already has your logins, knows your
                processes, and does the work while you sleep.
              </p>
            </div>
          </div>
          <div className="mt-6">
            <a
              href={`${baseUrl}#contact`}
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              See what an agent can do for your business{" "}
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAgentsSection;
