// src/pages/admin/portofolio/images.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import ImageCard from "./components/ImageCard";
import ImageReorder from "./components/ImageReorder";
import ImageUploader from "./components/ImageUploader";
import { sortImages } from "./utils/sortImages";

export default function PortofolioImages() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [images, setImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    api
      .get("/admin/portofolio")
      .then((res) => {
        const list = res.data?.data ?? [];
        const found = list.find((p: any) => String(p.id) === String(id));

        if (!found) {
          alert("Portofolio tidak ditemukan");
          navigate(-1);
          return;
        }

        setImages(sortImages(found.images ?? []));
      })
      .catch(() => {
        alert("Gagal load images");
      })
      .finally(() => setLoading(false));
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center space-y-3">
          <div className="w-12 h-12 border-3 border-slate-300 border-t-slate-600 rounded-full animate-spin mx-auto" />
          <p className="text-slate-600 text-sm">Memuat gambar...</p>
        </div>
      </div>
    );
  }

  const deleteImage = async (imageId: number) => {
    if (!confirm("Yakin ingin menghapus gambar ini?")) return;
    
    try {
      await api.delete(`/admin/portofolio/image/${imageId}`);
      setImages((prev) => prev.filter((i) => i.id !== imageId));
    } catch (error) {
      alert("Gagal menghapus gambar");
    }
  };

  const saveOrder = async () => {
    setIsSaving(true);
    try {
      await api.post(`/admin/portofolio/image/reorder`, {
        portofolio_id: Number(id),
        orders: images.map((img) => ({
          id: img.id,
          order: img.order,
        })),
      });

      alert("Urutan gambar berhasil disimpan");
    } catch (error) {
      alert("Gagal menyimpan urutan");
    } finally {
      setIsSaving(false);
    }
  };

  const uploadImages = async () => {
    if (newImages.length === 0) return;

    setIsUploading(true);
    try {
      const fd = new FormData();
      newImages.forEach((file) => fd.append("images[]", file));

      await api.post(`/admin/portofolio/${id}/images`, fd);
      window.location.reload();
    } catch (error) {
      alert("Gagal upload gambar");
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">
                Kelola Gambar Portfolio
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Atur, urutkan, dan kelola gambar portfolio Anda
              </p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Kembali
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Images Grid Section */}
        <section className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="w-1 h-6 bg-slate-800 rounded-full" />
            <h2 className="text-lg font-semibold text-slate-800">
              Galeri Gambar
              <span className="ml-2 text-sm font-normal text-slate-500">
                ({images.length} gambar)
              </span>
            </h2>
          </div>

          {images.length === 0 ? (
            <div className="bg-white rounded-lg border-2 border-dashed border-slate-200 p-16 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-slate-700 font-medium mb-1">Belum ada gambar</p>
              <p className="text-sm text-slate-500">Upload gambar pertama Anda di bawah</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((img) => (
                <div
                  key={img.id}
                  className="bg-white rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300"
                >
                  <ImageCard image={img} onDelete={deleteImage} />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Reorder Section */}
        {images.length > 0 && (
          <section className="bg-white rounded-lg border border-slate-200 p-6">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <div>
                <h2 className="text-base font-semibold text-slate-800">Urutkan Gambar</h2>
                <p className="text-sm text-slate-500">Drag & drop untuk mengatur urutan tampilan</p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-lg border border-slate-200 p-4 mb-4">
              <ImageReorder images={images} onChange={setImages} />
            </div>

            <button
              onClick={saveOrder}
              disabled={isSaving}
              className="w-full sm:w-auto px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Menyimpan...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Simpan Urutan
                </span>
              )}
            </button>
          </section>
        )}

        {/* Upload Section */}
        <section className="bg-white rounded-lg border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center">
              <svg className="w-4 h-4 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-semibold text-slate-800">Tambah Gambar Baru</h2>
              <p className="text-sm text-slate-500">Upload beberapa gambar sekaligus</p>
            </div>
          </div>

          <div className="bg-slate-50 rounded-lg border-2 border-dashed border-slate-300 p-4 mb-4">
            <ImageUploader value={newImages} onChange={setNewImages} />
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={uploadImages}
              disabled={isUploading || newImages.length === 0}
              className="flex-1 sm:flex-none px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Mengupload...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload {newImages.length > 0 && `(${newImages.length})`}
                </span>
              )}
            </button>

            {newImages.length > 0 && (
              <button
                onClick={() => setNewImages([])}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
              >
                Batal
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}