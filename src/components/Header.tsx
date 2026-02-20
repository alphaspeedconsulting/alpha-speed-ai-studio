import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logoAlphaspeedAI from "@/assets/logo-alphaspeed-ai.png";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const baseUrl = import.meta.env.BASE_URL;

  const navLinks = [
    { label: "Services", hash: "services" },
    { label: "How It Works", hash: "how-we-work" },
    { label: "Portfolio", hash: "portfolio" },
    { label: "Agents", href: "/agents" },
    { label: "Platform", hash: "platform" },
    { label: "About", hash: "about" },
    { label: "Contact", hash: "contact" },
  ];

  const handleHashNavigation = (hash: string) => {
    navigate(`/#${hash}`);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logoAlphaspeedAI}
              alt="ALPHA SPEED AI"
              className="h-16 w-auto logo-header-img"
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
            <ThemeToggle />
            <Link to="/assistant">
              <Button variant="heroOutline" size="default">
                Try the Assistant
              </Button>
            </Link>
            <Button variant="hero" size="default" asChild>
              <button onClick={() => handleHashNavigation("contact")}>Get Started</button>
            </Button>
          </nav>

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
                <Button variant="heroOutline" size="default" className="w-full mt-2">
                  Try the Assistant
                </Button>
              </Link>
              <Button variant="hero" size="default" className="w-full" asChild>
                <button onClick={() => {
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
