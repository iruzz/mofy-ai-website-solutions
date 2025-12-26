// src\pages\admin\portofolio\components\PortofolioCard.tsx

import { imageUrl } from "@/lib/imageUrl";
import { Portofolio } from "../utils/mapPortofolio";

interface Props {
  data: Portofolio;
  onEdit: () => void;
  onImages: () => void;
  onDelete: () => void;
}

export default function PortofolioCard({
  data,
  onEdit,
  onImages,
  onDelete,
}: Props) {
  return (
    <div className="group relative bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-slate-300">
      {/* Image */}
      {data.cover && (
        <div className="relative h-48 w-full overflow-hidden bg-slate-100">
          <img
            src={imageUrl(data.cover)}
            alt={data.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          
          {/* Package Badge on Image */}
          <div className="absolute top-3 right-3">
            <span className={`text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm ${
              data.paket === 'umkm' ? 'bg-blue-500/90 text-white' :
              data.paket === 'profesional' ? 'bg-purple-500/90 text-white' :
              data.paket === 'premium' ? 'bg-amber-500/90 text-white' :
              'bg-slate-800/90 text-white'
            }`}>
              {data.paket?.toUpperCase()}
            </span>
          </div>

          {/* Delete Button (appears on hover) */}
          <button
            onClick={onDelete}
            className="absolute top-3 left-3 w-8 h-8 bg-red-500/90 hover:bg-red-600 backdrop-blur-sm text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center"
            title="Hapus portfolio"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      )}

      {/* Content */}
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-semibold text-slate-800 line-clamp-1">
          {data.title}
        </h3>

        <p className="text-sm text-slate-600 line-clamp-2 min-h-[40px]">
          {data.deskripsi}
        </p>

        {/* Features */}
        {data.fitur_website && data.fitur_website.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {data.fitur_website.slice(0, 3).map((fitur, idx) => (
              <span 
                key={idx} 
                className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200"
              >
                {fitur}
              </span>
            ))}
            {data.fitur_website.length > 3 && (
              <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md border border-slate-200">
                +{data.fitur_website.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={onImages}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Gambar
          </button>

          <button
            onClick={onEdit}
            className="flex-1 flex items-center justify-center gap-1.5 rounded-lg bg-slate-800 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}