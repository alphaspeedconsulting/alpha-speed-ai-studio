import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import CalendlyBooking from "@/components/CalendlyBooking";

const StickyCtaBanner = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);
  const contactRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (dismissed) return;

    // Check sessionStorage for prior dismissal
    if (sessionStorage.getItem("alpha_sticky_cta_dismissed") === "1") {
      setDismissed(true);
      return;
    }

    const checkVisibility = () => {
      if (!heroRef.current) {
        // Find hero by looking for the first <section> in main
        const main = document.querySelector("main");
        if (main) heroRef.current = main.querySelector("section");
      }
      if (!contactRef.current) {
        contactRef.current = document.getElementById("contact");
      }

      const heroRect = heroRef.current?.getBoundingClientRect();
      const contactRect = contactRef.current?.getBoundingClientRect();

      // Show after scrolling past hero
      const pastHero = heroRect ? heroRect.bottom < 0 : false;
      // Hide when contact section is in viewport
      const contactVisible = contactRect
        ? contactRect.top < window.innerHeight && contactRect.bottom > 0
        : false;

      setVisible(pastHero && !contactVisible);
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility();

    return () => window.removeEventListener("scroll", checkVisibility);
  }, [dismissed]);

  const handleDismiss = () => {
    setDismissed(true);
    setVisible(false);
    sessionStorage.setItem("alpha_sticky_cta_dismissed", "1");
    trackEvent("cta_click", "sticky_banner_dismissed", { placement: "sticky_banner" });
  };

  if (dismissed || !visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-3 md:p-4 pointer-events-none">
      <div className="container mx-auto max-w-3xl pointer-events-auto">
        <div className="bg-card/95 backdrop-blur-md border border-border rounded-xl shadow-lg px-4 py-3 flex items-center justify-between gap-3">
          <p className="text-sm font-medium hidden sm:block">
            Ready to automate?
          </p>
          <div className="flex items-center gap-3 flex-1 sm:flex-none">
            <CalendlyBooking
              label="Book Free Consultation"
              placement="sticky_banner"
              variant="hero"
              size="default"
              showArrow={false}
              showIcon={false}
              className="flex-1 sm:flex-none"
            />
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors shrink-0"
              aria-label="Dismiss banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCtaBanner;
