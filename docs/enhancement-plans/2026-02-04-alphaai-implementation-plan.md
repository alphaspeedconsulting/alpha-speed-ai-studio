# Enhancement Plan: AlphaAI Personal Assistant — Full Implementation

**Created:** 2026-02-04
**Status:** Draft
**Author:** Claude
**Related Files:**
- `src/App.tsx` (modify — add routes)
- `src/pages/AlphaAIDashboard.tsx` (new)
- `src/pages/AlphaAIMemory.tsx` (new)
- `src/pages/AlphaAIWorkflows.tsx` (new)
- `src/pages/AlphaAISettings.tsx` (new)
- `src/components/alphaai/` (new directory — 12+ components)
- `src/components/alphaai/layout/AlphaAIShell.tsx` (new — shared layout shell)
- `src/hooks/useAlphaAI.ts` (new)
- `src/lib/alphaai/identity.ts` (new)
- `src/lib/alphaai/memory.ts` (new)
- `src/lib/alphaai/workflows.ts` (new)
- `src/lib/alphaai/storage.ts` (new)
- `src/types/alphaai.ts` (new)
- `alphaai-workspace/` (new root directory — identity & memory files)
- `scripts/setup-alphaai.sh` (new — local setup script)
- `mockups/` (reference — 4 HTML mockup files)

**Reference Mockups:**
- `mockups/alphaai-dashboard-mockup.html`
- `mockups/alphaai-memory-mockup.html`
- `mockups/alphaai-workflows-mockup.html`
- `mockups/alphaai-settings-mockup.html`

---

## 1. Enhancement Breakdown

### What is being added or changed

| Feature | Description | Mockup Reference |
|---------|-------------|------------------|
| **Setup Script** | Bash script to bootstrap project in a Python venv on Mac Mini (Node, deps, workspace) | N/A |
| **AlphaAI Shell** | Shared layout with header nav (Dashboard/Memory/Workflows/Settings), status badge, background effects | All 4 mockups — header |
| **Dashboard Page** | `/alphaai` — Status orb, kanban task board, notes panel, thinking display, activity log, deliverables | `alphaai-dashboard-mockup.html` |
| **Memory Page** | `/alphaai/memory` — File tree sidebar, markdown viewer, long-term memory timeline, search | `alphaai-memory-mockup.html` |
| **Workflows Page** | `/alphaai/workflows` — Workflow cards with step progress, execution history, upcoming runs | `alphaai-workflows-mockup.html` |
| **Settings Page** | `/alphaai/settings` — General config, workflow toggles, notifications, shortcuts, data/storage management | `alphaai-settings-mockup.html` |
| **Identity System** | Markdown files (SOUL.md, USER.md, AGENTS.md) bundled as static assets or fetched at runtime | Dashboard + Memory |
| **Memory System** | localStorage-based persistent memory with daily logs, facts, project contexts | Memory page |
| **Workflow Engine** | Manual-trigger workflow system with step tracking, history, and scheduling display | Workflows page |
| **Task Management** | Kanban board (To Do / In Progress / Done) with priority levels and progress tracking | Dashboard |
| **Notes System** | Async user-to-AI communication panel with simulated AI responses | Dashboard |
| **Activity Logging** | Timestamped, color-coded, filterable log of all system activity | Dashboard bottom |
| **Persistence Layer** | localStorage with namespaced keys (`alphaai_*`), export/import, storage stats | Settings |

### Components/Services Affected

| Component | Impact |
|-----------|--------|
| `App.tsx` | Add 4 nested routes under `/alphaai/*` |
| `src/hooks/useTaskSimulation.ts` | **No modification** — AlphaAI uses its own `useAlphaAI` hook |
| `tailwind.config.ts` | **No changes** — existing design tokens are sufficient |
| `src/components/ui/*` | **Reuse as-is** — Card, Badge, Button, Progress, Tabs, Accordion, ScrollArea |
| `index.css` | **No changes** — existing CSS custom properties cover all needs |
| Existing pages (Index, Assistant) | **Unaffected** — AlphaAI is fully isolated |

---

## 2. Reuse vs New Code Analysis

### Can be reused as-is

