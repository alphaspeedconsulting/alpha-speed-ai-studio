import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface SectionCTAProps {
  text: string;
  to: string;
  trackingName: string;
}

const SectionCTA = ({ text, to, trackingName }: SectionCTAProps) => {
  return (
    <div className="py-4 text-center">
      <Link
        to={to}
        className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        onClick={() => trackEvent("cta_click", trackingName, { placement: "section_interstitial" })}
      >
        {text}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};

export default SectionCTA;
