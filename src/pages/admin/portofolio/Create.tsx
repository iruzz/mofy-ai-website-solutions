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
        images,
      });

      const response = await api.post("/admin/portofolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast({
        title: "Sukses",
        description: "Portofolio berhasil dibuat",
      });

      navigate("/admin/portofolio");
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Gagal membuat portofolio";
      console.error("Error creating portfolio:", err);
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
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Portofolio</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-900/20 border border-red-700 rounded-md text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium mb-2">Judul Portofolio *</label>
          <input
            className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-blue-500"
            placeholder="Masukkan judul portofolio"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi *</label>
          <textarea
            className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 min-h-[120px] focus:outline-none focus:border-blue-500"
            placeholder="Masukkan deskripsi portofolio"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Paket *</label>
          <select
            className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-blue-500"
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
          <label className="block text-sm font-medium mb-2">Fitur Website *</label>
          <FiturInput value={fitur} onChange={setFitur} disabled={loading} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tanggal Projek *</label>
          <input
            type="date"
            className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 focus:outline-none focus:border-blue-500"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Gambar Portofolio *</label>
          <ImageUploader value={images} onChange={setImages} disabled={loading} />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-md bg-white text-black font-medium
                       hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            {loading ? "Menyimpan..." : "Simpan Portofolio"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/admin/portofolio")}
            disabled={loading}
            className="px-6 py-3 rounded-md bg-zinc-700 text-white font-medium
                       hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed
                       transition-colors"
          >
            Batal
          </button>
        </div>
      </form>
    </div>
  );
}
