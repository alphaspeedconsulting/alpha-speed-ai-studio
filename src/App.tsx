import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Assistant from "./pages/Assistant";
import AgentRoster from "./pages/AgentRoster";
import AlphaAIDashboard from "./pages/AlphaAIDashboard";
import NotFound from "./pages/NotFound";
import { SPAPathRestore } from "@/components/SPAPathRestore";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="data-theme" defaultTheme="dark" themes={["dark", "soft", "corporate"]}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <SPAPathRestore />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/assistant" element={<Assistant />} />
            <Route path="/agents" element={<AgentRoster />} />
            <Route path="/alphaai" element={<AlphaAIDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
