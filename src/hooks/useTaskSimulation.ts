import { useState, useEffect, useCallback, useRef } from "react";

export interface Task {
  id: number;
  title: string;
  status: "queued" | "in-progress" | "completed";
  progress: number;
  duration: number;
  detail?: string;
}

export interface ActivityEntry {
  time: string;
  action: string;
  type: "info" | "success" | "task" | "thinking";
  timestamp: string;
}

export type SimulationStatus = "idle" | "running" | "paused" | "completed";

interface UseTaskSimulationReturn {
  tasks: Task[];
  currentTask: Task | null;
  activityLog: ActivityEntry[];
  status: SimulationStatus;
  completedCount: number;
  totalCount: number;
  overallProgress: number;
  currentThought: string;
  start: () => void;
  pause: () => void;
  reset: () => void;
}

const INITIAL_TASKS: Task[] = [
  { id: 1, title: "Analyzing email inbox", status: "queued", progress: 0, duration: 8000 },
  { id: 2, title: "Drafting response to client inquiry", status: "queued", progress: 0, duration: 12000 },
  { id: 3, title: "Scheduling team meeting for Thursday", status: "queued", progress: 0, duration: 6000 },
  { id: 4, title: "Preparing weekly report summary", status: "queued", progress: 0, duration: 10000 },
  { id: 5, title: "Researching competitor pricing", status: "queued", progress: 0, duration: 15000 },
];

const TASK_THOUGHTS: Record<string, string[]> = {
  "Analyzing email inbox": [
    "Connecting to email API...",
    "Scanning 247 emails from last 7 days...",
    "Applying priority filters...",
    "Identifying urgent items requiring attention...",
  ],
  "Drafting response to client inquiry": [
    "Loading client context from CRM...",
    "Analyzing previous communication history...",
    "Considering tone and previous interactions...",
    "Generating professional response draft...",
  ],
  "Scheduling team meeting for Thursday": [
    "Checking calendar availability...",
    "Finding optimal time slots...",
    "Sending meeting invitations...",
    "Confirming attendee availability...",
  ],
  "Preparing weekly report summary": [
    "Gathering data from all sources...",
    "Analyzing key performance metrics...",
    "Generating visualizations...",
    "Compiling executive summary...",
  ],
  "Researching competitor pricing": [
    "Scanning competitor websites...",
    "Extracting pricing information...",
    "Comparing feature sets...",
    "Generating competitive analysis...",
  ],
};

const TASK_COMPLETION_DETAILS: Record<string, string> = {
  "Analyzing email inbox": "Found 3 priority items",
  "Drafting response to client inquiry": "Draft ready for review",
  "Scheduling team meeting for Thursday": "Meeting scheduled for 2:00 PM",
  "Preparing weekly report summary": "Report generated successfully",
  "Researching competitor pricing": "Analysis complete - 5 competitors reviewed",
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).toLowerCase().replace(" ", "");
};

const formatTimestamp = (date: Date): string => {
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
};

