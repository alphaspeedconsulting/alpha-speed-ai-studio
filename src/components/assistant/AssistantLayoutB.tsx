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
      case "success": return "text-green-400";
      case "error": return "text-red-400";
      case "task": return "text-teal";
      case "thinking": return "text-yellow-400";
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
              <Terminal className="h-4 w-4 text-teal" />
              <span className="text-sm font-mono text-muted-foreground">alpha-speed-ai ~ session-001</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`font-mono text-xs ${
                status === "running"
                  ? "bg-teal/20 text-teal border-teal/30"
                  : status === "paused"
                  ? "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
                  : status === "completed"
                  ? "bg-green-500/20 text-green-400 border-green-500/30"
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
                  <Brain className="h-4 w-4 text-teal animate-pulse mt-0.5" />
                  <div>
                    <span className="text-teal">Currently thinking:</span>
                    <p className="text-gray-300 mt-1">
                      {currentThought}
                      <span className="inline-block w-2 h-4 bg-teal ml-0.5 animate-pulse" />
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Completion message */}
            {status === "completed" && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-400 mt-0.5" />
                  <div>
                    <span className="text-green-400">Session complete!</span>
                    <p className="text-gray-500 mt-1">
                      All {tasks.length} tasks have been processed successfully.
                    </p>
                  </div>
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
                    ? 'border-teal/50 bg-teal/10'
                    : task.status === 'completed'
                    ? 'border-gray-800 bg-gray-900/50'
                    : 'border-gray-800 bg-gray-900'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {task.status === 'completed' && (
                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                  )}
                  {task.status === 'in-progress' && (
                    <Loader2 className="h-3 w-3 text-teal animate-spin" />
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
                    ? 'text-teal'
                    : 'text-gray-400'
                }`}>
                  {task.title}
                </p>
                {task.status === 'in-progress' && (
                  <div className="mt-2 h-1 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-teal transition-all duration-100"
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
              <span className="text-green-500">{completedCount}</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-1">
              <span>Active:</span>
              <span className="text-teal">{inProgressCount}</span>
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
