# Enhancement Plan: AlphaAI Personal AI Executive Assistant System

**Created:** 2026-02-02
**Status:** Draft
**Author:** Claude
**Related Files:**
- `src/pages/AlphaAIDashboard.tsx` (new)
- `src/components/alphaai/` (new directory)
- `src/hooks/useAlphaAI.ts` (new)
- `src/hooks/useTaskSimulation.ts` (extend)
- `src/lib/alphaai/` (new directory)
- `alphaai-workspace/` (new root directory)

---

## Overview

Build **AlphaAI** - a personal AI executive assistant system inspired by the "Build Your Own Klaus" framework, integrated into the αlphaspeed AI website. AlphaAI will:

1. Have a defined identity (SOUL.md, USER.md, AGENTS.md)
2. Run proactive workflows (briefings, audits, monitoring)
3. Maintain persistent memory across sessions
4. Provide a branded dashboard matching the existing design system
5. Track tasks and surface insights proactively

---

## 1. Enhancement Breakdown

### What is being added or changed

| Feature | Description |
|---------|-------------|
| **Identity System** | Markdown-based personality files (SOUL.md, USER.md, AGENTS.md) |
| **Memory System** | Daily logs, long-term memory, project-specific context files |
| **Dashboard Page** | New `/alphaai` route with real-time status, tasks, logs, notes |
| **Workflow Engine** | Configurable proactive workflows (briefings, audits, monitoring) |
| **Task Management** | Kanban board for AI-managed tasks with priorities |
| **Activity Logging** | Timestamped action history with search and filtering |
| **Notes Panel** | User-to-AI communication for async task assignment |
| **Deliverables View** | Links to generated reports and documents |

### Components/Services Affected

| Component | Impact |
|-----------|--------|
| `App.tsx` | Add new route `/alphaai` |
| `src/hooks/useTaskSimulation.ts` | Extend for real task management (vs. demo simulation) |
| `tailwind.config.ts` | No changes needed (existing design system sufficient) |
| `src/components/assistant/*` | Reuse patterns for new AlphaAI layouts |

---

## 2. Reuse vs New Code Analysis

### Can be reused as-is

| Existing Asset | Reuse For |
|---------------|-----------|
| Design system (teal gradients, glows, dark theme) | AlphaAI dashboard styling |
| `Card`, `Badge`, `Progress`, `Button` components | Dashboard UI elements |
| `useTaskSimulation.ts` patterns | Task state machine logic |
| Assistant layout animations (orb, pulse, spin) | Status indicators |
| Activity log rendering from Layout A/B | AlphaAI activity panel |
| Terminal-style output from Layout B | "Thinking" display |

### Needs extension

| Component | Extension Required |
|-----------|-------------------|
| `useTaskSimulation.ts` | Add persistent storage, custom task definitions, workflow triggers |
| Router configuration | Add `/alphaai` route |
| Type definitions | New interfaces for AlphaAI-specific data structures |

### Must be net-new

| New Component | Purpose |
|---------------|---------|
| **`alphaai-workspace/`** | Root directory for identity, memory, and config files |
| **`src/pages/AlphaAIDashboard.tsx`** | Main dashboard page |
| **`src/components/alphaai/`** | AlphaAI-specific components |
| **`src/hooks/useAlphaAI.ts`** | Core hook managing AlphaAI state |
| **`src/lib/alphaai/identity.ts`** | Identity file parsing and management |
| **`src/lib/alphaai/memory.ts`** | Memory system CRUD operations |
| **`src/lib/alphaai/workflows.ts`** | Workflow definitions and execution |

---

## 3. Workflow Impact Analysis

### State Transitions

```
ALPHAAI SESSION STATES:
┌────────────┐   initialize()   ┌─────────┐   start()   ┌─────────┐
│ UNLOADED   │ ────────────────► │  IDLE   │ ──────────► │ RUNNING │
└────────────┘                   └─────────┘             └─────────┘
                                      ▲                       │
                                      │      pause()          │
                                      │◄──────────────────────┤
                                      │                       │
                                 shutdown()              shutdown()
                                      │                       │
                                      ▼                       ▼
                                ┌────────────┐
                                │  SHUTDOWN  │
                                └────────────┘

WORKFLOW EXECUTION:
┌──────────┐   trigger   ┌───────────┐   complete   ┌───────────┐
│ SCHEDULED│ ───────────► │ EXECUTING │ ────────────► │ COMPLETED │
└──────────┘             └───────────┘              └───────────┘
                               │
                          on error
                               │
                               ▼
                         ┌─────────┐
                         │ FAILED  │
                         └─────────┘
```

