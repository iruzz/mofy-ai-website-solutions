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

        const normalizedData = {
          title: found.title || "",
          deskripsi: found.deskripsi || "",
          paket: found.paket || "",
          tanggal_projek: found.tanggal_projek ? found.tanggal_projek.split(" ")[0] : "",
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
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
          <div className="max-w-md w-full space-y-4">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-full px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700"
            >
              ← Kembali
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 text-sm">Memuat data...</p>
        </div>
      </div>
    );
  }

  const saveInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("deskripsi", data.deskripsi);
      formData.append("paket", data.paket);
      
      const dateFormatted = data.tanggal_projek?.split('T')[0] || data.tanggal_projek;
      formData.append("tanggal_projek", dateFormatted);
      
      if (Array.isArray(data.fitur_website)) {
        formData.append("fitur_website", JSON.stringify(data.fitur_website));
      }

      const response = await api.put(`/admin/portofolio/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200 || response.status === 201) {
        toast({
          title: "Sukses",
          description: "Info portofolio berhasil diupdate",
        });
        
        setTimeout(() => {
          api.get("/admin/portofolio")
            .then((res) => {
              const list = res.data?.data ?? [];
              const found = list.find((p: any) => String(p.id) === String(id));
              
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
                
                setData(normalizedData);
                toast({
                  title: "✅ Tersimpan",
                  description: "Data portofolio berhasil disimpan ke database",
                });
              }
            });
        }, 500);
      }
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Gagal update info portofolio";
      setError(`Error: ${msg}`);
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
      
      // Append images with proper naming
      newImages.forEach((file, index) => {
        console.log(`Appending image ${index}:`, {
          name: file.name,
          type: file.type,
          size: file.size
        });
        fd.append("images[]", file, file.name);
      });

      // Log FormData contents
      console.log("FormData entries:");
      for (let [key, value] of fd.entries()) {
        if (value instanceof File) {
          console.log(`  ${key}:`, {
            name: value.name,
            type: value.type,
            size: value.size
          });
        } else {
          console.log(`  ${key}:`, value);
        }
      }

      console.log(`Uploading to: /admin/portofolio/${id}/images`);
      
      const response = await api.post(`/admin/portofolio/${id}/images`, fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.status, response.data);

      toast({
        title: "Sukses",
        description: "Gambar berhasil diupload",
      });
      
      setTimeout(() => location.reload(), 1000);
    } catch (err: any) {
      console.error("Upload error:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      const errorData = err.response?.data;
      let errorMsg = "Gagal upload gambar";
      
      if (errorData) {
        if (errorData.message) {
          errorMsg = errorData.message;
        }
        if (errorData.errors) {
          console.error("Validation errors:", errorData.errors);
          const validationErrors = Object.entries(errorData.errors)
            .map(([key, msgs]: [string, any]) => `${key}: ${Array.isArray(msgs) ? msgs.join(', ') : msgs}`)
            .join('\n');
          errorMsg = `Validasi gagal:\n${validationErrors}`;
        }
      }
      
      setError(errorMsg);
      toast({
        title: "Error Upload",
        description: errorMsg,
        variant: "destructive",
      });
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Edit Portfolio</h1>
              <p className="text-sm text-slate-500 mt-1">Ubah informasi dan kelola gambar portfolio</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-6">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* BASIC INFO */}
        <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-5">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="w-1 h-5 bg-slate-800 rounded-full" />
            <h2 className="text-lg font-semibold text-slate-800">Informasi Dasar</h2>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Judul</label>
            <input
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
              value={data.title}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Deskripsi</label>
            <textarea
              className="w-full p-3 bg-white border border-slate-300 rounded-lg min-h-[100px] text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
              value={data.deskripsi}
              onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Paket</label>
            <select
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
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
            <label className="block text-sm font-medium text-slate-700 mb-2">Fitur Website</label>
            <FiturInput 
              value={data.fitur_website || []} 
              onChange={(fitur) => setData({ ...data, fitur_website: fitur })}
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Tanggal Projek</label>
            <input
              type="date"
              className="w-full p-3 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
              value={data.tanggal_projek}
              onChange={(e) => setData({ ...data, tanggal_projek: e.target.value })}
              disabled={loading}
            />
          </div>

          <button
            onClick={saveInfo}
            disabled={loading}
            className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Menyimpan..." : "Simpan Info"}
          </button>
        </section>

        {/* EXISTING IMAGES */}
        <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="w-1 h-5 bg-slate-800 rounded-full" />
            <h2 className="text-lg font-semibold text-slate-800">
              Gambar Existing
              <span className="ml-2 text-sm font-normal text-slate-500">({images.length})</span>
            </h2>
          </div>
          
          {images.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">Belum ada gambar</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {images.map((img) => (
                <div key={img.id} className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all">
                  <ImageCard image={img} onDelete={deleteImage} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* REORDER */}
        {images.length > 1 && (
          <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
              <div className="w-1 h-5 bg-slate-800 rounded-full" />
              <h2 className="text-lg font-semibold text-slate-800">Atur Urutan Gambar</h2>
            </div>
            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4">
              <ImageReorder images={images} onChange={setImages} />
            </div>
            <button
              onClick={saveOrder}
              disabled={loading}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Menyimpan..." : "Simpan Urutan"}
            </button>
          </section>
        )}

        {/* ADD NEW */}
        <section className="bg-white rounded-lg border border-slate-200 p-6 space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
            <div className="w-1 h-5 bg-slate-800 rounded-full" />
            <h2 className="text-lg font-semibold text-slate-800">Tambah Gambar Baru</h2>
          </div>
          <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-4">
            <ImageUploader value={newImages} onChange={setNewImages} disabled={loading} />
          </div>
          <button
            onClick={uploadImages}
            disabled={loading || newImages.length === 0}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Mengupload..." : `Upload ${newImages.length > 0 ? `(${newImages.length})` : ''} Gambar`}
          </button>
        </section>
      </div>
    </div>
  );
}