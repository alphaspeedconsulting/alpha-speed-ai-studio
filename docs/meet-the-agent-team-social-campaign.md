# Meet the Agent Team — Social Media Campaign Reference

Comprehensive reference table for the **Agent Roster** used in the "Meet the Agent team" social media campaign. Source: `/agents` page roster. Includes agents from the website roster and additional agents from the Development_agents MCP (AI Product Agents).

---

## Agent Roster — Full Reference Table

### Core Roster (Website)

| Agent | Role | What it can do | Questions it can answer | Tools it can use |
|-------|------|----------------|-------------------------|------------------|
| **Product Owner** | Vision & Requirements | Translates business goals into structured PRDs, user stories, and acceptance criteria; prioritizes the backlog; keeps every sprint aligned with what matters. | *What should we build next? What are the acceptance criteria? How do we prioritize the backlog? What user stories cover this feature? Is this sprint aligned with our goals?* | Write PRDs, Prioritize Backlog, Create User Stories |
| **Architect** | System Design & Standards | Designs scalable system architectures; evaluates technology choices; enforces design patterns across the codebase. | *How should we design this system? Which tech stack fits best? What design patterns should we use? Will this scale? How do we keep the codebase consistent?* | Review Architecture, Generate Diagrams, Evaluate Tech Stack |
| **Developer** | Code Generation & Implementation | Writes production-quality code; implements features end-to-end; handles refactoring, migrations, and integrations. | *How do I implement this feature? How do I refactor this safely? What’s the right way to add this integration? How do I write tests for this?* | Write Code, Refactor, Write Tests |
| **Quality** | Testing & Compliance | Validates code against best practices; runs automated test suites; ensures architecture compliance before anything ships. | *Does this meet our standards? Are tests passing? Is it secure? Is it ready to ship? Does it comply with our architecture?* | Enforce Best Practices, Run Test Suites, Security Scanning |
| **Brainstormer** | Ideation & Strategy | Generates creative solutions; explores alternatives; facilitates structured brainstorming to unblock teams. | *What are alternative approaches? How can we think about this differently? What’s the best way to frame this problem? What ideas should we rank first?* | Run Brainstorms, SWOT Analysis, Rank Ideas |
| **Schedule Optimizer** | Planning & Coordination | Optimizes calendars; resolves scheduling conflicts; finds the best meeting times across time zones and busy schedules. | *When can we all meet? What’s the best slot this week? How do we resolve this calendar conflict? Who’s free across time zones?* | Optimize Calendars, Find Open Slots, Resolve Conflicts |
| **Content Generator** | Writing & Brand Voice | Drafts blog posts, social content, email campaigns, and marketing copy consistent with your brand voice and tone. | *What should we post about? How do we say this in our brand voice? What’s a good content calendar for this quarter? Does this match our tone?* | Draft Posts, Plan Content Calendar, Check Brand Voice |
| **Operations Manager** | Workflows & Automation | Monitors deployments; manages infrastructure; automates repetitive ops tasks; keeps systems running smoothly. | *Is the deployment healthy? How do we triage this incident? What can we automate? How do we keep systems running smoothly?* | Monitor Deploys, Triage Incidents, Automate Workflows |
| **Customer Relationships** | CRM & Client Success | Tracks client interactions; scores leads; manages follow-ups; ensures no relationship falls through the cracks. | *Which leads should we prioritize? Who needs a follow-up? What’s the summary for this client? Are we missing any touchpoints?* | Score Leads, Send Follow-Ups, Summarize Clients |
| **Personal Assistant** | Daily Briefings & Inbox | Manages inbox; prepares daily briefings; drafts replies; handles the small tasks that eat up your day. | *What’s on my plate today? How should I reply to this email? What should I prioritize? What’s in my briefing?* | Daily Briefings, Draft Replies, Prioritize Tasks |

### Additional Agents (Development_agents / AI Product Agents) — Recommended for Roster Expansion

