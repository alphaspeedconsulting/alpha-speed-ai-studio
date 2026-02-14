import { Link } from "react-router-dom";
import { ExternalLink, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CONTACT_MAILTO } from "@/lib/constants";

const DemoVideosSection = () => {
  return (
    <section id="demos" className="py-12 md:py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-1.5 text-sm border-primary/50 text-primary">
            See It In Action
          </Badge>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Experience <span className="gradient-text">αlphaspeed AI</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Try our interactive AI assistant or get in touch for a custom demo tailored to your business.
          </p>
        </div>

        {/* Demo Cards */}
        <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-6">
          <Link
            to="/assistant"
            className="group p-8 rounded-2xl bg-card border border-border card-hover flex flex-col items-center text-center hover:border-primary/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <ExternalLink className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Try the Assistant</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Interactive demo showing our AI assistant handling tasks in real time. See the dashboard, terminal, and minimal layouts.
            </p>
          </Link>

          <a
            href={CONTACT_MAILTO}
            className="group p-8 rounded-2xl bg-card border border-border card-hover flex flex-col items-center text-center hover:border-primary/50 transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Request Custom Demo</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We'll walk you through how αlphaspeed AI can be tailored to your specific business and workflows.
            </p>
          </a>
        </div>
      </div>
    </section>
  );
};

export default DemoVideosSection;
