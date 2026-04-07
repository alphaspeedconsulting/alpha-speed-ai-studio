import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Instagram, ExternalLink } from "lucide-react";
import { getSupabase } from "@/lib/supabase";
import { INSTAGRAM_PROFILE_URL } from "@/lib/constants";

type PublishedPost = {
  id: string;
  image_url: string | null;
  caption: string | null;
  post_url: string | null;
  posted_at: string;
};

const sanitizeCaption = (caption: string | null): string | null => {
  if (!caption) return caption;

  return caption
    .replace(/\baassistant\b/gi, "assistant")
    .replace(/alphaspeadai\.com/gi, "alphaspeedai.com");
};

const InstagramFeed = () => {
  const [posts, setPosts] = useState<PublishedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase
      .from("published_posts")
      .select("id, image_url, caption, post_url, posted_at")
      .eq("platform", "instagram")
      .order("posted_at", { ascending: false })
      .limit(9)
      .then(({ data, error }) => {
        if (error) console.error("[InstagramFeed] Supabase query failed:", error.message);
        if (data) setPosts(data);
        setLoading(false);
      });
  }, []);

  return (
    <section id="instagram" className="py-10 md:py-16 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-16">
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
        {!loading && posts.length > 0 ? (
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {posts.map((post) => {
                const safeCaption = sanitizeCaption(post.caption);
                const hasImage = Boolean(post.image_url) && !failedImages[post.id];

                return (
                  <a
                    key={post.id}
                    href={post.post_url ?? INSTAGRAM_PROFILE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative aspect-square rounded-xl overflow-hidden bg-card border border-border"
                  >
                    {hasImage ? (
                      <img
                        src={post.image_url!}
                        alt={safeCaption ? safeCaption.slice(0, 100) : "Instagram post by Alpha Speed AI"}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        width={400}
                        height={400}
                        onError={() =>
                          setFailedImages((prev) => ({
                            ...prev,
                            [post.id]: true,
                          }))
                        }
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-primary/5">
                        <Instagram className="w-8 h-8 text-primary/30" />
                      </div>
                    )}
                    {/* Caption overlay — always visible on mobile (no hover), hover on desktop */}
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 to-transparent p-3 pt-6 sm:absolute sm:inset-0 sm:bg-background/80 sm:opacity-0 sm:group-hover:opacity-100 sm:transition-opacity sm:duration-200 sm:flex sm:flex-col sm:justify-end sm:p-3 sm:pt-3">
                      {safeCaption && (
                        <p className="text-xs line-clamp-2 sm:line-clamp-3 text-foreground leading-relaxed">
                          {safeCaption}
                        </p>
                      )}
                      <ExternalLink className="w-3.5 h-3.5 text-primary mt-1.5 shrink-0 hidden sm:block" />
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          /* Fallback — no posts yet or Supabase not configured */
          !loading && (
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
          )
        )}

        {/* CTA Link */}
        {!loading && posts.length > 0 && (
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
