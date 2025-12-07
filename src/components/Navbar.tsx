import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "#layanan", label: "Layanan" },
    { href: "#harga", label: "Harga" },
    { href: "#ai", label: "AI Service" },
    { href: "#faq", label: "FAQ" },
    { href: "#kontak", label: "Kontak" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="text-2xl font-bold tracking-tight">
            MOFY<span className="text-muted-foreground">.</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium hover:underline underline-offset-4 transition-all"
              >
                {link.label}
              </a>
            ))}
            <Button className="shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
              Konsultasi Gratis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 border-2 border-border"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden border-t-2 border-border py-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 text-sm font-medium hover:bg-secondary px-2 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <Button className="w-full mt-4 shadow-sm">Konsultasi Gratis</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
