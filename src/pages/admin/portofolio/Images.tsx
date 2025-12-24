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



  if (loading) return <p>Loading images...</p>;

  const deleteImage = async (imageId: number) => {
    await api.delete(`/admin/portofolio/image/${imageId}`);
    setImages((prev) => prev.filter((i) => i.id !== imageId));
  };

  const saveOrder = async () => {
    await api.post(`/admin/portofolio/image/reorder`, {
      portofolio_id: Number(id),
      orders: images.map((img) => ({
        id: img.id,
        order: img.order,
      })),
    });

    alert("Urutan gambar disimpan");
  };


  const uploadImages = async () => {
    if (newImages.length === 0) return;

    const fd = new FormData();
    newImages.forEach((file) => fd.append("images[]", file));

    await api.post(`/admin/portofolio/${id}/images`, fd);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">Manage Images</h1>
        <button
          onClick={() => navigate(-1)}
          className="text-sm text-muted-foreground"
        >
          ← Kembali
        </button>
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <ImageCard key={img.id} image={img} onDelete={deleteImage} />
        ))}
      </div>

      {/* Reorder */}
      <div className="space-y-2">
        <h2 className="font-semibold">Urutkan Gambar</h2>
        <ImageReorder images={images} onChange={setImages} />
        <button
          onClick={saveOrder}
          className="rounded bg-zinc-800 px-4 py-2 text-sm"
        >
          Simpan Urutan
        </button>
      </div>

      {/* Upload */}
      <div className="space-y-2">
        <h2 className="font-semibold">Tambah Gambar</h2>
        <ImageUploader value={newImages} onChange={setNewImages} />
        <button
          onClick={uploadImages}
          className="rounded bg-primary px-4 py-2 text-sm text-white"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
