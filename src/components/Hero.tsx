import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MessageSquare, Mail } from "lucide-react";
import { trackEvent, trackLead } from "@/lib/analytics";

const Hero = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-visible overflow-y-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Animated Orb */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-glow delay-1000" />

      <div className="w-full max-w-[min(100%,1400px)] mx-auto px-6 sm:px-10 lg:px-16 relative z-10 overflow-visible">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Consulting · Automation · Custom Agents</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            DFW's AI{" "}
            <span className="gradient-text">Automation Studio</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            We build custom AI agents and workflow automation that help Dallas-Fort Worth businesses save time, cut costs, and grow — without hiring.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="group" asChild>
              <a
                href="mailto:alpha.speed.consulting@gmail.com?subject=Free%20Strategy%20Call%20Request"
                onClick={() => trackLead("hero_strategy_call_click", { placement: "hero" })}
              >
                <Mail className="w-5 h-5" />
                Book a Free Strategy Call
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Link to="/assistant">
              <Button
                variant="heroOutline"
                size="xl"
                className="group"
                onClick={() => trackEvent("cta_click", "hero_assistant_click", { placement: "hero" })}
              >
                <MessageSquare className="w-5 h-5" />
                Try the Assistant
              </Button>
            </Link>
          </div>

          {/* Honest tagline replacing fake logos */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground">
              Helping small businesses automate and grow with AI since 2025
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
