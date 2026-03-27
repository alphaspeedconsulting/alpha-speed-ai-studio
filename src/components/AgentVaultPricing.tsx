import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Basic",
    price: "$99",
    period: "/mo",
    description: "For teams getting started with AI workflow automation.",
    features: [
      "6 document & productivity skills",
      "Gmail Learning Filter connector",
      "Google Calendar connector",
      "5 canonical workflows",
      "100 tool calls / hour",
      "License key + Cowork plugin install",
    ],
    cta: "Get Started",
    href: "/agentvault/signup?tier=basic",
    highlighted: false,
  },
  {
    name: "Advanced",
    price: "$199",
    period: "/mo",
    overage: "+ $0.15/run above 20 workflow runs/mo",
    description: "Full agent suite, SEO tools, dev workflows, and recon.",
    features: [
      "Everything in Basic",
      "30 skills — SEO, dev, recon, lead gen",
      "18 connectors incl. Family Optimizer",
      "13 AI Product Agents",
      "38 canonical workflows",
      "1,000 tool calls / hour",
    ],
    cta: "Get Started",
    href: "/agentvault/signup?tier=advanced",
    highlighted: true,
  },
  {
    name: "Custom",
    price: "$499+",
    period: "/mo",
    description: "White-label, unlimited rate limits, and custom connector bundles.",
    features: [
      "Everything in Advanced",
      "All skills, connectors & workflows",
      "Custom connector bundles",
      "White-label branding",
      "10,000 tool calls / hour",
      "Dedicated support",
    ],
    cta: "Contact Us",
    href: "/#contact",
    highlighted: false,
  },
];

const AgentVaultPricing = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary"
          >
            Pricing
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Pick Your <span className="gradient-text">Plan</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every tier includes the AgentVault CLI installer, Cowork plugin, and
            the full agent roster above. Cancel anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-2xl border flex flex-col p-6 ${
                tier.highlighted
                  ? "bg-primary/5 border-primary/40 shadow-lg shadow-primary/10"
                  : "bg-card border-border"
              }`}
            >
              {tier.highlighted && (
                <div className="text-center mb-4">
                  <Badge className="bg-primary text-primary-foreground text-xs px-3 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}

              <h3 className="text-xl font-bold text-foreground mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-extrabold text-foreground">{tier.price}</span>
                <span className="text-muted-foreground text-sm">{tier.period}</span>
              </div>
              {tier.overage && (
                <p className="text-xs text-muted-foreground mb-2">{tier.overage}</p>
              )}
              <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>

              <ul className="space-y-2.5 mb-8 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link to={tier.href}>
                <Button
                  variant={tier.highlighted ? "hero" : "heroOutline"}
                  size="default"
                  className="w-full"
                >
                  {tier.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AgentVaultPricing;
