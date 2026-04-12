import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalendlyBooking from "@/components/CalendlyBooking";
import { buildBreadcrumbSchema, buildFAQPageSchema, buildServiceSchema } from "@/lib/schema";
import { buildCanonicalUrl } from "@/lib/site";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import { trackEvent } from "@/lib/analytics";

const faqItems = [
  {
    question: "What kinds of DFW businesses are a fit for AI automation?",
    answer:
      "The best fit is any business with repeatable admin, follow-up, reporting, scheduling, or handoff workflows. In DFW that often includes contractors, professional services, real estate, e-commerce, and healthcare administration teams.",
  },
  {
    question: "Do I need a large team to benefit from AI automation?",
    answer:
      "No. Small teams often feel the impact fastest because repetitive work consumes a higher share of their available time. Even one workflow can free meaningful capacity.",
  },
  {
    question: "What should we automate first?",
    answer:
      "Start with the workflow that costs the most hours every week and follows a repeatable pattern. Lead intake, appointment scheduling, status reporting, and inbox triage are common first wins.",
  },
];

const DfwAIAutomationServices = () => {
  useScrollToTop();
  const canonicalUrl = buildCanonicalUrl("/dfw-ai-automation-services");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>DFW AI Automation Services | Alpha Speed AI</title>
        <meta
          name="description"
          content="Alpha Speed AI helps Dallas-Fort Worth businesses automate lead follow-up, scheduling, reporting, and workflow handoffs with custom AI systems."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="DFW AI Automation Services | Alpha Speed AI" />
        <meta
          property="og:description"
          content="Custom AI automation for Dallas-Fort Worth businesses that want less manual work and faster operations."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="DFW AI Automation Services | Alpha Speed AI" />
        <meta
          name="twitter:description"
          content="Custom AI automation for Dallas-Fort Worth businesses."
        />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", url: "https://alphaspeedai.com/" },
              { name: "DFW AI Automation Services", url: canonicalUrl },
            ])
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildServiceSchema(
              "DFW AI Automation Services",
              "Custom AI automation for Dallas-Fort Worth businesses, including lead follow-up, scheduling, reporting, and workflow handoffs."
            )
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(buildFAQPageSchema(faqItems))}
        </script>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
              Dallas-Fort Worth
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              DFW AI Automation Services
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Alpha Speed AI helps Dallas-Fort Worth businesses automate the repetitive work that slows down growth: lead response, scheduling, inbox handling, reporting, and operational handoffs.
            </p>
            <div className="flex justify-center">
              <CalendlyBooking
                label="Book a DFW Automation Consultation"
                placement="dfw_ai_automation_services"
              />
            </div>
          </div>

          <section className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-3">What we automate</h2>
              <ul className="space-y-3">
                {[
                  "Lead intake and qualification",
                  "Appointment scheduling and reminders",
                  "Inbox triage and follow-up routing",
                  "Reporting and dashboard updates",
                  "Multi-step operations workflows across tools",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-3">Best-fit businesses</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The best early wins usually come from service businesses where information moves across email, calendars, spreadsheets, CRMs, and job-status tools every day.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                In DFW that often means contractors, professional service firms, real estate teams, and operations-heavy businesses that need better response speed and less manual coordination.
              </p>
            </div>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-12">
            <h2 className="text-2xl font-semibold mb-4">How to start</h2>
            <ol className="list-decimal list-outside ml-5 space-y-3 text-muted-foreground">
              <li>Identify the workflow that costs your team the most hours every week.</li>
              <li>Map the systems and handoffs involved in that workflow.</li>
              <li>Automate the repetitive steps first, then measure the time recovered.</li>
            </ol>
          </section>

          <section className="grid gap-4 md:grid-cols-3 mb-12">
            <Link
              to="/case-studies"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              onClick={() =>
                trackEvent("cta_click", "dfw_services_case_studies_click", {
                  placement: "dfw_ai_automation_services",
                })
              }
            >
              <h2 className="font-semibold mb-2">See proof</h2>
              <p className="text-sm text-muted-foreground">Review real project outcomes from DFW client work.</p>
            </Link>
            <Link
              to="/roi-calculator"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              onClick={() =>
                trackEvent("cta_click", "dfw_services_roi_click", {
                  placement: "dfw_ai_automation_services",
                })
              }
            >
              <h2 className="font-semibold mb-2">Estimate ROI</h2>
              <p className="text-sm text-muted-foreground">Use the calculator to estimate the value of the time you could recover.</p>
            </Link>
            <Link
              to="/blog/dfw-ai-automation-guide"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              onClick={() =>
                trackEvent("cta_click", "dfw_services_blog_click", {
                  placement: "dfw_ai_automation_services",
                })
              }
            >
              <h2 className="font-semibold mb-2">Read the guide</h2>
              <p className="text-sm text-muted-foreground">See where Dallas-Fort Worth businesses should start with AI automation.</p>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DfwAIAutomationServices;
