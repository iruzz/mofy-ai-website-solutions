// src/pages/PortfolioDetail.tsx

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Clock, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
  harga_project?: number | string | null;
  images: PortfolioImage[];
};

const packageInfo = {
  umkm: { 
    name: "Starter UMKM", 
    color: "blue",
    price: "2.500.000",
    description: "Cocok untuk usaha baru, toko online pemula, jasa lokal"
  },
  profesional: { 
    name: "Professional", 
    color: "purple",
    price: "5.000.000",
    description: "Cocok untuk perusahaan established, agency, klinik"
  },
  premium: { 
    name: "Premium + AI", 
    color: "amber",
    price: "8.500.000",
    description: "Cocok untuk E-commerce, startup, traffic tinggi"
  },
};

export default function PortfolioDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    fetchPortfolioDetail();
  }, [id]);

  const fetchPortfolioDetail = async () => {
    setLoading(true);
    try {
      const response = await api.get("/portofolio");
      const data = response.data?.data ?? [];
      const found = data.find((p: Portfolio) => p.id === Number(id));
      
      if (found) {
        console.log("Portfolio data:", found);
        console.log("Harga project:", found.harga_project, typeof found.harga_project);
        
        // Sort images by order
        found.images = found.images.sort((a: PortfolioImage, b: PortfolioImage) => a.order - b.order);
        setPortfolio(found);
      } else {
        navigate('/portfolio');
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
      navigate('/portfolio');
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-black rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  if (!portfolio) return null;

  const packageColor = packageInfo[portfolio.paket].color;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-slate-50 to-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/portfolio')}
            className="flex items-center gap-2 text-slate-600 hover:text-black transition-colors mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            <span className="font-medium">Kembali ke Portfolio</span>
          </motion.button>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Package Badge */}
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 bg-${packageColor}-50 border border-${packageColor}-200`}>
                <span className={`text-sm font-semibold text-${packageColor}-700`}>
                  {packageInfo[portfolio.paket].name}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">
                {portfolio.title}
              </h1>

              {/* Price */}
              {portfolio.harga_project && Number(portfolio.harga_project) > 0 && (
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg border border-emerald-200">
                    <span className="text-sm">Project ini:</span>
                    <span className="text-2xl font-bold">Rp {formatPrice(Number(portfolio.harga_project))}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Dari paket {packageInfo[portfolio.paket].name} (Rp {packageInfo[portfolio.paket].price})
                  </p>
                </div>
              )}
              
              {(!portfolio.harga_project || Number(portfolio.harga_project) === 0) && (
                <div className="mb-6 inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-4 py-2 rounded-lg border border-slate-200">
                  <span className="text-sm">Paket:</span>
                  <span className="text-xl font-bold">{packageInfo[portfolio.paket].name}</span>
                  <span className="text-sm">- Rp {packageInfo[portfolio.paket].price}</span>
                </div>
              )}

              {/* Description */}
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {portfolio.deskripsi}
              </p>

              {/* Meta Info */}
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-8">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>Selesai: {formatDate(portfolio.tanggal_projek)}</span>
                </div>
                <div className="w-px h-4 bg-slate-300" />
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{portfolio.images.length} Gambar</span>
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="bg-black text-white hover:bg-gray-800 rounded-none"
                  onClick={() => window.location.href = "/#kontak"}
                >
                  Konsultasi Project Serupa
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-black text-black hover:bg-black hover:text-white rounded-none"
                  onClick={() => window.location.href = "/#harga"}
                >
                  Lihat Paket
                </Button>
              </div>
            </motion.div>

            {/* Right: Main Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:sticky lg:top-24"
            >
              {portfolio.images.length > 0 && (
                <div 
                  className="aspect-video bg-slate-100 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setIsLightboxOpen(true)}
                >
                  <img
                    src={imageUrl(portfolio.images[selectedImage].image)}
                    alt={portfolio.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Gallery & Features */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Gallery Thumbnails */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-black mb-6">Galeri Project</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {portfolio.images.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => {
                    setSelectedImage(index);
                    setIsLightboxOpen(true);
                  }}
                  className={`aspect-video bg-slate-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-black shadow-md' 
                      : 'border-slate-200 hover:border-slate-400'
                  }`}
                >
                  <img
                    src={imageUrl(img.image)}
                    alt={`${portfolio.title} - ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features List */}
          <div>
            <h2 className="text-2xl font-bold text-black mb-6">Fitur Website</h2>
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 space-y-3">
              {portfolio.fitur_website.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 text-slate-700"
                >
                  <Check className="w-5 h-5 mt-0.5 flex-shrink-0 text-green-500" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>

            {/* Package CTA */}
            <div className="mt-6 p-6 bg-gradient-to-br from-slate-800 to-slate-700 text-white rounded-lg">
              <p className="text-sm opacity-90 mb-1">Dibuat dengan</p>
              <p className="text-xl font-bold mb-3">
                Paket {packageInfo[portfolio.paket].name}
              </p>
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <p className="text-xs opacity-75 mb-1">Harga Paket Normal:</p>
                <p className="text-3xl font-bold mb-2">
                  Rp {packageInfo[portfolio.paket].price}
                </p>
                <p className="text-sm opacity-90">
                  {packageInfo[portfolio.paket].description}
                </p>
              </div>
              {portfolio.harga_project && Number(portfolio.harga_project) > 0 && (
                <div className="bg-emerald-500/20 border border-emerald-400/30 rounded-lg p-4 mb-4">
                  <p className="text-xs opacity-90 mb-1">Harga Project Ini:</p>
                  <p className="text-2xl font-bold text-emerald-300">
                    Rp {formatPrice(Number(portfolio.harga_project))}
                  </p>
                  <p className="text-xs opacity-75 mt-2">
                    *Harga bisa berbeda tergantung kompleksitas
                  </p>
                </div>
              )}
              <Button
                variant="outline"
                className="w-full border-white text-white hover:bg-white hover:text-black rounded-none"
                onClick={() => window.location.href = "/#kontak"}
              >
                Konsultasi & Tanya Harga
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
              onClick={() => setIsLightboxOpen(false)}
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Image Counter */}
            <div className="absolute top-4 left-4 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-white text-sm">
              {selectedImage + 1} / {portfolio.images.length}
            </div>

            {/* Image */}
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={imageUrl(portfolio.images[selectedImage].image)}
                alt={portfolio.title}
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
            </motion.div>

            {/* Navigation */}
            {portfolio.images.length > 1 && (
              <>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev > 0 ? prev - 1 : portfolio.images.length - 1));
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage((prev) => (prev < portfolio.images.length - 1 ? prev + 1 : 0));
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                >
                  <ArrowLeft className="w-6 h-6 text-white rotate-180" />
                </button>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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