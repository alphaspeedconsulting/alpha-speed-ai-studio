# AI Product Agents - Usage Guide

## Overview

The ai-product-agents MCP server is now available in this repo. All Claude Code sessions opened in this directory will automatically have access to the product/architecture agents.

## Available Tools

### 1. **generate_prd**
Generate Product Requirements Documents from feature requests.

**Usage:**
```
"Generate a PRD for adding multi-tenant support to the roofing chatbot"
```

**Parameters:**
- `user_input` (required): Feature request description
- `workflow_name` (optional): Name for organization (e.g., 'multi-tenant-support')
- `industry_profile` (optional): 'roofing', 'healthcare', 'saas', 'generic' (default: generic)
- `file_path` (optional): Path to Excel/CSV with workflow details

**Outputs:** `projects/[workflow-name]/prd.md`

---

### 2. **analyze_architecture**
Analyze requirements and recommend implementation strategies.

**Usage:**
```
"Analyze architecture options for adding real-time notifications to the roofing workflow"
```

**Parameters:**
- `user_input` (required): Workflow description or PRD
- `workflow_name` (optional): Name for organization
- `industry_profile` (optional): Industry context
- `file_path` (optional): Path to Excel/CSV with workflow steps
- `codebase_path` (optional): Path to analyze for reuse potential (e.g., `./backend`)

**Scores 8+ Options:**
- Custom Python (current codebase)
- Base44 (low-code)
- Lovable (AI-generated)
- n8n/Zapier (workflow automation)
- Copilot Studio (Microsoft)
- Claude Skills/MCP (agent-based)
- Industry SaaS (specialized tools)

**Outputs:** `projects/[workflow-name]/architecture-analysis.md`

---

### 3. **generate_pitch**
Research companies and generate customized AI/automation pitches.

**Usage:**
```
"Generate a pitch for ABC Roofing Company at https://abcroofing.com"
```

**Parameters:**
- `company_name` (required): Company name
- `website` (optional): Company website URL
- `industry` (optional): Industry classification
- `contact_name` (optional): Contact person
- `contact_email` (optional): Contact email
- `sales_notes` (optional): Notes from sales calls
- `industry_profile` (optional): 'small_business' (default), 'roofing', etc.
- `output_format` (optional): 'all', 'markdown', 'email', 'deck' (default: all)

**Outputs:** Markdown pitch, email template, presentation deck

---

### 4. **batch_generate_pitches**
Generate pitches for multiple companies from CSV/Excel.

**Usage:**
```
"Generate pitches from companies.csv file"
```

**Parameters:**
- `file_path` (required): Path to CSV/Excel (must have 'company_name' column)
- `output_directory` (optional): Output path (default: `projects/pitches/`)
- `industry_profile` (optional): Industry context

**CSV Columns:**
- `company_name` (required)
- `website` (optional)
- `industry` (optional)
- `contact_name` (optional)
- `contact_email` (optional)
- `sales_notes` (optional)

---

## How It Works

### When You Open Claude Code in This Repo:

1. **MCP Server Auto-Starts**: Claude Code reads `.claude/mcp.json` and spawns the ai-product-agents server
2. **Tools Available**: All 4 tools are automatically registered
3. **Multiple Sessions**: Each Claude Code terminal gets its own server instance (stdio mode)
4. **Logging**: MCP logs go to stderr, visible in Claude Code debug panel

### Server Location
- **Codebase**: `/Users/miguelfranco/Development_agents/src/ai_product_agents_mcp`
- **Configuration**: `/Users/miguelfranco/Roofing Chatbot-stage-render/.claude/mcp.json`

---

## Example Use Cases in This Repo

### Use Case 1: Plan New Feature
```
"Generate a PRD for adding SMS notifications to the gutters workflow"
```
- Creates `projects/sms-notifications/prd.md`
- Includes user stories, technical requirements, acceptance criteria
- Roofing-specific context from industry profile

### Use Case 2: Architecture Decision
```
"Analyze architecture options for implementing multi-language support, check reusability in ./backend"
```
- Scans existing codebase for reusable components
- Scores 8 implementation options
- Provides TCO analysis and recommendation
- Creates `projects/multi-language/architecture-analysis.md`

### Use Case 3: Sales Outreach
```
"Generate a pitch for Dallas Roofing Co at https://dallasroofing.com focused on workflow automation"
```
- Researches company via web search
- Identifies pain points in roofing operations
- Generates personalized pitch deck + email
- Uses roofing industry profile for relevant examples

### Use Case 4: Batch Lead Processing
```
"Generate pitches from roofing_leads.csv in the sales folder"
```
- Processes CSV with company list
- Generates individual pitches for each lead
- Saves to `projects/pitches/[company-name]/`

---

## Troubleshooting

### MCP Server Not Starting
1. Check Python path: `/Library/Frameworks/Python.framework/Versions/3.13/bin/python3`
2. Verify PYTHONPATH: `/Users/miguelfranco/Development_agents/src`
3. Check logs in Claude Code debug panel (View > Toggle Debug Panel)

### Tool Not Available
1. Restart Claude Code session
2. Verify `.claude/mcp.json` exists in repo root
3. Check MCP server logs for errors

### Outputs Not Saving
- PRD/Architecture: Saves to `projects/[workflow-name]/` (created automatically)
- Pitches: Saves to `projects/pitches/[company-name]/` (created automatically)

---

## Advanced: Using with Render MCP

This repo also has Render MCP configured for production monitoring. Both can be used simultaneously:

```
"Check stage logs for errors, then generate a PRD for fixing the issue"
```

Claude Code will:
1. Use Render MCP to fetch logs
2. Use ai-product-agents to generate PRD
3. Provide comprehensive fix plan

---

*Last updated: 2026-01-24*
