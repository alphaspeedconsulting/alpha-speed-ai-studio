import { Settings, Zap, Brain, Cloud, Server, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const platformFeatures = [
  {
    icon: Settings,
    title: "Built for Flexibility",
    description: "One platform powers any service business — roofing, landscaping, HVAC, professional services, and more. Config-driven workflows let you extend and customize without rebuilding from scratch.",
  },
  {
    icon: Zap,
    title: "Add Workflows in Hours",
    description: "Auto-discovery, shared utilities, and optional code generation mean new automation goes live fast—hours, not days.",
  },
  {
    icon: Brain,
    title: "AI-Powered End-to-End",
    description: "From lead capture to qualification, scheduling, and follow-up—your entire pipeline runs on intelligent automation.",
  },
];

const platformCapabilities = [
  "PRD generation & architecture analysis",
  "Lead qualification & routing",
  "WhatsApp & multi-channel messaging",
  "Real-time dashboard & monitoring",
  "Security review & compliance checks",
  "Custom agent workflows",
];

const deploymentOptions = [
  {
    icon: Cloud,
    title: "Cloud Hosting",
    description: "Deploy on Render or your preferred cloud platform with automatic scaling and updates.",
  },
  {
    icon: Server,
    title: "On-Premises",
    description: "Run entirely on your own infrastructure—Mac Mini, private cloud, or hybrid setups.",
  },
  {
    icon: Shield,
    title: "Hybrid Approach",
    description: "Mix cloud and on-prem for the perfect balance of control and convenience.",
  },
];

const PlatformSection = () => {
  return (
    <section id="platform" className="py-12 md:py-24 relative">
      <div className="absolute inset-0 hero-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
            The Backbone of Your Business
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Why <span className="gradient-text">αlphaspeed AI</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A unified AI operations platform that brings together specialized agent teams for any industry—all on a single control plane you can monitor, extend, and deploy anywhere.
          </p>
        </div>

        {/* Platform Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {platformFeatures.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* One Platform - All Capabilities */}
        <div className="mb-16 p-8 rounded-2xl bg-card border border-border">
          <h3 className="text-2xl font-bold mb-6 text-center">
            <span className="gradient-text">One Platform</span> — All the Capabilities You Need
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {platformCapabilities.map((capability, index) => (
              <div key={index} className="flex items-center gap-3 p-4 rounded-lg bg-background/50">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-foreground">{capability}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Deployment Options */}
        <div>
          <h3 className="text-2xl font-bold mb-8 text-center">
            Deploy <span className="gradient-text">Your Way</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deploymentOptions.map((option, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <option.icon className="w-8 h-8 text-primary" />
                </div>
                <h4 className="text-lg font-bold mb-2">{option.title}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {option.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlatformSection;
