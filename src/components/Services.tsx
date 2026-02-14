import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SERVICE_PILLARS, SUBSCRIPTION_SERVICES } from "@/lib/constants";

const Services = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="services" className="py-12 md:py-24 relative">
      <div className="absolute inset-0 hero-gradient rotate-180 opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            What We <span className="gradient-text">Do</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Five core services designed to meet you wherever you are on your AI journey — from first conversation to fully autonomous agents.
          </p>
        </div>

        {/* Service Pillars Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {SERVICE_PILLARS.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border card-hover flex flex-col"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                {service.description}
              </p>
              <div className="text-xs text-muted-foreground mb-3">
                <span className="font-semibold text-foreground">Ideal for:</span>{" "}
                {service.idealFor}
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-primary">
                  {service.proofPoint}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Subscription AI Services Teaser */}
        <div className="p-8 rounded-2xl bg-card border border-border">
          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
              <Clock className="w-3.5 h-3.5 mr-1.5" />
              Coming Soon
            </Badge>
            <h3 className="text-2xl font-bold mb-2">
              AI Agents <span className="gradient-text">as a Service</span>
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Always-on AI team members that work for your business 24/7. Subscribe, deploy, and scale.
            </p>
          </div>
          <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6">
            {SUBSCRIPTION_SERVICES.map((service, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-4 rounded-lg bg-background/50"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm mb-1">{service.title}</h4>
                  <p className="text-xs text-muted-foreground">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <a
              href={`${baseUrl}#contact`}
              className="text-sm font-medium text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-2"
            >
              Get early access <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
