import { Instagram, Linkedin, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">MOFY<span className="text-background/50">.</span></h3>
            <p className="text-background/70 mb-4 max-w-md">
              Membantu UMKM dan perusahaan membangun kehadiran digital yang 
              profesional dengan website modern dan AI Customer Service.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 border-2 border-background/30 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border-2 border-background/30 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 border-2 border-background/30 flex items-center justify-center hover:bg-background hover:text-foreground transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#layanan" className="hover:text-background transition-colors">Website UMKM</a></li>
              <li><a href="#layanan" className="hover:text-background transition-colors">Company Profile</a></li>
              <li><a href="#ai" className="hover:text-background transition-colors">AI Customer Service</a></li>
              <li><a href="#harga" className="hover:text-background transition-colors">Paket Harga</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-background/70">
              <li><a href="#" className="hover:text-background transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-background transition-colors">Portfolio</a></li>
              <li><a href="#faq" className="hover:text-background transition-colors">FAQ</a></li>
              <li><a href="#kontak" className="hover:text-background transition-colors">Kontak</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/50">
            © 2024 Mofy. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/50">
            <a href="#" className="hover:text-background transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-background transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
