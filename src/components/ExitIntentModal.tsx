import { useState, useEffect, useCallback, useRef } from "react";
import { X } from "lucide-react";
import { trackEvent } from "@/lib/analytics";
import EmailCapture from "@/components/EmailCapture";

const STORAGE_KEY = "alpha_exit_intent_dismissed_v1";
const MIN_TIME_MS = 15_000; // Don't fire within first 15 seconds

const ExitIntentModal = () => {
  const [visible, setVisible] = useState(false);
  const mountTime = useRef(Date.now());

  const shouldSuppress = useCallback(() => {
    // Already dismissed this session
    if (sessionStorage.getItem(STORAGE_KEY) === "1") return true;
    // User already converted (email or Calendly)
    if (localStorage.getItem("alpha_email_submitted") === "1") return true;
    // Too early in the visit
    if (Date.now() - mountTime.current < MIN_TIME_MS) return true;
    return false;
  }, []);

  useEffect(() => {
    // Desktop only — exit intent via mouseleave
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    if (isMobile) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when cursor exits toward top of viewport (browser chrome)
      if (e.clientY > 10) return;
      if (shouldSuppress()) return;

      setVisible(true);
      trackEvent("lead_event", "exit_intent_shown", { placement: "exit_intent" });
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [shouldSuppress]);

  // Close on Escape
  useEffect(() => {
    if (!visible) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleDismiss();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    sessionStorage.setItem(STORAGE_KEY, "1");
    trackEvent("lead_event", "exit_intent_dismissed", { placement: "exit_intent" });
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Before you go"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleDismiss}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold mb-2">
            Before you go...
          </h2>
          <p className="text-muted-foreground">
            Get a free AI automation assessment for your business — weekly tips on how DFW companies are saving 20+ hours per week.
          </p>
        </div>

        <EmailCapture compact />
      </div>
    </div>
  );
};

export default ExitIntentModal;