| Agent | Role | What it can do | Questions it can answer | Tools it can use |
|-------|------|----------------|-------------------------|------------------|
| **Security Reviewer** | Security & OWASP Compliance | Performs 3-pass code review with OWASP Top 10 checks; scans dependencies for CVEs; analyzes middleware and route auth; validates against security policies. | *Are there hardcoded secrets? Is this endpoint protected? What OWASP risks exist? Are dependencies vulnerable?* | OWASP Checks, Dependency Scan, Middleware Analysis, 3-Pass Review |
| **Integration Testing** | API Test Generation | Discovers API endpoints; generates integration test scenarios; produces executable pytest files; identifies coverage gaps. | *Which endpoints need tests? What scenarios should we cover? Are we missing auth tests? What's our API coverage?* | Discover Endpoints, Generate Test Scenarios, Create Pytest Files |
| **Deployment** | Container & Production Readiness | Generates production-ready Dockerfiles, docker-compose, and .dockerignore; detects framework and dependencies; provides deployment instructions and health checks. | *How do we containerize this? What's the production setup? Does this need Postgres or Redis? How do we deploy?* | Generate Dockerfile, Docker Compose, Health Checks, Deployment Instructions |
| **Dependency Audit** | CVE & Package Security | Scans requirements for CVEs via pip-audit and OSV.dev; identifies outdated packages; recommends upgrades with fix versions and rollback plans. | *Are our dependencies vulnerable? Which packages need upgrading? What's our security grade? What CVEs affect us?* | Scan Dependencies, CVE Check, Upgrade Recommendations |
| **Refactoring Workflow** | Code Quality & Safe Refactors | Detects code smells (long methods, large classes); suggests safe refactorings; ensures test coverage before changes; creates refactoring plans. | *What code smells exist? How do we refactor safely? What's the impact? Do we have enough tests?* | Detect Code Smells, Generate Suggestions, Safety Checks, Refactoring Plan |
| **Tech Debt Tracker** | Technical Debt Management | Identifies and quantifies technical debt; calculates cyclomatic complexity; prioritizes remediation; produces trend analysis and debt scores. | *How much tech debt do we have? What should we fix first? Is complexity increasing? What's our debt score?* | Detect Debt Items, Complexity Metrics, Remediation Plan, Trend Analysis |
| **Architecture Review** | Design & SOLID Compliance | Analyzes dependency graphs; detects design smells and coupling issues; identifies SOLID violations; evaluates architecture health. | *Are we violating SOLID? Where's the coupling? What design smells exist? Is our dependency graph healthy?* | Dependency Graph, Design Smell Detection, SOLID Analysis, Coupling Review |
| **Database Migration** | Schema & Migration Safety | Analyzes schema changes; generates safe migration scripts; creates rollback plans; assesses data-loss risk and backward compatibility. | *How do we migrate this schema? Is it backward compatible? What's the rollback plan? What's the data-loss risk?* | Schema Diff, Migration Scripts, Backup Strategy, Rollback Plan |
| **Performance Profiler** | Bottleneck & Optimization | Profiles code execution; identifies bottlenecks; provides optimization recommendations; uses cProfile and subprocess sandboxing. | *Where are the bottlenecks? What's slow? How do we optimize? What's the hot path?* | Profile Code, Identify Bottlenecks, Optimization Recommendations |
| **UI/UX** | Frontend & Accessibility | Analyzes frontend code; audits WCAG 2.1 accessibility; validates responsive design; evaluates user experience and design patterns. | *Is this accessible? Does it work on mobile? What UX issues exist? Does it meet WCAG?* | Frontend Analysis, Accessibility Audit, Responsive Design Check, UX Evaluation |
| **Pitch** | Sales & Consultative Outreach | Researches companies; generates customized AI/automation pitches; performs workflow audits; creates consultative strategies and POC proposals. | *How do we pitch to this company? What's their workflow? What objections might they have? What's the ROI story?* | Company Research, Workflow Audit, Pitch Generation, Objection Handling |

### Skills Agents (OpenClaw / skills_agents)

| Agent | Role | What it can do | Questions it can answer | Tools it can use |
|-------|------|----------------|-------------------------|------------------|
| **Debug Analyst** | Systematic Debugging | Performs four-phase debug analysis: root cause investigation, pattern analysis, hypothesis testing, implementation. No fixes before root cause. | *What's the root cause? Why did this break? How do we reproduce? What's the hypothesis?* | Root Cause Analysis, Pattern Analysis, Hypothesis Testing |
| **Bug Reporter** | QA & Documentation | Generates structured bug reports with severity, steps to reproduce, expected vs actual, environment. | *How do we document this bug? What's the severity? What are the steps?* | Bug Reports, Steps to Reproduce, Severity Classification |
| **MCP Builder** | Tool & Server Scaffolding | Generates MCP tool/server scaffolding: schema, handler logic, error handling, integration notes. | *How do we build this MCP tool? What's the schema? How do we integrate?* | Tool Schema, Handler Logic, Integration Notes |
| **TDD Specialist** | Test-Driven Development | Generates TDD test cases following Red-Green-Refactor. Supports pytest, jest, edge cases. | *What tests should we write first? What edge cases? What framework?* | Test Cases, Red-Green-Refactor, Edge Cases |
| **Web QA Planner** | Web Test Planning | Generates web QA test plans and test cases: scope, scenarios, smoke tests, regression. | *What should we test? What's the smoke suite? What could break?* | Test Plan, Test Scenarios, Smoke Tests |

