import { Link } from "react-router-dom";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  const baseUrl = import.meta.env.BASE_URL;

  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src={logo}
              alt="αlphaspeed AI"
              className="h-14 w-auto invert opacity-80 logo-img"
            />
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-muted-foreground">
            <a href={`${baseUrl}#services`} className="hover:text-foreground transition-colors">Services</a>
            <a href={`${baseUrl}#how-we-work`} className="hover:text-foreground transition-colors">How It Works</a>
            <a href={`${baseUrl}#portfolio`} className="hover:text-foreground transition-colors">Portfolio</a>
            <a href="/agentvault" className="hover:text-foreground transition-colors">AgentVault</a>
            <a href={`${baseUrl}#about`} className="hover:text-foreground transition-colors">About</a>
            <a href={`${baseUrl}#contact`} className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 αlphaspeed AI. All rights reserved.
          </p>
        </div>

        {/* Legal links */}
        <div className="mt-6 pt-4 border-t border-border flex justify-center gap-6">
          <Link to="/terms-of-service" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy-policy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
