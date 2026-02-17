import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

/**
 * AlphaAI Dashboard placeholder. Full dashboard (task board, memory, workflows)
 * is planned; for now this avoids 404 and gives a clear entry point.
 * Sets document title so the tab shows "AlphaAI Dashboard".
 */
const AlphaAIDashboard = () => {
  useEffect(() => {
    document.title = "AlphaAI Dashboard | Alpha Speed AI";
    return () => {
      document.title = "Alpha Speed AI | Automate Your Business with Intelligent AI";
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-16">
        <div className="container mx-auto px-6 py-16 md:py-24 text-center max-w-2xl">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            AlphaAI <span className="gradient-text">Dashboard</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Your personal AI executive assistant—task board, memory, and workflows—is coming soon.
            In the meantime, try our AI Assistant demo.
          </p>
          <Link
            to="/assistant"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Open AI Assistant
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlphaAIDashboard;
