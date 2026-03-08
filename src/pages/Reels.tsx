import { Link } from "react-router-dom";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { REELS_VIDEOS } from "@/lib/constants";

const Reels = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background overflow-x-visible">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
              Short-Form
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Reels</span> from Alpha
            </h1>
            <p className="text-muted-foreground text-lg">
              Bite-sized videos from the αlphaspeed AI platform — tips, demos, and updates.
            </p>
          </div>

          {REELS_VIDEOS.length > 0 ? (
            <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {REELS_VIDEOS.map((video, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-card border border-border card-hover overflow-hidden"
                >
                  <div className="relative aspect-[9/16] max-h-[70vh] bg-muted overflow-hidden rounded-t-2xl">
                    <video
                      src={`${import.meta.env.BASE_URL}${video.src}`}
                      controls
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
                      aria-label={video.title}
                    >
                      {video.captionUrl && (
                        <track kind="captions" src={video.captionUrl} srcLang="en" label="English" default />
                      )}
                    </video>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold mb-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{video.description}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="max-w-md mx-auto text-center py-12 rounded-2xl bg-card border border-border">
              <p className="text-muted-foreground mb-6">
                Reels uploaded from Alpha will appear here. Add entries to <code className="text-sm bg-muted px-1.5 py-0.5 rounded">REELS_VIDEOS</code> in <code className="text-sm bg-muted px-1.5 py-0.5 rounded">src/lib/constants.ts</code> and place files in <code className="text-sm bg-muted px-1.5 py-0.5 rounded">public/Videos/Reels/</code>.
              </p>
              <Link
                to="/#demos"
                className="text-primary hover:underline font-medium"
              >
                Watch demos on the home page →
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Reels;