| Existing Asset | Reuse For |
|---------------|-----------|
| `Card`, `CardHeader`, `CardContent` | All panels on every page |
| `Badge` (all variants) | Status badges, tags, counters |
| `Button` (default, outline, ghost, hero variants) | All actions |
| `Progress` | Task progress bars |
| `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent` | Activity log filters, deliverable tabs |
| `Accordion` | Expandable sections in Memory and Settings |
| `ScrollArea` | Scrollable activity log, notes panel, file tree |
| `Switch` | Toggle switches in Settings and Workflows |
| `Select` | Dropdown selectors in Settings |
| `Input`, `Textarea` | Notes input, search bar, settings fields |
| `Separator` | Visual dividers between sections |
| `Tooltip` | Hover hints on icons and controls |
| `cn()` utility | Class name merging throughout |
| `useIsMobile()` hook | Responsive layout adjustments |
| `ThemeProvider` + theme system | AlphaAI pages inherit dark/soft/corporate themes |
| CSS custom properties (all `--brand`, `--success`, etc.) | Consistent styling |
| Animations (`pulse-glow`, `float`, `gradient-shift`) | Orb effects, background elements |
| Lucide React icons | All icons throughout |
| Background effects pattern (orbs + grid) from Hero | Shared `BackgroundEffects` component |

### Needs extension

| Component | Extension Required |
|-----------|-------------------|
| `App.tsx` routing | Add `/alphaai`, `/alphaai/memory`, `/alphaai/workflows`, `/alphaai/settings` routes with nested layout |
| `Header.tsx` | **Not extended** — AlphaAI uses its own `AlphaAIShell` with dedicated nav |

### Must be net-new

| New File | Purpose | Complexity |
|----------|---------|------------|
| **`scripts/setup-alphaai.sh`** | Mac Mini setup: venv, Node, deps, workspace bootstrap | Low |
| **`src/types/alphaai.ts`** | All TypeScript interfaces and types | Low |
| **`src/lib/alphaai/storage.ts`** | localStorage CRUD with `alphaai_` namespace, export/import | Low |
| **`src/lib/alphaai/identity.ts`** | Load/parse identity markdown files from static assets | Low |
| **`src/lib/alphaai/memory.ts`** | Memory management (facts, daily logs, project contexts) | Medium |
| **`src/lib/alphaai/workflows.ts`** | Workflow definitions, step tracking, execution history | Medium |
| **`src/hooks/useAlphaAI.ts`** | Master hook: session state, tasks, activity, memory, workflows, notes | High |
| **`src/components/alphaai/layout/AlphaAIShell.tsx`** | Shared page shell (header nav + bg effects + status) | Medium |
| **`src/components/alphaai/StatusOrb.tsx`** | Animated teal orb with rotating ring | Low |
| **`src/components/alphaai/TaskBoard.tsx`** | Kanban columns (To Do / In Progress / Done) | Medium |
| **`src/components/alphaai/ActivityPanel.tsx`** | Timestamped, filterable log | Low |
| **`src/components/alphaai/NotesPanel.tsx`** | User input + message thread | Medium |
| **`src/components/alphaai/ThinkingDisplay.tsx`** | Terminal-style current thought with blinking cursor | Low |
| **`src/components/alphaai/DeliverablesList.tsx`** | File list with type icons | Low |
| **`src/components/alphaai/WorkflowCard.tsx`** | Workflow card with step dots and controls | Medium |
| **`src/components/alphaai/WorkflowHistory.tsx`** | Execution history table | Low |
| **`src/components/alphaai/MemoryFileTree.tsx`** | Sidebar file tree with sections | Medium |
| **`src/components/alphaai/MarkdownViewer.tsx`** | Rendered markdown content display | Medium |
| **`src/components/alphaai/MemoryTimeline.tsx`** | Long-term memory entries with tags | Low |
| **`src/components/alphaai/StatsRow.tsx`** | Reusable stats card row | Low |
| **`src/pages/AlphaAIDashboard.tsx`** | Dashboard page composition | Medium |
| **`src/pages/AlphaAIMemory.tsx`** | Memory page composition | Medium |
| **`src/pages/AlphaAIWorkflows.tsx`** | Workflows page composition | Medium |
| **`src/pages/AlphaAISettings.tsx`** | Settings page composition | Medium |
| **`alphaai-workspace/SOUL.md`** | AlphaAI identity definition | Low |
| **`alphaai-workspace/USER.md`** | User profile and business context | Low |
| **`alphaai-workspace/AGENTS.md`** | Operating instructions | Low |
| **`public/alphaai/SOUL.md`** | Copy of identity file accessible at runtime via fetch | Low |
| **`public/alphaai/USER.md`** | Copy of user profile accessible at runtime | Low |
| **`public/alphaai/AGENTS.md`** | Copy of agents file accessible at runtime | Low |

