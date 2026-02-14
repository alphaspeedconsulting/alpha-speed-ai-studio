import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import HowWeWorkSection from "@/components/HowWeWorkSection";
import PortfolioSection from "@/components/PortfolioSection";
import PlatformSection from "@/components/PlatformSection";
import AgentsAsServiceSection from "@/components/AgentsAsServiceSection";
import UseCasesSection from "@/components/UseCasesSection";
import WorkflowExamplesSection from "@/components/WorkflowExamplesSection";
import DemoVideosSection from "@/components/DemoVideosSection";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-visible">
      <Header />
      <main>
        <Hero />
        <Services />
        <HowWeWorkSection />
        <PortfolioSection />
        <AgentsAsServiceSection />
        <PlatformSection />
        <UseCasesSection />
        <WorkflowExamplesSection />
        <DemoVideosSection />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
