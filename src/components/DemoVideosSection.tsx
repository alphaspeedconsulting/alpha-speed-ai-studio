import { Play, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Placeholder video - can be updated with actual demo video URL
const DEMO_VIDEO_URL = "https://www.youtube.com/embed/dQw4w9WgXcQ";

const demoVideos = [
  {
    title: "Full Platform Walkthrough",
    description: "See how Alpha Speed AI handles lead capture, qualification, and scheduling end-to-end in a real roofing business scenario.",
    embedUrl: DEMO_VIDEO_URL,
    duration: "5:30",
  },
];

const DemoVideosSection = () => {
  return (
    <section id="demos" className="py-24 relative">
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
            Real workflows, real results. See Alpha Speed AI in action with these hands-on demonstrations.
          </p>
        </div>

        {/* Video Grid */}
        <div className="max-w-4xl mx-auto space-y-8">
          {demoVideos.map((video, index) => (
            <div
              key={index}
              className="group rounded-2xl bg-card border border-border card-hover overflow-hidden"
            >
              {/* Video Embed */}
              <div className="relative aspect-video bg-muted">
                <iframe
                  src={video.embedUrl}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>

              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{video.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {video.description}
                    </p>
                  </div>
                  <Badge variant="secondary" className="flex-shrink-0">
                    {video.duration}
                  </Badge>
                </div>
              </div>
            </div>
          ))}

          {/* Additional Demo Links (Optional) */}
          <div className="grid sm:grid-cols-2 gap-6 mt-8">
            <a
              href="#contact"
              className="group p-6 rounded-xl bg-card border border-border card-hover flex items-center gap-4 hover:border-primary/50 transition-all"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                <Play className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-bold mb-1">Request Custom Demo</h4>
                <p className="text-sm text-muted-foreground">
                  See Alpha Speed AI tailored to your business
                </p>
              </div>
            </a>

            <a
              href="/assistant"
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
            </a>
          </div>
        </div>

        {/* Note About Placeholder */}
        <div className="mt-12 text-center">
          <p className="text-sm text-muted-foreground">
            Demo video URLs can be easily updated by your marketing team
          </p>
        </div>
      </div>
    </section>
  );
};

export default DemoVideosSection;