---

## 3. Workflow Impact Analysis

### Workflow Steps Affected

| Workflow | Impact |
|----------|--------|
| Existing site routing | Low — adding new routes alongside existing, no modifications to `/` or `/assistant` |
| Existing task simulation | **None** — `useTaskSimulation.ts` is untouched |
| Build pipeline | Low — new files added, no config changes needed |
| Theme system | **None** — AlphaAI pages inherit existing themes automatically |

### State Transitions Introduced

```
AlphaAI Session:
  IDLE → RUNNING → PAUSED → RUNNING → SHUTDOWN
           ↓                              ↓
       (auto on mount)           (unmount / manual)

Task Lifecycle:
  QUEUED → IN_PROGRESS → COMPLETED
                ↓
            (manual move between columns)

Workflow Execution:
  SCHEDULED → TRIGGERED → STEP_1 → STEP_2 → ... → COMPLETED
                                                        ↓
                                                     FAILED (on error)

Notes:
  USER_INPUT → PENDING → AI_PROCESSED → ARCHIVED
```

### Side Effects Introduced

| Side Effect | Description | Mitigation |
|-------------|-------------|------------|
| localStorage writes | All state persisted under `alphaai_*` keys | Namespaced, size-capped (prune at 4MB), export/clear in Settings |
| setInterval timers | Session uptime counter, simulated workflow progression | Cleanup on unmount via `useEffect` return |
| fetch() calls | Loading identity markdown from `public/alphaai/*.md` | Static files, no external API, graceful fallback |
| No backend | Frontend-only, no server-side state | Explicit "Simulation Mode" label in UI |

### Regression Risk Level: **Low**

- **Fully isolated** — New route tree `/alphaai/*` with its own shell, no shared state with existing pages
- **No modifications** to existing files except `App.tsx` (adding routes)
- **No changes** to `useTaskSimulation.ts`, `tailwind.config.ts`, `index.css`, or any existing component
- **Existing `/assistant` demo unaffected** — completely separate hook and state
- **Theme inheritance works automatically** via CSS custom properties

---

## 4. Implementation Order

### Phase 0: Environment Setup
**Preconditions:** Mac Mini with macOS, internet connection
**Deliverables:**
1. Create `scripts/setup-alphaai.sh` with:
   - Check for Homebrew, install if missing
   - Check for Node.js ≥18, install via Homebrew if missing
   - Create Python virtual environment (for any future Python-based tooling / scripts)
   - Run `npm install` in project root
   - Create `alphaai-workspace/` directory structure with template files
   - Copy identity files to `public/alphaai/` for runtime access
   - Print setup summary and instructions
2. Make script executable and test on clean state

**Script outline:**
```bash
#!/bin/bash
# setup-alphaai.sh — Bootstrap AlphaAI on Mac Mini
# 1. Check/install Homebrew
# 2. Check/install Node.js 18+
# 3. Create Python venv at ./venv/
# 4. npm install
# 5. Create alphaai-workspace/ with SOUL.md, USER.md, AGENTS.md, MEMORY.md
# 6. Copy identity files to public/alphaai/
# 7. Run dev server check
```

### Phase 1: Type Definitions & Storage Layer
**Preconditions:** Phase 0 complete (dependencies installed)
**Deliverables:**
1. Create `src/types/alphaai.ts` — all interfaces:
   - `AlphaAITask`, `TaskPriority`, `TaskStatus`
   - `ActivityEntry`, `ActivityType`
   - `Note`, `NoteStatus`
   - `Workflow`, `WorkflowStep`, `WorkflowExecution`, `WorkflowStatus`
   - `MemoryFact`, `DailyLog`, `ProjectContext`
   - `AlphaAIIdentity`, `UserContext`
   - `AlphaAISessionStatus`
   - `AlphaAISettings`
