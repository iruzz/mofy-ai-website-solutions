// src/pages/Portfolio.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Check, Clock, Award, Zap, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Navbar from "@/components/Navbar";
import { motion, AnimatePresence } from 'framer-motion';
import api from "@/lib/api";
import { imageUrl } from "@/lib/imageUrl";

type PortfolioImage = {
  id: number;
  image: string;
  order: number;
};

type Portfolio = {
  id: number;
  title: string;
  deskripsi: string;
  paket: 'umkm' | 'profesional' | 'premium';
  fitur_website: string[];
  tanggal_projek: string;
  harga_project?: number; // ← Add optional price
  images: PortfolioImage[];
  cover?: string;
};

type GroupedPortfolio = {
  packageName: string;
  packagePrice: string;
  packageDesc: string;
  icon: React.ReactNode;
  popular?: boolean;
  projects: Portfolio[];
};

const packageConfig = {
  umkm: {
    packageName: "Starter UMKM",
    packagePrice: "150.000 - 2.500.000",
    packageDesc: "Cocok untuk usaha baru, toko online pemula, jasa lokal",
    icon: <Zap className="w-5 h-5" />,
  },
  profesional: {
    packageName: "Professional",
    packagePrice: "5.000.000",
    packageDesc: "Cocok untuk perusahaan established, agency, klinik",
    icon: <Award className="w-5 h-5" />,
    popular: true,
  },
  premium: {
    packageName: "Premium + AI",
    packagePrice: "8.500.000",
    packageDesc: "Cocok untuk E-commerce, startup, traffic tinggi",
    icon: <Star className="w-5 h-5" />,
  },
};

