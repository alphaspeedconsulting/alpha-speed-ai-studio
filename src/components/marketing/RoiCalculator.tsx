import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calculator, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { trackLead } from "@/lib/analytics";
import { buildFAQPageSchema } from "@/lib/schema";
import { buildCanonicalUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyBooking from "@/components/CalendlyBooking";

type InputState = {
  employees: string;
  hoursPerWeek: string;
  hourlyCost: string;
};

const AUTOMATION_RATE = 0.4;

export function calcAnnualSavings(employees: number, hoursPerWeek: number, hourlyCost: number): number {
  return employees * hoursPerWeek * hourlyCost * 52 * AUTOMATION_RATE;
}

const RoiCalculator = () => {
  const canonicalUrl = buildCanonicalUrl("/roi-calculator");
  const [inputs, setInputs] = useState<InputState>({
    employees: "",
    hoursPerWeek: "",
    hourlyCost: "",
  });
  const [email, setEmail] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const employees = parseFloat(inputs.employees) || 0;
  const hoursPerWeek = parseFloat(inputs.hoursPerWeek) || 0;
  const hourlyCost = parseFloat(inputs.hourlyCost) || 0;
  const hasInputs = employees > 0 && hoursPerWeek > 0 && hourlyCost > 0;
  const annualSavings = hasInputs ? calcAnnualSavings(employees, hoursPerWeek, hourlyCost) : 0;

  const handleChange = (field: keyof InputState) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleReveal = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    trackLead("roi_calculator_email_submitted", {
      result: annualSavings,
      employees,
      hours_per_week: hoursPerWeek,
      hourly_cost: hourlyCost,
    });
    // Email reveal without storage — reveal results regardless
    setRevealed(true);
    setSubmitting(false);
  };

  const roiFaqs = [
    {
      question: "How accurate is this AI ROI calculator?",
      answer: "Our calculator uses an industry-standard 40% task automation rate, which is a conservative estimate based on McKinsey research on automation potential across industries. Your actual savings may be higher depending on the types of tasks automated — highly repetitive tasks like data entry and lead follow-up often see 70-90% automation rates.",
    },
    {
      question: "What types of tasks can AI automate?",
      answer: "AI agents can automate lead qualification and follow-up, appointment scheduling, invoice processing, customer support triage, report generation, data entry and CRM updates, email responses, and multi-step business workflows. Essentially any repetitive task that follows a consistent pattern.",
    },
    {
      question: "How long does it take to see ROI from AI automation?",
      answer: "Most Alpha Speed AI clients see measurable ROI within 4-6 weeks of deployment. Simple workflow automations can deliver savings from day one, while more complex multi-agent systems typically reach full ROI within 3 months.",
    },
    {
      question: "What's the minimum team size that benefits from AI automation?",
      answer: "Even solo entrepreneurs and two-person teams benefit from AI automation. If you spend more than 5 hours per week on repetitive tasks, automation will free up meaningful time. Our smallest clients are one-person operations that use AI agents to handle lead follow-up and scheduling.",
    },
    {
      question: "How much does AI automation cost compared to hiring?",
      answer: "AI automation projects typically cost $2,500-$15,000 as a one-time investment, compared to $40,000-$60,000+ per year for an additional employee. Most automation solutions pay for themselves within 2-4 months through time savings alone.",
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI ROI Calculator | Alpha Speed AI</title>
        <meta name="description" content="Calculate your potential ROI from AI automation. See how much time and money your DFW business can save with custom AI agents and workflow automation." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="AI ROI Calculator | Alpha Speed AI" />
        <meta property="og:description" content="Calculate your potential ROI from AI automation for your DFW business." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI ROI Calculator | Alpha Speed AI" />
        <meta name="twitter:description" content="Calculate your potential ROI from AI automation." />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify(buildFAQPageSchema(roiFaqs))}
        </script>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
              <Calculator className="w-3.5 h-3.5 mr-1.5" />
              ROI Calculator
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              How Much Could You <span className="gradient-text">Save with AI?</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Enter your team's details to see your estimated annual savings from workflow automation.
            </p>
          </div>

          {/* Inputs */}
          <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 space-y-6 mb-6">
            <div className="space-y-2">
              <Label htmlFor="employees">Number of employees doing manual work</Label>
              <Input
                id="employees"
                type="number"
                min="1"
                placeholder="e.g. 5"
                value={inputs.employees}
                onChange={handleChange("employees")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hours">Hours per week per employee on manual tasks</Label>
              <Input
                id="hours"
                type="number"
                min="1"
                max="40"
                placeholder="e.g. 10"
                value={inputs.hoursPerWeek}
                onChange={handleChange("hoursPerWeek")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cost">Average hourly cost per employee (USD)</Label>
              <Input
                id="cost"
                type="number"
                min="1"
                placeholder="e.g. 50"
                value={inputs.hourlyCost}
                onChange={handleChange("hourlyCost")}
              />
            </div>
          </div>

          {/* Results */}
          {hasInputs && (
            <div className="rounded-2xl border border-border overflow-hidden">
              {/* Blurred result + email gate */}
              {!revealed && (
                <div className="relative">
                  {/* Blurred preview */}
                  <div className="p-6 sm:p-8 bg-card select-none pointer-events-none blur-sm" aria-hidden="true">
                    <p className="text-sm text-muted-foreground mb-1">Estimated annual savings</p>
                    <div className="text-4xl sm:text-5xl font-bold gradient-text">
                      ${annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Based on 40% task automation rate
                    </p>
                  </div>

                  {/* Email gate overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm p-4">
                    <form onSubmit={handleReveal} className="w-full max-w-sm space-y-3 text-center">
                      <p className="text-sm font-medium">Enter your email to see your results</p>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          required
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="flex-1"
                        />
                        <Button type="submit" variant="hero" disabled={submitting}>
                          <Mail className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground">No spam. One-time calculation reveal.</p>
                    </form>
                  </div>
                </div>
              )}

              {/* Revealed result */}
              {revealed && (
                <div className="p-6 sm:p-8 bg-card">
                  <p className="text-sm text-muted-foreground mb-1">Estimated annual savings</p>
                  <div className="text-4xl sm:text-5xl font-bold gradient-text">
                    ${annualSavings.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 mb-6">
                    Based on industry average 40% task automation rate
                  </p>
                  <div className="grid grid-cols-3 gap-4 text-center pt-4 border-t border-border/50">
                    <div>
                      <div className="text-lg font-bold">{(hoursPerWeek * employees * 52 * AUTOMATION_RATE).toLocaleString("en-US", { maximumFractionDigits: 0 })}</div>
                      <div className="text-xs text-muted-foreground">hours saved/yr</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{employees}</div>
                      <div className="text-xs text-muted-foreground">employees impacted</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{(hoursPerWeek * AUTOMATION_RATE).toFixed(1)}h</div>
                      <div className="text-xs text-muted-foreground">freed/wk each</div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <Button variant="hero" size="lg" className="w-full group" asChild>
                      <a
                        href="mailto:alpha.speed.consulting@gmail.com?subject=ROI%20Calculator%20—%20Strategy%20Call%20Request"
                        onClick={() => trackLead("roi_calculator_cta_click", { result: annualSavings })}
                      >
                        Book a Free Strategy Call
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* How We Calculate */}
          <div className="mt-12 mb-8">
            <h2 className="text-2xl font-bold mb-4">How We Calculate Your AI ROI</h2>
            <p className="text-muted-foreground mb-4">
              Our calculator uses a straightforward formula based on your team's actual workload:
            </p>
            <div className="rounded-xl bg-card border border-border p-6 mb-4">
              <p className="text-sm font-mono text-center text-primary mb-3">
                Annual Savings = Employees × Hours/Week × Hourly Cost × 52 Weeks × 40%
              </p>
              <p className="text-sm text-muted-foreground text-center">
                The 40% automation rate is a conservative industry benchmark. Highly repetitive tasks like data entry and follow-up emails often see 70-90% automation rates.
              </p>
            </div>
          </div>

          {/* Example Scenarios */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Example Scenarios</h2>
            <div className="space-y-4">
              <div className="rounded-xl bg-card border border-border p-5">
                <h3 className="font-semibold mb-2">Roofing Contractor (5 employees)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Office staff spends 15 hrs/week on lead follow-up, scheduling, and invoice processing at $25/hr.
                </p>
                <p className="text-sm">
                  <span className="font-medium text-primary">Result:</span> $39,000/year in savings — paid back the automation investment in 6 weeks.
                </p>
              </div>
              <div className="rounded-xl bg-card border border-border p-5">
                <h3 className="font-semibold mb-2">E-commerce Business (3 employees)</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Team handles 20 hrs/week of order processing, customer support, and inventory updates at $30/hr.
                </p>
                <p className="text-sm">
                  <span className="font-medium text-primary">Result:</span> $37,440/year in savings — freed up team to focus on marketing and growth.
                </p>
              </div>
              <div className="rounded-xl bg-card border border-border p-5">
                <h3 className="font-semibold mb-2">Solo Consultant</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Spends 10 hrs/week on email follow-up, proposal writing, and scheduling at $75/hr.
                </p>
                <p className="text-sm">
                  <span className="font-medium text-primary">Result:</span> $15,600/year in savings — reclaimed an entire workday per week.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-2xl bg-gradient-to-b from-card to-secondary/30 border border-border p-6 sm:p-8 text-center mb-8">
            <h2 className="text-xl font-bold mb-2">Want to see these savings for your business?</h2>
            <p className="text-muted-foreground mb-6 text-sm">
              Book a free consultation and we'll map out exactly which tasks to automate first.
            </p>
            <CalendlyBooking
              label="Book Free Consultation"
              placement="roi_calculator_bottom"
            />
          </div>

          {/* FAQ */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
            <div className="space-y-2">
              {roiFaqs.map((faq, i) => (
                <div key={i} className="rounded-xl border border-border overflow-hidden">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-card/50 transition-colors"
                  >
                    <span className="text-sm font-medium pr-4">{faq.question}</span>
                    {openFaq === i ? (
                      <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                    )}
                  </button>
                  {openFaq === i && (
                    <div className="px-4 pb-4">
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-8">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RoiCalculator;
