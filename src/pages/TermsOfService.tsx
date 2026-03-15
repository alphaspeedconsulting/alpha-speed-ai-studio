import { Helmet } from "react-helmet-async";
import { useScrollToTop } from "@/hooks/useScrollToTop";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  useScrollToTop();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Terms of Service | αlphaspeed AI</title>
        <meta name="description" content="Terms of Service for αlphaspeed AI and the AgentVault platform." />
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
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Please read these terms carefully before using AgentVault or our consulting services.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 max-w-3xl">
          <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold tracking-wide px-3 py-1 rounded-full mb-10">
              Effective Date: March 15, 2026
            </span>

            <Section title="1. Agreement to Terms">
              <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User," "you," or "your") and <strong>Alpha Speed Consulting, LLC</strong> ("Company," "we," "us," or "our"), governing your access to and use of the <strong>AgentVault</strong> software-as-a-service platform, related applications, and professional consulting services (collectively, the "Services").</p>
              <p>By accessing or using our Services — including through third-party platforms such as TikTok, social media channels, or other digital properties operated by the Company — you agree to be bound by these Terms. If you do not agree, you must discontinue use immediately.</p>
              <Highlight>
                <strong>Important:</strong> If you are using the Services on behalf of an organization, you represent that you have authority to bind that organization to these Terms.
              </Highlight>
            </Section>

            <Section title="2. Description of Services">
              <p>Alpha Speed Consulting, LLC provides the following services:</p>
              <ul>
                <li><strong>AgentVault SaaS Platform:</strong> An AI-powered agent infrastructure platform that enables users to build, deploy, manage, and orchestrate intelligent agents for automation, workflow management, and business operations.</li>
                <li><strong>Consulting Services:</strong> Professional advisory, implementation, strategy, and technical consulting services related to AI agents, automation, and digital transformation.</li>
                <li><strong>Digital Content &amp; Community:</strong> Educational content, tutorials, product updates, and community engagement distributed via our website, email, and third-party social media platforms including TikTok, Instagram, LinkedIn, and others.</li>
              </ul>
              <p>We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time with reasonable notice.</p>
            </Section>

            <Section title="3. Eligibility">
              <p>You must be at least <strong>18 years of age</strong> to use our Services. By agreeing to these Terms, you represent and warrant that you meet this age requirement. Users under 18 are strictly prohibited from creating accounts or accessing the AgentVault platform.</p>
            </Section>

            <Section title="4. Account Registration">
              <p>To access certain features of AgentVault, you must register for an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information during registration.</li>
                <li>Maintain the security and confidentiality of your login credentials.</li>
                <li>Promptly notify us of any unauthorized use of your account.</li>
                <li>Be solely responsible for all activity that occurs under your account.</li>
              </ul>
              <p>We reserve the right to suspend or terminate accounts that violate these Terms or that we determine, in our sole discretion, are being used for fraudulent or harmful purposes.</p>
            </Section>

            <Section title="5. Acceptable Use">
              <p>You agree to use the Services only for lawful purposes. You may not:</p>
              <ul>
                <li>Use the Services to violate any applicable federal, state, or local law or regulation.</li>
                <li>Transmit any harmful, offensive, threatening, defamatory, or otherwise objectionable content.</li>
                <li>Reverse engineer, decompile, disassemble, or attempt to derive the source code of the AgentVault platform.</li>
                <li>Use automated scraping, bots, or similar tools to extract data from the platform without our prior written consent.</li>
                <li>Resell, sublicense, or otherwise transfer your rights to use the Services to any third party without authorization.</li>
                <li>Interfere with or disrupt the integrity, security, or performance of the Services or underlying infrastructure.</li>
                <li>Upload or transmit malicious code, viruses, or any other harmful software.</li>
              </ul>
            </Section>

            <Section title="6. Fees and Payment">
              <p>Certain features of AgentVault and consulting engagements are subject to fees as specified in applicable order forms, subscription plans, or statements of work ("SOWs").</p>
              <ul>
                <li>All fees are stated in U.S. dollars and are non-refundable except as expressly provided herein or required by law.</li>
                <li>Subscription fees are billed in advance on a recurring basis (monthly or annually, as selected).</li>
                <li>You authorize us to charge the payment method on file for all applicable fees.</li>
                <li>We reserve the right to suspend Services for non-payment after providing reasonable notice.</li>
                <li>We may update pricing with at least 30 days' written notice for existing subscribers.</li>
              </ul>
            </Section>

            <Section title="7. Intellectual Property">
              <p>All content, software, technology, trademarks, trade names, logos, and intellectual property associated with AgentVault and the Services are the exclusive property of Alpha Speed Consulting, LLC or its licensors. Nothing in these Terms grants you any ownership rights.</p>
              <p><strong>Your Content:</strong> You retain ownership of any data, content, or materials you submit to the platform ("User Content"). By submitting User Content, you grant us a limited, non-exclusive, royalty-free license to process and store such content solely to provide the Services.</p>
              <p><strong>Feedback:</strong> Any suggestions, ideas, or feedback you provide to us may be used by us without obligation or compensation to you.</p>
            </Section>

            <Section title="8. Confidentiality">
              <p>Each party agrees to maintain the confidentiality of the other party's non-public information disclosed in connection with the Services. This obligation does not apply to information that is publicly available, independently developed, or required to be disclosed by law. This section applies with particular force to consulting engagements where sensitive business information may be shared.</p>
            </Section>

            <Section title="9. Third-Party Platforms">
              <p>Our Services may integrate with or be promoted through third-party platforms including <strong>TikTok, Instagram, LinkedIn, YouTube</strong>, and others. Your use of such third-party platforms is governed by their respective terms of service and privacy policies. We are not responsible for the practices of third-party platforms and encourage you to review their policies independently.</p>
              <p>Content we publish on third-party platforms is for informational and marketing purposes only and does not constitute professional legal, financial, or technical advice.</p>
            </Section>

            <Section title="10. Disclaimers">
              <p className="uppercase text-sm">The services are provided on an "as is" and "as available" basis without warranties of any kind, either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p>We do not warrant that the Services will be uninterrupted, error-free, or free of viruses or other harmful components.</p>
              <Highlight>
                <strong>Important — AI Outputs:</strong> AI-generated outputs from AgentVault must be reviewed by qualified personnel before being relied upon for any business, legal, financial, or operational decisions. We make no representations as to the accuracy, completeness, or fitness of AI-generated content for any specific purpose.
              </Highlight>
            </Section>

            <Section title="11. Limitation of Liability">
              <p className="uppercase text-sm">To the fullest extent permitted by applicable law, Alpha Speed Consulting, LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, goodwill, or other intangible losses, arising out of or in connection with your use of the services.</p>
              <p>Our total aggregate liability to you for any claims arising under or related to these Terms shall not exceed the greater of (a) the amount you paid us in the <strong>twelve (12) months</strong> preceding the claim, or (b) <strong>one hundred U.S. dollars ($100.00)</strong>.</p>
            </Section>

            <Section title="12. Indemnification">
              <p>You agree to indemnify, defend, and hold harmless Alpha Speed Consulting, LLC and its officers, directors, employees, agents, and contractors from and against any claims, liabilities, damages, losses, and expenses (including reasonable attorneys' fees) arising out of or related to: (a) your use of the Services; (b) your violation of these Terms; (c) your violation of any third-party rights; or (d) your User Content.</p>
            </Section>

            <Section title="13. Termination">
              <p>Either party may terminate the agreement governed by these Terms at any time. We may suspend or terminate your access immediately if you breach these Terms. Upon termination, your right to access the Services ceases immediately. Provisions that by their nature should survive termination (including intellectual property, disclaimers, limitations of liability, and indemnification) will survive.</p>
            </Section>

            <Section title="14. Governing Law and Dispute Resolution">
              <p>These Terms shall be governed by and construed in accordance with the laws of the <strong>United States</strong> and the state in which Alpha Speed Consulting, LLC is registered, without regard to conflict of law principles.</p>
              <p>Any disputes arising under these Terms shall first be subject to good-faith negotiation. If unresolved within 30 days, disputes shall be submitted to binding arbitration in accordance with the rules of the American Arbitration Association (AAA), except that either party may seek injunctive or equitable relief in a court of competent jurisdiction.</p>
            </Section>

            <Section title="15. Changes to These Terms">
              <p>We may update these Terms from time to time. We will provide notice of material changes via email or a prominent notice on our website or platform. Your continued use of the Services following the effective date of revised Terms constitutes your acceptance of the changes.</p>
            </Section>

            <Section title="16. Contact Us">
              <p>If you have any questions about these Terms, please contact us:</p>
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

export default TermsOfService;
