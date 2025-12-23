// src/pages/admin/portofolio/Create.tsx

import { useState } from "react";
import api from "@/lib/api";
import ImageUploader from "./components/ImageUploader";
import { buildFormData } from "./utils/buildFormData";
import { useNavigate } from "react-router-dom";

export default function CreatePortofolio() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [client, setClient] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    try {
      const formData = buildFormData({
        title,
        client,
        deskripsi,
        tanggal_projek: tanggal,
        images,
      });

      await api.post("/admin/portofolio", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/portadmin");
    } catch (err) {
      console.error(err);
      alert("Gagal membuat portofolio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Portofolio</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3"
          placeholder="Client"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          required
        />

        <textarea
          className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3 min-h-[120px]"
          placeholder="Deskripsi"
          value={deskripsi}
          onChange={(e) => setDeskripsi(e.target.value)}
          required
        />

        <input
          type="date"
          className="w-full rounded-md bg-zinc-900 border border-zinc-700 p-3"
          value={tanggal}
          onChange={(e) => setTanggal(e.target.value)}
          required
        />

        <ImageUploader value={images} onChange={setImages} />

        <button
          disabled={loading}
          className="px-6 py-3 rounded-md bg-white text-black
                     hover:bg-zinc-200 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Portofolio"}
        </button>
      </form>
    </div>
  );
}
