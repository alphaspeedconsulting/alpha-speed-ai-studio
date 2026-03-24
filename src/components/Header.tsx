import { MouseEvent, useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import bannerLogo from "@/assets/bannerlogo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { trackEvent } from "@/lib/analytics";
import CalendlyBooking from "@/components/CalendlyBooking";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Lock body scroll only while the mobile menu is open on mobile widths.
  useEffect(() => {
    const isMobileViewport = window.matchMedia("(max-width: 1023px)").matches;
    if (isMenuOpen && isMobileViewport) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isMenuOpen]);

  // Ensure menu state resets when crossing into desktop layout.
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopSwitch = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleDesktopSwitch);
    return () => {
      mediaQuery.removeEventListener("change", handleDesktopSwitch);
    };
  }, []);

  const navLinks = [
    { label: "Services", hash: "services" },
    { label: "How It Works", hash: "how-we-work" },
    { label: "Portfolio", hash: "portfolio" },
    { label: "Demos", hash: "demos" },
    { label: "Reels", href: "/reels" },
    { label: "Agents", href: "/agents" },
    { label: "Platform", hash: "platform" },
    { label: "About", hash: "about" },
    { label: "Contact", hash: "contact" },
  ];

  const handleHashNavigation = (hash: string) => {
    if (pathname === "/") {
      const element = document.getElementById(hash);
      if (element) {
        const headerOffset = 96; // Fixed header + breathing room
        const y = element.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
        window.history.replaceState(null, "", `#${hash}`);
        return;
      }
    }

    navigate(`/#${hash}`);
  };

  const handleLogoClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);

    if (pathname === "/") {
      // On home, force top scroll even when already on the same route/hash.
      event.preventDefault();
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    navigate("/");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo + Nav (grouped left) */}
          <div className="flex items-center gap-8 lg:gap-10">
            <Link to="/" onClick={handleLogoClick} className="flex items-center shrink-0">
              <img
                src={bannerLogo}
                alt="ALPHA SPEED AI"
                className="h-16 w-auto logo-header-img object-contain opacity-90"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              link.href ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm"
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => link.hash && handleHashNavigation(link.hash)}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm cursor-pointer"
                >
                  {link.label}
                </button>
              )
            ))}
            </nav>
          </div>

          {/* Right: Theme toggle + CTA buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <ThemeToggle />
            <Link to="/assistant">
              <Button
                variant="heroOutline"
                size="default"
                onClick={() => trackEvent("cta_click", "header_assistant_click", { placement: "header" })}
              >
                Try the Assistant
              </Button>
            </Link>
            <CalendlyBooking
              label="Get Started"
              placement="header"
              variant="hero"
              size="default"
              showArrow={false}
              showIcon={false}
            />
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-nav"
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[calc(100vh-5rem)] opacity-100 pb-6 overflow-y-auto" : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              link.href ? (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-3 min-h-[44px] flex items-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <button
                  key={link.label}
                  onClick={() => {
                    link.hash && handleHashNavigation(link.hash);
                    setIsMenuOpen(false);
                  }}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-3 min-h-[44px] text-left cursor-pointer flex items-center"
                >
                  {link.label}
                </button>
              )
            ))}
            <Link to="/assistant" onClick={() => setIsMenuOpen(false)} className="mt-2">
              <Button
                variant="heroOutline"
                size="default"
                className="w-full"
                onClick={() => trackEvent("cta_click", "mobile_header_assistant_click", { placement: "mobile_header" })}
              >
                Try the Assistant
              </Button>
            </Link>
            <CalendlyBooking
              label="Get Started"
              placement="mobile_header"
              variant="hero"
              size="default"
              className="w-full"
              showArrow={false}
              showIcon={false}
            />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
