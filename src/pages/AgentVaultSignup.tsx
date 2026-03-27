import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useSearchParams, Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const LICENSE_SERVER_URL = "https://agentvault-license-server.onrender.com";

type Tier = "basic" | "advanced" | "custom";

const tierDetails: Record<Exclude<Tier, "custom">, { label: string; price: string; description: string; features: string[] }> = {
  basic: {
    label: "Basic",
    price: "$99/mo",
    description: "6 skills, 6 connectors, 5 workflows",
    features: ["6 document & productivity skills", "Gmail Learning Filter + Google Calendar", "5 canonical workflows", "100 tool calls / hour"],
  },
  advanced: {
    label: "Advanced",
    price: "$199/mo",
    description: "Full agent suite — 30 skills, 18 connectors, 38 workflows",
    features: ["Everything in Basic", "30 skills + 18 connectors", "13 AI Product Agents", "38 canonical workflows", "1,000 tool calls / hour"],
  },
};

const AgentVaultSignup = () => {
  useScrollToTop();

  const [searchParams] = useSearchParams();
  const initialTier = (searchParams.get("tier") ?? "basic") as Tier;

  const [tier, setTier] = useState<Tier>(initialTier === "advanced" ? "advanced" : "basic");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      const res = await fetch(`${LICENSE_SERVER_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier, email }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { detail?: string }).detail ?? `Request failed (${res.status})`);
      }

      const data = await res.json() as { checkout_url: string };
      window.location.href = data.checkout_url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const details = tierDetails[tier as Exclude<Tier, "custom">];

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Get Started with AgentVault | Alpha Speed AI</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Header />

      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-lg">
          <div className="text-center mb-8">
            <Badge
              variant="outline"
              className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary"
            >
              Start Your Subscription
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Get <span className="gradient-text">AgentVault</span>
            </h1>
            <p className="text-muted-foreground">
              You'll be redirected to Stripe to complete payment. Your license key
              will be shown immediately after.
            </p>
          </div>

          <div className="rounded-2xl bg-card border border-border p-6">
            {/* Tier selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-foreground mb-3">Choose your plan</p>
              <div className="grid grid-cols-2 gap-3">
                {(["basic", "advanced"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTier(t)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      tier === t
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/40"
                    }`}
                  >
                    <p className="font-semibold text-foreground capitalize">{t}</p>
                    <p className="text-sm text-primary font-medium">{tierDetails[t].price}</p>
                    <p className="text-xs text-muted-foreground mt-1">{tierDetails[t].description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected tier features */}
            {details && (
              <ul className="mb-6 space-y-2">
                {details.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-foreground">
                    <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            {/* Email form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="av-email" className="text-sm font-medium text-foreground block mb-1.5">
                  Work email
                </label>
                <input
                  id="av-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {error && (
                <p className="text-sm text-destructive">{error}</p>
              )}

              <Button
                type="submit"
                variant="hero"
                size="default"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Redirecting to Stripe…" : "Continue to Payment →"}
              </Button>
            </form>

            <p className="text-xs text-muted-foreground text-center mt-4">
              Secure checkout via Stripe. Cancel anytime.{" "}
              <Link to="/agentvault" className="underline hover:text-foreground">
                Back to plans
              </Link>
            </p>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Need a custom quote?{" "}
            <Link to="/#contact" className="text-primary font-medium hover:underline">
              Contact us
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AgentVaultSignup;
