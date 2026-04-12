import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowRight, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BLOG_POSTS } from "@/data/blog";
import { buildCanonicalUrl, SITE_URL } from "@/lib/site";

const Blog = () => {
  const canonicalUrl = buildCanonicalUrl("/blog");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Automation Blog | Alpha Speed AI</title>
        <meta
          name="description"
          content="Practical guides on AI automation for DFW businesses — how AI agents work, what they cost, and how to pick the right workflows to automate first."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="AI Automation Blog | Alpha Speed AI" />
        <meta
          property="og:description"
          content="Practical guides on AI automation for DFW businesses — how AI agents work, what they cost, and how to pick the right workflows to automate first."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation Blog | Alpha Speed AI" />
        <meta
          name="twitter:description"
          content="Practical guides on AI automation for DFW businesses."
        />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "Alpha Speed AI Blog",
            url: canonicalUrl,
            description:
              "Practical guides on AI automation for DFW businesses — how AI agents work, what they cost, and how to pick the right workflows to automate first.",
            publisher: {
              "@type": "Organization",
              name: "Alpha Speed AI",
              url: SITE_URL,
            },
          })}
        </script>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
              Alpha Speed AI Blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              AI Automation <span className="gradient-text">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Practical guides for DFW business owners on AI agents, workflow automation, and making AI work for your bottom line.
            </p>
          </div>

          {/* Post list */}
          <div className="space-y-6">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block rounded-2xl bg-card border border-border p-6 sm:p-8 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3 flex-wrap">
                  <Badge variant="outline" className="text-xs border-primary/40 text-primary">
                    {post.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readingTimeMinutes} min read
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {post.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                  Read more <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
