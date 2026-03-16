import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Play } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { INSTAGRAM_PROFILE_URL, TIKTOK_PROFILE_URL } from "@/lib/constants";

type PublishedReel = {
  id: string;
  platform: string;
  image_url: string | null;
  caption: string | null;
  post_url: string | null;
  posted_at: string;
};

const Reels = () => {
  useScrollToTop();
  const [reels, setReels] = useState<PublishedReel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }
    supabase
      .from("published_posts")
      .select("id, platform, image_url, caption, post_url, posted_at")
      .or("platform.ilike.instagram,platform.ilike.tiktok")
      .order("posted_at", { ascending: false })
      .limit(9)
      .then(({ data, error }) => {
        if (error) {
          console.error("[Reels] Supabase query failed:", error.message, error);
        }
        if (data) setReels(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-visible">
      <Helmet>
        <title>AI Automation Reels | Alpha Speed AI</title>
        <meta name="description" content="Bite-sized videos from the Alpha Speed AI platform — tips, demos, and updates on AI automation for DFW businesses." />
        <link rel="canonical" href="https://alphaspeedai.com/reels" />
        <meta property="og:title" content="AI Automation Reels | Alpha Speed AI" />
        <meta property="og:description" content="Short-form videos from Alpha Speed AI — AI automation tips, demos, and platform updates." />
        <meta property="og:url" content="https://alphaspeedai.com/reels" />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation Reels | Alpha Speed AI" />
        <meta name="twitter:description" content="Short-form AI automation videos from Alpha Speed AI." />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
      </Helmet>
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

          {!loading && reels.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {reels.map((reel) => {
                const isTikTok = reel.platform?.toLowerCase() === "tiktok";
                const imageSrc = reel.image_url ?? (isTikTok ? "/tiktok-placeholder.svg" : null);

                return (
                  <a
                    key={reel.id}
                    href={reel.post_url ?? (reel.platform?.toLowerCase() === "tiktok" ? TIKTOK_PROFILE_URL : INSTAGRAM_PROFILE_URL)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-[9/16] max-h-[70vh] rounded-2xl bg-card border border-border overflow-hidden card-hover"
                  >
                    <span className="absolute top-2 right-2 z-10 px-2 py-0.5 rounded text-[10px] font-medium bg-background/90 text-foreground capitalize">
                      {reel.platform ?? "Reel"}
                    </span>
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt={reel.caption ?? "Reel"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <Play className="w-10 h-10 text-primary/40" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                      {reel.caption && (
                        <p className="text-xs line-clamp-4 text-foreground leading-relaxed">{reel.caption}</p>
                      )}
                      <Play className="w-4 h-4 text-primary mt-2 shrink-0" />
                    </div>
                  </a>
                );
              })}
            </div>
          ) : !loading && (
            <div className="max-w-md mx-auto text-center py-12 rounded-2xl bg-card border border-border">
              <p className="text-muted-foreground mb-6">
                Reels from Alpha (Instagram & TikTok) will appear here once published to the feed.
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