---

## One-line taglines (for social posts)

- **Product Owner** — *Turns your vision into clear requirements and a prioritized backlog.*
- **Architect** — *Designs systems that scale and keeps the codebase consistent.*
- **Developer** — *Builds features, refactors code, and ships with tests.*
- **Quality** — *Makes sure nothing ships until it’s compliant and secure.*
- **Brainstormer** — *Unblocks the team with ideas and structured thinking.*
- **Schedule Optimizer** — *Finds the right time, across time zones and conflicts.*
- **Content Generator** — *Writes in your brand voice, from posts to campaigns.*
- **Operations Manager** — *Keeps deploys and systems running, automates the rest.*
- **Customer Relationships** — *Scores leads, tracks clients, never drops a follow-up.*
- **Personal Assistant** — *Briefings, inbox, and priorities so you can focus.*

### Additional agents (Development_agents)

- **Security Reviewer** — *OWASP checks, dependency scans, and 3-pass review so nothing vulnerable ships.*
- **Integration Testing** — *Discovers endpoints, generates tests, and closes API coverage gaps.*
- **Deployment** — *Dockerfiles, compose, and production instructions so you can ship.*
- **Dependency Audit** — *Scans for CVEs, recommends upgrades, and keeps your supply chain secure.*
- **Refactoring Workflow** — *Detects code smells, suggests safe refactors, and plans the work.*
- **Tech Debt Tracker** — *Quantifies debt, prioritizes remediation, and tracks the trend.*
- **Architecture Review** — *SOLID, coupling, and design smells so the architecture stays healthy.*
- **Database Migration** — *Schema diffs, migration scripts, and rollback plans so migrations are safe.*
- **Performance Profiler** — *Profiles code, finds bottlenecks, and recommends optimizations.*
- **UI/UX** — *Accessibility, responsive design, and UX so the frontend works for everyone.*
- **Pitch** — *Company research, workflow audits, and consultative pitches so sales close.*

### Skills agents (OpenClaw / skills_agents)

- **Debug Analyst** — *Root cause first, then fix. Four-phase systematic debugging so you don't guess.*
- **Bug Reporter** — *Structured bug reports with severity, steps, and environment so QA can act.*
- **MCP Builder** — *MCP tool scaffolding so you can extend the agent stack.*
- **TDD Specialist** — *Red-Green-Refactor test cases so behavior drives the code.*
- **Web QA Planner** — *Test plans, scenarios, and smoke suites so web QA is covered.*

---

## Suggested social angles

1. **Single-agent spotlights** — One post per agent: name, role, one thing they’re great at, one example question they answer.
2. **Role pairings** — e.g. “Product Owner + Architect: from requirements to system design.” / “Security Reviewer + Dependency Audit: secure before you ship.” / “Debug Analyst + Bug Reporter: from bug to ticket.”
3. **By workflow** — “From idea to ship: Brainstormer → Product Owner → Architect → Developer → Quality.” / “From code to production: Developer → Security Reviewer → Integration Testing → Deployment.” / “From bug to fix: Bug Reporter → Debug Analyst → TDD Specialist.”
4. **By persona** — “For founders: Product Owner, Brainstormer, Personal Assistant. For ops: Operations Manager, Schedule Optimizer, Customer Relationships. For eng: Security Reviewer, Tech Debt Tracker, Performance Profiler, Debug Analyst, TDD Specialist. For QA: Bug Reporter, Web QA Planner. For sales: Pitch, Customer Relationships.”

---

## Asset references

- **Page:** `/agents` (Agent Roster)
- **Images:** `/agents/{agent-slug}.png` (e.g. `product-owner.png`, `architect.png`) — use for social cards; fallback to Bot icon if missing.
- **Headline:** “Agent Roster” / “Meet the Team”

---

## Individual agent posts (IG / LinkedIn / X)

Use one block per agent for a single-agent spotlight. Image: `/agents/{slug}.png`. CTA: “Meet the full team” + link to `/agents`.