### Side Effects Introduced

| Side Effect | Description | Mitigation |
|-------------|-------------|------------|
| File system writes | Memory and log files created | Use dedicated `alphaai-workspace/` directory |
| LocalStorage usage | Session state persistence | Namespace keys with `alphaai_` prefix |
| Timer intervals | Workflow heartbeat checks | Proper cleanup on unmount |
| API calls (future) | External integrations | Rate limiting, error handling |

### Regression Risk Level: **Low**

- **Isolated feature** - New pages and components, no modifications to existing functionality
- **No backend changes** - Frontend-only implementation initially
- **Existing assistant demo unaffected** - Separate route and components
- **Design system unchanged** - Reuses existing tokens and patterns

---

## 4. Implementation Order

### Phase 1: Foundation - Identity & Memory System
**Preconditions:** None
**Deliverables:**
1. Create `alphaai-workspace/` directory structure
2. Create template `SOUL.md`, `USER.md`, `AGENTS.md` files
3. Create `MEMORY.md` template
4. Create `memory/` subdirectory for daily logs
5. Implement `src/lib/alphaai/identity.ts` - markdown parsing utilities
6. Implement `src/lib/alphaai/memory.ts` - memory CRUD operations

**Directory structure:**
```
alphaai-workspace/
├── SOUL.md              # AlphaAI's identity and purpose
├── USER.md              # Miguel's profile and business context
├── AGENTS.md            # Operating instructions
├── MEMORY.md            # Long-term facts and lessons
├── memory/
│   └── .gitkeep
├── projects/
│   └── .gitkeep
└── deliverables/
    └── .gitkeep
```

### Phase 2: Core Hook - useAlphaAI
**Preconditions:** Phase 1 complete
**Deliverables:**
1. Create `src/hooks/useAlphaAI.ts` with:
   - Identity state (parsed from markdown files)
   - Memory management methods
   - Task queue state
   - Activity log state
   - Session status management
   - Workflow scheduling logic
2. Define TypeScript interfaces in `src/types/alphaai.ts`

**Hook API:**
```typescript
interface UseAlphaAIReturn {
  // Identity
  identity: AlphaAIIdentity | null;
  userContext: UserContext | null;

  // Tasks
  tasks: AlphaAITask[];
  currentTask: AlphaAITask | null;
  addTask: (task: TaskInput) => void;
  updateTask: (id: string, updates: Partial<AlphaAITask>) => void;
  completeTask: (id: string) => void;

  // Activity
  activityLog: ActivityEntry[];
  addLogEntry: (entry: ActivityInput) => void;

  // Memory
  saveToMemory: (key: string, value: string) => void;
  readFromMemory: (key: string) => string | null;

  // Workflows
  workflows: Workflow[];
  triggerWorkflow: (workflowId: string) => void;

  // Status
  status: AlphaAIStatus;
  start: () => void;
  pause: () => void;
  shutdown: () => void;

  // Notes (user-to-AI communication)
  notes: Note[];
  addNote: (content: string) => void;
  markNoteProcessed: (id: string) => void;
}
```

### Phase 3: Dashboard Components
**Preconditions:** Phase 2 complete
**Deliverables:**
1. Create `src/components/alphaai/` directory
2. Implement dashboard components:

| Component | Purpose |
|-----------|---------|
| `StatusOrb.tsx` | Animated teal orb showing current status |
| `TaskBoard.tsx` | Kanban-style task management |
| `ActivityPanel.tsx` | Scrollable activity log with timestamps |
| `NotesPanel.tsx` | User input area for AI tasks |
| `MemoryViewer.tsx` | Read-only view of memory files |
| `WorkflowList.tsx` | List of scheduled/active workflows |
| `DeliverablesList.tsx` | Links to generated documents |
| `ThinkingDisplay.tsx` | Terminal-style "current thought" output |