2. Create `src/lib/alphaai/storage.ts`:
   - `getItem<T>(key)`, `setItem(key, value)`, `removeItem(key)` — all prefixed with `alphaai_`
   - `getStorageUsage()` — calculate total bytes used
   - `exportAllData()` → JSON blob download
   - `importData(json)` → restore from file
   - `clearAllData()` → wipe all `alphaai_*` keys
3. Create identity markdown files in `alphaai-workspace/` and `public/alphaai/`

### Phase 2: Identity & Memory Libraries
**Preconditions:** Phase 1 complete
**Deliverables:**
1. Create `src/lib/alphaai/identity.ts`:
   - `loadIdentityFile(filename)` — fetch from `/alphaai/{filename}` and parse
   - `parseMarkdownSections(md)` — split markdown into heading → content sections
   - Returns structured `AlphaAIIdentity` / `UserContext` objects
2. Create `src/lib/alphaai/memory.ts`:
   - `getMemoryFacts()`, `addMemoryFact(fact)`, `removeMemoryFact(id)`
   - `getDailyLogs()`, `addDailyLog(log)`, `getDailyLog(date)`
   - `getProjectContexts()`, `addProjectContext(ctx)`
   - `searchMemory(query)` — text search across all memory entries
   - All backed by `storage.ts`
3. Create `src/lib/alphaai/workflows.ts`:
   - `WORKFLOW_DEFINITIONS` — 4 workflow configs (Morning Briefing, Task Review, Security Audit, Weekly Report)
   - Each has: `id`, `name`, `description`, `icon`, `schedule`, `steps[]`, `enabled`
   - `getWorkflowHistory()`, `addWorkflowExecution(exec)`
   - `getNextScheduledRuns()` — calculates upcoming run times
   - `simulateWorkflowStep(workflowId, stepIndex)` — returns simulated step result

### Phase 3: Core Hook — useAlphaAI
**Preconditions:** Phase 2 complete
**Deliverables:**
1. Create `src/hooks/useAlphaAI.ts`:
   - **Session state**: `status` (idle/running/paused/shutdown), `start()`, `pause()`, `shutdown()`, session timer
   - **Identity**: Load from `public/alphaai/` on init, expose parsed identity & user context
   - **Tasks**: `tasks[]`, `addTask()`, `updateTask()`, `moveTask()`, `deleteTask()`, `currentTask`
   - **Activity log**: `activityLog[]`, `addLogEntry()`, auto-timestamps, type-coded (success/task/info/warn)
   - **Notes**: `notes[]`, `addNote()`, `markNoteProcessed()`, simulated AI response after delay
   - **Memory**: Wrappers around `memory.ts` functions
   - **Workflows**: `workflows[]`, `triggerWorkflow()`, `pauseWorkflow()`, `workflowHistory[]`
   - **Settings**: `settings`, `updateSettings()` — persisted to localStorage
   - **Persistence**: All state auto-saved to localStorage on change, restored on mount
   - **Simulation**: Auto-generate initial demo tasks, notes, and activity on first run
2. Seed data: Pre-populate with realistic demo tasks, activity entries, and notes to match mockup content

### Phase 4: Shared Components
**Preconditions:** Phase 3 complete
**Deliverables:**
1. `src/components/alphaai/layout/AlphaAIShell.tsx`:
   - Sticky header: αlphaspeed / AlphaAI logo, nav links (Dashboard/Memory/Workflows/Settings), status badge, Pause button, Settings gear
   - Background effects (teal orbs + grid pattern)
   - Uses `<Outlet />` for nested route content
   - Active nav link highlighting based on current route
2. `src/components/alphaai/StatusOrb.tsx`:
   - Animated teal gradient orb (120×120)
   - Rotating ring with dot
   - Status label + current task label below
   - Animation varies by session status (pulsing when running, dimmed when paused, static when idle)
3. `src/components/alphaai/StatsRow.tsx`:
   - Horizontal flex row of stat items
   - Each: large number (mono font, color-coded) + label
   - Accepts `stats: { value: number; label: string; color: string }[]`
4. `src/components/alphaai/ThinkingDisplay.tsx`:
   - Terminal-style box with monospace font
   - `>_` prefix, blinking cursor, brand-glow text color
   - Processing badge in header