---

### 1. Product Owner  
**Role:** Vision & Requirements

**Caption:**  
Meet the Product Owner — the agent that turns “we should build this” into something you can actually ship. No more vague ideas. PRDs, user stories, acceptance criteria, and a backlog that stays aligned with what matters.  
Ask it: *What should we build next? How do we prioritize?*  
Not a chatbot. An agent that does the planning so your team can do the building.

**Bullets for carousel/copy:**  
- Writes PRDs from business goals  
- Prioritizes backlog  
- Creates user stories & acceptance criteria  
- Keeps sprints aligned  

**CTA:** See the full roster → link in bio

---

### 2. Architect  
**Role:** System Design & Standards

**Caption:**  
Meet the Architect — the agent that designs systems that scale and keeps your codebase consistent. Tech choices, design patterns, diagrams. It doesn’t just suggest; it reviews, evaluates, and enforces so nothing ships without a solid foundation.  
Ask it: *How should we design this? Which tech stack? Will it scale?*  
Not a chatbot. An agent that owns the blueprint.

**Bullets for carousel/copy:**  
- Reviews architecture  
- Generates diagrams  
- Evaluates tech stack  
- Enforces design patterns  

**CTA:** Meet the full team → link in bio

---

### 3. Developer  
**Role:** Code Generation & Implementation

**Caption:**  
Meet the Developer — the agent that writes production code, implements features end-to-end, and handles refactors, migrations, and integrations. It doesn’t just answer “how do I…?” — it writes the code and the tests.  
Ask it: *How do I implement this? How do I refactor safely?*  
Not a chatbot. An agent that ships.

**Bullets for carousel/copy:**  
- Writes code  
- Refactors safely  
- Writes tests  
- Handles migrations & integrations  

**CTA:** See the full roster → link in bio

---

### 4. Quality  
**Role:** Testing & Compliance

**Caption:**  
Meet Quality — the agent that makes sure nothing ships until it’s ready. Best practices, test suites, security scans, architecture compliance. It’s the gatekeeper so you don’t ship broken or insecure.  
Ask it: *Are tests passing? Is it secure? Ready to ship?*  
Not a chatbot. An agent that says “not yet” when it has to.

**Bullets for carousel/copy:**  
- Enforces best practices  
- Runs test suites  
- Security scanning  
- Architecture compliance  

**CTA:** Meet the full team → link in bio

---

### 5. Brainstormer  
**Role:** Ideation & Strategy

**Caption:**  
Meet the Brainstormer — the agent that unblocks the team. Creative options, alternative approaches, SWOT, ranked ideas. It doesn’t just answer; it runs structured brainstorms so you can decide what to do next.  
Ask it: *What are other approaches? How do we frame this? What do we try first?*  
Not a chatbot. An agent that gets ideas out of your head and into the room.

**Bullets for carousel/copy:**  
- Runs brainstorms  
- SWOT analysis  
- Ranks ideas  
- Explores alternatives  

**CTA:** See the full roster → link in bio

---

### 6. Schedule Optimizer  
**Role:** Planning & Coordination

**Caption:**  
Meet the Schedule Optimizer — the agent that finds the right time. Calendars, time zones, conflicts. It doesn’t just suggest a slot; it optimizes and resolves so “when can we meet?” gets answered in one step.  
Ask it: *When can we all meet? What’s the best slot? How do we fix this conflict?*  
Not a chatbot. An agent that does the scheduling.

**Bullets for carousel/copy:**  
- Optimizes calendars  
- Finds open slots  
- Resolves conflicts  
- Works across time zones  

**CTA:** Meet the full team → link in bio

---

### 7. Content Generator  
**Role:** Writing & Brand Voice

**Caption:**  
Meet the Content Generator — the agent that writes in your brand voice. Blog posts, social, email campaigns, marketing copy. It doesn’t just draft; it plans content calendars and checks tone so everything sounds like you.  
Ask it: *What should we post? Does this match our voice? What’s the calendar look like?*  
Not a chatbot. An agent that does the writing.

**Bullets for carousel/copy:**  
- Drafts posts & campaigns  
- Plans content calendar  
- Checks brand voice  
- Blog, social, email  

**CTA:** See the full roster → link in bio

---

### 8. Operations Manager  
**Role:** Workflows & Automation

