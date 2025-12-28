// components/Navbar.tsx

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();

  // Detect if user has scrolled
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Track which section is currently in view
  useEffect(() => {
    const sections = ["layanan", "harga", "ai", "kontak"];
    
    const handleSectionInView = () => {
      // Only check for sections if we're on the home page
      if (location.pathname === "/") {
        const scrollPosition = window.scrollY + 100;
        
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(section);
              return;
            }
          }
        }
        
        // If we're at the top of the page, no section should be active
        if (window.scrollY < 100) {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleSectionInView);
    handleSectionInView(); // Check on initial load
    
    return () => {
      window.removeEventListener("scroll", handleSectionInView);
    };
  }, [location.pathname]);

  const navLinks = [
    { href: "/", label: "Beranda", isRoute: true },
    { href: "/portofolio", label: "Portofolio", isRoute: true },
    { href: "/#layanan", label: "Layanan", isRoute: false, section: "layanan" },
    { href: "/#harga", label: "Harga", isRoute: false, section: "harga" },
    { href: "/#ai", label: "AI Service", isRoute: false, section: "ai" },
    { href: "/#kontak", label: "Kontak", isRoute: false, section: "kontak" },
  ];

  // Check if a link is active
  const isActive = (link: { href: string; isRoute: boolean; section?: string }) => {
    if (link.isRoute) {
      // For route links, check if the pathname matches exactly
      return location.pathname === link.href;
    } else {
      // For anchor links, check if the section is currently in view
      return activeSection === link.section;
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-background transition-all duration-300 ${
      scrolled ? "border-b-2 border-border shadow-sm" : "border-b-2 border-transparent"
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-2xl font-bold tracking-tight flex items-center">
            MOFY<span className="text-muted-foreground">.</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-all relative group ${
                  isActive(link)
                    ? "text-black font-bold"
                    : "text-gray-600 hover:text-black"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-black transition-all ${
                  isActive(link) ? "w-full" : "w-0 group-hover:w-full"
                }`}></span>
              </Link>
            ))}
            <Button className="shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              Konsultasi Gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 border-2 transition-all ${
              scrolled ? "border-border" : "border-border"
            }`}
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden border-t-2 border-border overflow-hidden"
            >
              <div className="py-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={`block py-3 text-sm font-medium px-2 transition-colors ${
                      isActive(link)
                        ? "text-black font-bold bg-secondary"
                        : "text-gray-600 hover:bg-secondary hover:text-black"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button className="w-full mt-4 shadow-sm">Konsultasi Gratis</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;