export const useTaskSimulation = (): UseTaskSimulationReturn => {
  const [tasks, setTasks] = useState<Task[]>(
    INITIAL_TASKS.map(t => ({ ...t }))
  );
  const [activityLog, setActivityLog] = useState<ActivityEntry[]>([]);
  const [status, setStatus] = useState<SimulationStatus>("idle");
  const [currentThought, setCurrentThought] = useState("");

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const thoughtIndexRef = useRef(0);
  const startTimeRef = useRef<number>(0);

  const currentTask = tasks.find(t => t.status === "in-progress") || null;
  const completedCount = tasks.filter(t => t.status === "completed").length;
  const totalCount = tasks.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  const addLogEntry = useCallback((action: string, type: ActivityEntry["type"] = "info") => {
    const now = new Date();
    setActivityLog(prev => [
      {
        time: "just now",
        action,
        type,
        timestamp: formatTimestamp(now),
      },
      ...prev.map((entry, idx) => ({
        ...entry,
        time: idx === 0 ? "just now" :
              idx < 3 ? `${idx + 1} min ago` :
              `${idx + 2} min ago`
      })).slice(0, 19)
    ]);
  }, []);

  const startNextTask = useCallback(() => {
    setTasks(prevTasks => {
      const nextQueuedIndex = prevTasks.findIndex(t => t.status === "queued");
      if (nextQueuedIndex === -1) {
        setStatus("completed");
        addLogEntry("All tasks completed successfully!", "success");
        return prevTasks;
      }

      const newTasks = [...prevTasks];
      newTasks[nextQueuedIndex] = {
        ...newTasks[nextQueuedIndex],
        status: "in-progress",
        progress: 0,
      };

      const taskTitle = newTasks[nextQueuedIndex].title;
      addLogEntry(`Starting task: ${taskTitle}`, "task");
      thoughtIndexRef.current = 0;
      startTimeRef.current = Date.now();

      return newTasks;
    });
  }, [addLogEntry]);

  const completeCurrentTask = useCallback(() => {
    setTasks(prevTasks => {
      const inProgressIndex = prevTasks.findIndex(t => t.status === "in-progress");
      if (inProgressIndex === -1) return prevTasks;

      const newTasks = [...prevTasks];
      const taskTitle = newTasks[inProgressIndex].title;
      newTasks[inProgressIndex] = {
        ...newTasks[inProgressIndex],
        status: "completed",
        progress: 100,
        detail: TASK_COMPLETION_DETAILS[taskTitle] || "Completed",
      };

      addLogEntry(`Completed: ${taskTitle}`, "success");

      return newTasks;
    });

    setTimeout(() => {
      startNextTask();
    }, 500);
  }, [addLogEntry, startNextTask]);

  const tick = useCallback(() => {
    setTasks(prevTasks => {
      const inProgressIndex = prevTasks.findIndex(t => t.status === "in-progress");
      if (inProgressIndex === -1) return prevTasks;

      const task = prevTasks[inProgressIndex];
      const elapsed = Date.now() - startTimeRef.current;
      const newProgress = Math.min(100, Math.round((elapsed / task.duration) * 100));

      // Update thought based on progress
      const thoughts = TASK_THOUGHTS[task.title] || [];
      const thoughtIndex = Math.min(
        Math.floor((newProgress / 100) * thoughts.length),
        thoughts.length - 1
      );

      if (thoughtIndex !== thoughtIndexRef.current && thoughts[thoughtIndex]) {
        thoughtIndexRef.current = thoughtIndex;
        setCurrentThought(thoughts[thoughtIndex]);
        addLogEntry(thoughts[thoughtIndex], "thinking");
      }

      if (newProgress >= 100) {
        completeCurrentTask();
        return prevTasks;
      }

      const newTasks = [...prevTasks];
      newTasks[inProgressIndex] = {
        ...newTasks[inProgressIndex],
        progress: newProgress,
      };
      return newTasks;
    });
  }, [addLogEntry, completeCurrentTask]);

  const start = useCallback(() => {
    if (status === "running") return;

    if (status === "idle" || status === "completed") {
      addLogEntry("Session initialized", "info");
    }

    setStatus("running");

    if (!currentTask) {
      startNextTask();
    } else {
      startTimeRef.current = Date.now() - (currentTask.progress / 100) * currentTask.duration;
    }
  }, [status, currentTask, addLogEntry, startNextTask]);

  const pause = useCallback(() => {
    setStatus("paused");
    addLogEntry("Session paused", "info");
  }, [addLogEntry]);

  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setTasks(INITIAL_TASKS.map(t => ({ ...t })));
    setActivityLog([]);
    setStatus("idle");
    setCurrentThought("");
    thoughtIndexRef.current = 0;
    startTimeRef.current = 0;
  }, []);

  // Main simulation loop
  useEffect(() => {
    if (status === "running") {
      intervalRef.current = setInterval(tick, 100);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, tick]);

  // Auto-start on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      start();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return {
    tasks,
    currentTask,
    activityLog,
    status,
    completedCount,
    totalCount,
    overallProgress,
    currentThought,
    start,
    pause,
    reset,
  };
};
