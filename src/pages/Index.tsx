import { Helmet } from "react-helmet-async";
import { buildLocalBusinessSchema, buildWebSiteSchema } from "@/lib/schema";
import { useScrollToAnchor } from "@/hooks/useScrollToAnchor";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import StatsBar from "@/components/StatsBar";
import WhyAgentsSection from "@/components/WhyAgentsSection";
import Services from "@/components/Services";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import PortfolioSection from "@/components/PortfolioSection";
import PlatformSection from "@/components/PlatformSection";
import AgentsAsServiceSection from "@/components/AgentsAsServiceSection";
import UseCasesSection from "@/components/UseCasesSection";
import WorkflowExamplesSection from "@/components/WorkflowExamplesSection";
import DemoVideosSection from "@/components/DemoVideosSection";
import InstagramFeed from "@/components/InstagramFeed";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  useScrollToTop();
  useScrollToAnchor();

  return (
    <div className="min-h-screen bg-background overflow-x-visible">
      <Helmet>
        <title>Alpha Speed AI | DFW AI Automation Studio</title>
        <meta name="description" content="Dallas-Fort Worth's AI automation studio. We build custom AI agents, workflow automation, and integration solutions that help DFW businesses save time, cut costs, and grow." />
        <meta name="keywords" content="DFW AI automation, Dallas AI agency, AI workflow automation Texas, Dallas-Fort Worth AI consulting, custom AI agents DFW, business automation Dallas" />
        <meta name="author" content="Alpha Speed AI" />
        <link rel="canonical" href="https://alphaspeedai.com/" />
        <meta property="og:title" content="Alpha Speed AI | DFW AI Automation Studio" />
        <meta property="og:description" content="Dallas-Fort Worth's AI automation studio. Custom AI agents, workflow automation, and integration solutions for DFW businesses." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://alphaspeedai.com/" />
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
      </Helmet>
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <WhyAgentsSection />
        <Services />
        <HowWeWorkSection />
        <PortfolioSection />
        <AgentsAsServiceSection />
        <PlatformSection />
        <UseCasesSection />
        <WorkflowExamplesSection />
        <DemoVideosSection />
        <InstagramFeed />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
