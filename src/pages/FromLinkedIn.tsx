import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, TrendingUp, Clock, DollarSign } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyBooking from "@/components/CalendlyBooking";
import { trackEvent } from "@/lib/analytics";

const STATS = [
  { icon: Clock, value: "20+ hrs", label: "saved per week per client" },
  { icon: TrendingUp, value: "90%", label: "faster lead response" },
  { icon: DollarSign, value: "3×", label: "ROI within 12 months" },
];

const FromLinkedIn = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Welcome from LinkedIn | Alpha Speed AI</title>
        <meta name="description" content="Alpha Speed AI builds custom AI agents and workflow automation for DFW businesses. See our ROI and book a free consultation." />
        <link rel="canonical" href="https://alphaspeedai.com/from/linkedin" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-3">
              Welcome from LinkedIn
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Automate Your Business with <span className="gradient-text">Custom AI Agents</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              DFW's AI automation studio. We build AI agents that handle your repetitive work — lead qualification, follow-up, reporting, and more.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center p-4 rounded-xl bg-card border border-border">
                <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 mb-8 text-center">
            <p className="text-sm text-muted-foreground italic mb-3">
              "Alpha Speed AI built us an agent that handles lead intake, sends follow-ups, and updates our CRM — we went from 24-hour response times to under 15 minutes."
            </p>
            <p className="text-sm font-medium">— DCR Roofing, DFW</p>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <CalendlyBooking
              label="Schedule a Free Strategy Call"
              placement="from_linkedin"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Link
                to="/case-studies"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5"
                onClick={() => trackEvent("cta_click", "from_li_case_studies", { placement: "from_linkedin" })}
              >
                View case studies <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/roi-calculator"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                onClick={() => trackEvent("cta_click", "from_li_roi", { placement: "from_linkedin" })}
              >
                Calculate your ROI <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FromLinkedIn;