### Phase 5: Dashboard Page Components
**Preconditions:** Phase 4 complete
**Deliverables:**
1. `src/components/alphaai/TaskBoard.tsx`:
   - 3-column Kanban: To Do / In Progress / Done
   - Column headers with count badges
   - Task cards: title, priority color border (high=red, medium=orange, low=blue), due date, progress bar
   - "Add Task" button in header
   - Cards are draggable between columns (or click to move for v1)
2. `src/components/alphaai/ActivityPanel.tsx`:
   - Scrollable log list with `ScrollArea`
   - Each entry: timestamp (mono), colored tag (SUCCESS/TASK/INFO/WARN), message
   - Filter buttons: All / Tasks / System / Errors
   - Auto-scroll to newest
3. `src/components/alphaai/NotesPanel.tsx`:
   - Textarea input with send button (positioned bottom-right)
   - Message thread: user messages (MF avatar, muted bg) and AI responses (AI avatar, brand bg)
   - Timestamp on each message
   - Simulated AI response after 1-2s delay
4. `src/components/alphaai/DeliverablesList.tsx`:
   - File list with type icon (PDF=red, DOC=blue, CSV=green)
   - File name + generation timestamp
   - Hover effect
5. `src/pages/AlphaAIDashboard.tsx`:
   - Stats bar at top (Total Tasks, Completed, In Progress, Queued, Session Timer)
   - 3-column grid: Left (StatusOrb + Workflows summary + Memory summary) / Center (TaskBoard + ThinkingDisplay) / Right (NotesPanel + DeliverablesList)
   - Activity log full-width at bottom
   - Responsive: collapses to single column on mobile

### Phase 6: Memory Page Components
**Preconditions:** Phase 4 complete (can run in parallel with Phase 5)
**Deliverables:**
1. `src/components/alphaai/MemoryFileTree.tsx`:
   - Collapsible sections: Identity, Memory, Daily Logs, Projects
   - File items: icon, name, size badge
   - Active file highlight (brand color left border)
   - Click to select file for viewing
2. `src/components/alphaai/MarkdownViewer.tsx`:
   - File header bar: path breadcrumb, last edited, Edit button
   - Styled markdown content: h1-h3, paragraphs, lists, code blocks, blockquotes
   - All styles match mockup (brand-colored h2, code with brand-glow, blockquote with brand left border)
3. `src/components/alphaai/MemoryTimeline.tsx`:
   - Vertical timeline with left line and dots
   - Active dot (brand glow) for recent entries, muted for older
   - Date, summary text, tags (Fact/Insight/Preference/Technical)
4. `src/pages/AlphaAIMemory.tsx`:
   - Stats row: Identity Files, Long-term Facts, Daily Logs, Project Contexts
   - Search bar with filter button
   - 2-column layout: file tree sidebar (260px, sticky) + content area
   - Content shows selected file in MarkdownViewer + MemoryTimeline below

### Phase 7: Workflows Page Components
**Preconditions:** Phase 4 complete (can run in parallel with Phase 5/6)
**Deliverables:**
1. `src/components/alphaai/WorkflowCard.tsx`:
   - Card with icon (color-coded), status badge, name, description
   - Step progress dots (done/active/pending) connected by lines
   - Meta row: schedule, last run, success rate
   - Actions: Run Now / Pause / Configure buttons + enable/disable toggle switch
   - Active card glow border
2. `src/components/alphaai/WorkflowHistory.tsx`:
   - Table: Workflow name, Status badge, Started time, Duration, View button
   - Filterable by workflow type
3. `src/components/alphaai/UpcomingRuns.tsx`:
   - List items: icon, workflow name, scheduled time, countdown (brand-colored mono)
4. `src/pages/AlphaAIWorkflows.tsx`:
   - 2×2 grid of WorkflowCards
   - Bottom section: 1/3 Upcoming Runs + 2/3 Execution History

### Phase 8: Settings Page
**Preconditions:** Phase 4 complete (can run in parallel)
**Deliverables:**
1. `src/pages/AlphaAISettings.tsx`:
   - Section groups: General, Workflows, Notifications, Keyboard Shortcuts, Data & Storage, About
   - Setting rows: icon + label + description + control (toggle/select/input/kbd)
   - Storage usage card: visual bar, breakdown table, Export/Import/Clear buttons
   - About card: version, description
   - All settings changes persist immediately via `useAlphaAI` settings