**Caption:**  
Meet the Operations Manager — the agent that keeps things running. Deploys, infrastructure, incident triage, repetitive tasks automated. It doesn’t just advise; it monitors, triages, and automates so systems stay healthy.  
Ask it: *Is the deploy healthy? How do we triage this? What can we automate?*  
Not a chatbot. An agent that runs the ops.

**Bullets for carousel/copy:**  
- Monitors deploys  
- Triages incidents  
- Automates workflows  
- Manages infrastructure  

**CTA:** Meet the full team → link in bio

---

### 9. Customer Relationships  
**Role:** CRM & Client Success

**Caption:**  
Meet the Customer Relationships agent — the one that makes sure no lead or client falls through the cracks. Lead scoring, follow-ups, client summaries. It doesn’t just remind you; it scores, sends, and summarizes so every relationship gets the right touch.  
Ask it: *Which leads first? Who needs a follow-up? What’s the summary for this client?*  
Not a chatbot. An agent that owns the pipeline.

**Bullets for carousel/copy:**  
- Scores leads  
- Sends follow-ups  
- Summarizes clients  
- Tracks touchpoints  

**CTA:** See the full roster → link in bio

---

### 10. Personal Assistant  
**Role:** Daily Briefings & Inbox

**Caption:**  
Meet the Personal Assistant — the agent that handles the small stuff. Daily briefings, inbox, reply drafts, task prioritization. It doesn’t just answer “what’s on my plate?” — it prepares the briefing and drafts the reply so you can focus on what matters.  
Ask it: *What’s on my plate today? How should I reply to this? What do I prioritize?*  
Not a chatbot. An agent that clears the deck for you.

**Bullets for carousel/copy:**  
- Daily briefings  
- Draft replies  
- Prioritize tasks  
- Inbox management  

**CTA:** Meet the full team → link in bio

---

### 11. Security Reviewer  
**Role:** Security & OWASP Compliance

**Caption:**  
Meet the Security Reviewer — the agent that makes sure nothing vulnerable ships. OWASP Top 10 checks, dependency CVE scans, middleware auth analysis, 3-pass code review. It doesn’t just flag issues; it validates against security policies and tells you exactly what to fix.  
Ask it: *Are there hardcoded secrets? Is this endpoint protected? What OWASP risks exist?*  
Not a chatbot. An agent that owns the security gate.

**Bullets for carousel/copy:**  
- OWASP Top 10 checks  
- Dependency CVE scanning  
- Middleware & route auth analysis  
- 3-pass security review  

**CTA:** Meet the full team → link in bio

---

### 12. Integration Testing  
**Role:** API Test Generation

**Caption:**  
Meet the Integration Testing agent — the one that discovers your API endpoints and generates executable tests. Coverage gaps, auth tests, pytest files. It doesn’t just suggest scenarios; it writes the tests so you can run them.  
Ask it: *Which endpoints need tests? What scenarios should we cover? What’s our API coverage?*  
Not a chatbot. An agent that closes the integration test gap.

**Bullets for carousel/copy:**  
- Discovers API endpoints  
- Generates test scenarios  
- Creates executable pytest files  
- Identifies coverage gaps  

**CTA:** Meet the full team → link in bio

---

### 13. Deployment  
**Role:** Container & Production Readiness

**Caption:**  
Meet the Deployment agent — the one that turns your code into production-ready containers. Dockerfile, docker-compose, .dockerignore, deployment instructions. It detects your framework and dependencies so you get the right setup.  
Ask it: *How do we containerize this? What’s the production setup? Does this need Postgres or Redis?*  
Not a chatbot. An agent that does the deployment prep.

**Bullets for carousel/copy:**  
- Generates Dockerfile & docker-compose  
- Detects framework & dependencies  
- Health checks & deployment instructions  
- Production-ready defaults  

**CTA:** Meet the full team → link in bio

---

### 14. Pitch  
**Role:** Sales & Consultative Outreach

**Caption:**  
Meet the Pitch agent — the one that researches companies and generates customized AI/automation pitches. Workflow audits, consultative strategies, POC proposals, objection handling. It doesn’t just draft; it builds the ROI story.  
Ask it: *How do we pitch to this company? What’s their workflow? What objections might they have?*  
Not a chatbot. An agent that owns the sales narrative.

**Bullets for carousel/copy:**  
- Company research  
- Workflow audit offers  
- Consultative pitch strategies  
- Objection handling  

**CTA:** Meet the full team → link in bio

---

### 15. Debug Analyst  
**Role:** Systematic Debugging

