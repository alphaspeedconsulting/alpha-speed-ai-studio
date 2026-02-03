import { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Brain,
  Terminal,
  Circle,
  CheckCircle2,
  Loader2,
  Play,
  Pause,
  RotateCcw
} from "lucide-react";
import { Task, ActivityEntry, SimulationStatus } from "@/hooks/useTaskSimulation";

interface AssistantLayoutBProps {
  tasks: Task[];
  currentTask: Task | null;
  activityLog: ActivityEntry[];
  status: SimulationStatus;
  completedCount: number;
  currentThought: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const AssistantLayoutB = ({
  tasks,
  currentTask,
  activityLog,
  status,
  completedCount,
  currentThought,
  start,
  pause,
  reset,
}: AssistantLayoutBProps) => {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [activityLog]);

  const getLogColor = (type: string) => {
    switch (type) {
      case "success": return "text-success";
      case "error": return "text-danger";
      case "task": return "text-brand";
      case "thinking": return "text-warning";
      default: return "text-muted-foreground";
    }
  };

  const getLogPrefix = (type: string) => {
    switch (type) {
      case "success": return "[SUCCESS]";
      case "error": return "[ERROR]";
      case "task": return "[TASK]";
      case "thinking": return "[THINKING]";
      default: return "[INFO]";
    }
  };