### Phase 9: Routing & Integration
**Preconditions:** Phases 5-8 complete
**Deliverables:**
1. Update `App.tsx`:
   ```tsx
   <Route path="/alphaai" element={<AlphaAIShell />}>
     <Route index element={<AlphaAIDashboard />} />
     <Route path="memory" element={<AlphaAIMemory />} />
     <Route path="workflows" element={<AlphaAIWorkflows />} />
     <Route path="settings" element={<AlphaAISettings />} />
   </Route>
   ```
2. Add navigation link to AlphaAI from the main site Header (optional — or keep it as a standalone route)
3. Verify all routes work with `BrowserRouter` base URL handling
4. Verify theme switching works across all AlphaAI pages

### Phase 10: Polish & Persistence
**Preconditions:** Phase 9 complete
**Deliverables:**
1. Verify localStorage persistence: refresh page, state survives
2. Test export/import cycle in Settings
3. Add keyboard shortcut handlers (Ctrl+N, Ctrl+P, Ctrl+R, Ctrl+K)
4. Mobile responsive testing: all pages collapse gracefully
5. Animation performance: orb, thinking cursor, pulse effects run at 60fps
6. First-run experience: seed demo data on fresh localStorage
7. Error boundaries around each page

---

## 5. Testing Strategy

### Unit Tests Required

| Test File | Coverage |
|-----------|----------|
| `src/lib/alphaai/storage.test.ts` | get/set/remove with namespace, storage usage calc, export/import, clear |
| `src/lib/alphaai/identity.test.ts` | Markdown parsing, section extraction, identity object construction |
| `src/lib/alphaai/memory.test.ts` | CRUD operations for facts, daily logs, project contexts, search |
| `src/lib/alphaai/workflows.test.ts` | Workflow definitions, step simulation, history tracking, next run calculation |
| `src/hooks/useAlphaAI.test.ts` | Session state machine, task CRUD, activity logging, note processing, settings persistence |

**Key test cases:**
- Storage: Namespace isolation (`alphaai_` prefix), size cap enforcement, corrupted data recovery
- Identity: Malformed markdown handling, missing file fallback, section parsing edge cases
- Memory: Empty state initialization, search across types, date sorting, duplicate prevention
- Workflows: Step progression, partial failure handling, execution history ordering
- Hook: State transitions (idle→running→paused→running→shutdown), concurrent task updates, persistence round-trip

### Integration Tests Required

| Test | Description |
|------|-------------|
| Dashboard renders | All panels mount with seeded demo data, no console errors |
| Task flow | Add task → move to In Progress → move to Done → verify activity log updated |
| Note processing | Submit note → simulated AI response appears → mark processed |
| Workflow trigger | Click "Run Now" → steps advance → completion logged → history updated |
| Memory navigation | Click file in tree → content renders in viewer → search filters results |
| Settings persistence | Change setting → refresh page → setting retained |
| Export/import | Export data → clear all → import → verify state restored |

### Existing Tests to Update

- **None** — AlphaAI is fully isolated. No existing test files affected.

### E2E / Visual Tests (Manual for v1)

| Test | Description |
|------|-------------|
| Theme consistency | Switch dark/soft/corporate on each AlphaAI page — all components adapt |
| Responsive layout | Resize from 1440px → 768px → 375px on each page — layout collapses correctly |
| Navigation | Click all 4 header nav links — correct page loads with active highlight |
| Animation perf | Dashboard with orb + thinking cursor + pulse badges — 60fps on Mac Mini |

---

## 6. Open Questions / Risks

### Assumptions

1. **Frontend-only, v1** — No backend API; all data in localStorage; workflows simulated, not automated
2. **Identity files served as static assets** — Placed in `public/alphaai/` and fetched via `fetch()`, not imported as modules
3. **Single-user** — No auth, no multi-user; one localStorage store per browser
4. **Simulation mode** — AI responses in notes are pre-defined or template-based, not from Claude API
5. **Mac Mini has macOS 13+** — Homebrew and Node.js install commands are macOS-compatible
6. **Python venv is for future tooling** — Not used by the React app directly, but included in setup for potential scripting, data processing, or LangGraph integration later
7. **Existing `/assistant` route stays unchanged** — AlphaAI is additive, not a replacement

### Unknowns

