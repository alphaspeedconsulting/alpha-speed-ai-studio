import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { lazy, Suspense } from "react";
import Index from "./pages/Index";
import Assistant from "./pages/Assistant";
import NotFound from "./pages/NotFound";

// AlphaAI — single lazy import; all routes self-contained in ai-assistant-local
const AlphaAIRoutes = lazy(() => import("@alphaai/AlphaAIRoutes"));

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="data-theme" defaultTheme="dark" themes={["dark", "soft", "corporate"]}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/assistant" element={<Assistant />} />
              <Route path="/alphaai/*" element={<AlphaAIRoutes />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
