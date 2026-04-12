import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { trackLead } from "@/lib/analytics";
import { buildCaseStudyListSchema } from "@/lib/schema";
import { buildCanonicalUrl } from "@/lib/site";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type CaseStudy = {
  industry: string;
  title: string;
  challenge: string;
  solution: string;
  results: string[];
  category: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    industry: "Construction & Roofing",
    category: "Workflow Automation",
    title: "DCR Portal — AI-Powered Project Tracking for a DFW Roofing Company",
    challenge:
      "A Dallas-area roofing contractor was managing daily completion reports, crew coordination, and project status updates entirely through text messages and spreadsheets. Field supervisors spent 2–3 hours per day on manual reporting. Nothing was searchable, nothing was real-time, and critical job updates were getting lost.",
    solution:
      "We built the DCR Portal — a custom workflow automation system with an AI command center. Daily completion reports are now submitted through a structured interface, automatically routed to the right stakeholders, and aggregated into a real-time project dashboard. Field crews interact via a conversational interface; the system handles classification, routing, and escalation automatically.",
    results: [
      "70% reduction in daily reporting time for field supervisors",
      "Real-time project status visibility across all active jobs",
      "Zero lost update incidents since deployment",
      "Estimating team now pulls live job data instead of chasing emails",
    ],
  },
  {
    industry: "E-Commerce & Retail",
    category: "System Integration",
    title: "Shopify–Zoho Integration — Eliminating Order Sync Failures for an Online Retailer",
    challenge:
      "A high-volume online retailer was running Shopify for B2C sales and Zoho/MK for inventory and B2B orders. Dynamic tax lines were being created as phantom products in Zoho, polluting the catalog. A single unmapped SKU would cause the entire order batch to fail, requiring manual intervention multiple times per day. Operators had no way to control which SKUs synced between systems.",
    solution:
      "We built a rule-driven integration layer in Python with selective SKU sync, partial-order processing, and policy-based tax line exclusion. An admin interface lets operators enable or disable sync rules per SKU without touching code. Every skipped line, exclusion, and retry is logged in a full audit trail.",
    results: [
      "90% reduction in Zoho catalog clutter from tax-line artifacts within 30 days",
      "≥95% order sync success rate without manual intervention",
      "P95 sync latency under 500ms",
      "Operations team recovered ~8 hours/week previously spent on manual corrections",
    ],
  },
];

const CaseStudies = () => {
  const canonicalUrl = buildCanonicalUrl("/case-studies");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Automation Case Studies | Alpha Speed AI</title>
        <meta name="description" content="See real results from Alpha Speed AI's automation projects. Case studies from construction, real estate, healthcare, and retail businesses across the Dallas-Fort Worth area." />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="AI Automation Case Studies | Alpha Speed AI" />
        <meta property="og:description" content="Real results from AI automation projects across DFW industries." />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation Case Studies | Alpha Speed AI" />
        <meta name="twitter:description" content="Real AI automation results from DFW businesses." />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify(buildCaseStudyListSchema(
            CASE_STUDIES.map((cs, i) => ({
              headline: cs.title,
              description: cs.challenge.slice(0, 160),
              url: `https://alphaspeedai.com/case-studies#study-${i + 1}`,
            }))
          ))}
        </script>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
              Real Work, Real Results
            </Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Client <span className="gradient-text">Case Studies</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              How we've helped DFW businesses automate workflows, eliminate manual work, and measurably reduce costs.
            </p>
          </div>

          {/* Case Studies */}
          <div className="space-y-12">
            {CASE_STUDIES.map((cs, index) => (
              <article
                key={index}
                className="rounded-2xl bg-card border border-border overflow-hidden"
              >
                {/* Category bar */}
                <div className="px-6 sm:px-8 pt-6 flex items-center gap-3">
                  <Badge variant="outline" className="text-xs border-primary/50 text-primary">
                    {cs.industry}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {cs.category}
                  </Badge>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                  <h2 className="text-xl sm:text-2xl font-bold">{cs.title}</h2>

                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Challenge</h3>
                    <p className="text-muted-foreground leading-relaxed">{cs.challenge}</p>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Solution</h3>
                    <p className="text-muted-foreground leading-relaxed">{cs.solution}</p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Results</h3>
                    <ul className="space-y-2">
                      {cs.results.map((result, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-sm">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2">
                    <Button variant="hero" size="default" className="group" asChild>
                      <a
                        href="mailto:alpha.speed.consulting@gmail.com?subject=Strategy%20Call%20Request"
                        onClick={() => trackLead("case_studies_cta_click", { case_study: cs.title })}
                      >
                        Get Similar Results
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </a>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              ← Back to home
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CaseStudies;
