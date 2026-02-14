import { Bot, Server, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

/**
 * Mockup: Agents as a Service — registry of agents, MCP servers, and tools.
 * Data is static from this repo; can later be driven by registry.json (e.g. from scanning /Users/miguelfranco).
 * See docs/agents-as-service-summary.md for scope and implementation options.
 */

/** Total population stats across all codebases (can be driven by registry scan later) */
const REGISTRY_STATS = {
  totalAgents: 80,
  totalMcp: 24,
  totalTools: 350,
};

const agents = [
  // Development & technical
  { name: "Product Agent", description: "Generate Product Requirements Documents from feature requests. Standardized 9-section PRDs with user stories and acceptance criteria.", source: "Platform", tools: "generate_prd" },
  { name: "Sales Agent", description: "Research companies and generate customized AI/automation pitches. Markdown, email, and deck formats.", source: "Platform", tools: "generate_pitch, batch_generate_pitches" },
  { name: "Quality Agent", description: "Validate code against best practices and Agent Overlay Architecture compliance.", source: "Platform", tools: "validate_best_practices" },
  { name: "UI/UX Agent", description: "Analyze frontend for UI/UX, accessibility, and performance.", source: "Platform", tools: "analyze_ui_ux" },
  // Email & calendar
  { name: "Email Triage Agent", description: "Triage inbox, summarize threads, draft replies, and flag urgent messages. Works with Gmail, Outlook, and other providers.", source: "Platform", tools: "email_read, draft_reply, summarize_thread" },
  { name: "Calendar Agent", description: "Check availability, propose meeting times, send invites, and sync with your calendar. Handles scheduling and rescheduling across time zones.", source: "Platform", tools: "calendar_read, create_event, find_slots" },
  { name: "Meeting Prep Agent", description: "Prep briefs before meetings: attendee context, agenda, and talking points. Can pull from email and past notes.", source: "Platform", tools: "calendar_read, email_search, notes" },
  // Non-technical / business
  { name: "Customer Support Agent", description: "Handle common inquiries, route tickets, and suggest replies. Trained on your FAQs and past resolutions.", source: "Platform", tools: "ticket_read, knowledge_base, suggest_reply" },
  { name: "Content & Social Agent", description: "Draft posts, suggest captions, and maintain a content calendar for social and blog. Keeps tone and brand consistent.", source: "Platform", tools: "content_calendar, draft_post, brand_voice" },
  { name: "Research Agent", description: "Summarize articles, compare options, and pull key facts from the web. Useful for competitive intel and quick briefs.", source: "Platform", tools: "web_search, summarize, extract_facts" },
];

const mcpServers = [
  { name: "ai-product-agents", description: "PRD generation, architecture analysis, pitches, security review, refactor, tech debt, integration tests, observability, DB migrations, UI/UX analysis, full pipeline orchestration.", config: ".claude/mcp.json", cwd: "Development_agents" },
  { name: "Render", description: "Deployments, logs, Postgres, env vars, services and cron management.", config: "MCP", cwd: "—" },
  { name: "Browser", description: "Navigate, snapshot, click, type, fill forms. Browser automation.", config: "MCP", cwd: "—" },
  { name: "Web fetch", description: "Fetch URL content as readable markdown.", config: "MCP", cwd: "—" },
];

const tools = [
  { name: "generate_prd", server: "ai-product-agents", description: "Generate PRD from feature request; saves to projects/[workflow]/prd.md" },
  { name: "analyze_architecture", server: "ai-product-agents", description: "Score 8+ implementation options; workflow design, cost, recommendation" },
  { name: "generate_pitch", server: "ai-product-agents", description: "Research company and generate customized pitch (markdown, email, deck)" },
  { name: "batch_generate_pitches", server: "ai-product-agents", description: "Generate pitches for multiple companies from CSV/Excel" },
  { name: "review_code_security", server: "ai-product-agents", description: "OWASP Top 10, dependency scan, LLM code review" },
  { name: "validate_best_practices", server: "ai-product-agents", description: "Agent Overlay Architecture and tool contract compliance" },
  { name: "orchestrate_pipeline", server: "ai-product-agents", description: "Full pipeline: PRD → Architect → Developer → Security → Deployment" },
  { name: "list_services / get_service", server: "Render", description: "List and get Render web services, cron jobs, Postgres" },
  { name: "browser_navigate / browser_snapshot", server: "Browser", description: "Navigate and capture accessibility snapshot of pages" },
];

const AgentsAsServiceSection = () => {
  return (
    <section id="agents" className="py-12 md:py-24 relative">
      <div className="absolute inset-0 hero-gradient opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
            Agent Registry
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Agents as a <span className="gradient-text">Service</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            A single registry of agents, MCP servers, and tools across our platform. Discover what’s available and how it fits together.
          </p>
          {/* Population stats */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-6 text-sm">
            <span className="flex items-center gap-2 text-foreground font-medium">
              <Bot className="h-4 w-4 text-primary" />
              {REGISTRY_STATS.totalAgents}+ Agents
            </span>
            <span className="flex items-center gap-2 text-foreground font-medium">
              <Server className="h-4 w-4 text-primary" />
              {REGISTRY_STATS.totalMcp}+ MCP Servers
            </span>
            <span className="flex items-center gap-2 text-foreground font-medium">
              <Wrench className="h-4 w-4 text-primary" />
              {REGISTRY_STATS.totalTools}+ Tools
            </span>
          </div>
          <p className="text-muted-foreground text-sm mt-4">
            Below is a sample subset of available agents, MCP servers, and tools from the registry.
          </p>
        </div>

        <Tabs defaultValue="agents" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-10">
            <TabsTrigger value="agents" className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              Agents
            </TabsTrigger>
            <TabsTrigger value="mcp" className="flex items-center gap-2">
              <Server className="h-4 w-4" />
              MCP
            </TabsTrigger>
            <TabsTrigger value="tools" className="flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Tools
            </TabsTrigger>
          </TabsList>

          <TabsContent value="agents" className="mt-0">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Showing {agents.length} of {REGISTRY_STATS.totalAgents}+ agents
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {agents.map((agent, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-card border border-border card-hover"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground">{agent.name}</h3>
                      <Badge variant="secondary" className="text-xs mt-1">{agent.source}</Badge>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-3">{agent.description}</p>
                  <p className="text-xs text-primary font-medium">Tools: {agent.tools}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mcp" className="mt-0">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Showing {mcpServers.length} of {REGISTRY_STATS.totalMcp}+ MCP servers
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {mcpServers.map((server, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-card border border-border card-hover"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Server className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-foreground font-mono text-sm">{server.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">Config: {server.config}</p>
                    </div>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-2">{server.description}</p>
                  {server.cwd !== "—" && <p className="text-xs text-muted-foreground">CWD: {server.cwd}</p>}
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tools" className="mt-0">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Showing {tools.length} of {REGISTRY_STATS.totalTools}+ tools
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-xl bg-card border border-border card-hover"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Wrench className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="font-mono text-sm font-medium text-foreground">{tool.name}</span>
                  </div>
                  <Badge variant="outline" className="text-xs mb-2">{tool.server}</Badge>
                  <p className="text-muted-foreground text-xs leading-relaxed">{tool.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Registry can be extended to scan all code under your workspace (e.g. /Users/miguelfranco). See{" "}
          <code className="rounded bg-muted px-1.5 py-0.5">docs/agents-as-service-summary.md</code> for scope and implementation.
        </p>
      </div>
    </section>
  );
};

export default AgentsAsServiceSection;
