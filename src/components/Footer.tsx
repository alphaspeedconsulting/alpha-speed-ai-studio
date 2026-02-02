import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Alpha Speed AI" 
              className="h-14 w-auto invert opacity-80"
            />
          </a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</a>
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
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
