import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone } from "lucide-react";

const Contact = () => {
  return (
    <section id="contact" className="py-12 md:py-24 relative">
      <div className="absolute inset-0 hero-gradient" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* CTA Box */}
          <div className="text-center p-12 rounded-3xl bg-gradient-to-b from-card to-secondary/30 border border-border glow-teal">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              Ready to <span className="gradient-text">Transform</span> Your Business?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
              Let's discuss how AI automation can revolutionize your workflows 
              and drive unprecedented growth for your organization.
            </p>
            
            <Button variant="hero" size="xl" className="group">
              Schedule Your Free Consultation
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            {/* Contact Info */}
            <div className="mt-12 pt-8 border-t border-border/50">
              <div className="flex flex-wrap justify-center gap-8 text-muted-foreground">
                <a href="mailto:contact@alphaspeedai.com" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Mail className="w-5 h-5" />
                  <span>contact@alphaspeedai.com</span>
                </a>
                <a href="tel:+1234567890" className="flex items-center gap-2 hover:text-primary transition-colors">
                  <Phone className="w-5 h-5" />
                  <span>+1 (234) 567-890</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
