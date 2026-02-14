# Claude Commands

**Location:** `.claude/commands/`  
**Purpose:** Reusable prompts for Claude Code (slash commands)  
**Usage:** Type `/command-name` in Claude Code conversations

---

## 📋 Available Commands

### 🎯 Planning & Design

#### `/brainstorm`
**Pattern:** obra/superpowers brainstorming  
**Purpose:** Break down complex problems, generate solution approaches  
**Use when:** Starting new features, solving tricky problems  
**Output:** Problem statement, 3-5 approaches, trade-off analysis, recommendation

#### `/write-plan`
**Pattern:** obra/superpowers planning  
**Purpose:** Create detailed implementation plans  
**Use when:** Approved feature needs execution roadmap  
**Output:** Phased plan with dependencies, testing strategy, risk assessment

#### `/enhancement-plan`
**Pattern:** Architecture-compliant planning  
**Purpose:** Plan enhancements that honor Agent Overlay + Service architecture  
**Use when:** Client requests new features  
**Output:** Enhancement breakdown, reuse analysis, workflow impact, testing

---

### 🚀 Execution

#### `/execute-plan`
**Pattern:** obra/superpowers execution discipline  
**Purpose:** Implement approved plans WITHOUT scope creep  
**Use when:** Plan is approved, ready to code  
**Anti-patterns:** "While we're here...", "I think a better approach..."

#### `/enhancement-execute`
**Pattern:** Strict plan execution  
**Purpose:** Execute enhancement plans with architecture compliance  
**Use when:** Enhancement plan approved  
**Preconditions:** Plan exists, open questions resolved

---

### 🐛 Debugging & Analysis

#### `/agent-debug`
**Pattern:** LangGraph systematic debugging  
**Purpose:** Diagnose agent issues (prompt/tool/state)  
**Use when:** Agent not behaving correctly  
**Checks:** LangSmith traces, tool calling, state persistence

#### `/workflow-analyze`
**Pattern:** Business process design  
**Purpose:** Analyze processes, design workflow configurations  
**Use when:** New workflow needed, existing workflow needs changes  
**Output:** Step-by-step breakdown, decision points, error handling

#### `/production-fix`
**Pattern:** Comprehensive bug fixes
**Purpose:** Fix bugs with full review (no quick hacks)
**Use when:** Production issues, critical bugs
**Ensures:** No shortcuts, similar errors found, architecture compliance

#### `/render-debug`
**Pattern:** Data-driven production debugging
**Purpose:** Comprehensive debugging using Render MCP (logs + metrics + deployments)
**Use when:** Production issues, performance problems, anomalies
**Output:** Error analysis, performance metrics, root cause hypothesis, severity classification
**Args:** STAGE or PROD

---

### 🎨 Optimization

#### `/prompt-optimize`
**Pattern:** Prompt engineering best practices  
**Purpose:** Optimize agent prompts for clarity and efficiency  
**Use when:** Agent prompts unclear, token usage high  
**Target:** <2000 tokens, >90% accuracy

#### `/code-review`
**Pattern:** 3-pass review  
**Purpose:** Comprehensive code review  
**Passes:** 1) Architecture 2) .cursorrules 3) Workflow safety  
**Use when:** Before committing changes

---

### 🏗️ Architecture & Configuration

#### `/architecture-context`
**Purpose:** Quick architectural overview  
**Use when:** Starting new development, onboarding  
**Output:** System overview, key capabilities, relevant code locations

#### `/new-workflow-configuration`
**Purpose:** Design workflow configuration proposals  
**Use when:** New workflow needed  
**Output:** Complete workflow design with step graph, templates, testing

#### `/workflow-config-review`
**Purpose:** Production readiness review  
**Use when:** Workflow configuration complete  
**Gates:** Hard stop rules for metadata, Step 1 violations

---

### 🛠️ Utilities

#### `/git-push`
**Purpose:** Commit and push to remote  
**Use when:** Ready to deploy changes

#### `/branch`
**Purpose:** Check current git branch  
**Use when:** Verify you're on correct branch

#### `/run-tests`
**Purpose:** Run all tests with coverage  
**Use when:** Before deploying, after changes

#### `/render-env-health-check`
**Purpose:** Live environment health check (STAGE/PROD)
**Use when:** Health monitoring, database/Pub/Sub analysis
**Output:** Deployment, Pub/Sub, errors, LLM calls analysis

#### `/render-debug`
**Purpose:** Comprehensive production debugging with MCP telemetry
**Use when:** Active incidents, performance degradation, error investigation
**Output:** Logs + metrics + deployments analysis, root cause, severity classification
**Note:** More comprehensive than health check - pulls full telemetry data

#### `/gap-prevention-check`
**Purpose:** Pre-implementation gap analysis to prevent known failures
**Use when:** Before implementing workflow/database/LLM extraction changes
**Checks:** Type safety, transaction safety, LLM extraction, state management, integration artifacts
**Output:** Risk assessment matrix, required mitigations, pre-implementation checklist

