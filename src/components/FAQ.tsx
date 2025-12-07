import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Berapa lama proses pembuatan website?",
    answer:
      "Untuk paket Starter: 7-10 hari kerja. Paket Professional: 10-14 hari kerja. Paket Premium + AI: 14-21 hari kerja. Timeline ini dimulai setelah semua materi konten diterima.",
  },
  {
    question: "Apakah bisa request fitur tambahan di luar paket?",
    answer:
      "Tentu! Kami menyediakan berbagai add-on seperti payment gateway integration (Rp 1.5 juta), SEO article writing, dan fitur custom lainnya. Konsultasikan kebutuhan Anda dengan tim kami.",
  },
  {
    question: "Apakah website bisa diupdate sendiri setelah jadi?",
    answer:
      "Ya! Semua paket sudah include dashboard admin yang user-friendly. Kami juga provide training penggunaan dan video tutorial untuk paket Professional ke atas.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer:
      "DP 50% di awal saat deal, pelunasan 50% sebelum website launch. Kami menerima transfer bank (BCA, Mandiri, BNI), e-wallet, dan kartu kredit/debit.",
  },
  {
    question: "Apakah ada garansi setelah website launch?",
    answer:
      "Ya, garansi bug fixing tersedia: Starter (30 hari), Professional (60 hari), Premium (90 hari). Support teknis via WhatsApp dan email selalu siap membantu.",
  },
  {
    question: "AI Customer Service-nya bisa bahasa Indonesia?",
    answer:
      "Sangat bisa! AI kami mendukung Bahasa Indonesia dan Inggris dengan kemampuan NLP yang memahami bahasa informal dan konteks lokal. AI juga bisa ditraining sesuai gaya bahasa brand Anda.",
  },
  {
    question: "Apakah bisa integrasi dengan sistem yang sudah ada?",
    answer:
      "Bisa, tergantung kompleksitasnya. Kami bisa integrasi dengan berbagai platform seperti WhatsApp Business API, payment gateway, CRM, dan sistem lainnya. Konsultasikan kebutuhan spesifik Anda.",
  },
  {
    question: "Bagaimana jika saya tidak puas dengan hasilnya?",
    answer:
      "Setiap paket include revisi (1-3x tergantung paket). Kami bekerja berdasarkan mockup yang di-approve terlebih dahulu, sehingga hasil akhir sesuai ekspektasi.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block border-2 border-border px-4 py-1 text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum tentang layanan kami.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-2 border-border bg-background px-6"
              >
                <AccordionTrigger className="text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
