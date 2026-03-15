import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import RoiCalculator from "./components/marketing/RoiCalculator";
import CaseStudies from "./components/marketing/CaseStudies";
import Assistant from "./pages/Assistant";
import AgentRoster from "./pages/AgentRoster";
import AlphaAIDashboard from "./pages/AlphaAIDashboard";
import TrafficMetricsDashboard from "./pages/TrafficMetricsDashboard";
import Reels from "./pages/Reels";
import TermsOfService from "./pages/TermsOfService";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import PrivacyRequest from "./pages/PrivacyRequest";
import NotFound from "./pages/NotFound";
import { SPAPathRestore } from "@/components/SPAPathRestore";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import CookieConsent from "@/components/CookieConsent";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="data-theme" defaultTheme="dark" themes={["dark", "soft", "corporate"]}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <SPAPathRestore />
          <AnalyticsTracker />
          <CookieConsent />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/roi-calculator" element={<RoiCalculator />} />
            <Route path="/case-studies" element={<CaseStudies />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/agents" element={<AgentRoster />} />
            <Route path="/alphaai" element={<AlphaAIDashboard />} />
            <Route path="/traffic" element={<TrafficMetricsDashboard />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/terms-of-service.html" element={<TermsOfService />} />
            <Route path="/privacy-policy.html" element={<PrivacyPolicy />} />
            <Route path="/privacy-request" element={<PrivacyRequest />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
