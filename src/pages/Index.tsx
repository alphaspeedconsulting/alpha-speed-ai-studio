import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PlatformSection from "@/components/PlatformSection";
import UseCasesSection from "@/components/UseCasesSection";
import WorkflowExamplesSection from "@/components/WorkflowExamplesSection";
import DemoVideosSection from "@/components/DemoVideosSection";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <PlatformSection />
        <UseCasesSection />
        <WorkflowExamplesSection />
        <DemoVideosSection />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
