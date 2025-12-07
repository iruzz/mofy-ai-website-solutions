import { Globe, Building2, Bot, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const services = [
  {
    icon: Globe,
    title: "Website UMKM",
    description:
      "Website modern dan responsif untuk usaha kecil menengah. Desain menarik, SEO optimized, terintegrasi WhatsApp.",
    features: ["Desain Responsif", "Dashboard Admin", "Katalog Produk", "WhatsApp Integration"],
  },
  {
    icon: Building2,
    title: "Company Profile",
    description:
      "Website profesional untuk profil perusahaan dengan desain custom sesuai branding. Multi-language ready.",
    features: ["Custom Design", "Blog System", "Portfolio Showcase", "SEO Advanced"],
  },
  {
    icon: Bot,
    title: "AI Customer Service",
    description:
      "Chatbot AI yang dapat menjawab pertanyaan customer 24/7. Terintegrasi dengan website, WhatsApp, dan Telegram.",
    features: ["24/7 Availability", "Multi-Platform", "NLP Indonesia", "Lead Capture"],
  },
];

const Services = () => {
  return (
    <section id="layanan" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block border-2 border-border px-4 py-1 text-sm font-medium mb-4">
            LAYANAN KAMI
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Solusi Digital Lengkap
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dari website sederhana hingga sistem AI canggih, kami menyediakan 
            solusi yang tepat untuk kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card
              key={index}
              className="border-2 border-border bg-background shadow-sm hover:shadow-md hover:translate-x-[-4px] hover:translate-y-[-4px] transition-all group"
            >
              <CardHeader>
                <div className="w-14 h-14 border-2 border-border flex items-center justify-center mb-4 group-hover:bg-foreground group-hover:text-background transition-colors">
                  <service.icon className="w-7 h-7" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="w-4 h-4" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
