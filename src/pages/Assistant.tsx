import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import AssistantLayoutA from "@/components/assistant/AssistantLayoutA";
import AssistantLayoutB from "@/components/assistant/AssistantLayoutB";
import AssistantLayoutC from "@/components/assistant/AssistantLayoutC";

const Assistant = () => {
  const [selectedLayout, setSelectedLayout] = useState<"A" | "B" | "C">("A");

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Layout Selector */}
        <div className="bg-muted/30 border-b border-border/50 py-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4">
              <span className="text-sm text-muted-foreground">Select Layout:</span>
              <div className="flex gap-2">
                <Button
                  variant={selectedLayout === "A" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLayout("A")}
                >
                  Layout A - Dashboard
                </Button>
                <Button
                  variant={selectedLayout === "B" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLayout("B")}
                >
                  Layout B - Terminal
                </Button>
                <Button
                  variant={selectedLayout === "C" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLayout("C")}
                >
                  Layout C - Minimal
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Selected Layout */}
        {selectedLayout === "A" && <AssistantLayoutA />}
        {selectedLayout === "B" && <AssistantLayoutB />}
        {selectedLayout === "C" && <AssistantLayoutC />}
      </main>
      <Footer />
    </div>
  );
};

export default Assistant;
