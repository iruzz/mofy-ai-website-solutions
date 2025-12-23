// src/pages/admin/portofolio/Edit.tsx

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/lib/api";
import ImageUploader from "./components/ImageUploader";
import ImageCard from "./components/ImageCard";
import ImageReorder from "./components/ImageReorder";
import { sortImages } from "./utils/sortImages";

export default function EditPortofolio() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState<any>(null);
  const [images, setImages] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);

  useEffect(() => {
    if (!id) return;

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

        setData(found);
        setImages(sortImages(found.images ?? []));
      })
      .catch(() => {
        alert("Gagal load data portofolio");
      });
  }, [id, navigate]);


  if (!data) return <p>Loading...</p>;

  const saveInfo = async () => {
    await api.put(`/admin/portofolio/${id}`, {
      title: data.title,
      client: data.client,
      deskripsi: data.deskripsi,
      tanggal_projek: data.tanggal_projek,
    });
    alert("Info updated");
  };

  const uploadImages = async () => {
    const fd = new FormData();
    newImages.forEach((f) => fd.append("images[]", f));
    await api.post(`/admin/portofolio/${id}/images`, fd);
    location.reload();
  };

  const deleteImage = async (imageId: number) => {
    await api.delete(`/admin/portofolio/image/${imageId}`);
    setImages(images.filter((i) => i.id !== imageId));
  };

  const saveOrder = async () => {
    await api.post(`/admin/portofolio/image/reorder`, {
      portofolio_id: Number(id),
      orders: images.map((i) => ({
        id: i.id,
        order: i.order,
      })),
    });

    alert("Order saved");
  };


  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Portofolio</h1>

      {/* BASIC INFO */}
      <input
        className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
        value={data.title}
        onChange={(e) => setData({ ...data, title: e.target.value })}
      />

      <textarea
        className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded"
        value={data.deskripsi}
        onChange={(e) => setData({ ...data, deskripsi: e.target.value })}
      />

      <button onClick={saveInfo} className="btn-primary">
        Save Info
      </button>

      {/* EXISTING IMAGES */}
      <h2 className="font-semibold">Images</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <ImageCard key={img.id} image={img} onDelete={deleteImage} />
        ))}
      </div>

      {/* REORDER */}
      <ImageReorder images={images} onChange={setImages} />
      <button onClick={saveOrder} className="btn-secondary">
        Save Order
      </button>

      {/* ADD NEW */}
      <ImageUploader value={newImages} onChange={setNewImages} />
      <button onClick={uploadImages} className="btn-primary">
        Upload New Images
      </button>

      <button onClick={() => navigate(-1)} className="text-sm opacity-60">
        ← Back
      </button>
    </div>
  );
}
