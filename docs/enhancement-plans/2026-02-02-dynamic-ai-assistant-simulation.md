# Enhancement Plan: Dynamic AI Assistant Task Simulation

**Created:** 2026-02-02
**Status:** Draft
**Author:** Claude
**Related Files:**
- `src/components/assistant/AssistantLayoutA.tsx`
- `src/components/assistant/AssistantLayoutB.tsx`
- `src/components/assistant/AssistantLayoutC.tsx`
- `src/pages/Assistant.tsx`
- `src/hooks/useTaskSimulation.ts` (new)

---

## 1. Enhancement Breakdown

### What is being added or changed
Transform the static AI Assistant demo into a dynamic, animated simulation that:
1. **Automatically progresses through tasks** - Tasks move from "queued" → "in-progress" → "completed"
2. **Shows realistic timing** - Each task takes a variable amount of time to complete
3. **Updates progress in real-time** - Progress bars animate smoothly from 0% to 100%
4. **Generates activity logs dynamically** - New log entries appear as tasks progress
5. **Cycles or resets** - After all tasks complete, optionally restart the simulation

### Components affected
| Component | Changes Required |
|-----------|------------------|
| `AssistantLayoutA.tsx` | Replace static mockData with dynamic state from simulation hook |
| `AssistantLayoutB.tsx` | Replace static logs with streaming log output from hook |
| `AssistantLayoutC.tsx` | Connect to shared simulation state |
| `Assistant.tsx` | Manage shared simulation state across layout switches |
| `useTaskSimulation.ts` | **NEW** - Custom hook to manage task simulation logic |

---

## 2. Reuse vs New Code Analysis

### Can be reused as-is
- All existing UI components (Card, Badge, Progress, etc.)
- Existing layout structures and styling
- Icon imports and visual design
- Animation utilities (pulse, spin, etc.)

### Needs extension
- `mockTasks` array → Convert to stateful task list with timing metadata
- `mockActivity` / `mockLogs` → Convert to dynamically growing arrays
- Progress display components → Connect to live progress state

### Must be net-new
1. **`useTaskSimulation` hook** - Core simulation engine containing:
   - Task queue state management
   - Timer-based progression logic
   - Progress interpolation
   - Activity log generation
   - Simulation controls (start/pause/reset)

2. **Task timing configuration** - Define realistic durations for each task type

3. **Shared state management** - Ensure simulation persists across layout switches

---

## 3. Workflow Impact Analysis

### State transitions introduced
```
SIMULATION STATES:
┌─────────┐     start()     ┌─────────┐     all done     ┌───────────┐
│  IDLE   │ ───────────────► │ RUNNING │ ───────────────► │ COMPLETED │
└─────────┘                  └─────────┘                  └───────────┘
     ▲                            │                            │
     │         pause()            │                            │
     │◄───────────────────────────┤                            │
     │                            │                            │
     │                       reset()                      reset()
     │◄────────────────────────────────────────────────────────┘

TASK STATES:
┌────────┐    task selected    ┌─────────────┐   progress=100%   ┌───────────┐
│ QUEUED │ ──────────────────► │ IN_PROGRESS │ ─────────────────► │ COMPLETED │
└────────┘                     └─────────────┘                    └───────────┘
```

### Side effects
- Timer intervals created on mount, cleaned up on unmount
- State updates every ~100ms during active task progression
- Layout switches preserve simulation state (no reset)

### Regression risk level: **Low**
- No backend changes
- No routing changes
- Visual-only enhancements
- Existing static display still works if hook fails

---

## 4. Implementation Order

### Phase 1: Create Simulation Hook (Foundation)
**Preconditions:** None
**Deliverables:**
1. Create `src/hooks/useTaskSimulation.ts`
2. Define task interface with timing metadata
3. Implement core state machine (idle/running/completed)
4. Implement progress interpolation logic
5. Implement activity log generation

### Phase 2: Integrate with Layout C (Simplest First)
**Preconditions:** Phase 1 complete
**Deliverables:**
1. Replace `mockTasks` with hook state
2. Connect progress bar to live progress
3. Update task list to reflect real-time status
4. Test animation smoothness