export default function Portfolio() {
  const navigate = useNavigate();
  const [portfolios, setPortfolios] = useState<Portfolio[]>([]);
  const [selectedPackage, setSelectedPackage] = useState("Semua");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  useEffect(() => {
    fetchPortfolios();
  }, []);

  const fetchPortfolios = async () => {
    setIsLoading(true);
    try {
      // Use PUBLIC endpoint /portofolio (no auth required) for user-facing portfolio page
      // Admin uses /admin/portofolio with auth
      const response = await api.get("/portofolio");
      const data = response.data?.data ?? [];
      
      console.log("Fetched portfolios:", data); // Debug log
      
      // Validate and clean data to prevent crashes
      const validatedData = data.map((item: any) => ({
        id: item.id,
        title: item.title || 'Untitled',
        deskripsi: item.deskripsi || '',
        paket: item.paket || 'umkm',
        fitur_website: Array.isArray(item.fitur_website) ? item.fitur_website : [],
        tanggal_projek: item.tanggal_projek || new Date().toISOString(),
        images: Array.isArray(item.images) ? item.images : [],
      }));
      
      const sorted = validatedData.sort((a: Portfolio, b: Portfolio) => {
        try {
          return new Date(b.tanggal_projek).getTime() - new Date(a.tanggal_projek).getTime();
        } catch {
          return 0;
        }
      });
      
      console.log("Validated portfolios:", sorted); // Debug log
      setPortfolios(sorted);
    } catch (error) {
      console.error("Error fetching portfolios:", error);
      // Don't throw - just show empty state
      setPortfolios([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Group portfolios by package with safety checks
  const groupedPortfolios: GroupedPortfolio[] = Object.entries(packageConfig)
    .map(([key, config]) => {
      try {
        return {
          ...config,
          projects: portfolios.filter((p) => p && p.paket === key),
        };
      } catch (error) {
        console.error("Error grouping portfolios:", error);
        return {
          ...config,
          projects: [],
        };
      }
    })
    .filter(pkg => pkg.projects.length > 0);

  const filteredPackages = selectedPackage === "Semua" 
    ? groupedPortfolios
    : groupedPortfolios.filter(pkg => pkg.packageName === selectedPackage);

  const getCoverImage = (portfolio: Portfolio) => {
    try {
      if (portfolio && portfolio.images && Array.isArray(portfolio.images) && portfolio.images.length > 0) {
        const sortedImages = [...portfolio.images].sort((a, b) => (a.order || 0) - (b.order || 0));
        if (sortedImages[0] && sortedImages[0].image) {
          return imageUrl(sortedImages[0].image);
        }
      }
    } catch (error) {
      console.error("Error getting cover image:", error);
    }
    return "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Hero */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block border border-black px-4 py-2 text-sm font-medium mb-6"
          >
            PORTFOLIO KAMI
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

        {/* Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-20 bg-gradient-to-br from-slate-50 to-white border border-slate-200 p-8 rounded-lg"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-black mb-3">
              Lihat Contoh Website dari Setiap Paket
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Coba demo website untuk melihat fitur dan kualitas dari masing-masing paket
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black">Starter UMKM</h3>
                  <p className="text-xs text-gray-500">Rp 2.5 Juta</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Website sederhana dengan 5 halaman, WhatsApp button, dan Google Maps
              </p>
              <Button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-none"
                onClick={() => window.open('https://demo-umkm.mofy.id', '_blank')}
              >
                <span className="flex items-center justify-center gap-2">
                  Lihat Demo <ExternalLink className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border-2 border-purple-300 p-6 hover:shadow-lg transition-all relative"
            >
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" /> POPULER
                </span>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black">Professional</h3>
                  <p className="text-xs text-gray-500">Rp 5 Juta</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Website lengkap dengan booking system, blog CMS, dan multi-language
              </p>
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-none"
                onClick={() => window.open('https://demo-professional.mofy.id', '_blank')}
              >
                <span className="flex items-center justify-center gap-2">
                  Lihat Demo <ExternalLink className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-200 p-6 hover:shadow-lg transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="font-bold text-black">Premium + AI</h3>
                  <p className="text-xs text-gray-500">Rp 8.5 Juta</p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                E-commerce dengan AI chatbot 24/7, payment gateway, dan automation
              </p>
              <Button
                className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-none"
                onClick={() => window.open('https://demo-premium.mofy.id', '_blank')}
              >
                <span className="flex items-center justify-center gap-2">
                  Lihat Demo <ExternalLink className="w-4 h-4" />
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>

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
            Lihat Semua ({portfolios.length})
          </motion.button>
          {groupedPortfolios.map((pkg) => (
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
              {pkg.packageName} ({pkg.projects.length})
              {pkg.popular && <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
            </motion.button>
          ))}
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center py-20">
            <div className="inline-block w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
            <p className="mt-4 text-gray-600">Memuat portfolio...</p>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && portfolios.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum Ada Portfolio</h3>
            <p className="text-gray-600">Portfolio akan segera hadir!</p>
          </div>
        )}

        {/* Portfolio Sections */}
        <AnimatePresence mode="wait">
          {!isLoading && portfolios.length > 0 && (
            <motion.div
              key={selectedPackage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {filteredPackages.map((pkg, pkgIndex) => (
                <div key={pkgIndex} className="mb-24">
                  {/* Package Header - Focus on value, not price */}
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
                      className="text-gray-600 mb-4 text-lg"
                    >
                      {pkg.packageDesc}
                    </motion.p>
                    {/* Price moved to subtle location or call-to-action focused */}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 * pkgIndex }}
                      className="text-sm text-gray-500"
                    >
                      Lihat contoh project di bawah atau{' '}
                      <button 
                        onClick={() => window.location.href = "/#harga"}
                        className="text-black font-semibold hover:underline"
                      >
                        cek detail paket & harga →
                      </button>
                    </motion.div>
                  </div>

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
                        className="h-full"
                      >
                        <Card
                          className={`h-full flex flex-col border border-gray-200 rounded-none shadow-none hover:shadow-md transition-all duration-300 bg-white overflow-hidden ${
                            hoveredProject === project.id ? 'transform scale-[1.02]' : ''
                          }`}
                        >
                          <div className="relative h-56 overflow-hidden bg-gray-100 flex-shrink-0">
                            <img
                              src={getCoverImage(project)}
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
                                  onClick={() => navigate(`/portfolio/${project.id}`)}
                                >
                                  <span className="flex items-center justify-center gap-2">
                                    Lihat Detail <ExternalLink className="w-4 h-4" />
                                  </span>
                                </Button>
                              </motion.div>
                            )}
                          </div>

                          <CardContent className="p-6 flex flex-col flex-1">
                            <h3 className="text-xl font-bold mb-3 text-black">
                              {project.title}
                            </h3>

                            {/* Price badge if available */}
                            {project.harga_project && (
                              <div className="mb-3 inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold border border-emerald-200">
                                <span className="text-xs">Rp</span>
                                <span>{formatPrice(project.harga_project)}</span>
                              </div>
                            )}

                            <p className="text-gray-600 text-sm mb-5 leading-relaxed line-clamp-3">
                              {project.deskripsi}
                            </p>

                            <div className="space-y-2 mb-4 min-h-[90px]">
                              {project.fitur_website.slice(0, 3).map((feature, idx) => (
                                <div key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500" />
                                  <span className="line-clamp-1">{feature}</span>
                                </div>
                              ))}
                              {project.fitur_website.length > 3 && (
                                <div className="text-xs text-gray-500">
                                  +{project.fitur_website.length - 3} fitur lainnya
                                </div>
                              )}
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>Selesai: {formatDate(project.tanggal_projek)}</span>
                              </div>

                              {project.images && project.images.length > 0 && (
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                  </svg>
                                  <span>{project.images.length} gambar</span>
                                </div>
                              )}
                            </div>

                            <div className="flex-1" />

                            <Button
                              variant="outline"
                              className="w-full border border-black text-black hover:bg-black hover:text-white rounded-none transition-colors"
                              onClick={() => navigate(`/portfolio/${project.id}`)}
                            >
                              <span className="flex items-center justify-center gap-2">
                                Lihat Detail <ExternalLink className="w-4 h-4" />
                              </span>
                            </Button>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  {/* Package pricing CTA at bottom - after seeing value */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-8 text-center p-6 bg-slate-50 border border-slate-200 rounded-lg"
                  >
                    <p className="text-sm text-gray-600 mb-2">
                      Project serupa bisa dibuat dengan paket <span className="font-semibold text-black">{pkg.packageName}</span>
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="text-gray-500">Mulai dari</span>
                      <span className="text-2xl font-bold text-black">Rp {pkg.packagePrice}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-black text-black hover:bg-black hover:text-white rounded-none"
                      onClick={() => window.location.href = "/#kontak"}
                    >
                      Tanya Detail & Harga Custom
                    </Button>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
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