import { Link } from "react-router-dom";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DEMO_VIDEOS, GOVERNANCE_FACTS, GOVERNANCE_HEADLINE } from "@/lib/constants";

const governanceVideo = DEMO_VIDEOS.find((video) => video.featured);

const GovernanceSection = () => {
  return (
    <section id="governance" className="py-10 md:py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary"
          >
            Governance Layer
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Autonomy with a <span className="gradient-text">hand on the brake</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {GOVERNANCE_HEADLINE}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
          {/* Governance facts */}
          <div className="grid sm:grid-cols-2 gap-4 order-2 lg:order-1">
            {GOVERNANCE_FACTS.map((fact) => (
              <div
                key={fact.title}
                className="group p-5 sm:p-6 rounded-2xl bg-card border border-border card-hover flex flex-col"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <fact.icon className="w-5 h-5 text-primary" />
                </div>
                <p className="text-2xl font-extrabold gradient-text leading-none">
                  {fact.stat}
                </p>
                <h3 className="text-base font-bold mt-2 mb-2">{fact.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {fact.description}
                </p>
              </div>
            ))}
          </div>

          {/* Demo video */}
          <div className="order-1 lg:order-2 lg:sticky lg:top-24">
            {governanceVideo && (
              <div className="rounded-2xl bg-card border border-border overflow-hidden">
                <div className="relative aspect-video bg-muted overflow-hidden rounded-t-2xl">
                  <video
                    src={`${import.meta.env.BASE_URL}${governanceVideo.src}`}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                    aria-label={governanceVideo.title}
                  >
                    {governanceVideo.captionUrl && (
                      <track
                        kind="captions"
                        src={governanceVideo.captionUrl}
                        srcLang="en"
                        label="English"
                        default
                      />
                    )}
                  </video>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">See the governance layer</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    A walkthrough of how approval gates, audit chains, and autonomy
                    levels work together on live workflows.
                  </p>
                  <Link
                    to="/agentvault"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    Explore AgentVault
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GovernanceSection;
