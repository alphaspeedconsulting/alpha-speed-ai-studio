import { Badge } from "@/components/ui/badge";
import { Instagram } from "lucide-react";
import { INSTAGRAM_FEED_ID, INSTAGRAM_PROFILE_URL } from "@/lib/constants";
import "@behold/widget";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "behold-widget": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { "feed-id": string },
        HTMLElement
      >;
    }
  }
}

const InstagramFeed = () => {
  const isConfigured = INSTAGRAM_FEED_ID !== "YOUR_FEED_ID_HERE";

  return (
    <section id="instagram" className="py-10 md:py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge
            variant="outline"
            className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary"
          >
            Follow Along
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Latest from <span className="gradient-text">Instagram</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See what we're building, shipping, and sharing with the community.
          </p>
        </div>

        {/* Feed Content */}
        {isConfigured ? (
          <div className="max-w-5xl mx-auto">
            <behold-widget feed-id={INSTAGRAM_FEED_ID} />
          </div>
        ) : (
          <div className="max-w-md mx-auto text-center">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-8 rounded-2xl bg-card border border-border card-hover flex flex-col items-center text-center hover:border-primary/50 transition-all inline-flex"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Instagram className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Follow Us on Instagram</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                @alphaspeedai — AI builds, agent demos, and behind-the-scenes content.
              </p>
            </a>
          </div>
        )}

        {/* CTA Link */}
        {isConfigured && (
          <div className="text-center mt-8">
            <a
              href={INSTAGRAM_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium"
            >
              <Instagram className="w-4 h-4" />
              Follow @alphaspeedai
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default InstagramFeed;