#### `/export-langsmith-traces`
**Purpose:** Export LangSmith traces for agent debugging
**Use when:** Debugging agent failures, routing issues, tool call sequences
**Output:** JSON traces, summary of runs, error filtering

#### `/verify-plan-completion`
**Purpose:** Post-implementation audit to verify enhancement plans were fully executed
**Use when:** After `/enhancement-execute` claims completion, before deployment
**Checks:** All tasks, success criteria, tests, deployment artifacts
**Output:** Completion score, gap analysis, remediation plan

#### `/render-connect`
**Purpose:** Quick reference for connecting to Render environments
**Use when:** Need to connect to STAGE/PROD for debugging
**Provides:** Service IDs, MCP tool usage, fallback methods, common tasks
**Output:** Environment connection patterns

#### `/db-connect`
**Purpose:** Database connection patterns for production debugging
**Use when:** Need to query PostgreSQL for debugging
**Provides:** Connection methods, common queries, safety rules
**Output:** SQL query patterns, troubleshooting guide

---

## 🎯 Quick Reference

**Most Used Commands:**
1. `/architecture-context` - Start here for new work
2. `/brainstorm` - Generate solution approaches
3. `/write-plan` or `/enhancement-plan` - Create implementation plan
4. `/execute-plan` or `/enhancement-execute` - Implement the plan
5. `/gap-prevention-check` - Pre-implementation gap analysis
6. `/verify-plan-completion` - Post-implementation audit
7. `/code-review` - Review before commit
8. `/render-connect` - Connect to Render environments
9. `/db-connect` - Database connection patterns

**Problem Solving Flow:**
```
/brainstorm → /write-plan → /execute-plan → /code-review → /git-push
```

**Debugging Flow:**
```
/agent-debug → Fix → /run-tests → /code-review → /git-push
```

---

## 🆕 What's New (2025-01-06)

### Added obra/superpowers Patterns
- ✅ `/brainstorm` - Systematic problem-solving
- ✅ `/write-plan` - Detailed planning
- ✅ `/execute-plan` - Disciplined execution

### Added Custom Patterns
- ✅ `/agent-debug` - LangGraph debugging
- ✅ `/workflow-analyze` - Business process design
- ✅ `/prompt-optimize` - Prompt engineering

### Source
Patterns extracted from:
- obra/superpowers (development workflows)
- Anthropic official skills (document processing)
- Community best practices

---

## 📚 Related Resources

### Claude Skills
- **Location:** `.claude/skills/`
- **Downloaded:** 15+ repositories (superpowers, anthropic-official, etc.)
- **Usage:** Auto-loaded by Claude Code when relevant
- **Quick wins:** See `.claude/QUICK_WINS_GUIDE.md`

### Runtime Prompts
- **Location:** `backend/resources/prompts/`
- **Purpose:** Production agent/tool prompts (not dev commands)
- **Standards:** Multi-tenant, provider-agnostic
- **Template:** `backend/resources/prompts/_TEMPLATE.md`

### Documentation
- **Implementation plan:** `docs/enhancement-plans/PROMPT_LIBRARY_IMPLEMENTATION_PLAN.md`
- **Pattern research:** `docs/agents/PROMPT_PATTERNS_RESEARCH.md`
- **Architecture:** `ARCHITECTURE_REFERENCE_GUIDE.md`
- **Standards:** `.cursorrules`

---

## 🔧 Adding New Commands

### 1. Create Command File
```bash
touch .claude/commands/my-command.md
```

### 2. Follow Format
```markdown
# Command Name

Act as [role].

## GOALS
- Goal 1
- Goal 2

## CONTEXT
- Repo: {{repo}}
- Files: {{files}}

## REQUIREMENTS
- Requirement 1

## OUTPUT
- Expected output
```

### 3. Test Command
```bash
# In Claude Code
/my-command
```

### 4. Document in README
Update this file with command description

---

## ⚠️ Command Usage Guidelines

### ✅ DO
- Use `/architecture-context` when starting new work
- Use `/brainstorm` before jumping to implementation
- Use `/write-plan` for features, not trivial tasks
- Use `/execute-plan` with approved plans only
- Use `/code-review` before every commit

### ❌ DON'T
- Skip planning for complex features
- Use `/execute-plan` without an approved plan
- Ignore `/agent-debug` suggestions
- Skip `/code-review` because "it's just a small change"

---

## 🐛 Troubleshooting

### Command Not Found
**Cause:** Typo in command name  
**Fix:** Check available commands in this README

### Command Not Working
**Cause:** Claude Code not recognizing command  
**Fix:** Restart Claude Code, verify file exists

### Wrong Output
**Cause:** Command format incorrect  
**Fix:** Review command file, follow template structure

---

## 📊 Command Statistics

**Total Commands:** 30
**Patterns:** obra/superpowers + custom + gap prevention
**Categories:** Planning (3), Execution (2), Debugging (5), Optimization (2), Architecture (3), Infrastructure (3), Utilities (4), Analysis (8)

---

**Last Updated:** 2026-01-27
**Maintained by:** Development Team
**Version:** 3.0 (added gap prevention + infrastructure commands)