| Unknown | Impact | Resolution Path |
|---------|--------|-----------------|
| Mac Mini Node.js version | Setup script may need to install Node | Script checks `node --version`, installs via Homebrew if < 18 |
| localStorage 5MB limit in Safari | Could cap storage early | Implement pruning (oldest logs first) + warn at 4MB in Settings |
| Identity file editing | Plan says "Edit" button — does it write back? | v1: Read-only display; editing done manually in workspace files |
| Simulated AI response quality | Notes panel AI replies need to feel real | Use template responses keyed to note keywords; flag as "Simulation Mode" |
| Future LangGraph integration | Plan references Agent Overlay Architecture | v1 is pure frontend; v2 can add Python/LangGraph backend behind the same UI |

### Architectural Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| localStorage corruption | Low | Session data lost | Try-catch on parse, fallback to defaults, export backup reminder |
| State complexity in useAlphaAI | Medium | Bugs, stale state | Single source of truth, useReducer if needed, thorough unit tests |
| Large bundle size from new components | Low | Slower load | Lazy-load AlphaAI routes with `React.lazy()` and `Suspense` |
| Scope creep to "real AI" features | High | Delays v1 | Hard boundary: v1 = simulation only, no API calls, no real integrations |
| Mobile layout complexity | Medium | Poor UX on phones | Design mobile-first for Settings/Memory, simplify Dashboard to single column |

### Out of Scope for v1

- Real email/calendar API integrations
- Claude API integration for AI responses
- Automated scheduled workflows (cron/service worker)
- Multi-user / authentication
- Backend API of any kind
- Voice interface
- Mobile app
- Drag-and-drop task reordering (click-to-move suffices)
- Real-time collaboration

---

## 7. File Structure Summary

```
alpha-speed-ai-studio/
├── scripts/
│   └── setup-alphaai.sh                 # NEW: Local setup script
├── alphaai-workspace/                   # NEW: Identity & memory source files
│   ├── SOUL.md
│   ├── USER.md
│   ├── AGENTS.md
│   └── MEMORY.md
├── public/
│   └── alphaai/                         # NEW: Static assets served at runtime
│       ├── SOUL.md
│       ├── USER.md
│       └── AGENTS.md
├── mockups/                             # EXISTING: HTML mockups for reference
│   ├── alphaai-dashboard-mockup.html
│   ├── alphaai-memory-mockup.html
│   ├── alphaai-workflows-mockup.html
│   └── alphaai-settings-mockup.html
├── src/
│   ├── types/
│   │   └── alphaai.ts                   # NEW: All type definitions
│   ├── lib/
│   │   ├── utils.ts                     # EXISTING: cn() utility
│   │   └── alphaai/                     # NEW: Core libraries
│   │       ├── storage.ts
│   │       ├── identity.ts
│   │       ├── memory.ts
│   │       └── workflows.ts
│   ├── hooks/
│   │   ├── useTaskSimulation.ts         # EXISTING: Unchanged
│   │   └── useAlphaAI.ts               # NEW: Master AlphaAI hook
│   ├── components/
│   │   ├── ui/                          # EXISTING: Reused as-is
│   │   ├── assistant/                   # EXISTING: Unchanged
│   │   └── alphaai/                     # NEW: All AlphaAI components
│   │       ├── layout/
│   │       │   └── AlphaAIShell.tsx
│   │       ├── StatusOrb.tsx
│   │       ├── StatsRow.tsx
│   │       ├── TaskBoard.tsx
│   │       ├── ActivityPanel.tsx
│   │       ├── NotesPanel.tsx
│   │       ├── ThinkingDisplay.tsx
│   │       ├── DeliverablesList.tsx
│   │       ├── WorkflowCard.tsx
│   │       ├── WorkflowHistory.tsx
│   │       ├── UpcomingRuns.tsx
│   │       ├── MemoryFileTree.tsx
│   │       ├── MarkdownViewer.tsx
│   │       └── MemoryTimeline.tsx
│   ├── pages/
│   │   ├── Index.tsx                    # EXISTING: Unchanged
│   │   ├── Assistant.tsx                # EXISTING: Unchanged
│   │   ├── NotFound.tsx                 # EXISTING: Unchanged
│   │   ├── AlphaAIDashboard.tsx         # NEW
│   │   ├── AlphaAIMemory.tsx            # NEW
│   │   ├── AlphaAIWorkflows.tsx         # NEW
│   │   └── AlphaAISettings.tsx          # NEW
│   └── App.tsx                          # MODIFIED: Add /alphaai routes
└── docs/
    └── enhancement-plans/
        ├── 2026-02-02-alphaai-personal-assistant-system.md  # EXISTING: Original concept
        └── 2026-02-04-alphaai-implementation-plan.md        # THIS FILE
```

