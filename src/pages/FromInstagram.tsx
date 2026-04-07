import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyBooking from "@/components/CalendlyBooking";
import { trackEvent } from "@/lib/analytics";

const BENEFITS = [
  "Custom AI agents that handle lead follow-up, scheduling, and reporting",
  "90% faster response times for your customers",
  "Save 20+ hours per week on repetitive tasks",
];

const FromInstagram = () => {
  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Welcome from Instagram | Alpha Speed AI</title>
        <meta name="description" content="Thanks for following us on Instagram! See how Alpha Speed AI builds custom AI agents for DFW businesses." />
        <link rel="canonical" href="https://alphaspeedai.com/from/instagram" />
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-10">
            <p className="text-sm font-medium text-primary mb-3">
              Welcome from Instagram
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              AI That Works <span className="gradient-text">While You Sleep</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              We build custom AI agents for DFW businesses — not chatbots, real digital employees that do the work.
            </p>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl bg-card border border-border p-6 sm:p-8 mb-8">
            <div className="space-y-4">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <p className="text-sm">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center space-y-4">
            <CalendlyBooking
              label="Book a Free Consultation"
              placement="from_instagram"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4">
              <Link
                to="/case-studies"
                className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5"
                onClick={() => trackEvent("cta_click", "from_ig_case_studies", { placement: "from_instagram" })}
              >
                See our work <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/roi-calculator"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1.5"
                onClick={() => trackEvent("cta_click", "from_ig_roi", { placement: "from_instagram" })}
              >
                Calculate your savings <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default FromInstagram;
