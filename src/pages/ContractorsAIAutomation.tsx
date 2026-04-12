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

const contractorFaqs = [
  {
    question: "What contractor workflows are best for AI automation?",
    answer:
      "Lead follow-up, appointment scheduling, estimate reminders, job-status reporting, and inbox triage are some of the best first workflows because they are frequent, repetitive, and operationally important.",
  },
  {
    question: "Does AI automation replace the office manager or estimator?",
    answer:
      "No. The goal is to remove repetitive coordination and admin work so your team can spend more time on customer communication, job execution, and revenue-producing work.",
  },
  {
    question: "Can this work for roofing or field-service businesses?",
    answer:
      "Yes. Roofing, contractor, and field-service workflows are especially strong candidates because they involve repeatable lead flow, scheduling, crew coordination, and daily status updates.",
  },
];

const ContractorsAIAutomation = () => {
  useScrollToTop();
  const canonicalUrl = buildCanonicalUrl("/ai-automation-for-contractors");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>AI Automation for Contractors | Alpha Speed AI</title>
        <meta
          name="description"
          content="AI automation for contractors, roofing companies, and field-service teams. Automate lead follow-up, scheduling, status reporting, and admin-heavy workflows."
        />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content="AI Automation for Contractors | Alpha Speed AI" />
        <meta
          property="og:description"
          content="AI automation for contractors, roofing companies, and field-service businesses."
        />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AI Automation for Contractors | Alpha Speed AI" />
        <meta
          name="twitter:description"
          content="Automate lead response, scheduling, reporting, and admin-heavy workflows for contractor teams."
        />
        <meta name="twitter:image" content="https://alphaspeedai.com/og-image.jpeg" />
        <script type="application/ld+json">
          {JSON.stringify(
            buildBreadcrumbSchema([
              { name: "Home", url: "https://alphaspeedai.com/" },
              { name: "AI Automation for Contractors", url: canonicalUrl },
            ])
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(
            buildServiceSchema(
              "AI Automation for Contractors",
              "Custom AI automation for contractors, roofing companies, and field-service teams."
            )
          )}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(buildFAQPageSchema(contractorFaqs))}
        </script>
      </Helmet>
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center mb-14">
            <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
              Contractors & Roofing
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              AI Automation for Contractors
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Reduce response delays, clean up reporting, and remove repetitive admin from contractor operations with AI automation built around the workflows your team already runs every day.
            </p>
            <div className="flex justify-center">
              <CalendlyBooking
                label="Book a Contractor Workflow Review"
                placement="contractors_ai_automation"
              />
            </div>
          </div>

          <section className="rounded-2xl border border-border bg-card p-6 sm:p-8 mb-10">
            <h2 className="text-2xl font-semibold mb-4">High-impact contractor workflows</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {[
                "Lead qualification and speed-to-contact",
                "Inspection scheduling and reminders",
                "Daily completion and job-status reporting",
                "Estimate and invoice follow-up",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-primary mt-1 shrink-0" />
                  <span className="text-muted-foreground">{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2 mb-12">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-3">What improves first</h2>
              <p className="text-muted-foreground leading-relaxed">
                The first gains usually show up in response time, fewer dropped handoffs, and better visibility into active work. That means less chasing updates and more time for estimating, execution, and customer communication.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold mb-3">Why roofing is a strong fit</h2>
              <p className="text-muted-foreground leading-relaxed">
                Roofing teams often balance inbound demand, inspections, field reporting, and customer updates across disconnected tools. That is exactly the kind of repetitive coordination work automation handles well.
              </p>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3 mb-12">
            <Link
              to="/case-studies"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              onClick={() =>
                trackEvent("cta_click", "contractors_page_case_studies_click", {
                  placement: "contractors_ai_automation",
                })
              }
            >
              <h2 className="font-semibold mb-2">See the case study</h2>
              <p className="text-sm text-muted-foreground">Review the DCR Portal work and the outcome improvements it created.</p>
            </Link>
            <Link
              to="/blog/how-contractors-use-ai-automation"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              onClick={() =>
                trackEvent("cta_click", "contractors_page_blog_click", {
                  placement: "contractors_ai_automation",
                })
              }
            >
              <h2 className="font-semibold mb-2">Read the contractor guide</h2>
              <p className="text-sm text-muted-foreground">See where contractor teams get the fastest operational wins.</p>
            </Link>
            <Link
              to="/roi-calculator"
              className="rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition-colors"
              onClick={() =>
                trackEvent("cta_click", "contractors_page_roi_click", {
                  placement: "contractors_ai_automation",
                })
              }
            >
              <h2 className="font-semibold mb-2">Estimate savings</h2>
              <p className="text-sm text-muted-foreground">Run the ROI calculator to estimate how much capacity you could recover.</p>
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ContractorsAIAutomation;
