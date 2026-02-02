import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  CheckCircle2, 
  Circle, 
  Loader2,
  ChevronDown,
  ChevronUp
} from "lucide-react";

const mockTasks = [
  { id: 1, title: "Analyzing email inbox", status: "completed", detail: "Found 3 priority items" },
  { id: 2, title: "Drafting response to client inquiry", status: "in-progress", detail: "65% complete" },
  { id: 3, title: "Scheduling team meeting for Thursday", status: "queued", detail: "" },
  { id: 4, title: "Preparing weekly report summary", status: "queued", detail: "" },
  { id: 5, title: "Researching competitor pricing", status: "queued", detail: "" },
];

const AssistantLayoutC = () => {
  const [expanded, setExpanded] = useState(true);
  const [orbPhase, setOrbPhase] = useState(0);
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    const interval = setInterval(() => {
      setOrbPhase((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const currentTask = mockTasks.find(t => t.status === 'in-progress');
  const completedCount = mockTasks.filter(t => t.status === 'completed').length;
  const totalCount = mockTasks.length;

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
            background: `conic-gradient(from ${orbPhase}deg, transparent, hsl(var(--teal)) 25%, transparent 50%, hsl(var(--teal-glow)) 75%, transparent)`,
            filter: 'blur(20px)',
            opacity: 0.4,
            transform: 'scale(1.2)'
          }}
        />
        
        {/* Main orb */}
        <div className="relative w-48 h-48 rounded-full bg-gradient-to-br from-gray-900 to-background border-2 border-teal/30 flex items-center justify-center shadow-[0_0_60px_-10px_hsl(var(--teal)/0.5)]">
          {/* Inner rotating ring */}
          <div 
            className="absolute inset-4 rounded-full border border-teal/20"
            style={{ transform: `rotate(${orbPhase}deg)` }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-teal" />
          </div>
          
          {/* Brain icon */}
          <Brain className="h-16 w-16 text-teal" />
        </div>

        {/* Status badge */}
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2">
          <Badge className="bg-teal text-white border-0 shadow-lg px-4 py-1">
            <Loader2 className="h-3 w-3 mr-2 animate-spin" />
            Processing
          </Badge>
        </div>
      </div>

      {/* Current Task Display */}
      <div className="text-center mb-8 max-w-md">
        <p className="text-sm text-muted-foreground mb-2">Currently working on</p>
        <h2 className="text-xl font-semibold mb-4">{currentTask?.title}</h2>
        <div className="w-64 mx-auto">
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-sm text-muted-foreground">{progress}% complete</p>
        </div>
      </div>

      {/* Compact Progress Bar */}
      <div className="flex items-center gap-4 mb-8">
        <span className="text-sm text-muted-foreground">Progress</span>
        <div className="flex gap-1">
          {mockTasks.map((task, index) => (
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
            {mockTasks.map((task) => (
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
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssistantLayoutC;
