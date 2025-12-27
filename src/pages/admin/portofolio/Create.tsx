// src/pages/admin/portofolio/Create.tsx

import { useState } from "react";
import api from "@/lib/api";
import ImageUploader from "./components/ImageUploader";
import FiturInput from "./components/FiturInput";
import { buildFormData } from "./utils/buildFormData";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export default function CreatePortofolio() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [title, setTitle] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [paket, setPaket] = useState<"umkm" | "profesional" | "premium" | "">("");
  const [fitur, setFitur] = useState<string[]>([]);
  const [tanggal, setTanggal] = useState("");
  const [hargaProject, setHargaProject] = useState<string>(""); // ← Add price state
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateForm = (): string | null => {
    if (!title.trim()) return "Judul portofolio tidak boleh kosong";
    if (!deskripsi.trim()) return "Deskripsi tidak boleh kosong";
    if (!paket) return "Paket harus dipilih";
    if (fitur.length === 0) return "Minimal 1 fitur harus ditambahkan";
    if (!tanggal) return "Tanggal projek harus dipilih";
    if (images.length === 0) return "Minimal 1 gambar harus diupload";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast({
        title: "Validasi Gagal",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const formData = buildFormData({
        title,
        deskripsi,
        paket,
        fitur_website: fitur,
        tanggal_projek: tanggal,
        harga_project: hargaProject, // ← Add price
        images,
      });

      // Log what we're sending
      console.log("=== CREATING PORTFOLIO ===");
      console.log("Data:", {
        title,
        deskripsi,
        paket,
        fitur_website: fitur,
        tanggal_projek: tanggal,
        images: images.map(f => ({ name: f.name, type: f.type, size: f.size }))
      });

      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}:`, { name: value.name, type: value.type, size: value.size });
        } else {
          console.log(`  ${key}:`, value);
        }
      }
      
      // Count how many fitur_website entries
      const fiturCount = Array.from(formData.entries()).filter(([key]) => key === 'fitur_website[]').length;
      console.log(`Total fitur_website[] entries: ${fiturCount}`);

      const response = await api.post("/admin/portofolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", response.status, response.data);

      toast({
        title: "Sukses",
        description: "Portofolio berhasil dibuat",
      });

      navigate("/admin/portofolio");
    } catch (err: any) {
      console.error("=== CREATE ERROR ===");
      console.error("Full error:", err);
      console.error("Error response:", err.response);
      console.error("Error response data:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      const errorData = err.response?.data;
      let errorMessage = "Gagal membuat portofolio";
      
      if (errorData) {
        if (errorData.message) {
          errorMessage = errorData.message;
        }
        
        // Handle validation errors
        if (errorData.errors) {
          console.error("Validation errors:", errorData.errors);
          const validationErrors = Object.entries(errorData.errors)
            .map(([key, msgs]: [string, any]) => {
              const messages = Array.isArray(msgs) ? msgs.join(', ') : msgs;
              return `${key}: ${messages}`;
            })
            .join('\n');
          errorMessage = `Validasi gagal:\n${validationErrors}`;
        }
      }
      
      console.error("Final error message:", errorMessage);
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header - Sticky with blur effect */}
      <div className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Buat Portfolio Baru</h1>
              <p className="text-sm text-slate-500 mt-1">Isi semua informasi untuk membuat portfolio</p>
            </div>
            <button
              onClick={() => navigate("/admin/portofolio")}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Batal
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <div className="w-1 h-5 bg-slate-800 rounded-full" />
              <h2 className="text-lg font-semibold text-slate-800">Informasi Dasar</h2>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Judul Portofolio <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full rounded-lg bg-white border border-slate-300 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50"
                placeholder="Contoh: Website Toko Online Fashion"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Deskripsi <span className="text-red-500">*</span>
              </label>
              <textarea
                className="w-full rounded-lg bg-white border border-slate-300 p-3 min-h-[120px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50"
                placeholder="Jelaskan detail tentang project ini..."
                value={deskripsi}
                onChange={(e) => setDeskripsi(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Paket <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full rounded-lg bg-white border border-slate-300 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50"
                value={paket}
                onChange={(e) => setPaket(e.target.value as "umkm" | "profesional" | "premium" | "")}
                disabled={loading}
              >
                <option value="">-- Pilih Paket --</option>
                <option value="umkm">UMKM</option>
                <option value="profesional">Profesional</option>
                <option value="premium">Premium</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Tanggal Projek <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                className="w-full rounded-lg bg-white border border-slate-300 p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Harga Project (Optional)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">Rp</span>
                <input
                  type="number"
                  className="w-full rounded-lg bg-white border border-slate-300 p-3 pl-10 text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50"
                  placeholder="150000"
                  value={hargaProject}
                  onChange={(e) => setHargaProject(e.target.value)}
                  disabled={loading}
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Contoh: 150000 untuk Rp 150.000. Kosongkan jika tidak ingin menampilkan harga.
              </p>
            </div>
          </section>

          {/* Features */}
          <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <div className="w-1 h-5 bg-slate-800 rounded-full" />
              <h2 className="text-lg font-semibold text-slate-800">
                Fitur Website <span className="text-red-500">*</span>
              </h2>
            </div>
            <FiturInput value={fitur} onChange={setFitur} disabled={loading} />
          </section>

          {/* Images */}
          <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <div className="w-1 h-5 bg-slate-800 rounded-full" />
              <h2 className="text-lg font-semibold text-slate-800">
                Gambar Portofolio <span className="text-red-500">*</span>
              </h2>
            </div>
            <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-4">
              <ImageUploader value={images} onChange={setImages} disabled={loading} />
            </div>
          </section>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                "Simpan Portofolio"
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/admin/portofolio")}
              disabled={loading}
              className="flex-1 sm:flex-none px-8 py-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Batal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}