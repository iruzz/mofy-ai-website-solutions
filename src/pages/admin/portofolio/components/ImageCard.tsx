// src/pages/admin/portofolio/components/ImageCard.tsx

import { imageUrl } from "@/lib/imageUrl"

type Props = { // target ambil data yang dibutuhkan dengan bagian ini saja
  image: {
    id: number;
    image: string;
  };
  onDelete: (id: number) => void;
};

export default function ImageCard({ image, onDelete }: Props) {
  return (
    <div className="relative group">
      <img
        src={imageUrl(image.image)}
        className="w-full h-full object-cover"
      />


      <button
        onClick={() => onDelete(image.id)}
        className="absolute top-2 right-2 bg-red-600 text-white
                   text-xs px-2 py-1 rounded opacity-0
                   group-hover:opacity-100 transition"
      >
        Delete
      </button>
    </div>
  );
}
