import { Link } from "react-router-dom";
import { Play, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const DemoVideosSection = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <section id="demos" className="py-12 md:py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
            See It In Action
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Watch <span className="gradient-text">Demos</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Real workflows, real results. See αlphaspeed AI in action with these hands-on demonstrations.
          </p>
        </div>

        {/* Video Placeholder - Coming Soon */}
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="group rounded-2xl bg-card border border-border card-hover overflow-hidden">
            <div className="relative aspect-video bg-muted flex items-center justify-center">
              <p className="text-xl font-medium text-muted-foreground">Coming soon</p>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Full Platform Walkthrough</h3>
              <p className="text-muted-foreground leading-relaxed">
                See how αlphaspeed AI handles lead capture, qualification, and scheduling end-to-end in a real roofing business scenario.
              </p>
            </div>
          </div>

          {/* Additional Demo Links (Optional) */}
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <a
              href={`${baseUrl}#contact`}
              className="group p-6 rounded-xl bg-card border border-border card-hover flex items-center gap-4 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Request Custom Demo</h4>
                <p className="text-sm text-muted-foreground">
                  See αlphaspeed AI tailored to your business
                </p>
              </div>
            </a>

            <Link
              to="/assistant"
              className="group p-6 rounded-xl bg-card border border-border card-hover flex items-center gap-4 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <ExternalLink className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Try the Assistant</h4>
                <p className="text-sm text-muted-foreground">
                  Interactive chat experience with our AI
                </p>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default DemoVideosSection;
