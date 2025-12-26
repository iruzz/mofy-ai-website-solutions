// src/pages/admin/portofolio/components/ImageCard.tsx

import { imageUrl } from "@/lib/imageUrl"
import { useState } from "react";

type Props = {
  image: {
    id: number;
    image: string;
  };
  onDelete: (id: number) => Promise<void> | void;
};

export default function ImageCard({ image, onDelete }: Props) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(image.id);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="relative group">
      <img
        src={imageUrl(image.image)}
        className="w-full h-32 object-cover rounded-lg border border-zinc-700"
        alt="Portfolio"
      />

      <button
        onClick={handleDelete}
        disabled={deleting}
        className="absolute top-2 right-2 bg-red-600 text-white
                   text-xs px-2 py-1 rounded opacity-0
                   group-hover:opacity-100 transition
                   disabled:opacity-50 disabled:cursor-not-allowed
                   hover:bg-red-700"
        title="Hapus gambar"
      >
        {deleting ? "..." : "✕"}
      </button>
    </div>
  );
}
