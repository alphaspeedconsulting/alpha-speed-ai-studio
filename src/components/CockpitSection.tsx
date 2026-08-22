import { Badge } from "@/components/ui/badge";
import { COCKPIT_CAPABILITIES, DEMO_VIDEOS } from "@/lib/constants";
import YouTubeEmbed from "@/components/YouTubeEmbed";

const cockpitVideo = DEMO_VIDEOS.find(
  (video) => video.title === "AgentVault Cockpit Walk"
);

const CockpitSection = () => {
  return (
    <section id="cockpit" className="py-10 md:py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary"
          >
            Cockpit &amp; Mission Control
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            We run our business from the{" "}
            <span className="gradient-text">same command center</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Agents are only useful if you can see what they are doing. Every
            engagement we deliver is captured, queued, approved, and tracked in one
            cockpit — the same one we hand to clients.
          </p>
        </div>

        {/* Walkthrough */}
        {cockpitVideo?.youtubeId && (
          <div className="max-w-3xl mx-auto mb-10 md:mb-16">
            <div className="rounded-2xl bg-card border border-border overflow-hidden">
              <div className="relative aspect-video bg-muted overflow-hidden">
                <YouTubeEmbed
                  youtubeId={cockpitVideo.youtubeId}
                  title={cockpitVideo.title}
                />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-2">{cockpitVideo.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cockpitVideo.description}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Capability Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
          {COCKPIT_CAPABILITIES.map((capability) => (
            <div
              key={capability.title}
              className="group p-5 sm:p-8 rounded-2xl bg-card border border-border card-hover flex flex-col"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <capability.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{capability.title}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4 flex-1">
                {capability.description}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm font-medium text-primary">
                  → {capability.outcome}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CockpitSection;
