import { MouseEvent, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import bannerLogo from "@/assets/bannerlogo.png";
import ThemeToggle from "@/components/ThemeToggle";
import { trackEvent, trackLead } from "@/lib/analytics";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navLinks = [
    { label: "Services", hash: "services" },
    { label: "How It Works", hash: "how-we-work" },
    { label: "Portfolio", hash: "portfolio" },
    { label: "Demos", hash: "demos" },
    { label: "Agents", href: "/agents" },
    { label: "Traffic", href: "/traffic" },
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
            <Button variant="hero" size="default" asChild>
              <button
                onClick={() => {
                  trackLead("header_get_started_click", { placement: "header" });
                  handleHashNavigation("contact");
                }}
              >
                Get Started
              </button>
            </Button>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              className="text-foreground p-3"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden pb-6">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.href ? (
                  <Link
                    key={link.label}
                    to={link.href}
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2"
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
                    className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                )
              ))}
              <Link to="/assistant" onClick={() => setIsMenuOpen(false)}>
                <Button
                  variant="heroOutline"
                  size="default"
                  className="w-full mt-2"
                  onClick={() => trackEvent("cta_click", "mobile_header_assistant_click", { placement: "mobile_header" })}
                >
                  Try the Assistant
                </Button>
              </Link>
              <Button variant="hero" size="default" className="w-full" asChild>
                <button onClick={() => {
                  trackLead("mobile_header_get_started_click", { placement: "mobile_header" });
                  handleHashNavigation("contact");
                  setIsMenuOpen(false);
                }}>Get Started</button>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
