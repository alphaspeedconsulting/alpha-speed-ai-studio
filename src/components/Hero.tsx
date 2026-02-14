import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, MessageSquare } from "lucide-react";

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
        <div className="max-w-5xl mx-auto text-center overflow-visible pl-0 pr-20 sm:pr-28 lg:pr-36">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI Consulting · Automation · Custom Agents</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight overflow-visible pr-4 sm:pr-6">
            AI That Works For{" "}
            <span className="gradient-text">Your Business</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance">
            From workflow automation to custom AI agents — we help small businesses save time, reduce costs, and grow with AI-powered solutions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/assistant">
              <Button variant="hero" size="xl" className="group">
                <MessageSquare className="w-5 h-5" />
                Try the Assistant
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button variant="heroOutline" size="xl" asChild>
              <a href={`${baseUrl}#contact`}>Schedule a Consultation</a>
            </Button>
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
