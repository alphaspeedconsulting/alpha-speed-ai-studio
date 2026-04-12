import { Helmet } from "react-helmet-async";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyBooking from "@/components/CalendlyBooking";
import { getBlogPost } from "@/data/blog";
import { trackEvent } from "@/lib/analytics";
import { buildCanonicalUrl, SITE_URL } from "@/lib/site";
import type { BlogBlock } from "@/data/blog/types";

const renderBlock = (block: BlogBlock, index: number) => {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={index} className="text-2xl font-bold mt-10 mb-4">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={index} className="text-muted-foreground leading-relaxed mb-4">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="list-disc list-outside ml-5 space-y-2 mb-4">
          {block.items.map((item, i) => (
            <li key={i} className="text-muted-foreground leading-relaxed text-sm">
              {item}
            </li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={index} className="list-decimal list-outside ml-5 space-y-2 mb-4">
          {block.items.map((item, i) => (
            <li key={i} className="text-muted-foreground leading-relaxed text-sm">
              {item}
            </li>
          ))}
        </ol>
      );
    case "cta":
      return (
        <div key={index} className="my-6">
          <Link
            to={block.to}
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            onClick={() =>
              trackEvent("cta_click", block.trackingName, { placement: "blog_post" })
            }
          >
            {block.text}
          </Link>
        </div>
      );
    default:
      return null;
  }
};

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPost(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonicalUrl = buildCanonicalUrl(`/blog/${post.slug}`);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    ...(post.updatedAt ? { dateModified: post.updatedAt } : {}),
    author: {
      "@type": "Organization",
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Alpha Speed AI",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: "https://alphaspeedai.com/og-image.jpeg",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
    image: "https://alphaspeedai.com/og-image.jpeg",
    keywords: post.tags.join(", "),
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{post.title} | Alpha Speed AI</title>
        <meta name="description" content={post.description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={`${post.title} | Alpha Speed AI`} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta property="article:published_time" content={post.publishedAt} />
        {post.updatedAt && (
          <meta property="article:modified_time" content={post.updatedAt} />
        )}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.description} />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-2xl">
          {/* Back link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            All posts
          </Link>

          {/* Post header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4 flex-wrap">
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
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground">{post.description}</p>
          </header>

          {/* Post body */}
          <article className="prose-neutral">
            {post.blocks.map((block, i) => renderBlock(block, i))}
          </article>

          {/* Bottom CTA */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-card border border-border text-center">
            <h2 className="text-xl font-bold mb-2">
              Ready to see what an AI agent can do for your business?
            </h2>
            <p className="text-sm text-muted-foreground mb-6">
              Book a free consultation — we'll map your workflows and identify the fastest automation wins.
            </p>
            <CalendlyBooking
              label="Book Free Consultation"
              placement={`blog_post_${post.slug}`}
            />
          </div>

          {/* Tags */}
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary border border-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BlogPost;