### Phase 4: Dashboard Page
**Preconditions:** Phase 3 complete
**Deliverables:**
1. Create `src/pages/AlphaAIDashboard.tsx`
2. Implement responsive layout with panels:
   - Left: Status orb + workflow list
   - Center: Task board + current activity
   - Right: Notes panel + deliverables
3. Add route to `App.tsx`
4. Add navigation link from main site

**Layout (Desktop):**
```
┌────────────────────────────────────────────────────────────────┐
│  AlphaAI Dashboard                           [Pause] [Settings]│
├───────────────┬──────────────────────────────┬─────────────────┤
│               │                              │                 │
│  [Status Orb] │      Task Board (Kanban)     │   Notes Panel   │
│               │  ┌────┐ ┌────┐ ┌────┐        │                 │
│  Workflows:   │  │ToDo│ │Prog│ │Done│        │  ┌───────────┐  │
│  • Briefing   │  └────┘ └────┘ └────┘        │  │ Add note  │  │
│  • Audit      │                              │  └───────────┘  │
│  • Monitor    │  Current Thought:            │                 │
│               │  ┌─────────────────────┐     │  Deliverables:  │
│  Memory:      │  │ Analyzing data...   │     │  • Report.pdf   │
│  [View]       │  └─────────────────────┘     │  • Analysis.md  │
│               │                              │                 │
├───────────────┴──────────────────────────────┴─────────────────┤
│  Activity Log                                                  │
│  ┌────────────────────────────────────────────────────────────┐│
│  │ 10:45:23 [SUCCESS] Completed: Email analysis               ││
│  │ 10:44:12 [TASK] Starting: Email analysis                   ││
│  │ 10:44:00 [INFO] Session initialized                        ││
│  └────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

### Phase 5: Workflow Definitions
**Preconditions:** Phase 4 complete
**Deliverables:**
1. Create `src/lib/alphaai/workflows.ts`
2. Define workflow configurations:

| Workflow | Schedule | Actions |
|----------|----------|---------|
| Morning Briefing | 7:00 AM daily | Summarize news, calendar, priorities |
| Task Review | 8:00 AM daily | Organize tasks, flag blockers |
| Security Audit | Monday 2 PM | Check configurations, access logs |
| Weekly Report | Friday 5 PM | Generate KPI summary |

3. Implement workflow trigger system (manual for v1, cron-style for v2)

### Phase 6: Persistence & Polish
**Preconditions:** Phase 5 complete
**Deliverables:**
1. Implement localStorage persistence for:
   - Session state
   - Task list
   - Activity log (last 100 entries)
   - Notes queue
2. Add settings panel:
   - Workflow enable/disable
   - Notification preferences
   - Theme customization (optional)
3. Add keyboard shortcuts:
   - `Ctrl+N` - New note
   - `Ctrl+P` - Pause/Resume
   - `Ctrl+R` - Reset session
4. Mobile-responsive layout adjustments

---

## 5. Testing Strategy

### Unit Tests Required

| Test File | Coverage |
|-----------|----------|
| `useAlphaAI.test.ts` | Hook state management, task CRUD, memory operations |
| `identity.test.ts` | Markdown parsing, identity file loading |
| `memory.test.ts` | Memory read/write operations |
| `workflows.test.ts` | Workflow trigger logic, scheduling |

**Key test cases:**
- Identity files parse correctly from markdown
- Tasks transition through states properly
- Activity log maintains chronological order
- Memory persists across sessions
- Workflows trigger at correct conditions
- Notes queue processes in order
- Session state survives page refresh

### Integration Tests

| Test | Description |
|------|-------------|
| Dashboard renders | All panels display with mock data |
| Task flow | Add task → In progress → Complete cycle |
| Note processing | Add note → AI picks up → Marked processed |
| Workflow execution | Manual trigger → Actions execute → Log updated |

### Visual/E2E Tests

| Test | Description |
|------|-------------|
| Responsive layout | Dashboard adapts to mobile/tablet/desktop |
| Animation performance | Orb animations smooth at 60fps |
| Dark theme consistency | All components match design system |

### Existing Tests to Update
- None (new isolated feature)

---

## 6. Open Questions / Risks

### Assumptions

1. **Frontend-first approach** - No backend API initially; persistence via localStorage and file downloads
2. **Manual workflow triggers for v1** - Automated scheduling requires backend or service worker
3. **File-based memory system** - Users manually manage workspace files initially
4. **Demo/simulation mode** - Not connected to real email/calendar APIs in v1

### Unknowns

| Unknown | Impact | Resolution Path |
|---------|--------|-----------------|
| Workflow automation method | Determines if we need backend | Start manual, evaluate service workers for v2 |
| External API integrations | Scope of "real" assistant capabilities | Define v1 as simulation, v2 with integrations |
| Memory file format | Markdown vs JSON for structured data | Start with markdown for human readability |
| Multi-user support | Architecture complexity | Assume single-user for v1 |

### Architectural Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| localStorage limits (5-10MB) | Medium | Data loss | Implement export/import, prune old logs |
| Complex state management | Medium | Bugs, race conditions | Single source of truth in useAlphaAI hook |
| Performance with large logs | Low | UI lag | Virtualize long lists, paginate data |
| Scope creep to "real AI" | High | Timeline slip | Clearly define v1 as simulation/framework |

### Out of Scope for v1

- Real email/calendar API integrations
- Automated scheduled workflows (requires backend)
- Multi-user/team support
- Mobile app version
- Voice interface
- Real Claude API integration for AI responses

---

## 7. File Structure Summary

```
alpha-speed-ai-studio/
├── alphaai-workspace/                    # NEW: AlphaAI identity & memory
│   ├── SOUL.md
│   ├── USER.md
│   ├── AGENTS.md
│   ├── MEMORY.md
│   ├── memory/
│   ├── projects/
│   └── deliverables/
├── src/
│   ├── components/
│   │   └── alphaai/                      # NEW: Dashboard components
│   │       ├── StatusOrb.tsx
│   │       ├── TaskBoard.tsx
│   │       ├── ActivityPanel.tsx
│   │       ├── NotesPanel.tsx
│   │       ├── MemoryViewer.tsx
│   │       ├── WorkflowList.tsx
│   │       ├── DeliverablesList.tsx
│   │       └── ThinkingDisplay.tsx
│   ├── hooks/
│   │   ├── useAlphaAI.ts                 # NEW: Core AlphaAI hook
│   │   └── useTaskSimulation.ts          # EXISTING: Reuse patterns
│   ├── lib/
│   │   └── alphaai/                      # NEW: AlphaAI utilities
│   │       ├── identity.ts
│   │       ├── memory.ts
│   │       └── workflows.ts
│   ├── pages/
│   │   └── AlphaAIDashboard.tsx          # NEW: Main dashboard
│   └── types/
│       └── alphaai.ts                    # NEW: Type definitions
└── docs/
    └── enhancement-plans/
        └── 2026-02-02-alphaai-personal-assistant-system.md
