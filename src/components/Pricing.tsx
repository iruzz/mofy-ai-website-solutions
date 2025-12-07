import { Check, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const packages = [
  {
    name: "Starter UMKM",
    price: "2.500.000",
    description: "Cocok untuk usaha baru, toko online pemula, jasa lokal",
    duration: "7-10 hari kerja",
    popular: false,
    features: [
      "5 Halaman Website",
      "Desain Template Premium",
      "Responsif di Semua Device",
      "Domain .com Gratis 1 Tahun",
      "Hosting 1 Tahun (5 GB)",
      "SSL Certificate (HTTPS)",
      "Email Profesional 1 Akun",
      "WhatsApp Button",
      "1x Revisi Desain",
      "Garansi Bug 30 Hari",
    ],
  },
  {
    name: "Professional",
    price: "5.000.000",
    description: "Cocok untuk perusahaan established, agency, klinik",
    duration: "10-14 hari kerja",
    popular: true,
    features: [
      "8-10 Halaman Custom",
      "Desain Semi-Custom",
      "CMS untuk Update Sendiri",
      "Blog System",
      "Domain Premium Gratis 1 Tahun",
      "Cloud Hosting (15 GB SSD)",
      "Email Profesional 5 Akun",
      "SEO Advanced",
      "Multi-language Ready",
      "2x Revisi Desain",
      "Garansi Bug 60 Hari",
      "Bonus: Logo Refresh & Social Media Kit",
    ],
  },
  {
    name: "Premium + AI",
    price: "8.500.000",
    description: "Cocok untuk E-commerce, startup, traffic tinggi",
    duration: "14-21 hari kerja",
    popular: false,
    features: [
      "Semua Fitur Professional",
      "AI Chatbot 24/7",
      "Integrasi WhatsApp Business API",
      "Integrasi Telegram Bot",
      "NLP Bahasa Indonesia & Inggris",
      "AI Training Sesuai Bisnis",
      "Lead Capture & CRM",
      "VPS Hosting (30 GB SSD)",
      "Email Unlimited",
      "Maintenance Gratis 3 Bulan",
      "Priority Support 24/7",
      "Bonus: Full Branding Package",
    ],
  },
];

const Pricing = () => {
  return (
    <section id="harga" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block border-2 border-border px-4 py-1 text-sm font-medium mb-4">
            PAKET HARGA
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Pilih Paket Sesuai Kebutuhan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Harga transparan tanpa biaya tersembunyi. Semua paket include domain, 
            hosting, dan support teknis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`border-2 relative ${
                pkg.popular
                  ? "border-foreground shadow-md scale-105"
                  : "border-border shadow-sm hover:shadow-md"
              } bg-background hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 text-sm font-medium flex items-center gap-1">
                  <Star className="w-4 h-4 fill-current" />
                  POPULER
                </div>
              )}
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">{pkg.name}</CardTitle>
                <CardDescription>{pkg.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">Rp</span>
                  <span className="text-4xl font-bold">{pkg.price}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {pkg.duration}
                </p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    pkg.popular
                      ? "shadow-sm hover:shadow-md"
                      : "variant-outline border-2"
                  } hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all`}
                  variant={pkg.popular ? "default" : "outline"}
                >
                  Pilih Paket
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          * Pembayaran DP 50% di awal, pelunasan 50% sebelum launch
        </p>
      </div>
    </section>
  );
};

export default Pricing;