---

## 8. Setup Script Specification

**File:** `scripts/setup-alphaai.sh`

```bash
#!/usr/bin/env bash
set -euo pipefail

# ── AlphaAI Local Development Setup ──
# Target: Mac Mini (macOS 13+)
# Creates: Python venv, installs Node deps, bootstraps workspace

PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
VENV_DIR="$PROJECT_ROOT/venv"
WORKSPACE_DIR="$PROJECT_ROOT/alphaai-workspace"
PUBLIC_AI_DIR="$PROJECT_ROOT/public/alphaai"
NODE_MIN_VERSION=18

echo "═══════════════════════════════════════════"
echo "  AlphaAI Setup — αlphaspeed AI Studio"
echo "═══════════════════════════════════════════"

# 1. Check / install Homebrew
# 2. Check / install Node.js >= 18 via brew
# 3. Create Python virtual environment at ./venv/
# 4. Activate venv and install any Python deps (requirements.txt if present)
# 5. npm install in project root
# 6. Create alphaai-workspace/ with template SOUL.md, USER.md, AGENTS.md, MEMORY.md
# 7. Create public/alphaai/ and copy identity files
# 8. Verify: npm run build succeeds
# 9. Print summary with next steps
```

**The script must:**
- Be idempotent (safe to run multiple times)
- Skip steps that are already complete (node exists, venv exists, etc.)
- Create template identity files with real content (not empty stubs)
- Exit with clear error messages if any step fails
- Print a final summary: what was set up, how to start dev server

---

## 9. Estimated Effort by Phase

| Phase | Scope | New Files | Modified Files |
|-------|-------|-----------|----------------|
| Phase 0: Setup Script | Environment bootstrap | 1 script + 4 workspace files | 0 |
| Phase 1: Types & Storage | Foundation layer | 2 source files | 0 |
| Phase 2: Identity & Memory | Data libraries | 3 source files | 0 |
| Phase 3: Core Hook | State management | 1 hook file | 0 |
| Phase 4: Shared Components | Layout + reusable UI | 4 components | 0 |
| Phase 5: Dashboard | Dashboard page + components | 5 components + 1 page | 0 |
| Phase 6: Memory | Memory page + components | 3 components + 1 page | 0 |
| Phase 7: Workflows | Workflows page + components | 3 components + 1 page | 0 |
| Phase 8: Settings | Settings page | 1 page | 0 |
| Phase 9: Routing | Integration | 0 | 1 (App.tsx) |
| Phase 10: Polish | Testing, responsive, perf | 5+ test files | 0 |

**Total new files:** ~30 source files + 5 workspace/asset files + 1 script
**Total modified files:** 1 (`App.tsx`)

---

## 10. Success Criteria

### v1 Complete When:

- [ ] `scripts/setup-alphaai.sh` bootstraps a clean Mac Mini to running dev server
- [ ] All 4 AlphaAI pages accessible and navigable (`/alphaai`, `/alphaai/memory`, `/alphaai/workflows`, `/alphaai/settings`)
- [ ] Identity files (SOUL.md, USER.md, AGENTS.md) rendered in Memory page
- [ ] Task board functional (add, move between columns, priority indicators)
- [ ] Activity log shows timestamped, color-coded entries with filtering
- [ ] Notes panel allows user input with simulated AI responses
- [ ] 4 workflow definitions with step visualization and manual trigger
- [ ] Workflow execution history tracks past runs
- [ ] Settings page controls persist across page refresh
- [ ] Memory search returns filtered results
- [ ] Storage usage visible with export/import/clear functionality
- [ ] Session state persists across browser refresh
- [ ] Mobile-responsive layout works on all 4 pages
- [ ] All animations match existing design system (teal brand, glows, dark theme)
- [ ] Existing site (`/`, `/assistant`) completely unaffected
- [ ] Unit tests pass for storage, identity, memory, workflows, and useAlphaAI
- [ ] `npm run build` succeeds with no TypeScript errors
