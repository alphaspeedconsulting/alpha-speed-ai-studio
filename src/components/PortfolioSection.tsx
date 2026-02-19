import { Badge } from "@/components/ui/badge";
import { PORTFOLIO_ITEMS } from "@/lib/constants";

// Import product screenshots
import dcr1 from "@/assets/product screenshots/dcr1.png";
import dcr2 from "@/assets/product screenshots/dcr2.png";
import dcr3 from "@/assets/product screenshots/dcr3.png";
import smokies from "@/assets/product screenshots/smokies.png";

// Map filenames to imported assets
const imageMap: Record<string, string> = {
  "dcr1.png": dcr1,
  "dcr2.png": dcr2,
  "dcr3.png": dcr3,
  "smokies.png": smokies,
};

const PortfolioSection = () => {
  return (
    <section id="portfolio" className="py-10 md:py-16 relative">
      <div className="absolute inset-0 hero-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
            Real Work, Real Results
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            See what we've built for businesses like yours.
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="space-y-12">
          {PORTFOLIO_ITEMS.map((item, index) => {
            const hasImages = item.images.length > 0;
            return (
              <div
                key={index}
                className="rounded-2xl bg-card border border-border card-hover overflow-hidden"
              >
                {/* Screenshots */}
                {hasImages && (
                  <div className={`grid gap-1 ${item.images.length === 1 ? "grid-cols-1" : item.images.length === 2 ? "grid-cols-2" : "grid-cols-3"}`}>
                    {item.images.map((img, imgIndex) => (
                      <div key={imgIndex} className="relative aspect-video bg-muted overflow-hidden">
                        <img
                          src={imageMap[img]}
                          alt={`${item.title} screenshot ${imgIndex + 1}`}
                          className="w-full h-full object-cover object-top"
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                )}

                {/* No-image fallback — compact gradient placeholder (e.g. AI Studio card) */}
                {!hasImages && (
                  <div className="aspect-[6/1] max-h-28 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 flex items-center justify-center">
                    <span className="text-2xl font-bold gradient-text opacity-40">
                      αlphaspeed
                    </span>
                  </div>
                )}

                {/* Info */}
                <div className={`p-6 sm:p-8 ${!hasImages ? "py-4 sm:py-5" : ""}`}>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                      {item.category}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PortfolioSection;
