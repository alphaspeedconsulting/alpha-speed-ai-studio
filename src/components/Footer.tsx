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
              alt="Alpha Speed AI"
              className="h-14 w-auto invert opacity-80"
            />
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href={`${baseUrl}#platform`} className="hover:text-foreground transition-colors">Platform</a>
            <a href={`${baseUrl}#use-cases`} className="hover:text-foreground transition-colors">Use Cases</a>
            <a href={`${baseUrl}#services`} className="hover:text-foreground transition-colors">Services</a>
            <a href={`${baseUrl}#about`} className="hover:text-foreground transition-colors">About</a>
            <a href={`${baseUrl}#contact`} className="hover:text-foreground transition-colors">Contact</a>
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 Alpha Speed AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
