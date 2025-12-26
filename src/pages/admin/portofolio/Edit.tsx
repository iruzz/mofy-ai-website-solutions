// src/pages/admin/portofolio/Edit.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import ImageUploader from "./components/ImageUploader";
import FiturInput from "./components/FiturInput";
import ImageCard from "./components/ImageCard";
import ImageReorder from "./components/ImageReorder";
import { sortImages } from "./utils/sortImages";
import { useToast } from "@/hooks/use-toast";

export default function EditPortofolio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    setError(null);

    api
      .get("/admin/portofolio")
      .then((res) => {
        const list = res.data?.data ?? [];
        const found = list.find((p: any) => String(p.id) === String(id));

        if (!found) {
          const msg = "Portofolio tidak ditemukan";
          setError(msg);
          toast({
            title: "Error",
            description: msg,
            variant: "destructive",
          });
          setTimeout(() => navigate(-1), 1500);
          return;
        }

        // Normalize data untuk memastikan semua field ada
        const normalizedData = {
          title: found.title || "",
          deskripsi: found.deskripsi || "",
          paket: found.paket || "",
          // Handle tanggal_projek dari API (bisa format YYYY-MM-DD atau lainnya)
          tanggal_projek: found.tanggal_projek ? found.tanggal_projek.split(" ")[0] : "",
          // Handle fitur_website (bisa array atau JSON string)
          fitur_website: Array.isArray(found.fitur_website) 
            ? found.fitur_website 
            : (typeof found.fitur_website === 'string' ? JSON.parse(found.fitur_website) : []),
        };

        setData(normalizedData);
        setImages(sortImages(found.images ?? []));
      })
      .catch((err: any) => {
        const msg = err.response?.data?.message || "Gagal load data portofolio";
        setError(msg);
        toast({
          title: "Error",
          description: msg,
          variant: "destructive",
        });
        console.error("Error loading portfolio:", err);
      })
      .finally(() => setLoading(false));
  }, [id, navigate, toast]);


  if (!data) {
    if (error) {
      return (
        <div className="max-w-5xl mx-auto p-6">
          <div className="p-4 bg-red-900/20 border border-red-700 rounded-md text-red-200">
            {error}
          </div>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 px-4 py-2 bg-zinc-700 rounded-md hover:bg-zinc-600"
          >
            ← Kembali
          </button>
        </div>
      );
    }
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  const saveInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      // Buat FormData seperti di Create.tsx (sama dengan backend expectations)
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("deskripsi", data.deskripsi);
      formData.append("paket", data.paket);
      
      // Format tanggal ke yyyy-MM-dd (backend expects this format)
      const dateFormatted = data.tanggal_projek?.split('T')[0] || data.tanggal_projek;
      formData.append("tanggal_projek", dateFormatted);
      
      // Append fitur as a JSON string to ensure backend receives the full array
      if (Array.isArray(data.fitur_website)) {
        formData.append("fitur_website", JSON.stringify(data.fitur_website));
      }
      
      // Log data yang dikirim (debugging)
      console.log("Sending data:", {
        title: data.title,
        deskripsi: data.deskripsi,
        paket: data.paket,
        tanggal_projek: dateFormatted,
        fitur_website: data.fitur_website,
      });

      // Debug: Log FormData entries
      console.log("FormData entries:");
      for (let [key, value] of formData.entries()) {
        console.log(`  ${key}:`, value);
      }

      const response = await api.put(`/admin/portofolio/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      // Log response (debugging)
      console.log("Update response:", response.status, response.data);

      // Check apakah response berhasil
      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Sukses",
          description: "Info portofolio berhasil diupdate. Mengecek data...",
        });
        
        // Re-fetch data dari API untuk verifikasi
        setTimeout(() => {
          api.get("/admin/portofolio")
            .then((res) => {
              const list = res.data?.data ?? [];
              const found = list.find((p: any) => String(p.id) === String(id));
              
              console.log("Refreshed data:", found);
              
              if (found) {
                const normalizedData = {
                  title: found.title || "",
                  deskripsi: found.deskripsi || "",
                  paket: found.paket || "",
                  tanggal_projek: found.tanggal_projek ? found.tanggal_projek.split(" ")[0] : "",
                  fitur_website: Array.isArray(found.fitur_website) 
                    ? found.fitur_website 
                    : (typeof found.fitur_website === 'string' ? JSON.parse(found.fitur_website) : []),
                };
                
                // Verifikasi apakah response dari backend mengatakan berhasil
                // Response 200 + ada data = update berhasil
                if (found.title && found.deskripsi !== undefined) {
                  setData(normalizedData);
                  toast({
                    title: "✅ Sukses",
                    description: "Data portofolio berhasil disimpan ke database",
                  });
                  console.log("✅ Update berhasil - data sudah tersimpan");
                } else {
                  console.warn("⚠️ WARNING: Response tidak complete!");
                  setError("⚠️ Response dari server tidak lengkap");
                  toast({
                    title: "⚠️ Peringatan",
                    description: "Response tidak lengkap. Cek backend logs!",
                    variant: "destructive",
                  });
                }
              }
            })
            .catch((err) => {
              console.error("Error refreshing data:", err);
            });
        }, 500);
      } else {
        throw new Error("Update failed - unexpected response status: " + response.status);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Gagal update info portofolio";
      console.error("Error updating portfolio info:", err);
      console.error("Response data:", err.response?.data);
      console.error("Response status:", err.response?.status);
      
      setError(`❌ Error: ${msg}`);
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadImages = async () => {
    if (newImages.length === 0) {
      toast({
        title: "Validasi",
        description: "Pilih minimal 1 gambar untuk diupload",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const fd = new FormData();
      newImages.forEach((f) => fd.append("images[]", f));
      
      // Coba route yang berbeda jika yang pertama gagal
      let uploadSuccess = false;
      let lastError = null;

      // Try route 1: /admin/portofolio/{id}/images
      try {
        await api.post(`/admin/portofolio/${id}/images`, fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        uploadSuccess = true;
      } catch (err1) {
        lastError = err1;
        // Try route 2: /admin/portofolio/{id}/upload-images
        try {
          await api.post(`/admin/portofolio/${id}/upload-images`, fd, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          uploadSuccess = true;
        } catch (err2) {
          lastError = err2;
        }
      }

      if (!uploadSuccess) {
        throw lastError;
      }

      toast({
        title: "Sukses",
        description: "Gambar berhasil diupload. Halaman akan di-refresh...",
      });
      setTimeout(() => location.reload(), 1500);
    } catch (err: any) {
      const msg = err.response?.data?.message || "Gagal upload gambar";
      setError(msg);
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
      console.error("Error uploading images:", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteImage = async (imageId: number) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;

    setLoading(true);
    setError(null);
    try {
      await api.delete(`/admin/portofolio/image/${imageId}`);
      setImages(images.filter((i) => i.id !== imageId));
      toast({
        title: "Sukses",
        description: "Gambar berhasil dihapus",
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Gagal hapus gambar";
      setError(msg);
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
      console.error("Error deleting image:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveOrder = async () => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/admin/portofolio/image/reorder`, {
        portofolio_id: Number(id),
        orders: images.map((i) => ({
          id: i.id,
          order: i.order,
        })),
      });
      toast({
        title: "Sukses",
        description: "Urutan gambar berhasil disimpan",
      });
    } catch (err: any) {
      const msg = err.response?.data?.message || "Gagal menyimpan urutan gambar";
      setError(msg);
      toast({
        title: "Error",
        description: msg,
        variant: "destructive",
      });
      console.error("Error saving image order:", err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Portofolio</h1>

      {error && (
        <div className="p-4 bg-red-900/20 border border-red-700 rounded-md text-red-200">
          {error}
        </div>
      )}

      {/* BASIC INFO */}
      <div className="space-y-4 border border-zinc-700 rounded-lg p-4">
        <h2 className="font-semibold text-lg">Informasi Dasar</h2>

        <div>
          <label className="block text-sm font-medium mb-2">Judul</label>
          <input
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Deskripsi</label>
          <textarea
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded min-h-[100px] focus:outline-none focus:border-blue-500"
            value={data.deskripsi}
            onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Paket</label>
          <select
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={data.paket || ""}
            onChange={(e) => setData({ ...data, paket: e.target.value })}
            disabled={loading}
          >
            <option value="">-- Pilih Paket --</option>
            <option value="umkm">UMKM</option>
            <option value="profesional">Profesional</option>
            <option value="premium">Premium</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Fitur Website</label>
          <FiturInput 
            value={data.fitur_website || []} 
            onChange={(fitur) => setData({ ...data, fitur_website: fitur })}
            disabled={loading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tanggal Projek</label>
          <input
            type="date"
            className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded focus:outline-none focus:border-blue-500"
            value={data.tanggal_projek}
            onChange={(e) => setData({ ...data, tanggal_projek: e.target.value })}
            disabled={loading}
          />
        </div>

        <button
          onClick={saveInfo}
          disabled={loading}
          className="px-4 py-2 bg-white text-black font-medium rounded hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Menyimpan..." : "Simpan Info"}
        </button>
      </div>

      {/* EXISTING IMAGES */}
      <div className="space-y-4 border border-zinc-700 rounded-lg p-4">
        <h2 className="font-semibold text-lg">Gambar Existing</h2>
        
        {images.length === 0 ? (
          <p className="text-zinc-400 text-sm">Belum ada gambar</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((img) => (
              <ImageCard key={img.id} image={img} onDelete={deleteImage} />
            ))}
          </div>
        )}
      </div>

      {/* REORDER */}
      {images.length > 1 && (
        <div className="space-y-4 border border-zinc-700 rounded-lg p-4">
          <h2 className="font-semibold text-lg">Atur Urutan Gambar</h2>
          <ImageReorder images={images} onChange={setImages} />
          <button
            onClick={saveOrder}
            disabled={loading}
            className="px-4 py-2 bg-zinc-700 text-white font-medium rounded hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Urutan"}
          </button>
        </div>
      )}

      {/* ADD NEW */}
      <div className="space-y-4 border border-zinc-700 rounded-lg p-4">
        <h2 className="font-semibold text-lg">Tambah Gambar Baru</h2>
        <ImageUploader value={newImages} onChange={setNewImages} disabled={loading} />
        <button
          onClick={uploadImages}
          disabled={loading || newImages.length === 0}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Mengupload..." : `Upload ${newImages.length} Gambar`}
        </button>
      </div>

      <button
        onClick={() => navigate(-1)}
        disabled={loading}
        className="px-4 py-2 bg-zinc-700 text-white font-medium rounded hover:bg-zinc-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Kembali
      </button>
    </div>
  );
}
