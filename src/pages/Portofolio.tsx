import { useState } from 'react';
import { ExternalLink, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from "@/components/Navbar";

const portfolioByPackage = [
  {
    packageName: "Starter UMKM",
    packagePrice: "2.500.000",
    packageDesc: "Cocok untuk usaha baru, toko online pemula, jasa lokal",
    projects: [
      {
        id: 1,
        title: "Toko Kue Online - Sweetie Bakery",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
        description: "Website toko kue dengan katalog produk, WhatsApp order button, dan lokasi maps",
        features: ["5 Halaman Website", "WhatsApp Button", "Google Maps", "Mobile Responsive"],
        link: "#"
      },
      {
        id: 2,
        title: "Jasa Laundry - Clean Express",
        image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80",
        description: "Landing page jasa laundry dengan price list, layanan, dan contact form sederhana",
        features: ["Landing Page", "Price List", "Contact Form", "Instagram Feed"],
        link: "#"
      },
      {
        id: 3,
        title: "Warung Makan - Dapur Ibu",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        description: "Website warung makan dengan menu digital, foto makanan, dan tombol order WhatsApp",
        features: ["Menu Digital", "Gallery Makanan", "Order Button", "Jam Buka Otomatis"],
        link: "#"
      }
    ]
  },
  {
    packageName: "Professional",
    packagePrice: "5.000.000",
    packageDesc: "Cocok untuk perusahaan established, agency, klinik",
    popular: true,
    projects: [
      {
        id: 4,
        title: "Klinik Kecantikan - Glow Beauty",
        image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
        description: "Website klinik dengan sistem booking appointment, blog treatment tips, dan sebelum-sesudah gallery",
        features: ["Booking System", "Blog CMS", "Before/After Gallery", "Multi-language", "SEO Advanced"],
        link: "#"
      },
      {
        id: 5,
        title: "Digital Agency - Creative Hub",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        description: "Company profile agency dengan portfolio showcase, team profiles, dan client testimonials",
        features: ["Portfolio System", "Team Profiles", "Testimonials", "Blog System", "Email Marketing"],
        link: "#"
      },
      {
        id: 6,
        title: "Sekolah Online - Smart Academy",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        description: "Website pendidikan dengan course catalog, registration system, dan student portal",
        features: ["Course Management", "Student Portal", "Payment Gateway", "Certificate Generator"],
        link: "#"
      }
    ]
  },
  {
    packageName: "Premium + AI",
    packagePrice: "8.500.000",
    packageDesc: "Cocok untuk E-commerce, startup, traffic tinggi",
    projects: [
      {
        id: 7,
        title: "E-Commerce Fashion - StyleHub",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        description: "Full e-commerce dengan AI chatbot customer service 24/7, payment gateway, dan inventory management",
        features: ["AI Chatbot 24/7", "Payment Gateway", "Inventory System", "WhatsApp API", "Live Chat"],
        link: "#"
      },
      {
        id: 8,
        title: "Property Portal - RumahKita",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        description: "Platform properti dengan AI assistant untuk info listing, virtual tour 360°, dan mortgage calculator",
        features: ["AI Property Assistant", "360° Virtual Tour", "Advanced Search", "Telegram Bot", "Lead CRM"],
        link: "#"
      },
      {
        id: 9,
        title: "Travel Booking - ExploreID",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
        description: "Platform booking travel dengan AI recommendation, auto-confirmation WhatsApp, dan payment automation",
        features: ["AI Travel Advisor", "Auto WhatsApp", "Payment Automation", "Multi-currency", "Review System"],
        link: "#"
      }
    ]
  }
];

export default function Portfolio() {
  const [selectedPackage, setSelectedPackage] = useState("Semua");

  const filteredPackages = selectedPackage === "Semua" 
    ? portfolioByPackage 
    : portfolioByPackage.filter(pkg => pkg.packageName === selectedPackage);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
     <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-block border border-black px-4 py-2 text-sm font-medium mb-6">
            PAKET PORTFOLIO
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-black">
            Hasil Karya dari Setiap Paket
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Harga transparan tanpa biaya tersembunyi. Semua paket include domain, hosting, dan support teknis.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          <button
            onClick={() => setSelectedPackage("Semua")}
            className={`px-6 py-3 text-sm font-medium transition-all ${
              selectedPackage === "Semua"
                ? 'bg-black text-white'
                : 'bg-white text-black border border-gray-300 hover:border-black'
            }`}
          >
            Lihat Semua
          </button>
          {portfolioByPackage.map((pkg) => (
            <button
              key={pkg.packageName}
              onClick={() => setSelectedPackage(pkg.packageName)}
              className={`px-6 py-3 text-sm font-medium transition-all ${
                selectedPackage === pkg.packageName
                  ? 'bg-black text-white'
                  : 'bg-white text-black border border-gray-300 hover:border-black'
              }`}
            >
              {pkg.packageName}
            </button>
          ))}
        </div>

        {/* Portfolio Sections */}
        {filteredPackages.map((pkg, pkgIndex) => (
          <div key={pkgIndex} className="mb-24">
            {/* Package Header */}
            <div className="text-center mb-12">
              <div className="flex justify-center items-center gap-3 mb-3">
                <h2 className="text-3xl md:text-4xl font-bold text-black">
                  {pkg.packageName}
                </h2>
                {pkg.popular && (
                  <span className="bg-black text-white px-3 py-1 text-xs font-medium">
                    ★ POPULER
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{pkg.packageDesc}</p>
              <div className="text-sm text-gray-500">
                Rp <span className="text-3xl font-bold text-black">{pkg.packagePrice}</span>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {pkg.projects.map((project) => (
                <Card
                  key={project.id}
                  className="border border-gray-200 rounded-none shadow-none hover:shadow-lg transition-shadow bg-white overflow-hidden group"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3 text-black">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                      {project.description}
                    </p>
                    
                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {project.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <Button
                      variant="outline"
                      className="w-full border border-black text-black hover:bg-black hover:text-white rounded-none transition-colors"
                      asChild
                    >
                      <a href={project.link} className="flex items-center justify-center gap-2">
                        Lihat Demo <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}

        {/* CTA Section */}
        <div className="mt-24 text-center border border-gray-200 p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Mau Website Seperti Ini?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Pilih paket yang sesuai kebutuhan bisnis Anda. Konsultasi gratis untuk diskusikan fitur yang Anda inginkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-black text-white hover:bg-gray-800 rounded-none px-8"
            >
              Konsultasi Gratis
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border border-black text-black hover:bg-black hover:text-white rounded-none px-8"
            >
              Lihat Semua Paket
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-gray-600 text-sm">
            © 2024 MOFY. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}