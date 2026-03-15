import { Helmet } from "react-helmet-async";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Privacy Policy | αlphaspeed AI</title>
        <meta name="description" content="Privacy Policy for αlphaspeed AI and the AgentVault platform." />
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
                <li><strong>Account Information:</strong> Name, email address, company name, job title, phone number when you register for AgentVault.</li>
                <li><strong>Payment Information:</strong> Billing address and payment card details (processed securely through third-party payment processors; we do not store full card numbers).</li>
                <li><strong>Consulting Inquiries:</strong> Information you provide when requesting or engaging consulting services, including project details, business information, and communications.</li>
                <li><strong>Communications:</strong> Content of emails, support tickets, feedback, or messages you send to us.</li>
                <li><strong>Social Media Interactions:</strong> Comments, direct messages, or other interactions you have with our accounts on TikTok and other platforms.</li>
              </ul>

              <p><strong>B. Information Collected Automatically</strong></p>
              <ul>
                <li><strong>Usage Data:</strong> Log files, IP addresses, browser type, operating system, pages visited, time spent, and referring URLs.</li>
                <li><strong>Platform Activity:</strong> Agent configurations, workflow runs, API calls, and other actions taken within AgentVault.</li>
                <li><strong>Device Information:</strong> Device identifiers, hardware model, and operating system version.</li>
                <li><strong>Cookies &amp; Tracking:</strong> Cookies, web beacons, and similar technologies (see Section 7).</li>
              </ul>

              <p><strong>C. Information from Third Parties</strong></p>
              <ul>
                <li>Business contact data from lead generation and marketing platforms.</li>
                <li>Analytics data from social media platforms (e.g., TikTok Analytics, LinkedIn Insights) regarding engagement with our content — this data is typically aggregated and non-identifiable.</li>
                <li>OAuth or SSO data if you choose to authenticate via a third-party identity provider (e.g., Google, GitHub).</li>
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
              <p>We retain personal information for as long as necessary to provide the Services, fulfill the purposes described in this policy, or as required by law. When your account is deleted or a consulting engagement concludes, we will delete or anonymize your personal data within <strong>90 days</strong>, except where longer retention is required for legal, tax, or compliance purposes.</p>
            </Section>

            <Section title="6. Data Security">
              <p>We implement industry-standard technical and organizational security measures to protect your personal information, including:</p>
              <ul>
                <li>Encryption of data in transit (TLS/HTTPS) and at rest.</li>
                <li>Role-based access controls limiting employee access to personal data.</li>
                <li>Regular security assessments and vulnerability monitoring.</li>
                <li>Secure data centers with physical access controls.</li>
              </ul>
              <p>No method of transmission or storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security. Please notify us immediately at <a href="mailto:security@agentvault.ai" className="text-primary hover:underline">security@agentvault.ai</a> if you suspect unauthorized access to your account.</p>
            </Section>

            <Section title="7. Cookies and Tracking Technologies">
              <p>We use cookies and similar technologies to enhance your experience. These include:</p>
              <ul>
                <li><strong>Essential Cookies:</strong> Required for the platform to function (authentication, session management).</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our Services (e.g., Google Analytics).</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertising and track campaign performance.</li>
              </ul>
              <p>You can control cookies through your browser settings. Note that disabling certain cookies may affect platform functionality. We honor browser-based "Do Not Track" signals where technically feasible.</p>
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
              <p>Our Services are not directed to individuals under the age of <strong>18</strong>. We do not knowingly collect personal information from minors. If we become aware that we have collected personal information from a person under 18 without verifiable parental consent, we will take steps to delete that information promptly. If you believe we have inadvertently collected such information, please contact us at <a href="mailto:privacy@agentvault.ai" className="text-primary hover:underline">privacy@agentvault.ai</a>.</p>
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
              <p>To exercise any of these rights, please contact us at <a href="mailto:privacy@agentvault.ai" className="text-primary hover:underline">privacy@agentvault.ai</a>. We will respond within <strong>45 days</strong> of receiving your request.</p>
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
                      ["Identifiers", "Name, email, IP address", "Yes"],
                      ["Commercial Information", "Purchase history, billing records", "Yes"],
                      ["Internet Activity", "Browsing on our platform, usage logs", "Yes"],
                      ["Professional / Employment", "Job title, company name", "Yes"],
                      ["Inferences", "Preferences derived from usage data", "Yes"],
                      ["Sensitive Personal Info", "Financial account numbers (via payment processor)", "Limited"],
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
              <p>To submit a CCPA request, contact us at <a href="mailto:privacy@agentvault.ai" className="text-primary hover:underline">privacy@agentvault.ai</a> with the subject line "CCPA Privacy Request." We may need to verify your identity before processing your request.</p>
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
                Privacy Inquiries: <a href="mailto:privacy@agentvault.ai" className="text-primary hover:underline">privacy@agentvault.ai</a><br />
                Security Issues: <a href="mailto:security@agentvault.ai" className="text-primary hover:underline">security@agentvault.ai</a><br />
                Website: <a href="https://agentvault.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">agentvault.ai</a>
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