```

---

## 8. Estimated Effort by Phase

| Phase | Scope | Components |
|-------|-------|------------|
| Phase 1: Foundation | Identity & Memory System | 6 files |
| Phase 2: Core Hook | useAlphaAI implementation | 2 files |
| Phase 3: Dashboard Components | UI components | 8 files |
| Phase 4: Dashboard Page | Main page + routing | 2 files |
| Phase 5: Workflows | Workflow definitions | 1 file |
| Phase 6: Polish | Persistence, settings, responsive | Updates to existing |

**Total new files:** ~19 files + workspace directory

---

## 9. Success Criteria

### v1 Complete When:

- [ ] AlphaAI dashboard accessible at `/alphaai`
- [ ] Identity files (SOUL.md, USER.md, AGENTS.md) created and displayed
- [ ] Task board functional (add, progress, complete)
- [ ] Activity log shows timestamped entries
- [ ] Notes panel allows user-to-AI task assignment
- [ ] At least 3 workflow definitions exist
- [ ] Session state persists across page refresh
- [ ] Mobile-responsive layout works
- [ ] All animations match existing design system (teal, glows, dark theme)

### Future Roadmap (v2+):

- Backend API for automated workflows
- Real email/calendar integration via OAuth
- Claude API integration for intelligent responses
- Export/import workspace functionality
- Team/multi-user support
- Browser notifications for workflow completion
