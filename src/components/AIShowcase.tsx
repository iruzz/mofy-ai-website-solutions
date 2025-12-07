import { Bot, MessageSquare, Zap, Globe, Clock, Users } from "lucide-react";

const features = [
  {
    icon: Clock,
    title: "24/7 Availability",
    description: "Chatbot AI siap melayani customer kapan saja, bahkan saat Anda tidur.",
  },
  {
    icon: MessageSquare,
    title: "Multi-Platform",
    description: "Terintegrasi dengan Website, WhatsApp, dan Telegram dalam satu dashboard.",
  },
  {
    icon: Globe,
    title: "NLP Indonesia",
    description: "Memahami bahasa Indonesia dengan natural, termasuk bahasa informal.",
  },
  {
    icon: Users,
    title: "Handle Multiple Chat",
    description: "Bisa menangani ratusan percakapan bersamaan tanpa delay.",
  },
  {
    icon: Zap,
    title: "Smart Routing",
    description: "Otomatis redirect ke human agent untuk kasus kompleks.",
  },
  {
    icon: Bot,
    title: "Custom Training",
    description: "AI ditraining khusus dengan data produk dan kebijakan bisnis Anda.",
  },
];

const AIShowcase = () => {
  return (
    <section id="ai" className="py-20 bg-foreground text-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block border-2 border-background/30 px-4 py-1 text-sm font-medium mb-4">
              AI CUSTOMER SERVICE
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Layani Customer Anda dengan AI yang Cerdas
            </h2>
            <p className="text-background/70 mb-8 text-lg">
              AI Customer Service kami menggunakan Natural Language Processing 
              terkini untuk memahami dan merespons pertanyaan customer dengan 
              natural. Tidak ada lagi customer yang menunggu lama untuk dilayani.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="border-2 border-background/20 p-4 hover:border-background/50 transition-colors"
                >
                  <feature.icon className="w-6 h-6 mb-2" />
                  <h3 className="font-semibold mb-1">{feature.title}</h3>
                  <p className="text-sm text-background/60">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="border-2 border-background/30 bg-background/5 p-6">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-background/20">
                <div className="w-10 h-10 bg-background text-foreground flex items-center justify-center">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold">Mofy AI Assistant</p>
                  <p className="text-xs text-background/60">Online • Siap membantu</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-end">
                  <div className="bg-background text-foreground px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Halo, saya mau tanya tentang paket website untuk toko online</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="border-2 border-background/30 px-4 py-2 max-w-[80%]">
                    <p className="text-sm">
                      Halo! 👋 Terima kasih sudah menghubungi Mofy. Untuk toko online, 
                      kami merekomendasikan Paket Starter UMKM (Rp 2.5 juta) yang sudah 
                      include katalog produk dan integrasi WhatsApp. Mau saya jelaskan 
                      lebih detail?
                    </p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-background text-foreground px-4 py-2 max-w-[80%]">
                    <p className="text-sm">Bisa terima pembayaran online juga?</p>
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="border-2 border-background/30 px-4 py-2 max-w-[80%]">
                    <p className="text-sm">
                      Tentu bisa! Untuk fitur payment gateway seperti Midtrans atau 
                      Xendit, ada add-on Rp 1.5 juta. Atau bisa langsung pilih Paket 
                      Premium yang sudah include semua fitur e-commerce. Mau konsultasi 
                      lebih lanjut dengan tim kami?
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <div className="flex-1 border-2 border-background/30 px-4 py-2 text-background/40 text-sm">
                  Ketik pesan...
                </div>
                <button className="bg-background text-foreground px-4 py-2 font-medium">
                  Kirim
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIShowcase;