  const queuedCount = tasks.filter(t => t.status === "queued").length;
  const inProgressCount = tasks.filter(t => t.status === "in-progress").length;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Assistant Terminal</h1>
          <p className="text-muted-foreground">Layout B - Terminal/developer-style view</p>
        </div>
        <div className="flex items-center gap-2">
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Terminal View */}
        <div className="lg:col-span-3 bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
          {/* Terminal Header */}
          <div className="bg-gray-900 px-4 py-2 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <Terminal className="h-4 w-4 text-brand" />
              <span className="text-sm font-mono text-muted-foreground">alpha-speed-ai ~ session-001</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`font-mono text-xs ${
                status === "running"
                  ? "bg-brand/20 text-brand border-brand/30"
                  : status === "paused"
                  ? "bg-warning/20 text-warning border-warning/30"
                  : status === "completed"
                  ? "bg-success/20 text-success border-success/30"
                  : "bg-gray-800 text-gray-400 border-gray-700"
              }`}>
                {status === "running" && <Loader2 className="h-3 w-3 mr-1 animate-spin" />}
                {status === "paused" && <Pause className="h-3 w-3 mr-1" />}
                {status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                {status === "idle" && <Circle className="h-3 w-3 mr-1" />}
                {status.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Terminal Content */}
          <div
            ref={logContainerRef}
            className="p-4 font-mono text-sm h-[300px] md:h-[500px] overflow-y-auto"
          >
            {activityLog.length > 0 ? (
              // Reverse to show oldest first (terminal style)
              [...activityLog].reverse().map((log, index) => (
                <div key={index} className="flex items-start gap-2 mb-1">
                  <span className="text-gray-600 select-none">{log.timestamp}</span>
                  <span className={`${getLogColor(log.type)} select-none`}>{getLogPrefix(log.type)}</span>
                  <span className="text-gray-300">{log.action}</span>
                </div>
              ))
            ) : (
              <div className="text-gray-500">
                <p>$ alpha-speed-ai --start</p>
                <p className="text-gray-600 mt-2">Waiting for session to begin...</p>
                <p className="text-gray-600">Press Start to initialize the AI assistant.</p>
              </div>
            )}

            {/* Current Thinking - only show when running */}
            {status === "running" && currentThought && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-start gap-2">
                  <Brain className="h-4 w-4 text-brand animate-pulse mt-0.5" />
                  <div>
                    <span className="text-brand">Currently thinking:</span>
                    <p className="text-gray-300 mt-1">
                      {currentThought}
                      <span className="inline-block w-2 h-4 bg-brand ml-0.5 animate-pulse" />
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Completion message with detailed deliverables */}
            {status === "completed" && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-start gap-2 mb-4">
                  <CheckCircle2 className="h-4 w-4 text-success mt-0.5" />
                  <div>
                    <span className="text-success">Session complete!</span>
                    <p className="text-gray-500 mt-1">
                      All {tasks.length} tasks have been processed. Deliverables ready.
                    </p>
                  </div>
                </div>

                {/* Email Draft Output */}
                <div className="text-gray-400 mt-4">
                  <p className="text-brand mb-2">$ cat ./output/client_response.txt</p>
                  <pre className="text-xs text-gray-300 bg-gray-900 p-3 rounded overflow-x-auto whitespace-pre-wrap">
{`To: john.smith@acmecorp.com
Subject: Re: Pricing Inquiry - Custom Enterprise Solution

Hi John,

Thank you for reaching out about our enterprise solutions.
I've reviewed your requirements and put together a custom proposal.

Based on your team size (50 users) and integration needs,
I recommend our Professional tier at $89/user/month, which includes:

  • Unlimited API calls
  • Priority support (4-hour SLA)
  • Custom integrations
  • Dedicated account manager

I've attached a detailed comparison showing potential
cost savings of 23% annually.

Would Thursday at 2 PM work for a brief call to discuss?

Best regards,
AI Assistant
αlphaspeed Consulting`}
                  </pre>
                </div>

                {/* Meeting Output */}
                <div className="text-gray-400 mt-4">
                  <p className="text-brand mb-2">$ cat ./output/meeting_invite.txt</p>
                  <pre className="text-xs text-gray-300 bg-gray-900 p-3 rounded overflow-x-auto whitespace-pre-wrap">
{`CALENDAR INVITE CREATED
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Team Strategy Meeting
Thursday, February 6, 2026 | 2:00 PM - 3:00 PM EST
Location: Zoom (link attached)

ATTENDEES:
  [✓] Sarah Chen         - Confirmed
  [✓] Michael Rodriguez  - Confirmed
  [○] Jennifer Park      - Pending
  [✓] David Kim          - Confirmed
  [○] Alex Thompson      - Pending

AGENDA:
  1. Q4 Performance Review      (15 min)
  2. 2026 Strategy Discussion   (25 min)
  3. Resource Allocation        (15 min)
  4. Next Steps & Action Items  ( 5 min)

ATTACHMENTS: Q4_Report.pdf, Strategy_Deck.pptx`}
                  </pre>
                </div>

                {/* Report Output */}
                <div className="text-gray-400 mt-4">
                  <p className="text-brand mb-2">$ cat ./output/weekly_report.txt</p>
                  <pre className="text-xs text-gray-300 bg-gray-900 p-3 rounded overflow-x-auto whitespace-pre-wrap">
{`WEEKLY EXECUTIVE SUMMARY
Week of January 27 - February 2, 2026
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

KEY METRICS:
┌────────────────┬─────────┬─────────┬──────────┐
│ Metric         │ Actual  │ Target  │ Variance │
├────────────────┼─────────┼─────────┼──────────┤
│ Revenue        │ $47.2K  │ $45K    │   +4.9%  │
│ New Leads      │ 127     │ 100     │   +27%   │
│ Conversion     │ 3.2%    │ 3.0%    │   +0.2%  │
│ Response Time  │ 2.3 hrs │ 4 hrs   │   -42%   │
└────────────────┴─────────┴─────────┴──────────┘

HIGHLIGHTS:
  • Lead generation exceeded target by 27%
  • Average response time improved to 2.3 hours
  • Two enterprise deals in final negotiation

ACTION ITEMS:
  1. Follow up with Acme Corp (Decision: Feb 5)
  2. Schedule demo for TechStart Inc
  3. Review pricing for Q2 adjustments`}
                  </pre>
                </div>

                {/* Competitor Analysis Output */}
                <div className="text-gray-400 mt-4">
                  <p className="text-brand mb-2">$ cat ./output/competitor_analysis.txt</p>
                  <pre className="text-xs text-gray-300 bg-gray-900 p-3 rounded overflow-x-auto whitespace-pre-wrap">
{`COMPETITIVE LANDSCAPE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────────┬──────────┬──────────┬──────────┬──────────┐
│ Feature         │ Us       │ Comp A   │ Comp B   │ Comp C   │
├─────────────────┼──────────┼──────────┼──────────┼──────────┤
│ Base Price      │ $79/mo   │ $59/mo   │ $99/mo   │ $69/mo   │
│ API Calls       │ Unlimited│ 10K/mo   │ Unlimited│ 50K/mo   │
│ Integrations    │ 45+      │ 20       │ 30       │ 25       │
│ Support SLA     │ 4 hrs    │ 24 hrs   │ 8 hrs    │ 12 hrs   │
│ Custom Workflows│ ✓        │ ✗        │ ✓        │ Limited  │
└─────────────────┴──────────┴──────────┴──────────┴──────────┘

RECOMMENDATION:
While Competitor A offers lower pricing, our unlimited API
calls and superior integration options justify the premium.

Focus sales conversations on:
  • Integration depth (45+ vs industry avg of 25)
  • Support SLA (4 hrs vs competitor avg of 14 hrs)
  • Custom workflow flexibility`}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Task Sidebar */}
        <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
          <div className="bg-gray-900 px-4 py-2 border-b border-gray-800">
            <span className="text-sm font-mono text-muted-foreground">Task Queue</span>
          </div>
          <div className="p-3 space-y-2">
            {tasks.map((task, index) => (
              <div
                key={task.id}
                className={`p-3 rounded border font-mono text-xs ${
                  task.status === 'in-progress'
                    ? 'border-brand/50 bg-brand/10'
                    : task.status === 'completed'
                    ? 'border-gray-800 bg-gray-900/50'
                    : 'border-gray-800 bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {task.status === 'completed' && (
                    <CheckCircle2 className="h-3 w-3 text-success" />
                  )}
                  {task.status === 'in-progress' && (
                    <Loader2 className="h-3 w-3 text-brand animate-spin" />
                  )}
                  {task.status === 'queued' && (
                    <Circle className="h-3 w-3 text-gray-600" />
                  )}
                  <span className="text-gray-500">#{index + 1}</span>
                </div>
                <p className={`${
                  task.status === 'completed'
                    ? 'text-gray-600 line-through'
                    : task.status === 'in-progress'
                    ? 'text-brand'
                    : 'text-gray-400'
                }`}>
                  {task.title}
                </p>
                {task.status === 'in-progress' && (
                  <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand transition-all duration-100"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                )}
                {task.status === 'completed' && task.detail && (
                  <p className="text-gray-600 text-[10px] mt-1">{task.detail}</p>
                )}
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="border-t border-gray-800 p-3 font-mono text-xs">
            <div className="flex justify-between text-gray-500 mb-1">
              <span>Completed:</span>
              <span className="text-success">{completedCount}</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-1">
              <span>Active:</span>
              <span className="text-brand">{inProgressCount}</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Queued:</span>
              <span className="text-gray-400">{queuedCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantLayoutB;
