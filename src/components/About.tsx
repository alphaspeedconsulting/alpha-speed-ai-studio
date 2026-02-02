import { CheckCircle, TrendingUp, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: TrendingUp,
    title: "Proven Results",
    description: "Our clients see an average 40% increase in operational efficiency.",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade security protocols protecting your data and processes.",
  },
  {
    icon: Clock,
    title: "Rapid Deployment",
    description: "Get up and running in weeks, not months, with our agile approach.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">Alpha Speed AI</span>?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              We're not just another automation company. We partner with you to understand 
              your unique challenges and build custom solutions that deliver real, measurable impact.
            </p>

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
