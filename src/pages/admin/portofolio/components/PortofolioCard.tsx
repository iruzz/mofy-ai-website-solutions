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
      
      <div className="flex items-center justify-end mt-1 mb-2">
        <span className={`text-xs font-medium px-2 py-1 rounded ${
          data.paket === 'umkm' ? 'bg-blue-900/30 text-blue-300' :
          data.paket === 'profesional' ? 'bg-purple-900/30 text-purple-300' :
          data.paket === 'premium' ? 'bg-amber-900/30 text-amber-300' :
          'bg-zinc-800 text-zinc-300'
        }`}>
          {data.paket?.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2">
        {data.deskripsi}
      </p>

      {data.fitur_website && data.fitur_website.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1">
          {data.fitur_website.slice(0, 3).map((fitur, idx) => (
            <span key={idx} className="text-xs bg-green-900/30 text-green-300 px-2 py-1 rounded border border-green-700">
              {fitur}
            </span>
          ))}
          {data.fitur_website.length > 3 && (
            <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded border border-zinc-700">
              +{data.fitur_website.length - 3} more
            </span>
          )}
        </div>
      )}

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
