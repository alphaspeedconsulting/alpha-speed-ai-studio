import { Helmet } from "react-helmet-async";
import { buildCanonicalUrl } from "@/lib/site";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useScrollToTop();
  const canonicalUrl = buildCanonicalUrl("/privacy-policy");

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | αlphaspeed AI</title>
        <meta name="description" content="Privacy Policy for αlphaspeed AI and the AgentVault platform." />
        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      <Header />

      <main className="pt-24 pb-20">
        {/* Hero */}
        <div className="relative py-16 text-center overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-40" />
          <div className="relative z-10 container mx-auto px-6">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground mb-3">
              Alpha Speed Consulting, LLC
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Your privacy matters to us. Learn how we collect, use, and protect your information.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-10">
              Effective Date: March 15, 2026
            </span>

            <Section title="1. Introduction">
              <p>Alpha Speed Consulting, LLC ("Company," "we," "us," or "our") operates the <strong>AgentVault</strong> SaaS platform, consulting services, and associated digital properties including social media accounts on platforms such as <strong>TikTok, Instagram, LinkedIn, YouTube</strong>, and our website (collectively, the "Services").</p>
              <p>This Privacy Policy explains how we collect, use, disclose, and safeguard your personal information when you interact with our Services. By using our Services, you consent to the practices described in this policy.</p>
              <Highlight>
                <strong>California Residents:</strong> Please see Section 11 for your additional rights under the California Consumer Privacy Act (CCPA) and California Privacy Rights Act (CPRA).
              </Highlight>
            </Section>

            <Section title="2. Information We Collect">
              <p>We collect information in the following ways:</p>

              <p><strong>A. Information You Provide Directly</strong></p>
              <ul>
                <li><strong>Account Information:</strong> Email address and subscription tier when you register for AgentVault. If you engage consulting services, we may also collect your name, company name, and contact details.</li>
                <li><strong>Payment Information:</strong> Billing address and payment card details (processed securely through Stripe; we do not store full card numbers).</li>
                <li><strong>Consulting Inquiries:</strong> Information you provide when requesting or engaging consulting services, including project details, business information, and communications.</li>
                <li><strong>Communications:</strong> Content of emails, support tickets, feedback, or messages you send to us.</li>
                <li><strong>Social Media Interactions:</strong> Comments, direct messages, or other interactions you have with our accounts on TikTok and other platforms.</li>
              </ul>

              <p><strong>B. Information Collected Automatically (Server-Side)</strong></p>
              <ul>
                <li><strong>Website Analytics:</strong> Event data including page paths, navigation patterns, UTM campaign parameters, scroll depth, CTA interactions, and referring URLs. Analytics events are temporarily cached in your browser's local storage before being synced to our servers.</li>
                <li><strong>IP Addresses:</strong> IP addresses are processed by Google Analytics (with IP anonymization enabled) and by Meta Pixel and TikTok Pixel if you have consented to marketing cookies. We do not store IP addresses directly in our own systems.</li>
                <li><strong>Tool Usage Logs:</strong> When you use AgentVault, we log the tool name and timestamp of each tool invocation linked to your license key. This is used for rate limiting, abuse detection, and billing dispute resolution. Retained for 12 months on a rolling basis.</li>
                <li><strong>Machine Fingerprint:</strong> Each license validation request transmits a one-way hash (SHA-256, first 16 characters) derived from your machine's hostname, CPU architecture, and operating system. This fingerprint is not stored on our servers — it is used only to verify token integrity for offline fallback.</li>
                <li><strong>Cookies &amp; Tracking:</strong> Cookies, web beacons, and similar technologies (see Section 7).</li>
              </ul>

              <p><strong>C. Local Data Stored on Your Machine (AgentVault SDK)</strong></p>
              <p>The AgentVault SDK stores data locally on your machine under <code>~/.agentvault/</code>. This data never leaves your device unless you explicitly share it. You are in control of this data.</p>
              <ul>
                <li><strong>License &amp; Token Files:</strong> <code>~/.agentvault/config.json</code> (your license key), <code>~/.agentvault/token.jwt</code> (a 24-hour session token for offline validation), and <code>~/.agentvault/license_cache.json</code> (cached manifest). These are auto-managed by the SDK.</li>
                <li><strong>Governance Audit Chain:</strong> <code>~/.agentvault/data/governance/audit_chain.jsonl</code> — a tamper-evident, hash-chained log of every agent tool invocation, including tool name, agent, and a short curated action preview (max 120 characters). Full payloads are never stored. This log is retained indefinitely on your local machine to preserve audit chain integrity; it cannot be selectively deleted without breaking the chain.</li>
                <li><strong>Agent Memory:</strong> <code>~/.agentvault/data/memory/</code> — content you provide to agents is stored locally as persistent memory. This is user-controlled and can be cleared at any time using the <code>memory_forget</code> MCP tool.</li>
                <li><strong>Workflow Run Records:</strong> <code>~/.agentvault/data/workflows/runs/</code> — workflow execution history retained locally for 90 days, then automatically purged.</li>
                <li><strong>Gmail Analysis Data:</strong> If you use the Gmail integration, inbox analysis results (sender statistics, deletion patterns) are cached locally at <code>~/.agentvault/data/gmail/</code> for 30 days, then automatically purged.</li>
              </ul>
              <Highlight>
                To purge local AgentVault data, run <code>governance.py full-purge</code> from your AgentVault installation directory. This removes all local data except the license key file.
              </Highlight>

              <p><strong>D. Information from Third Parties</strong></p>
              <ul>
                <li>Business contact data from lead generation and marketing platforms.</li>
                <li>Analytics data from social media platforms (e.g., TikTok Analytics, LinkedIn Insights) regarding engagement with our content — this data is typically aggregated and non-identifiable.</li>
              </ul>
            </Section>

            <Section title="3. How We Use Your Information">
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border rounded-tl-lg">Purpose</th>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border rounded-tr-lg">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Provide the Services", "Operate and maintain the AgentVault platform and deliver consulting engagements."],
                      ["Account Management", "Create and manage your account, authenticate your identity, and process transactions."],
                      ["Communications", "Send transactional emails, service updates, security alerts, and respond to your inquiries."],
                      ["Marketing", "Send promotional content, newsletters, and product announcements (with your consent where required)."],
                      ["Analytics & Improvement", "Analyze usage patterns to improve our Services, features, and user experience."],
                      ["Legal & Compliance", "Comply with legal obligations, enforce our Terms of Service, and protect against fraud or abuse."],
                      ["Social Media Engagement", "Respond to comments and messages on TikTok and other platforms, and analyze content performance."],
                    ].map(([purpose, details], i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-primary/5" : ""}>
                        <td className="px-4 py-2 border border-border text-foreground font-medium align-top">{purpose}</td>
                        <td className="px-4 py-2 border border-border text-muted-foreground align-top">{details}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>

            <Section title="4. Sharing Your Information">
              <p>We do not sell your personal information. We may share it in the following limited circumstances:</p>
              <ul>
                <li><strong>Service Providers:</strong> Trusted third-party vendors who assist in operating our platform (e.g., cloud hosting, payment processing, email delivery, analytics). These providers are contractually bound to protect your data and use it only as directed by us.</li>
                <li><strong>Social Media Platforms:</strong> When you interact with our content on TikTok, Instagram, or other platforms, those platforms independently collect and process data per their own privacy policies. We receive only aggregated analytics from these platforms.</li>
                <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction, with notice to you.</li>
                <li><strong>Legal Requirements:</strong> When required by law, subpoena, court order, or to protect the rights, property, or safety of our company, users, or the public.</li>
                <li><strong>With Your Consent:</strong> In any other circumstances where we have obtained your explicit consent.</li>
              </ul>
            </Section>

            <Section title="5. Data Retention">
              <p>We retain personal information for as long as necessary to provide the Services, fulfill the purposes described in this policy, or as required by law. The following schedule applies:</p>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border">Data Category</th>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border">Retention Period</th>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border">Automated?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["User account (email, license, subscription)", "Until deletion request, or 90 days after cancellation", "Manual — deletion endpoint"],
                      ["Tool usage logs (server)", "12 months rolling", "Yes — daily retention job"],
                      ["Stripe payment / webhook records", "7 years (financial compliance)", "No — legal obligation; cannot be deleted on request"],
                      ["Website analytics events", "90 days rolling", "Yes — automated purge"],
                      ["Governance audit chain (local)", "Indefinite — integrity requires completeness", "No — user-controlled via governance.py"],
                      ["Agent memory (local)", "User-controlled (indefinite until cleared)", "No — memory_forget tool"],
                      ["Workflow run records (local)", "90 days", "Yes — governance.py purge"],
                      ["Gmail analysis data (local)", "30 days", "Yes — governance.py purge"],
                      ["JWT session tokens (local)", "24 hours, then auto-refreshed", "Yes — SDK manages"],
                    ].map(([cat, ret, auto], i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-primary/5" : ""}>
                        <td className="px-4 py-2 border border-border text-foreground font-medium align-top">{cat}</td>
                        <td className="px-4 py-2 border border-border text-muted-foreground align-top">{ret}</td>
                        <td className="px-4 py-2 border border-border text-muted-foreground align-top">{auto}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <Highlight>
                <strong>Note on financial records:</strong> Stripe payment event records are retained for up to 7 years to satisfy applicable tax, audit, and financial compliance requirements. These records contain only Stripe transaction identifiers — no payment card data — and cannot be deleted in response to a deletion request.
              </Highlight>
            </Section>

            <Section title="6. Data Security">
              <p>We implement industry-standard technical and organizational security measures to protect your personal information, including:</p>
              <ul>
                <li>Encryption of data in transit (TLS/HTTPS) and at rest.</li>
                <li>Role-based access controls limiting employee access to personal data.</li>
                <li>Regular security assessments and vulnerability monitoring.</li>
                <li>Secure data centers with physical access controls.</li>
              </ul>
              <p>No method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. Please notify us immediately at <a href="mailto:alpha.speed.consulting@gmail.com" className="text-primary hover:underline">alpha.speed.consulting@gmail.com</a> if you suspect unauthorized access to your account.</p>
            </Section>

            <Section title="7. Cookies and Tracking Technologies">
              <p>We use cookies and similar technologies to enhance your experience. These include:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the platform to function (authentication, session management).</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Services (e.g., Google Analytics).</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertising and track campaign performance.</li>
              </ul>
              <p>When you first visit our site, you will be presented with a cookie consent banner allowing you to accept or decline analytics and marketing cookies. Essential cookies required for basic functionality are always active. You may also control cookies through your browser settings. We honor browser-based "Do Not Track" (DNT) signals — when DNT is enabled, third-party marketing pixels (Meta Pixel, TikTok Pixel) will not be injected.</p>
            </Section>

            <Section title="8. Third-Party Social Media Platforms">
              <p>Our content and marketing activities are distributed on platforms including <strong>TikTok, Instagram, LinkedIn, YouTube, X (Twitter)</strong>, and others. Your use of and interactions on these platforms are governed by each platform's own privacy policy — not this one. We encourage you to review:</p>
              <ul>
                <li><a href="https://www.tiktok.com/legal/page/us/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">TikTok Privacy Policy</a></li>
                <li><a href="https://privacycenter.instagram.com/policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Instagram / Meta Privacy Policy</a></li>
                <li><a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LinkedIn Privacy Policy</a></li>
                <li><a href="https://www.youtube.com/howyoutubeworks/our-commitments/protecting-user-data/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube / Google Privacy Policy</a></li>
              </ul>
            </Section>

            <Section title="9. Children's Privacy">
              <p>Our Services are not directed to individuals under the age of <strong>18</strong>. We do not knowingly collect personal information from minors. If we become aware that we have collected personal information from a person under 18 without verifiable parental consent, we will take steps to delete that information promptly. If you believe we have inadvertently collected such information, please contact us at <a href="mailto:alpha.speed.consulting@gmail.com" className="text-primary hover:underline">alpha.speed.consulting@gmail.com</a>.</p>
            </Section>

            <Section title="10. Your Privacy Rights (All Users)">
              <p>Regardless of your location, you have the right to:</p>
              <ul>
                <li><strong>Access:</strong> Request a copy of the personal information we hold about you.</li>
                <li><strong>Correction:</strong> Request correction of inaccurate or incomplete data.</li>
                <li><strong>Deletion:</strong> Request deletion of your personal information, subject to legal retention requirements.</li>
                <li><strong>Opt-Out of Marketing:</strong> Unsubscribe from marketing emails at any time using the unsubscribe link or by contacting us.</li>
                <li><strong>Portability:</strong> Request your data in a structured, machine-readable format where technically feasible.</li>
              </ul>
              <p>To exercise any of these rights, submit a request using our <a href="/privacy-request" className="text-primary hover:underline">Privacy Request Form</a> or contact us at <a href="mailto:alpha.speed.consulting@gmail.com" className="text-primary hover:underline">alpha.speed.consulting@gmail.com</a>. We will respond within <strong>45 days</strong> of receiving your request.</p>
              <p><strong>AgentVault subscribers</strong> can also exercise access and deletion rights directly via the platform API:</p>
              <ul>
                <li><strong>Data Access:</strong> Send a <code>GET</code> request to <code>/user/data-export</code> with your <code>X-License-Key</code> header. Returns your account record, masked Stripe identifiers, and your last 1,000 tool usage log entries.</li>
                <li><strong>Account Deletion:</strong> Send a <code>DELETE</code> request to <code>/user/account</code> with your <code>X-License-Key</code> header and body <code>{"{"}"confirm": "DELETE_MY_ACCOUNT"{"}"}</code>. This permanently deletes your account and all associated usage logs. Stripe payment records are retained per the financial compliance exception above. To also remove local data, run <code>governance.py full-purge</code> on your machine.</li>
              </ul>
            </Section>

            <Section title="11. California Privacy Rights (CCPA / CPRA)">
              <Highlight>This section applies to California residents only.</Highlight>
              <p>Under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA), California residents have the following additional rights:</p>
              <ul>
                <li><strong>Right to Know:</strong> You may request disclosure of the categories and specific pieces of personal information we have collected about you in the past 12 months, as well as the purposes for collection and categories of third parties with whom we share it.</li>
                <li><strong>Right to Delete:</strong> You may request deletion of personal information we have collected, subject to certain exceptions.</li>
                <li><strong>Right to Correct:</strong> You may request correction of inaccurate personal information.</li>
                <li><strong>Right to Opt-Out of Sale/Sharing:</strong> We do not sell personal information. We do not share personal information for cross-context behavioral advertising.</li>
                <li><strong>Right to Limit Use of Sensitive Personal Information:</strong> You may request that we limit our use of sensitive personal information to permitted purposes.</li>
                <li><strong>Right to Non-Discrimination:</strong> We will not discriminate against you for exercising any of your CCPA rights.</li>
              </ul>
              <p><strong>Categories of Personal Information Collected (past 12 months):</strong></p>
              <div className="overflow-x-auto -mx-1">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border">Category</th>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border">Examples</th>
                      <th className="text-left px-4 py-2 bg-primary/10 text-foreground font-semibold border border-border">Collected?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Identifiers", "Email address; license key; machine fingerprint hash (non-reversible, not stored server-side)", "Yes"],
                      ["Commercial Information", "Subscription tier, billing records, Stripe customer/subscription IDs", "Yes"],
                      ["Internet Activity", "Website analytics, tool usage logs (tool name + timestamp)", "Yes"],
                      ["Professional / Employment", "Company name, job title (consulting engagements only — not collected at platform signup)", "Limited"],
                      ["Inferences", "Preferences derived from agent memory and usage data (stored locally on your machine)", "Yes — local only"],
                      ["Sensitive Personal Info", "Financial account numbers (via Stripe payment processor only)", "Limited"],
                      ["Geolocation Data", "Precise location", "No"],
                      ["Biometric Data", "Fingerprints, facial recognition", "No"],
                    ].map(([cat, ex, col], i) => (
                      <tr key={i} className={i % 2 === 1 ? "bg-primary/5" : ""}>
                        <td className="px-4 py-2 border border-border text-foreground font-medium align-top">{cat}</td>
                        <td className="px-4 py-2 border border-border text-muted-foreground align-top">{ex}</td>
                        <td className="px-4 py-2 border border-border text-muted-foreground align-top">{col}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>To submit a CCPA request, use our <a href="/privacy-request" className="text-primary hover:underline">Privacy Request Form</a> or email <a href="mailto:alpha.speed.consulting@gmail.com" className="text-primary hover:underline">alpha.speed.consulting@gmail.com</a> with the subject line "CCPA Privacy Request." We may need to verify your identity before processing your request.</p>
            </Section>

            <Section title="12. International Users">
              <p>Our Services are operated in the United States. If you access our Services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the U.S., where privacy laws may differ from those in your jurisdiction. By using our Services, you consent to this transfer.</p>
            </Section>

            <Section title="13. Changes to This Privacy Policy">
              <p>We may update this Privacy Policy periodically to reflect changes in our practices, legal requirements, or Services. We will notify you of material changes by posting the updated policy on our website with a new effective date, and, where required by law, by sending you direct notice via email. Your continued use of the Services after the effective date constitutes your acceptance of the updated policy.</p>
            </Section>

            <Section title="14. Contact Us">
              <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
              <p>
                <strong>Alpha Speed Consulting, LLC</strong><br />
                Email: <a href="mailto:alpha.speed.consulting@gmail.com" className="text-primary hover:underline">alpha.speed.consulting@gmail.com</a><br />
                Website: <a href="https://alphaspeedai.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">alphaspeedai.com</a>
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mt-10 first:mt-0">
    <h2 className="text-lg font-bold text-foreground mb-3 pb-2 border-b border-border">
      {title}
    </h2>
    <div className="space-y-3 text-muted-foreground text-sm leading-relaxed [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:space-y-2 [&_strong]:text-foreground">
      {children}
    </div>
  </div>
);

const Highlight = ({ children }: { children: React.ReactNode }) => (
  <div className="border-l-4 border-primary bg-primary/10 rounded-r-lg px-4 py-3 text-sm text-muted-foreground">
    {children}
  </div>
);

export default PrivacyPolicy;
