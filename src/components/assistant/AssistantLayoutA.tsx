import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  CheckCircle2, 
  Circle, 
  Loader2, 
  Clock, 
  Zap,
  Activity,
  MessageSquare
} from "lucide-react";

const mockTasks = [
  { id: 1, title: "Analyzing email inbox", status: "completed", progress: 100 },
  { id: 2, title: "Drafting response to client inquiry", status: "in-progress", progress: 65 },
  { id: 3, title: "Scheduling team meeting for Thursday", status: "queued", progress: 0 },
  { id: 4, title: "Preparing weekly report summary", status: "queued", progress: 0 },
  { id: 5, title: "Researching competitor pricing", status: "queued", progress: 0 },
];

const mockActivity = [
  { time: "2 min ago", action: "Completed email analysis - found 3 priority items" },
  { time: "5 min ago", action: "Started drafting client response" },
  { time: "8 min ago", action: "Added 3 new tasks to queue" },
  { time: "12 min ago", action: "Session initialized" },
];

const AssistantLayoutA = () => {
  const [pulsePhase, setPulsePhase] = useState(0);
  const [currentTask, setCurrentTask] = useState(mockTasks[1]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulsePhase((prev) => (prev + 1) % 3);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">AI Assistant Dashboard</h1>
        <p className="text-muted-foreground">Layout A - Card-based dashboard view</p>
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
                    pulsePhase === 0 ? 'scale-100 shadow-[0_0_30px_hsl(var(--teal)/0.5)]' : 
                    pulsePhase === 1 ? 'scale-105 shadow-[0_0_50px_hsl(var(--teal)/0.7)]' : 
                    'scale-95 shadow-[0_0_20px_hsl(var(--teal)/0.3)]'
                  }`}
                >
                  <Brain className="h-12 w-12 text-white" />
                </div>
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <Badge className="bg-teal text-white border-0">
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Working
                </Badge>
              </div>
            </div>

            {/* Current Task */}
            <div className="text-center w-full">
              <p className="text-sm text-muted-foreground mb-2">Currently working on:</p>
              <p className="font-medium text-foreground mb-3">{currentTask.title}</p>
              <Progress value={currentTask.progress} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">{currentTask.progress}% complete</p>
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
              <Badge variant="secondary">{mockTasks.length} tasks</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockTasks.map((task) => (
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
            <div className="space-y-3">
              {mockActivity.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                  <Clock className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
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
                <span className="text-2xl font-bold text-teal">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">In Progress</span>
                <span className="text-2xl font-bold">1</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Queued</span>
                <span className="text-2xl font-bold text-muted-foreground">3</span>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-border/50">
                <span className="text-muted-foreground">Session Time</span>
                <span className="font-medium">12 minutes</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AssistantLayoutA;
