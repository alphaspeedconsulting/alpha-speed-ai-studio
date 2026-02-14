import { Phone, ClipboardList, Rocket, RefreshCw } from "lucide-react";
import { HOW_WE_WORK_STEPS } from "@/lib/constants";
import type { LucideIcon } from "lucide-react";

const stepIcons: LucideIcon[] = [Phone, ClipboardList, Rocket, RefreshCw];

const HowWeWorkSection = () => {
  return (
    <section id="how-we-work" className="py-12 md:py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            How We <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            From first conversation to live automation — here's what working with us looks like.
          </p>
        </div>

        {/* Steps Timeline */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_WE_WORK_STEPS.map((step, index) => {
            const Icon = stepIcons[index];
            return (
              <div key={index} className="relative group">
                {/* Connector line (hidden on last item and mobile) */}
                {index < HOW_WE_WORK_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] right-0 h-px bg-border z-0" />
                )}

                <div className="p-8 rounded-2xl bg-card border border-border card-hover text-center relative z-10">
                  {/* Step number */}
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2 uppercase tracking-wider">
                    Step {step.step}
                  </div>
                  <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
