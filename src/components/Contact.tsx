import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Pesan Terkirim!",
      description: "Tim kami akan menghubungi Anda dalam 1x24 jam.",
    });
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <section id="kontak" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <span className="inline-block border-2 border-border px-4 py-1 text-sm font-medium mb-4">
              KONTAK KAMI
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-muted-foreground mb-8">
              Konsultasikan kebutuhan website Anda dengan tim kami. 
              Gratis konsultasi dan proposal penawaran.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-border flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">WhatsApp</h3>
                  <p className="text-muted-foreground">+62 812-3456-7890</p>
                  <p className="text-sm text-muted-foreground">Response time: &lt; 5 menit</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-border flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-muted-foreground">hello@mofy.id</p>
                  <p className="text-sm text-muted-foreground">Untuk proposal dan dokumen</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 border-2 border-border flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Lokasi</h3>
                  <p className="text-muted-foreground">Jakarta, Indonesia</p>
                  <p className="text-sm text-muted-foreground">Melayani seluruh Indonesia</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-2 border-border p-6 md:p-8 shadow-sm">
            <h3 className="text-xl font-bold mb-6">Kirim Pesan</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Input
                  placeholder="Nama Lengkap"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="border-2"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="border-2"
                />
              </div>
              <div>
                <Input
                  type="tel"
                  placeholder="Nomor WhatsApp"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  className="border-2"
                />
              </div>
              <div>
                <Textarea
                  placeholder="Ceritakan kebutuhan website Anda..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="border-2"
                />
              </div>
              <Button type="submit" className="w-full shadow-sm hover:shadow-md hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                Kirim Pesan
                <Send className="ml-2 w-4 h-4" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
