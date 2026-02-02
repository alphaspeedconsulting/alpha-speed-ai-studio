import { Bot, Workflow, Brain, Cog, MessageSquare, Database } from "lucide-react";

const services = [
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Streamline complex business processes with intelligent automation that adapts to your unique needs.",
  },
  {
    icon: Bot,
    title: "Custom AI Assistants",
    description: "Deploy personalized AI solutions tailored to your specific industry and operational requirements.",
  },
  {
    icon: Brain,
    title: "Machine Learning Solutions",
    description: "Harness the power of predictive analytics and data-driven insights for smarter decision-making.",
  },
  {
    icon: MessageSquare,
    title: "Conversational AI",
    description: "Build intelligent chatbots and virtual assistants that enhance customer engagement 24/7.",
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Seamlessly connect your systems and data sources for unified, real-time visibility.",
  },
  {
    icon: Cog,
    title: "Process Optimization",
    description: "Identify bottlenecks and implement AI-driven improvements to maximize operational efficiency.",
  },
];

const Services = () => {
  return (
    <section id="services" className="py-12 md:py-24 relative">
      <div className="absolute inset-0 hero-gradient rotate-180 opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive AI and automation solutions designed to transform your business operations.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card border border-border card-hover"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
