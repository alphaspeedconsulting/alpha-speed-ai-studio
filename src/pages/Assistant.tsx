import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTaskSimulation } from "@/hooks/useTaskSimulation";
import AssistantLayoutA from "@/components/assistant/AssistantLayoutA";
import AssistantLayoutB from "@/components/assistant/AssistantLayoutB";
import AssistantLayoutC from "@/components/assistant/AssistantLayoutC";

const Assistant = () => {
  const [selectedLayout, setSelectedLayout] = useState<"A" | "B" | "C">("A");

  // Shared simulation state - persists across layout switches
  const simulation = useTaskSimulation();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Intro Section */}
        <div className="bg-gradient-to-b from-primary/5 to-background border-b border-border/50 py-12 pt-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                Your Personal <span className="gradient-text">AI Assistant</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Experience the power of αlphaspeed AI. This is the same intelligent assistant we build and customize for your business—handling lead qualification, scheduling, customer support, and more.
              </p>
              <p className="text-sm text-muted-foreground">
                Try different layouts below to see how the assistant adapts to your preferences.
              </p>
            </div>
          </div>
        </div>

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

        {/* Selected Layout - all receive shared simulation state */}
        {selectedLayout === "A" && (
          <AssistantLayoutA
            tasks={simulation.tasks}
            currentTask={simulation.currentTask}
            activityLog={simulation.activityLog}
            status={simulation.status}
            completedCount={simulation.completedCount}
            totalCount={simulation.totalCount}
            start={simulation.start}
            pause={simulation.pause}
            reset={simulation.reset}
          />
        )}
        {selectedLayout === "B" && (
          <AssistantLayoutB
            tasks={simulation.tasks}
            currentTask={simulation.currentTask}
            activityLog={simulation.activityLog}
            status={simulation.status}
            completedCount={simulation.completedCount}
            currentThought={simulation.currentThought}
            start={simulation.start}
            pause={simulation.pause}
            reset={simulation.reset}
          />
        )}
        {selectedLayout === "C" && (
          <AssistantLayoutC
            tasks={simulation.tasks}
            currentTask={simulation.currentTask}
            status={simulation.status}
            completedCount={simulation.completedCount}
            totalCount={simulation.totalCount}
            start={simulation.start}
            pause={simulation.pause}
            reset={simulation.reset}
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Assistant;
