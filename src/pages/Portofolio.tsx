// src/pages/Portfolio.tsx

import { useState, useEffect } from 'react';
import { ExternalLink, Check, Star, Clock, Award, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from 'framer-motion';

const portfolioByPackage = [
  {
    packageName: "Starter UMKM",
    packagePrice: "2.500.000",
    packageDesc: "Cocok untuk usaha baru, toko online pemula, jasa lokal",
    icon: <Zap className="w-5 h-5" />,
    projects: [
      {
        id: 1,
        title: "Toko Kue Online - Sweetie Bakery",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&q=80",
        description: "Website toko kue dengan katalog produk, WhatsApp order button, dan lokasi maps",
        features: ["5 Halaman Website", "WhatsApp Button", "Google Maps", "Mobile Responsive"],
        link: "#",
        tech: ["React", "Tailwind CSS", "Node.js"],
        completionTime: "2 minggu"
      },
      {
        id: 2,
        title: "Jasa Laundry - Clean Express",
        image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&q=80",
        description: "Landing page jasa laundry dengan price list, layanan, dan contact form sederhana",
        features: ["Landing Page", "Price List", "Contact Form", "Instagram Feed"],
        link: "#",
        tech: ["HTML", "CSS", "JavaScript"],
        completionTime: "1 minggu"
      },
      {
        id: 3,
        title: "Warung Makan - Dapur Ibu",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80",
        description: "Website warung makan dengan menu digital, foto makanan, dan tombol order WhatsApp",
        features: ["Menu Digital", "Gallery Makanan", "Order Button", "Jam Buka Otomatis"],
        link: "#",
        tech: ["Next.js", "Prisma", "PostgreSQL"],
        completionTime: "2 minggu"
      }
    ]
  },
  {
    packageName: "Professional",
    packagePrice: "5.000.000",
    packageDesc: "Cocok untuk perusahaan established, agency, klinik",
    popular: true,
    icon: <Award className="w-5 h-5" />,
    projects: [
      {
        id: 4,
        title: "Klinik Kecantikan - Glow Beauty",
        image: "https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&q=80",
        description: "Website klinik dengan sistem booking appointment, blog treatment tips, dan sebelum-sesudah gallery",
        features: ["Booking System", "Blog CMS", "Before/After Gallery", "Multi-language", "SEO Advanced"],
        link: "#",
        tech: ["React", "Strapi", "GraphQL"],
        completionTime: "3 minggu"
      },
      {
        id: 5,
        title: "Digital Agency - Creative Hub",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        description: "Company profile agency dengan portfolio showcase, team profiles, dan client testimonials",
        features: ["Portfolio System", "Team Profiles", "Testimonials", "Blog System", "Email Marketing"],
        link: "#",
        tech: ["Next.js", "Sanity", "Vercel"],
        completionTime: "4 minggu"
      },
      {
        id: 6,
        title: "Sekolah Online - Smart Academy",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
        description: "Website pendidikan dengan course catalog, registration system, dan student portal",
        features: ["Course Management", "Student Portal", "Payment Gateway", "Certificate Generator"],
        link: "#",
        tech: ["React", "Node.js", "MongoDB"],
        completionTime: "5 minggu"
      }
    ]
  },
  {
    packageName: "Premium + AI",
    packagePrice: "8.500.000",
    packageDesc: "Cocok untuk E-commerce, startup, traffic tinggi",
    icon: <Star className="w-5 h-5" />,
    projects: [
      {
        id: 7,
        title: "E-Commerce Fashion - StyleHub",
        image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        description: "Full e-commerce dengan AI chatbot customer service 24/7, payment gateway, dan inventory management",
        features: ["AI Chatbot 24/7", "Payment Gateway", "Inventory System", "WhatsApp API", "Live Chat"],
        link: "#",
        tech: ["Next.js", "Stripe", "OpenAI API"],
        completionTime: "6 minggu"
      },
      {
        id: 8,
        title: "Property Portal - RumahKita",
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
        description: "Platform properti dengan AI assistant untuk info listing, virtual tour 360°, dan mortgage calculator",
        features: ["AI Property Assistant", "360° Virtual Tour", "Advanced Search", "Telegram Bot", "Lead CRM"],
        link: "#",
        tech: ["React", "TensorFlow.js", "WebGL"],
        completionTime: "8 minggu"
      },
      {
        id: 9,
        title: "Travel Booking - ExploreID",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
        description: "Platform booking travel dengan AI recommendation, auto-confirmation WhatsApp, dan payment automation",
        features: ["AI Travel Advisor", "Auto WhatsApp", "Payment Automation", "Multi-currency", "Review System"],
        link: "#",
        tech: ["Next.js", "Prisma", "OpenAI"],
        completionTime: "7 minggu"
      }
    ]
  }
];

export default function Portfolio() {
  const [selectedPackage, setSelectedPackage] = useState("Semua");
  const [isLoading, setIsLoading] = useState(false);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredPackages = selectedPackage === "Semua" 
    ? portfolioByPackage 
    : portfolioByPackage.filter(pkg => pkg.packageName === selectedPackage);

  // Simulate loading when changing filter
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [selectedPackage]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block border border-black px-4 py-2 text-sm font-medium mb-6"
          >
            PAKET PORTFOLIO
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-6xl font-bold mb-6 text-black"
          >
            Hasil Karya dari Setiap Paket
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-600 text-lg max-w-2xl mx-auto"
          >
            Harga transparan tanpa biaya tersembunyi. Semua paket include domain, hosting, dan support teknis.
          </motion.p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedPackage("Semua")}
            className={`px-6 py-3 text-sm font-medium transition-all ${
              selectedPackage === "Semua"
                ? 'bg-black text-white'
                : 'bg-white text-black border border-gray-300 hover:border-black'
            }`}
          >
            Lihat Semua
          </motion.button>
          {portfolioByPackage.map((pkg) => (
            <motion.button
              key={pkg.packageName}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedPackage(pkg.packageName)}
              className={`px-6 py-3 text-sm font-medium transition-all flex items-center gap-2 ${
                selectedPackage === pkg.packageName
                  ? 'bg-black text-white'
                  : 'bg-white text-black border border-gray-300 hover:border-black'
              }`}
            >
              {pkg.icon}
              {pkg.packageName}
              {pkg.popular && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Sections */}
        <AnimatePresence mode="wait">
          {!isLoading && (
            <motion.div
              key={selectedPackage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPackages.map((pkg, pkgIndex) => (
                <div key={pkgIndex} className="mb-24">
                  {/* Package Header */}
                  <div className="text-center mb-12">
                    <div className="flex justify-center items-center gap-3 mb-3">
                      <motion.h2 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 * pkgIndex }}
                        className="text-3xl md:text-4xl font-bold text-black flex items-center gap-2"
                      >
                        {pkg.icon}
                        {pkg.packageName}
                      </motion.h2>
                      {pkg.popular && (
                        <motion.span 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2 * pkgIndex }}
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-medium flex items-center gap-1"
                        >
                          <Star className="w-3 h-3 fill-white" /> POPULER
                        </motion.span>
                      )}
                    </div>
                    <motion.p 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 * pkgIndex }}
                      className="text-gray-600 mb-2"
                    >
                      {pkg.packageDesc}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 * pkgIndex }}
                      className="text-sm text-gray-500"
                    >
                      Rp <span className="text-3xl font-bold text-black">{pkg.packagePrice}</span>
                    </motion.div>
                  </div>

                  {/* Projects Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {pkg.projects.map((project, index) => (
                      <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * index + 0.5 * pkgIndex }}
                        whileHover={{ y: -5 }}
                        onHoverStart={() => setHoveredProject(project.id)}
                        onHoverEnd={() => setHoveredProject(null)}
                      >
                        <Card
                          className={`border border-gray-200 rounded-none shadow-none hover:shadow-xl transition-all duration-300 bg-white overflow-hidden ${
                            hoveredProject === project.id ? 'transform scale-105' : ''
                          }`}
                        >
                          {/* Image */}
                          <div className="relative h-56 overflow-hidden">
                            <img
                              src={project.image}
                              alt={project.title}
                              className="w-full h-full object-cover transition-transform duration-500"
                              style={{ 
                                transform: hoveredProject === project.id ? 'scale(1.05)' : 'scale(1)' 
                              }}
                            />
                            {hoveredProject === project.id && (
                              <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center"
                              >
                                <Button
                                  variant="outline"
                                  className="bg-white text-black hover:bg-black hover:text-white rounded-none transition-colors"
                                  asChild
                                >
                                  <a href={project.link} className="flex items-center justify-center gap-2">
                                    Lihat Demo <ExternalLink className="w-4 h-4" />
                                  </a>
                                </Button>
                              </motion.div>
                            )}
                          </div>

                          {/* Content */}
                          <CardContent className="p-6">
                            <h3 className="text-xl font-bold mb-3 text-black">
                              {project.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-5 leading-relaxed">
                              {project.description}
                            </p>
                            
                            {/* Tech Stack */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.tech.map((tech, idx) => (
                                <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                                  {tech}
                                </span>
                              ))}
                            </div>

                            {/* Features */}
                            <div className="space-y-2 mb-6">
                              {project.features.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                              {project.features.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{project.features.length - 3} fitur lainnya
                                </div>
                              )}
                            </div>

                            {/* Time */}
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-4">
                              <Clock className="w-3 h-3" />
                              <span>Waktu pengerjaan: {project.completionTime}</span>
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
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

       {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 text-center border border-gray-200 p-12 bg-gradient-to-r from-gray-50 to-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black">
            Mau Website Seperti Ini?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Pilih paket yang sesuai kebutuhan bisnis Anda. Konsultasi gratis untuk diskusikan fitur yang Anda inginkan.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg"
                className="bg-black text-white hover:bg-gray-800 rounded-none px-8 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
                onClick={() => window.location.href = "/#kontak"}
              >
                Konsultasi Gratis
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg"
                variant="outline"
                className="border border-black text-black hover:bg-black hover:text-white rounded-none px-8 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
                onClick={() => window.location.href = "/#harga"}
              >
                Lihat Semua Paket
              </Button>
            </motion.div>
          </div>
        </motion.div>
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