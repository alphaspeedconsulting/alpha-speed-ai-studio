import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Brain,
  CheckCircle2,
  Circle,
  Loader2,
  ChevronDown,
  ChevronUp,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Mail,
  FileText,
  Calendar,
  BarChart3,
  Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Task, SimulationStatus } from "@/hooks/useTaskSimulation";

interface AssistantLayoutCProps {
  tasks: Task[];
  currentTask: Task | null;
  status: SimulationStatus;
  completedCount: number;
  totalCount: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const AssistantLayoutC = ({
  tasks,
  currentTask,
  status,
  completedCount,
  totalCount,
  start,
  pause,
  reset,
}: AssistantLayoutCProps) => {
  const [expanded, setExpanded] = useState(true);
  const [orbPhase, setOrbPhase] = useState(0);

  // Animate orb rotation
  useState(() => {
    const interval = setInterval(() => {
      setOrbPhase((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  });

  const progress = currentTask?.progress ?? 0;

  const getStatusBadge = () => {
    switch (status) {
      case "running":
        return (
          <Badge className="bg-teal text-white border-0 shadow-lg px-4 py-1">
            <Loader2 className="h-3 w-3 mr-2 animate-spin" />
            Processing
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-yellow-500 text-white border-0 shadow-lg px-4 py-1">
            <Pause className="h-3 w-3 mr-2" />
            Paused
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500 text-white border-0 shadow-lg px-4 py-1">
            <CheckCircle2 className="h-3 w-3 mr-2" />
            Complete
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground border-0 shadow-lg px-4 py-1">
            <Circle className="h-3 w-3 mr-2" />
            Idle
          </Badge>
        );
    }
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
        <p className="text-muted-foreground">Layout C - Minimal focused view</p>
      </div>

      {/* Central AI Orb */}
      <div className="relative mb-8">
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: status === "running"
              ? `conic-gradient(from ${orbPhase}deg, transparent, hsl(var(--teal)) 25%, transparent 50%, hsl(var(--teal-glow)) 75%, transparent)`
              : "transparent",
            filter: 'blur(20px)',
            opacity: status === "running" ? 0.4 : 0.1,
            transform: 'scale(1.2)'
          }}
        />

        {/* Main orb */}
        <div className={`relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-900 to-background border-2 flex items-center justify-center transition-all duration-300 ${
          status === "running"
            ? "border-teal/30 shadow-[0_0_60px_-10px_hsl(var(--teal)/0.5)]"
            : status === "completed"
            ? "border-green-500/30 shadow-[0_0_60px_-10px_hsl(142_76%_36%/0.5)]"
            : "border-border/30"
        }`}>
          {/* Inner rotating ring */}
          <div
            className={`absolute inset-4 rounded-full border transition-colors ${
              status === "running" ? "border-teal/20" : "border-border/10"
            }`}
            style={{ transform: status === "running" ? `rotate(${orbPhase}deg)` : "rotate(0deg)" }}
          >
            <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full transition-colors ${
              status === "running" ? "bg-teal" : "bg-muted"
            }`} />
          </div>

          {/* Brain icon */}
          <Brain className={`h-16 w-16 transition-colors ${
            status === "running" ? "text-teal" :
            status === "completed" ? "text-green-500" : "text-muted-foreground"
          }`} />
        </div>

        {/* Status badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          {getStatusBadge()}
        </div>
      </div>

      {/* Current Task Display */}
      <div className="text-center mb-6 max-w-md">
        {currentTask ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">Currently working on</p>
            <h2 className="text-xl font-semibold mb-4">{currentTask.title}</h2>
            <div className="w-64 mx-auto">
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground">{progress}% complete</p>
            </div>
          </>
        ) : status === "completed" ? (
          <>
            <p className="text-sm text-muted-foreground mb-2">Session complete</p>
            <h2 className="text-xl font-semibold mb-4">All tasks finished!</h2>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground mb-2">Ready to start</p>
            <h2 className="text-xl font-semibold mb-4">Click play to begin</h2>
          </>
        )}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 mb-6">
        {status === "running" ? (
          <Button variant="outline" size="sm" onClick={pause}>
            <Pause className="h-4 w-4 mr-2" />
            Pause
          </Button>
        ) : (
          <Button variant="outline" size="sm" onClick={start}>
            <Play className="h-4 w-4 mr-2" />
            {status === "paused" ? "Resume" : "Start"}
          </Button>
        )}
        <Button variant="ghost" size="sm" onClick={reset}>
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Compact Progress Bar */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm text-muted-foreground">Progress</span>
        <div className="flex gap-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`w-8 h-2 rounded-full transition-all ${
                task.status === 'completed' ? 'bg-teal' :
                task.status === 'in-progress' ? 'bg-teal/50 animate-pulse' :
                'bg-muted'
              }`}
            />
          ))}
        </div>
        <span className="text-sm font-medium">{completedCount}/{totalCount}</span>
      </div>

      {/* Expandable Task List */}
      <div className="w-full max-w-lg">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center justify-center gap-2 py-3 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {expanded ? (
            <>Hide task queue <ChevronUp className="h-4 w-4" /></>
          ) : (
            <>Show task queue <ChevronDown className="h-4 w-4" /></>
          )}
        </button>

        {expanded && (
          <div className="space-y-2 mt-2 animate-in slide-in-from-top-2 duration-300">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`flex items-center gap-3 p-4 rounded-xl border transition-all ${
                  task.status === 'in-progress'
                    ? 'border-teal/30 bg-teal/5'
                    : task.status === 'completed'
                    ? 'border-border/30 bg-muted/20'
                    : 'border-border/20 bg-background'
                }`}
              >
                {task.status === 'completed' && (
                  <CheckCircle2 className="h-5 w-5 text-teal flex-shrink-0" />
                )}
                {task.status === 'in-progress' && (
                  <Loader2 className="h-5 w-5 text-teal animate-spin flex-shrink-0" />
                )}
                {task.status === 'queued' && (
                  <Circle className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                )}
                <div className="flex-1 min-w-0">
                  <p className={`font-medium ${
                    task.status === 'completed' ? 'text-muted-foreground' : ''
                  }`}>
                    {task.title}
                  </p>
                  {task.detail && (
                    <p className="text-xs text-muted-foreground mt-0.5">{task.detail}</p>
                  )}
                  {task.status === 'in-progress' && (
                    <Progress value={task.progress} className="h-1 mt-2" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completion Output - Expandable Deliverables */}
      {status === "completed" && (
        <div className="w-full max-w-2xl mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-background border border-green-500/30">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-green-400">Deliverables Ready</h3>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {/* Email Analysis */}
              <AccordionItem value="email" className="border-border/50">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-teal" />
                    <span>Email Analysis</span>
                    <Badge variant="secondary" className="ml-2 text-xs">3 priority</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 text-sm pt-2">
                    <div className="p-2 rounded bg-red-500/10 border border-red-500/20">
                      <span className="font-medium">John Smith (Acme Corp)</span>
                      <p className="text-xs text-muted-foreground">Contract renewal - Urgent</p>
                    </div>
                    <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                      <span className="font-medium">Sarah Chen (TechStart)</span>
                      <p className="text-xs text-muted-foreground">Pricing inquiry - High</p>
                    </div>
                    <div className="p-2 rounded bg-yellow-500/10 border border-yellow-500/20">
                      <span className="font-medium">Michael Rodriguez</span>
                      <p className="text-xs text-muted-foreground">Demo request - High</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Client Response */}
              <AccordionItem value="response" className="border-border/50">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-teal" />
                    <span>Client Response Draft</span>
                    <Badge className="ml-2 text-xs bg-green-500/20 text-green-400">Ready</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm pt-2 space-y-2">
                    <p className="text-muted-foreground text-xs">To: john.smith@acmecorp.com</p>
                    <p>Hi John, thank you for reaching out about our enterprise solutions...</p>
                    <p>Recommending <span className="text-teal">Professional tier at $89/user/month</span> with:</p>
                    <ul className="text-xs text-muted-foreground list-disc list-inside">
                      <li>Unlimited API calls</li>
                      <li>Priority support (4-hour SLA)</li>
                      <li>Custom integrations</li>
                    </ul>
                    <p className="text-green-400 text-xs">Potential savings: 23% annually</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Meeting */}
              <AccordionItem value="meeting" className="border-border/50">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-teal" />
                    <span>Meeting Scheduled</span>
                    <Badge variant="outline" className="ml-2 text-xs">Thu 2:00 PM</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm pt-2">
                    <p className="font-medium">Team Strategy Meeting</p>
                    <p className="text-xs text-muted-foreground mb-2">Feb 6, 2026 • 2:00 PM - 3:00 PM EST</p>
                    <div className="text-xs space-y-1">
                      <p className="text-muted-foreground">Attendees: 5 (3 confirmed, 2 pending)</p>
                      <p className="text-muted-foreground">Agenda: Q4 Review, 2026 Strategy, Resource Allocation</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Report */}
              <AccordionItem value="report" className="border-border/50">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="h-4 w-4 text-teal" />
                    <span>Weekly Report</span>
                    <Badge className="ml-2 text-xs bg-green-500/20 text-green-400">Complete</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm pt-2 space-y-2">
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2 rounded bg-muted/30">
                        <p className="text-muted-foreground">Revenue</p>
                        <p className="font-medium">$47.2K <span className="text-green-400">+4.9%</span></p>
                      </div>
                      <div className="p-2 rounded bg-muted/30">
                        <p className="text-muted-foreground">New Leads</p>
                        <p className="font-medium">127 <span className="text-green-400">+27%</span></p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">3 action items identified for leadership review</p>
                  </div>
                </AccordionContent>
              </AccordionItem>

              {/* Competitor Analysis */}
              <AccordionItem value="analysis" className="border-border/50">
                <AccordionTrigger className="text-sm hover:no-underline">
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-teal" />
                    <span>Competitor Analysis</span>
                    <Badge variant="secondary" className="ml-2 text-xs">5 reviewed</Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="text-sm pt-2 space-y-2">
                    <p className="text-xs text-muted-foreground">Key advantages over competition:</p>
                    <ul className="text-xs space-y-1">
                      <li>• <span className="text-teal">45+ integrations</span> vs avg 25</li>
                      <li>• <span className="text-teal">4hr support SLA</span> vs avg 14hrs</li>
                      <li>• <span className="text-teal">Custom workflows</span> included</li>
                    </ul>
                    <p className="text-xs text-green-400 mt-2">Recommendation: Emphasize integration depth in sales</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssistantLayoutC;
