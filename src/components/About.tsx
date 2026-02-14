import { CheckCircle, TrendingUp, Shield, Clock, Cpu } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Real Results, Not Promises",
    description: "Every solution we build is measured by business outcomes — time saved, costs reduced, revenue gained.",
  },
  {
    icon: Shield,
    title: "Privacy-First Architecture",
    description: "Your data stays yours. We build local-first when possible and never compromise on security.",
  },
  {
    icon: Clock,
    title: "Rapid Deployment",
    description: "Get up and running in weeks, not months, with our AI-accelerated development approach.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-12 md:py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">αlphaspeed AI</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              We're not a chatbot reseller. We build custom AI systems using frontier models and purpose-built agent architectures — the same technology powering the world's most advanced AI applications.
            </p>

            {/* Tech differentiator */}
            <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border mb-8">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Cpu className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-sm mb-1">Built on Frontier AI</h4>
                <p className="text-sm text-muted-foreground">
                  We build with Claude, custom MCP servers, and purpose-built agent frameworks — not off-the-shelf chatbot builders or Zapier wrappers.
                </p>
              </div>
            </div>

            <ul className="space-y-4">
              {[
                "Tailored solutions for your specific industry",
                "End-to-end implementation and support",
                "Continuous optimization and updates",
                "Dedicated team of AI specialists",
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex gap-5 p-6 rounded-2xl bg-card border border-border card-hover"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
