import { Link } from "react-router-dom";
import { Zap } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import CalendlyBooking from "@/components/CalendlyBooking";

const getSocialHeadline = (): { headline: string; subheadline: string } | null => {
  const params = new URLSearchParams(window.location.search);
  const source = params.get("utm_source")?.toLowerCase();
  if (!source) return null;

  const socialSources = ["linkedin", "instagram", "facebook", "twitter", "tiktok"];
  if (!socialSources.includes(source)) return null;

  return {
    headline: "See Why DFW Businesses Are Automating with AI",
    subheadline:
      "Custom AI agents and workflow automation that save time, cut costs, and grow your business — without hiring.",
  };
};

const Hero = () => {
  const socialVariant = getSocialHeadline();

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-x-visible overflow-y-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Animated Orb — reduced opacity on mobile */}
      <div className="absolute top-1/4 right-1/4 w-48 h-48 sm:w-96 sm:h-96 bg-primary/10 sm:bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-32 h-32 sm:w-64 sm:h-64 bg-primary/5 sm:bg-primary/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />

      <div className="w-full max-w-[min(100%,1400px)] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 overflow-visible">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Consulting · Automation · Custom Agents</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            {socialVariant ? (
              <>
                See Why DFW Businesses Are{" "}
                <span className="gradient-text">Automating with AI</span>
              </>
            ) : (
              <>
                AI Automation for{" "}
                <span className="gradient-text">DFW Businesses</span>
              </>
            )}
          </h1>

          {/* Subheadline — tighter, single focus */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-balance">
            {socialVariant
              ? socialVariant.subheadline
              : "Custom AI agents that handle your busywork — from lead follow-up to reporting — so you can focus on growth."}
          </p>

          {/* Single primary CTA */}
          <div className="flex flex-col items-center gap-4">
            <CalendlyBooking placement="hero" label="Book Free Consultation" />

            {/* Social proof — micro-testimonial */}
            <p className="text-sm text-muted-foreground mt-2">
              <span className="text-primary font-medium">90% faster lead response</span> · Saved DCR Roofing 20+ hrs/week
            </p>
          </div>

          {/* Secondary links */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <Link
              to="/roi-calculator"
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              onClick={() => trackEvent("cta_click", "hero_roi_link", { placement: "hero" })}
            >
              Calculate your savings &rarr;
            </Link>
            <Link
              to="/agentvault"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => trackEvent("cta_click", "hero_agents_link", { placement: "hero" })}
            >
              Meet our AI agents &rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
