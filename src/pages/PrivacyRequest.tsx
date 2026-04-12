import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { buildCanonicalUrl } from "@/lib/site";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type RequestType = "access" | "delete" | "correct" | "opt-out";

const REQUEST_TYPE_LABELS: Record<RequestType, string> = {
  access: "Access my data",
  delete: "Delete my data",
  correct: "Correct my data",
  "opt-out": "Opt-out of data sharing",
};

const submitPrivacyRequest = async (payload: {
  name: string;
  email: string;
  request_type: RequestType;
  details: string;
}) => {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Service unavailable.");

  const res = await fetch(`${url.replace(/\/$/, "")}/rest/v1/privacy_requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: key,
      Authorization: `Bearer ${key}`,
      Prefer: "return=minimal",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error("Submission failed. Please try again.");
};

const PrivacyRequest = () => {
  const canonicalUrl = buildCanonicalUrl("/privacy-request");
  useScrollToTop();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [requestType, setRequestType] = useState<RequestType>("access");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      await submitPrivacyRequest({ name, email, request_type: requestType, details });
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Submission failed. Please try again.");
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Request | αlphaspeed AI</title>
        <meta name="description" content="Submit a data privacy request to Alpha Speed Consulting, LLC." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-20">
        <div className="relative py-16 text-center overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-40" />
          <div className="relative z-10 container mx-auto px-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Alpha Speed Consulting, LLC
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Privacy <span className="gradient-text">Request</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Submit a request to access, delete, correct, or opt out of your personal data.
            </p>
          </div>
        </div>

        <div className="container mx-auto px-6 max-w-xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-10">
            {status === "success" ? (
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
                  <svg className="w-7 h-7 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-foreground">Request Received</h2>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  We received your privacy request and will respond within <strong className="text-foreground">45 days</strong>.
                  If we need to verify your identity, we will contact you at the email address you provided.
                </p>
                <p className="text-muted-foreground text-xs">
                  Questions? Email{" "}
                  <a href="mailto:alpha.speed.consulting@gmail.com" className="text-primary hover:underline">
                    alpha.speed.consulting@gmail.com
                  </a>
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1">
                    Email Address <span className="text-primary">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@example.com"
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                <div>
                  <label htmlFor="request_type" className="block text-sm font-medium text-foreground mb-1">
                    Request Type <span className="text-primary">*</span>
                  </label>
                  <select
                    id="request_type"
                    value={requestType}
                    onChange={(e) => setRequestType(e.target.value as RequestType)}
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {(Object.entries(REQUEST_TYPE_LABELS) as [RequestType, string][]).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="details" className="block text-sm font-medium text-foreground mb-1">
                    Additional Details
                  </label>
                  <textarea
                    id="details"
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Please describe your request in more detail (optional)."
                    className="w-full px-4 py-2 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                  />
                </div>

                {status === "error" && (
                  <p className="text-sm text-destructive">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full py-2.5 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "submitting" ? "Submitting…" : "Submit Request"}
                </button>

                <p className="text-xs text-muted-foreground text-center leading-relaxed">
                  By submitting this form you agree to our{" "}
                  <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>.
                  We will respond within 45 days.
                </p>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyRequest;