**Caption:**  
Meet the Debug Analyst — the agent that never guesses. Four-phase framework: root cause investigation, pattern analysis, hypothesis testing, implementation. No fixes before root cause. It doesn't just suggest; it structures the investigation so you find the real bug.  
Ask it: *What's the root cause? Why did this break? How do we reproduce?*  
Not a chatbot. An agent that debugs systematically.

**Bullets for carousel/copy:**  
- Root cause investigation  
- Pattern analysis  
- Hypothesis testing  
- No fixes before root cause  

**CTA:** Meet the full team → link in bio

---

### 16. Bug Reporter  
**Role:** QA & Documentation

**Caption:**  
Meet the Bug Reporter — the agent that turns messy descriptions into structured bug reports. Severity, steps to reproduce, expected vs actual, environment. It doesn't just summarize; it formats so QA can act.  
Ask it: *How do we document this bug? What's the severity? What are the steps?*  
Not a chatbot. An agent that owns the bug report.

**Bullets for carousel/copy:**  
- Structured bug reports  
- Steps to reproduce  
- Severity classification  
- Environment capture  

**CTA:** Meet the full team → link in bio

---

### 17. MCP Builder  
**Role:** Tool & Server Scaffolding

**Caption:**  
Meet the MCP Builder — the agent that scaffolds MCP tools and servers. Schema, handler logic, error handling, integration notes. It doesn't just suggest; it generates the scaffolding so you can extend the agent stack.  
Ask it: *How do we build this MCP tool? What's the schema? How do we integrate?*  
Not a chatbot. An agent that builds the tools.

**Bullets for carousel/copy:**  
- Tool schema generation  
- Handler logic  
- Error handling  
- Integration notes  

**CTA:** Meet the full team → link in bio

---

### 18. TDD Specialist  
**Role:** Test-Driven Development

**Caption:**  
Meet the TDD Specialist — the agent that writes tests first. Red-Green-Refactor, pytest, jest, edge cases. It doesn't just suggest tests; it generates the cases so behavior drives the code.  
Ask it: *What tests should we write first? What edge cases? What framework?*  
Not a chatbot. An agent that does TDD.

**Bullets for carousel/copy:**  
- Test cases first  
- Red-Green-Refactor  
- Edge cases  
- pytest, jest support  

**CTA:** Meet the full team → link in bio

---

### 19. Web QA Planner  
**Role:** Web Test Planning

**Caption:**  
Meet the Web QA Planner — the agent that plans web QA. Scope, test cases, smoke suite, regression considerations. It doesn't just list; it structures so manual or automated testing is covered.  
Ask it: *What should we test? What's the smoke suite? What could break?*  
Not a chatbot. An agent that plans the QA.

**Bullets for carousel/copy:**  
- Test plan generation  
- Test scenarios  
- Smoke tests  
- Regression considerations  

**CTA:** Meet the full team → link in bio

---

## Image slugs (for assets)

| Agent | Image path |
|-------|------------|
| Product Owner | `/agents/product-owner.png` |
| Architect | `/agents/architect.png` |
| Developer | `/agents/developer.png` |
| Quality | `/agents/quality.png` |
| Brainstormer | `/agents/brainstormer.png` |
| Schedule Optimizer | `/agents/schedule-optimizer.png` |
| Content Generator | `/agents/content-generator.png` |
| Operations Manager | `/agents/operations-manager.png` |
| Customer Relationships | `/agents/customer-relationships.png` |
| Personal Assistant | `/agents/personal-assistant.png` |
| Security Reviewer | `/agents/security-reviewer.png` |
| Integration Testing | `/agents/integration-testing.png` |
| Deployment | `/agents/deployment.png` |
| Dependency Audit | `/agents/dependency-audit.png` |
| Refactoring Workflow | `/agents/refactoring-workflow.png` |
| Tech Debt Tracker | `/agents/tech-debt-tracker.png` |
| Architecture Review | `/agents/architecture-review.png` |
| Database Migration | `/agents/database-migration.png` |
| Performance Profiler | `/agents/performance-profiler.png` |
| UI/UX | `/agents/ui-ux.png` |
| Pitch | `/agents/pitch.png` |
| Debug Analyst | `/agents/debug-analyst.png` |
| Bug Reporter | `/agents/bug-reporter.png` |
| MCP Builder | `/agents/mcp-builder.png` |
| TDD Specialist | `/agents/tdd-specialist.png` |
| Web QA Planner | `/agents/web-qa-planner.png` |

---

This doc can be updated when roster copy or agents change on the site.
