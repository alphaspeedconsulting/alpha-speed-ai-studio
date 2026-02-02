import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Terminal,
  ChevronRight,
  Circle,
  CheckCircle2,
  Loader2
} from "lucide-react";

const mockTasks = [
  { id: 1, title: "Analyzing email inbox", status: "completed" },
  { id: 2, title: "Drafting response to client inquiry", status: "in-progress" },
  { id: 3, title: "Scheduling team meeting for Thursday", status: "queued" },
  { id: 4, title: "Preparing weekly report summary", status: "queued" },
  { id: 5, title: "Researching competitor pricing", status: "queued" },
];

const mockLogs = [
  { type: "info", message: "Session initialized", timestamp: "10:42:15" },
  { type: "task", message: "Starting task: Analyzing email inbox", timestamp: "10:42:18" },
  { type: "info", message: "Connecting to email API...", timestamp: "10:42:19" },
  { type: "success", message: "Connected successfully", timestamp: "10:42:21" },
  { type: "info", message: "Scanning 247 emails from last 7 days", timestamp: "10:42:22" },
  { type: "info", message: "Applying priority filters...", timestamp: "10:43:45" },
  { type: "success", message: "Found 3 priority items requiring attention", timestamp: "10:44:02" },
  { type: "task", message: "Completed: Analyzing email inbox", timestamp: "10:44:15" },
  { type: "task", message: "Starting task: Drafting response to client inquiry", timestamp: "10:44:18" },
  { type: "info", message: "Loading client context from CRM...", timestamp: "10:44:20" },
  { type: "info", message: "Generating response draft...", timestamp: "10:45:30" },
  { type: "thinking", message: "Considering tone and previous interactions...", timestamp: "10:46:00" },
];

const AssistantLayoutB = () => {
  const [typingIndex, setTypingIndex] = useState(0);
  const currentThought = "Analyzing client history to ensure response aligns with previous communication style...";

  useEffect(() => {
    if (typingIndex < currentThought.length) {
      const timeout = setTimeout(() => {
        setTypingIndex((prev) => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex]);

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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Assistant Terminal</h1>
        <p className="text-muted-foreground">Layout B - Terminal/developer-style view</p>
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
              <Badge className="bg-teal/20 text-teal border-teal/30 font-mono text-xs">
                <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                ACTIVE
              </Badge>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-4 font-mono text-sm h-[500px] overflow-y-auto">
            {mockLogs.map((log, index) => (
              <div key={index} className="flex items-start gap-2 mb-1">
                <span className="text-gray-600 select-none">{log.timestamp}</span>
                <span className={`${getLogColor(log.type)} select-none`}>{getLogPrefix(log.type)}</span>
                <span className="text-gray-300">{log.message}</span>
              </div>
            ))}
            
            {/* Current Thinking */}
            <div className="mt-4 pt-4 border-t border-gray-800">
              <div className="flex items-start gap-2">
                <Brain className="h-4 w-4 text-teal animate-pulse mt-0.5" />
                <div>
                  <span className="text-teal">Currently thinking:</span>
                  <p className="text-gray-300 mt-1">
                    {currentThought.slice(0, typingIndex)}
                    <span className="inline-block w-2 h-4 bg-teal ml-0.5 animate-pulse" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Task Sidebar */}
        <div className="bg-gray-950 rounded-lg border border-gray-800 overflow-hidden">
          <div className="bg-gray-900 px-4 py-2 border-b border-gray-800">
            <span className="text-sm font-mono text-muted-foreground">Task Queue</span>
          </div>
          <div className="p-3 space-y-2">
            {mockTasks.map((task, index) => (
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
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="border-t border-gray-800 p-3 font-mono text-xs">
            <div className="flex justify-between text-gray-500 mb-1">
              <span>Completed:</span>
              <span className="text-green-500">1</span>
            </div>
            <div className="flex justify-between text-gray-500 mb-1">
              <span>Active:</span>
              <span className="text-teal">1</span>
            </div>
            <div className="flex justify-between text-gray-500">
              <span>Queued:</span>
              <span className="text-gray-400">3</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantLayoutB;
