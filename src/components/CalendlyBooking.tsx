import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { trackConversion } from "@/lib/analytics";
import { Calendar, ArrowRight, Mail } from "lucide-react";

const CALENDLY_URL = import.meta.env.VITE_CALENDLY_URL || "";
const FALLBACK_EMAIL = "alpha.speed.consulting@gmail.com";

interface CalendlyBookingProps {
  /** Button label */
  label?: string;
  /** Analytics placement identifier */
  placement: string;
  /** shadcn Button variant */
  variant?: "hero" | "heroOutline" | "default";
  /** shadcn Button size */
  size?: "default" | "xl" | "sm" | "lg";
  /** Extra class names for the button */
  className?: string;
  /** Show arrow icon */
  showArrow?: boolean;
  /** Show calendar icon */
  showIcon?: boolean;
}

const CalendlyBooking = ({
  label = "Book a Free Strategy Call",
  placement,
  variant = "hero",
  size = "xl",
  className = "",
  showArrow = true,
  showIcon = true,
}: CalendlyBookingProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [PopupModal, setPopupModal] = useState<React.ComponentType<{
    url: string;
    onModalClose: () => void;
    open: boolean;
    rootElement: HTMLElement;
    onEventScheduled?: () => void;
  }> | null>(null);

  const handleOpen = useCallback(() => {
    trackConversion("generate_lead", "booking_cta_clicked", { placement });

    if (!CALENDLY_URL) {
      // Fallback to mailto when Calendly is not configured
      window.location.href = `mailto:${FALLBACK_EMAIL}?subject=Free%20Strategy%20Call%20Request`;
      return;
    }

    // Lazy-load react-calendly only when needed
    if (!PopupModal) {
      import("react-calendly").then((mod) => {
        setPopupModal(() => mod.PopupModal);
        setIsOpen(true);
      });
    } else {
      setIsOpen(true);
    }
  }, [placement, PopupModal]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleEventScheduled = useCallback(() => {
    trackConversion("schedule_appointment", "calendly_booking_confirmed", {
      placement,
    });
    setIsOpen(false);
  }, [placement]);

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={`group ${className}`}
        onClick={handleOpen}
      >
        {showIcon && (CALENDLY_URL ? (
          <Calendar className="w-5 h-5" />
        ) : (
          <Mail className="w-5 h-5" />
        ))}
        {label}
        {showArrow && (
          <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        )}
      </Button>

      {PopupModal && CALENDLY_URL && (
        <PopupModal
          url={CALENDLY_URL}
          onModalClose={handleClose}
          open={isOpen}
          rootElement={document.getElementById("root")!}
          onEventScheduled={handleEventScheduled}
        />
      )}
    </>
  );
};

export default CalendlyBooking;
