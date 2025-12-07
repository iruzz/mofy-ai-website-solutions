import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-foreground/80" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          <div className="inline-flex items-center gap-2 border-2 border-primary-foreground/30 bg-primary-foreground/10 px-4 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">
              AI-Powered Website Solutions
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Website Profesional dengan{" "}
            <span className="relative inline-block">
              AI Customer Service
              <span className="absolute bottom-2 left-0 w-full h-3 bg-chart-1/50 -z-10" />
            </span>
          </h1>

          <p className="text-lg md:text-xl text-primary-foreground/80 mb-8 max-w-2xl">
            Mofy membantu UMKM & perusahaan membangun website modern yang terintegrasi 
            dengan chatbot AI untuk layanan pelanggan 24/7. Tingkatkan konversi Anda sekarang.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 shadow-md hover:shadow-lg hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all text-base"
            >
              Lihat Paket Harga
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground bg-transparent hover:bg-primary-foreground/10 shadow-md hover:shadow-lg transition-all text-base"
            >
              Konsultasi Gratis
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-8 max-w-lg">
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">100+</p>
              <p className="text-sm text-primary-foreground/70">Klien Puas</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">24/7</p>
              <p className="text-sm text-primary-foreground/70">AI Support</p>
            </div>
            <div>
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">7 Hari</p>
              <p className="text-sm text-primary-foreground/70">Pengerjaan</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
