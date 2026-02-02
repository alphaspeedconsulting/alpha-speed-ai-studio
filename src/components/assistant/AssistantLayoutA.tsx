import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Brain,
  CheckCircle2,
  Circle,
  Loader2,
  Clock,
  Zap,
  Activity,
  MessageSquare,
  Play,
  Pause,
  RotateCcw,
  FileText,
  Mail,
  Calendar,
  BarChart3,
  Search
} from "lucide-react";
import { Task, ActivityEntry, SimulationStatus } from "@/hooks/useTaskSimulation";

interface AssistantLayoutAProps {
  tasks: Task[];
  currentTask: Task | null;
  activityLog: ActivityEntry[];
  status: SimulationStatus;
  completedCount: number;
  totalCount: number;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const AssistantLayoutA = ({
  tasks,
  currentTask,
  activityLog,
  status,
  completedCount,
  totalCount,
  start,
  pause,
  reset,
}: AssistantLayoutAProps) => {
  const [pulsePhase, setPulsePhase] = useState(0);
  const [sessionTime, setSessionTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (status === "running") {
      interval = setInterval(() => {
        setSessionTime((prev) => prev + 1);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [status]);

  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const queuedCount = tasks.filter(t => t.status === "queued").length;
  const inProgressCount = tasks.filter(t => t.status === "in-progress").length;

  const getStatusBadge = () => {
    switch (status) {
      case "running":
        return (
          <Badge className="bg-teal text-white border-0">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Working
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-yellow-500 text-white border-0">
            <Pause className="h-3 w-3 mr-1" />
            Paused
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500 text-white border-0">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Complete
          </Badge>
        );
      default:
        return (
          <Badge className="bg-muted text-muted-foreground border-0">
            <Circle className="h-3 w-3 mr-1" />
            Idle
          </Badge>
        );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">AI Assistant Dashboard</h1>
          <p className="text-muted-foreground">Layout A - Card-based dashboard view</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Status Card - Large */}
        <Card className="lg:col-span-1 border-teal/30 bg-gradient-to-br from-background to-teal/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-teal" />
              AI Status
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            {/* Animated AI Orb */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-teal/20 to-teal/5 flex items-center justify-center">
                <div
                  className={`w-24 h-24 rounded-full bg-gradient-to-br from-teal to-teal-glow flex items-center justify-center transition-all duration-500 ${
                    status === "running"
                      ? pulsePhase === 0 ? 'scale-100 shadow-[0_0_30px_hsl(var(--teal)/0.5)]' :
                        pulsePhase === 1 ? 'scale-105 shadow-[0_0_50px_hsl(var(--teal)/0.7)]' :
                        'scale-95 shadow-[0_0_20px_hsl(var(--teal)/0.3)]'
                      : 'scale-100 shadow-none opacity-50'
                  }`}
                >
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                {getStatusBadge()}
              </div>
            </div>

            {/* Current Task */}
            <div className="text-center w-full">
              <p className="text-sm text-muted-foreground mb-2">
                {currentTask ? "Currently working on:" : status === "completed" ? "Session complete" : "Ready to start"}
              </p>
              <p className="font-medium text-foreground mb-3">
                {currentTask?.title || (status === "completed" ? "All tasks finished!" : "Click Start to begin")}
              </p>
              {currentTask && (
                <>
                  <Progress value={currentTask.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-2">{currentTask.progress}% complete</p>
                </>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Task Queue */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-teal" />
                Task Queue
              </span>
              <Badge variant="secondary">{tasks.length} tasks</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`p-4 rounded-lg border transition-all ${
                    task.status === 'in-progress'
                      ? 'border-teal/50 bg-teal/5'
                      : task.status === 'completed'
                      ? 'border-border/50 bg-muted/30'
                      : 'border-border/30 bg-background'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {task.status === 'completed' && (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    )}
                    {task.status === 'in-progress' && (
                      <Loader2 className="h-5 w-5 text-teal animate-spin flex-shrink-0" />
                    )}
                    {task.status === 'queued' && (
                      <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className={`font-medium truncate ${
                        task.status === 'completed' ? 'text-muted-foreground line-through' : ''
                      }`}>
                        {task.title}
                      </p>
                      {task.status === 'in-progress' && (
                        <Progress value={task.progress} className="h-1.5 mt-2" />
                      )}
                      {task.status === 'completed' && task.detail && (
                        <p className="text-xs text-muted-foreground mt-1">{task.detail}</p>
                      )}
                    </div>
                    <Badge variant={
                      task.status === 'completed' ? 'secondary' :
                      task.status === 'in-progress' ? 'default' : 'outline'
                    }>
                      {task.status === 'in-progress' ? `${task.progress}%` : task.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Activity Log */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-teal" />
              Activity Log
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {activityLog.length > 0 ? (
                activityLog.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                    <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <p className={`text-sm ${
                        item.type === 'success' ? 'text-green-400' :
                        item.type === 'task' ? 'text-teal' :
                        item.type === 'thinking' ? 'text-yellow-400' : ''
                      }`}>{item.action}</p>
                      <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Activity className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No activity yet. Start the simulation to see logs.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-teal" />
              Session Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tasks Completed</span>
                <span className="text-2xl font-bold text-teal">{completedCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">In Progress</span>
                <span className="text-2xl font-bold">{inProgressCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Queued</span>
                <span className="text-2xl font-bold text-muted-foreground">{queuedCount}</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border/50">
                <span className="text-muted-foreground">Session Time</span>
                <span className="font-medium">{formatSessionTime(sessionTime)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Completion Output - Example Results */}
      {status === "completed" && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-green-500/30 bg-gradient-to-br from-background to-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                Session Complete - Example Output
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Here's a sample of what the AI assistant produced during this session:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Mail className="h-4 w-4 text-teal" />
                    <span className="font-medium">Email Analysis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Found 3 priority emails requiring immediate attention. Flagged 12 newsletters for batch processing.</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-4 w-4 text-teal" />
                    <span className="font-medium">Client Response Draft</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Professional response drafted addressing pricing inquiry. Included comparison table and next steps.</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-teal" />
                    <span className="font-medium">Meeting Scheduled</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Team meeting set for Thursday 2:00 PM. Calendar invites sent to 5 attendees with agenda attached.</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                  <div className="flex items-center gap-2 mb-2">
                    <BarChart3 className="h-4 w-4 text-teal" />
                    <span className="font-medium">Weekly Report</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Generated executive summary with 4 KPIs, trend analysis, and 3 action items for leadership review.</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 md:col-span-2">
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="h-4 w-4 text-teal" />
                    <span className="font-medium">Competitor Analysis</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Analyzed 5 competitors. Key findings: 2 have lower entry pricing, 1 offers similar features at 20% higher cost. Recommendation: Emphasize our unique integration capabilities in sales conversations.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AssistantLayoutA;
