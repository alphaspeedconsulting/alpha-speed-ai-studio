import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const baseUrl = import.meta.env.BASE_URL;

  const navLinks = [
    { label: "Services", href: `${baseUrl}#services` },
    { label: "How It Works", href: `${baseUrl}#how-we-work` },
    { label: "Portfolio", href: `${baseUrl}#portfolio` },
    { label: "Agents", href: `${baseUrl}#agents` },
    { label: "Platform", href: `${baseUrl}#platform` },
    { label: "About", href: `${baseUrl}#about` },
    { label: "Contact", href: `${baseUrl}#contact` },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="αlphaspeed AI"
              className="h-16 w-auto invert logo-img"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium text-sm"
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
            <Link to="/assistant">
              <Button variant="heroOutline" size="default">
                Try the Assistant
              </Button>
            </Link>
            <Button variant="hero" size="default" asChild>
              <a href={`${baseUrl}#contact`}>Get Started</a>
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
                <a
                  key={link.label}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200 font-medium py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <Link to="/assistant" onClick={() => setIsMenuOpen(false)}>
                <Button variant="heroOutline" size="default" className="w-full mt-2">
                  Try the Assistant
                </Button>
              </Link>
              <Button variant="hero" size="default" className="w-full" asChild>
                <a href={`${baseUrl}#contact`} onClick={() => setIsMenuOpen(false)}>Get Started</a>
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
