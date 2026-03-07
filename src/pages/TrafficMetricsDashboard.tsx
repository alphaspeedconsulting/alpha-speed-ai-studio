import { useMemo, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AnalyticsEvent, clearStoredAnalyticsEvents, getStoredAnalyticsEvents } from "@/lib/analytics";
import { BarChart, Bar, CartesianGrid, LineChart, Line, XAxis, YAxis } from "recharts";

type DailyRollup = {
  day: string;
  pageViews: number;
  leadEvents: number;
};

type SourceRollup = {
  sourceMedium: string;
  campaign: string;
  sessions: number;
  leads: number;
};

const shortDate = (ts: number) =>
  new Date(ts).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });

const buildDailyRollup = (events: AnalyticsEvent[]): DailyRollup[] => {
  const map = new Map<string, DailyRollup>();

  for (const event of events) {
    const date = new Date(event.timestamp);
    const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const existing = map.get(key) ?? {
      day: shortDate(event.timestamp),
      pageViews: 0,
      leadEvents: 0,
    };

    if (event.type === "page_view") {
      existing.pageViews += 1;
    }
    if (event.type === "lead_event") {
      existing.leadEvents += 1;
    }

    map.set(key, existing);
  }

  return [...map.entries()]
    .sort(([a], [b]) => (a > b ? 1 : -1))
    .map(([, value]) => value)
    .slice(-14);
};

const buildSourceRollup = (events: AnalyticsEvent[]): SourceRollup[] => {
  const map = new Map<string, SourceRollup>();

  for (const event of events) {
    if (event.type !== "page_view" && event.type !== "lead_event") {
      continue;
    }

    const source = event.source || "direct";
    const medium = event.medium || "none";
    const campaign = event.campaign || "-";
    const key = `${source}|${medium}|${campaign}`;
    const existing = map.get(key) ?? {
      sourceMedium: `${source} / ${medium}`,
      campaign,
      sessions: 0,
      leads: 0,
    };

    if (event.type === "page_view") {
      existing.sessions += 1;
    }
    if (event.type === "lead_event") {
      existing.leads += 1;
    }
    map.set(key, existing);
  }

  return [...map.values()].sort((a, b) => b.sessions - a.sessions).slice(0, 10);
};

const TrafficMetricsDashboard = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  const events = useMemo(() => getStoredAnalyticsEvents(), [refreshKey]);

  const totalPageViews = useMemo(() => events.filter((e) => e.type === "page_view").length, [events]);
  const totalLeads = useMemo(() => events.filter((e) => e.type === "lead_event").length, [events]);
  const cvr = totalPageViews > 0 ? (totalLeads / totalPageViews) * 100 : 0;

  const daily = useMemo(() => buildDailyRollup(events), [events]);
  const sources = useMemo(() => buildSourceRollup(events), [events]);

  const gaConnected = Boolean(import.meta.env.VITE_GA_MEASUREMENT_ID);

  const chartConfig = {
    pageViews: { label: "Page views", color: "hsl(var(--primary))" },
    leadEvents: { label: "Lead events", color: "hsl(180 80% 45%)" },
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold">
                Traffic <span className="gradient-text">Dashboard</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Quick on-site metrics for launch monitoring. Data below is stored in your browser; GA4 sync is
                {gaConnected ? " active." : " not configured yet."}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="heroOutline" onClick={() => setRefreshKey((n) => n + 1)}>
                Refresh
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  clearStoredAnalyticsEvents();
                  setRefreshKey((n) => n + 1);
                }}
              >
                Clear local data
              </Button>
            </div>
          </div>

          <section className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardDescription>Page Views</CardDescription>
                <CardTitle>{totalPageViews.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Lead Events</CardDescription>
                <CardTitle>{totalLeads.toLocaleString()}</CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardDescription>Conversion Rate</CardDescription>
                <CardTitle>{cvr.toFixed(2)}%</CardTitle>
              </CardHeader>
            </Card>
          </section>

          <section className="grid gap-4 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">14-Day Trend</CardTitle>
                <CardDescription>Page views vs lead events</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[280px] w-full">
                  <LineChart data={daily}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="day" tickLine={false} axisLine={false} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                    <Line type="monotone" dataKey="pageViews" stroke="var(--color-pageViews)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="leadEvents" stroke="var(--color-leadEvents)" strokeWidth={2.5} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Top Sources</CardTitle>
                <CardDescription>By recorded sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={{ sessions: { label: "Sessions", color: "hsl(var(--primary))" } }} className="h-[280px] w-full">
                  <BarChart data={sources}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="sourceMedium" tickLine={false} axisLine={false} tick={{ fontSize: 10 }} />
                    <YAxis allowDecimals={false} tickLine={false} axisLine={false} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="sessions" fill="var(--color-sessions)" radius={6} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </section>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Source / Campaign Breakdown</CardTitle>
              <CardDescription>Uses UTM tags when present</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b border-border">
                      <th className="py-2 pr-4">Source / Medium</th>
                      <th className="py-2 pr-4">Campaign</th>
                      <th className="py-2 pr-4">Sessions</th>
                      <th className="py-2">Leads</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sources.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="py-3 text-muted-foreground">
                          No tracked traffic yet. Visit pages with UTM links and trigger CTA actions.
                        </td>
                      </tr>
                    ) : (
                      sources.map((row) => (
                        <tr key={`${row.sourceMedium}-${row.campaign}`} className="border-b border-border/60">
                          <td className="py-2 pr-4">{row.sourceMedium}</td>
                          <td className="py-2 pr-4">{row.campaign}</td>
                          <td className="py-2 pr-4">{row.sessions}</td>
                          <td className="py-2">{row.leads}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrafficMetricsDashboard;
