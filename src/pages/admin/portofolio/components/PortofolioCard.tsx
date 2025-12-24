// src\pages\admin\portofolio\components\PortofolioCard.tsx

import { imageUrl } from "@/lib/imageUrl";
import { Portofolio } from "../utils/mapPortofolio";

interface Props {
  data: Portofolio;
  onEdit: () => void;
  onImages: () => void;
}

export default function PortofolioCard({
  data,
  onEdit,
  onImages,
}: Props) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      {/* Image */}
      {data.cover && (
        <img
          src={imageUrl(data.cover)}
          alt={data.title}
          className="mb-3 h-40 w-full rounded-lg object-cover"
        />
      )}



      {/* Content */}
      <h3 className="text-lg font-semibold">{data.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2">
        {data.deskripsi}
      </p>

      {/* Actions */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={onImages}
          className="flex-1 rounded bg-zinc-800 px-3 py-1.5 text-xs text-white hover:bg-zinc-700"
        >
          Images
        </button>

        <button
          onClick={onEdit}
          className="flex-1 rounded bg-primary px-3 py-1.5 text-xs text-white hover:bg-primary/90"
        >
          Edit
        </button>
      </div>
    </div>
  );
}
