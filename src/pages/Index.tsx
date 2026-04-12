import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import { buildLocalBusinessSchema, buildWebSiteSchema, buildFAQPageSchema } from "@/lib/schema";
import { buildCanonicalUrl } from "@/lib/site";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import WhyAgentsSection from "@/components/WhyAgentsSection";
import Services from "@/components/Services";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import SectionCTA from "@/components/SectionCTA";
import PortfolioSection from "@/components/PortfolioSection";
import ResourcePathways from "@/components/ResourcePathways";
import About from "@/components/About";
import EmailCapture from "@/components/EmailCapture";
import Contact from "@/components/Contact";
import StickyCtaBanner from "@/components/StickyCtaBanner";
import ExitIntentModal from "@/components/ExitIntentModal";
import ScrollDepthTracker from "@/components/ScrollDepthTracker";
import Footer from "@/components/Footer";

// Lazy-load below-fold heavy sections
const UseCasesSection = lazy(() => import("@/components/UseCasesSection"));
const DemoVideosSection = lazy(() => import("@/components/DemoVideosSection"));

const Index = () => {
  useScrollToTop();
  useScrollToAnchor();
  const canonicalUrl = buildCanonicalUrl("/");

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Helmet>
        <title>Alpha Speed AI | DFW AI Automation Studio</title>
        <meta name="description" content="Dallas-Fort Worth's AI automation studio. We build custom AI agents, workflow automation, and integration solutions that help DFW businesses save time, cut costs, and grow." />
        <meta name="keywords" content="DFW AI automation, Dallas AI agency, AI workflow automation Texas, Dallas-Fort Worth AI consulting, custom AI agents DFW, business automation Dallas" />
        <meta name="author" content="Alpha Speed AI" />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="Alpha Speed AI | DFW AI Automation Studio" />
        <meta property="og:description" content="Dallas-Fort Worth's AI automation studio. Custom AI agents, workflow automation, and integration solutions for DFW businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@AlphaSpeedAI" />
        <meta name="twitter:title" content="Alpha Speed AI | DFW AI Automation Studio" />
        <meta name="twitter:description" content="Dallas-Fort Worth's AI automation studio. Custom AI agents, workflow automation, and integration solutions for DFW businesses." />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify(buildLocalBusinessSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(buildWebSiteSchema())}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(buildFAQPageSchema([
            {
              question: "What is an AI automation agency?",
              answer: "An AI automation agency builds custom AI agents and workflow automations that handle repetitive business tasks — from lead qualification and scheduling to customer follow-up and reporting — so your team can focus on high-value work.",
            },
            {
              question: "How much does AI automation cost for a small business?",
              answer: "AI automation projects for small businesses typically range from $2,500 for targeted workflow automation to $15,000+ for fully custom multi-agent systems. Alpha Speed AI offers free consultations to scope your specific needs.",
            },
            {
              question: "How long does it take to implement AI automation?",
              answer: "Most Alpha Speed AI projects deliver a working automation in 2–4 weeks. Complex multi-agent systems or enterprise integrations typically take 6–12 weeks depending on scope.",
            },
            {
              question: "Do I need to know how to code to use AI automation?",
              answer: "No. Alpha Speed AI handles all technical implementation. You describe the problem; we build, test, and deploy the solution. Most clients interact with their AI agents through tools they already use.",
            },
            {
              question: "What kinds of businesses benefit most from AI automation?",
              answer: "Any business that handles repetitive processes benefits — construction firms, professional services, e-commerce, healthcare administration, and real estate are among the strongest use cases in DFW.",
            },
          ]))}
        </script>
      </Helmet>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <WhyAgentsSection />
        <Services />
        <SectionCTA
          text="See how we built this for DCR Roofing"
          to="/case-studies"
          trackingName="section_cta_case_studies"
        />
        <HowWeWorkSection />
        <SectionCTA
          text="Calculate your potential savings"
          to="/roi-calculator"
          trackingName="section_cta_roi_calculator"
        />
        <PortfolioSection />
        <ResourcePathways />
        <Suspense fallback={null}>
          <UseCasesSection />
          <DemoVideosSection />
        </Suspense>
        <About />
        <EmailCapture />
        <Contact />
      </main>
      <StickyCtaBanner />
      <ExitIntentModal />
      <ScrollDepthTracker />
      <Footer />
    </div>
  );
};

export default Index;
