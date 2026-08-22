import { Link } from "react-router-dom";

// Customer-outcome claims. Unlike PLATFORM_STATS / TIER_ENTITLEMENTS in
// constants.ts, these have no registry equivalent in the AgentVault repo and
// could not be verified against a live source. Values are carried forward
// unchanged; `verifiedOn` records that they are awaiting confirmation so the
// staleness is visible rather than silent.
export const STATS_VERIFIED_ON: string | null = null; // stamp an ISO date once confirmed

const STATS = [
  { value: "20+", label: "hours saved per week", detail: "per client average" },
  { value: "90%", label: "faster lead response", detail: "automated follow-up" },
  { value: "3×", label: "return on investment", detail: "within 12 months" },
];

const StatsBar = () => {
  return (
    <section className="py-8 border-y border-border/50 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16">
          {STATS.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl sm:text-4xl font-bold gradient-text">{stat.value}</div>
              <div className="text-sm font-medium mt-1">{stat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">{stat.detail}</div>
            </div>
          ))}
          <div className="text-center">
            <Link
              to="/roi-calculator"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors border border-primary/30 hover:border-primary/60 rounded-full px-4 py-2"
            >
              Calculate your savings →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsBar;
