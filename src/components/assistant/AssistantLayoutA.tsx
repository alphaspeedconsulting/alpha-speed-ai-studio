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
  Search,
  Users,
  Paperclip,
  Check
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

      {/* Completion Output - Detailed Deliverables */}
      {status === "completed" && (
        <div className="mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Card className="border-green-500/30 bg-gradient-to-br from-background to-green-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle2 className="h-5 w-5" />
                Session Complete - Deliverables Ready
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Here are the deliverables produced by the AI assistant:
              </p>

              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-5 mb-6">
                  <TabsTrigger value="email" className="text-xs"><Mail className="h-3 w-3 mr-1" />Email</TabsTrigger>
                  <TabsTrigger value="response" className="text-xs"><FileText className="h-3 w-3 mr-1" />Response</TabsTrigger>
                  <TabsTrigger value="meeting" className="text-xs"><Calendar className="h-3 w-3 mr-1" />Meeting</TabsTrigger>
                  <TabsTrigger value="report" className="text-xs"><BarChart3 className="h-3 w-3 mr-1" />Report</TabsTrigger>
                  <TabsTrigger value="analysis" className="text-xs"><Search className="h-3 w-3 mr-1" />Analysis</TabsTrigger>
                </TabsList>

                {/* Email Analysis Tab */}
                <TabsContent value="email">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium flex items-center gap-2">
                        <Mail className="h-4 w-4 text-teal" />
                        Email Inbox Analysis
                      </h4>
                      <Badge variant="secondary">3 Priority Items</Badge>
                    </div>
                    <div className="space-y-3">
                      <div className="p-3 rounded bg-red-500/10 border border-red-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">John Smith (Acme Corp)</span>
                          <Badge className="bg-red-500/20 text-red-400 text-xs">Urgent</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Re: Contract renewal deadline - Tomorrow</p>
                      </div>
                      <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">Sarah Chen (TechStart)</span>
                          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">High</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Pricing inquiry - Enterprise tier</p>
                      </div>
                      <div className="p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-sm">Michael Rodriguez</span>
                          <Badge className="bg-yellow-500/20 text-yellow-400 text-xs">High</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Demo request - 50 user deployment</p>
                      </div>
                      <div className="pt-3 border-t border-border text-sm text-muted-foreground">
                        <span className="text-teal">12 newsletters</span> flagged for batch processing • <span className="text-teal">8 automated replies</span> sent
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Client Response Tab */}
                <TabsContent value="response">
                  <div className="rounded-lg border border-border bg-card">
                    <div className="p-4 border-b border-border bg-muted/30">
                      <div className="space-y-2 text-sm">
                        <div className="flex gap-2"><span className="text-muted-foreground w-12">To:</span><span>john.smith@acmecorp.com</span></div>
                        <div className="flex gap-2"><span className="text-muted-foreground w-12">Subject:</span><span>Re: Pricing Inquiry - Custom Enterprise Solution</span></div>
                      </div>
                    </div>
                    <div className="p-4 space-y-4 text-sm">
                      <p>Hi John,</p>
                      <p>Thank you for reaching out about our enterprise solutions. I've reviewed your requirements and put together a custom proposal.</p>
                      <p>Based on your team size (50 users) and integration needs, I recommend our <span className="text-teal font-medium">Professional tier at $89/user/month</span>, which includes:</p>
                      <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-2">
                        <li>Unlimited API calls</li>
                        <li>Priority support (4-hour SLA)</li>
                        <li>Custom integrations</li>
                        <li>Dedicated account manager</li>
                      </ul>
                      <p>I've attached a detailed comparison with your current solution showing potential <span className="text-green-400 font-medium">cost savings of 23% annually</span>.</p>
                      <p>Would Thursday at 2 PM work for a brief call to discuss?</p>
                      <div className="pt-4 text-muted-foreground">
                        <p>Best regards,</p>
                        <p className="font-medium text-foreground">AI Assistant</p>
                        <p>Alpha Speed Consulting</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Meeting Tab */}
                <TabsContent value="meeting">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-16 h-16 rounded-lg bg-teal/20 flex flex-col items-center justify-center">
                        <span className="text-xs text-teal">THU</span>
                        <span className="text-2xl font-bold text-teal">6</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-lg">Team Strategy Meeting</h4>
                        <p className="text-muted-foreground text-sm">Thursday, February 6, 2026 • 2:00 PM - 3:00 PM EST</p>
                        <p className="text-sm text-teal">Zoom (link attached)</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2 flex items-center gap-2"><Users className="h-4 w-4" /> Attendees</h5>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2"><Check className="h-3 w-3 text-green-400" /><span>Sarah Chen</span><Badge variant="outline" className="text-xs">Confirmed</Badge></div>
                          <div className="flex items-center gap-2"><Check className="h-3 w-3 text-green-400" /><span>Michael Rodriguez</span><Badge variant="outline" className="text-xs">Confirmed</Badge></div>
                          <div className="flex items-center gap-2"><Circle className="h-3 w-3 text-yellow-400" /><span>Jennifer Park</span><Badge variant="outline" className="text-xs">Pending</Badge></div>
                          <div className="flex items-center gap-2"><Check className="h-3 w-3 text-green-400" /><span>David Kim</span><Badge variant="outline" className="text-xs">Confirmed</Badge></div>
                          <div className="flex items-center gap-2"><Circle className="h-3 w-3 text-yellow-400" /><span>Alex Thompson</span><Badge variant="outline" className="text-xs">Pending</Badge></div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2">Agenda</h5>
                        <ol className="space-y-1 text-sm text-muted-foreground list-decimal list-inside">
                          <li>Q4 Performance Review (15 min)</li>
                          <li>2026 Strategy Discussion (25 min)</li>
                          <li>Resource Allocation (15 min)</li>
                          <li>Next Steps & Action Items (5 min)</li>
                        </ol>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-border flex items-center gap-2 text-sm text-muted-foreground">
                      <Paperclip className="h-4 w-4" />
                      <span>Q4_Report.pdf, Strategy_Deck.pptx</span>
                    </div>
                  </div>
                </TabsContent>

                {/* Report Tab */}
                <TabsContent value="report">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold mb-1">Weekly Executive Summary</h4>
                    <p className="text-sm text-muted-foreground mb-4">Week of January 27 - February 2, 2026</p>

                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-medium">Metric</th>
                            <th className="text-right py-2 font-medium">Actual</th>
                            <th className="text-right py-2 font-medium">Target</th>
                            <th className="text-right py-2 font-medium">Variance</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Revenue</td>
                            <td className="text-right">$47.2K</td>
                            <td className="text-right text-muted-foreground">$45K</td>
                            <td className="text-right text-green-400">+4.9%</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">New Leads</td>
                            <td className="text-right">127</td>
                            <td className="text-right text-muted-foreground">100</td>
                            <td className="text-right text-green-400">+27%</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Conversion</td>
                            <td className="text-right">3.2%</td>
                            <td className="text-right text-muted-foreground">3.0%</td>
                            <td className="text-right text-green-400">+0.2%</td>
                          </tr>
                          <tr>
                            <td className="py-2">Response Time</td>
                            <td className="text-right">2.3 hrs</td>
                            <td className="text-right text-muted-foreground">4 hrs</td>
                            <td className="text-right text-green-400">-42%</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium mb-2 text-green-400">Highlights</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>• Lead generation exceeded target by 27%</li>
                          <li>• Average response time improved to 2.3 hours</li>
                          <li>• Two enterprise deals in final negotiation</li>
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium mb-2 text-teal">Action Items</h5>
                        <ul className="text-sm space-y-1 text-muted-foreground">
                          <li>1. Follow up with Acme Corp (Decision: Feb 5)</li>
                          <li>2. Schedule demo for TechStart Inc</li>
                          <li>3. Review pricing for Q2 adjustments</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Analysis Tab */}
                <TabsContent value="analysis">
                  <div className="rounded-lg border border-border bg-card p-4">
                    <h4 className="font-semibold mb-4">Competitive Landscape Analysis</h4>

                    <div className="overflow-x-auto mb-4">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-2 font-medium">Feature</th>
                            <th className="text-center py-2 font-medium text-teal">Us</th>
                            <th className="text-center py-2 font-medium">Comp A</th>
                            <th className="text-center py-2 font-medium">Comp B</th>
                            <th className="text-center py-2 font-medium">Comp C</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Base Price</td>
                            <td className="text-center text-teal font-medium">$79/mo</td>
                            <td className="text-center">$59/mo</td>
                            <td className="text-center">$99/mo</td>
                            <td className="text-center">$69/mo</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">API Calls</td>
                            <td className="text-center text-teal font-medium">Unlimited</td>
                            <td className="text-center text-muted-foreground">10K/mo</td>
                            <td className="text-center">Unlimited</td>
                            <td className="text-center text-muted-foreground">50K/mo</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Integrations</td>
                            <td className="text-center text-teal font-medium">45+</td>
                            <td className="text-center text-muted-foreground">20</td>
                            <td className="text-center">30</td>
                            <td className="text-center text-muted-foreground">25</td>
                          </tr>
                          <tr className="border-b border-border/50">
                            <td className="py-2">Support SLA</td>
                            <td className="text-center text-teal font-medium">4 hrs</td>
                            <td className="text-center text-muted-foreground">24 hrs</td>
                            <td className="text-center">8 hrs</td>
                            <td className="text-center text-muted-foreground">12 hrs</td>
                          </tr>
                          <tr>
                            <td className="py-2">Custom Workflows</td>
                            <td className="text-center text-green-400">✓</td>
                            <td className="text-center text-red-400">✗</td>
                            <td className="text-center text-green-400">✓</td>
                            <td className="text-center text-yellow-400">Limited</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="p-3 rounded bg-teal/10 border border-teal/20">
                      <h5 className="font-medium mb-2 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-teal" />
                        Recommendation
                      </h5>
                      <p className="text-sm text-muted-foreground">
                        While Competitor A offers lower pricing, our unlimited API calls and superior integration options justify the premium. Focus sales conversations on:
                      </p>
                      <ul className="text-sm mt-2 space-y-1">
                        <li>• <span className="text-teal">Integration depth</span> (45+ vs industry avg of 25)</li>
                        <li>• <span className="text-teal">Support SLA</span> (4 hrs vs competitor avg of 14 hrs)</li>
                        <li>• <span className="text-teal">Custom workflow flexibility</span></li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AssistantLayoutA;