### Phase 3: Integrate with Layout A (Dashboard)
**Preconditions:** Phase 2 complete
**Deliverables:**
1. Connect task queue card to hook state
2. Connect activity log to dynamic log entries
3. Update session stats to reflect real counts
4. Sync "current task" display with active task

### Phase 4: Integrate with Layout B (Terminal)
**Preconditions:** Phase 3 complete
**Deliverables:**
1. Replace `mockLogs` with streaming log output
2. Implement auto-scroll for new log entries
3. Update thinking text to reflect current task
4. Connect task sidebar to hook state

### Phase 5: Shared State Across Layouts
**Preconditions:** Phases 2-4 complete
**Deliverables:**
1. Lift simulation state to `Assistant.tsx`
2. Pass state and controls to each layout as props
3. Ensure layout switching preserves simulation progress
4. Add optional reset button in UI

### Phase 6: Polish and Configuration
**Preconditions:** Phase 5 complete
**Deliverables:**
1. Fine-tune task durations for realism
2. Add variety to activity log messages
3. Implement auto-restart after completion (optional)
4. Add subtle sound effects (optional, user preference)

---

## 5. Testing Strategy

### Unit tests required
| Test File | Coverage |
|-----------|----------|
| `useTaskSimulation.test.ts` | Hook state transitions, timer logic, progress calculation |

**Key test cases:**
- Initial state is idle with all tasks queued
- Starting simulation transitions first task to in-progress
- Progress increments correctly over time
- Task completes when progress reaches 100%
- Next queued task starts after completion
- Simulation ends when all tasks complete
- Reset returns to initial state
- Pause stops progress, resume continues

### E2E / Integration tests
| Test | Description |
|------|-------------|
| Layout renders with simulation | Each layout displays dynamic data correctly |
| Layout switch preserves state | Switching A→B→C maintains task progress |
| Visual regression | Animations appear smooth, no flickering |

### Existing tests to update
- None (no existing tests for assistant layouts)

---

## 6. Open Questions / Risks

### Assumptions
1. User wants visual demo only (no real AI/backend integration)
2. Auto-restart after completion is acceptable behavior
3. ~30-60 second total simulation time is appropriate
4. Current task set is representative and doesn't need customization

### Unknowns
1. **Desired simulation speed** - Should tasks complete quickly (demo) or slowly (realistic)?
2. **Reset behavior** - Auto-reset, manual button, or loop continuously?
3. **User controls** - Should users be able to pause/skip tasks?
4. **Mobile performance** - Need to verify 100ms timers don't drain battery

### Architectural risks
| Risk | Mitigation |
|------|------------|
| Timer memory leaks | Strict cleanup in useEffect return |
| State sync issues across layouts | Single source of truth in parent component |
| Performance on low-end devices | Throttle updates to 100ms minimum interval |
| Jarring layout switch | Preserve exact state when switching layouts |

---

## Implementation Notes

### Suggested Task Timing
```typescript
const TASK_DURATIONS = {
  "Analyzing email inbox": 8000,           // 8 seconds
  "Drafting response to client inquiry": 12000,  // 12 seconds
  "Scheduling team meeting for Thursday": 6000,  // 6 seconds
  "Preparing weekly report summary": 10000,      // 10 seconds
  "Researching competitor pricing": 15000,       // 15 seconds
};
// Total: ~51 seconds for full cycle
```

### Hook API Design
```typescript
interface UseTaskSimulationReturn {
  // State
  tasks: Task[];
  currentTask: Task | null;
  activityLog: ActivityEntry[];
  status: 'idle' | 'running' | 'completed';

  // Computed
  completedCount: number;
  totalCount: number;
  overallProgress: number;

  // Controls
  start: () => void;
  pause: () => void;
  reset: () => void;
}
```

---

## Summary

This enhancement transforms the static AI Assistant demo into an engaging, animated simulation that showcases AI task processing in real-time. The implementation is low-risk, requires no backend changes, and can be completed in 6 phases with clear dependencies.

**Key deliverable:** A reusable `useTaskSimulation` hook that drives all three layout variants from a single source of truth.
