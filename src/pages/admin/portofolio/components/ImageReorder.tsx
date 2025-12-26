// src/pages/admin/portofolio/components/ImageReorder.tsx

import { imageUrl } from "@/lib/imageUrl";

type ImageItem = {
  id: number;
  image: string;
  order: number;
};

type Props = {
  images: ImageItem[];
  onChange: (images: ImageItem[]) => void;
};

export default function ImageReorder({ images, onChange }: Props) {
  const move = (from: number, to: number) => {
    const arr = [...images];
    const item = arr.splice(from, 1)[0];
    arr.splice(to, 0, item);

    onChange(
      arr.map((img, i) => ({
        ...img,
        order: i,
      }))
    );
  };

  if (images.length === 0) {
    return (
      <div className="text-center py-8 text-slate-500 text-sm">
        Tidak ada gambar untuk diurutkan
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-sm text-slate-600 mb-3">
        Gunakan tombol panah untuk mengatur urutan tampilan gambar
      </p>
      
      {images.map((img, i) => (
        <div
          key={img.id}
          className="group flex items-center gap-4 bg-white border border-slate-200 p-3 rounded-lg hover:border-slate-300 hover:shadow-sm transition-all"
        >
          {/* Order Badge */}
          <div className="flex-shrink-0 w-10 h-10 bg-slate-800 text-white font-bold rounded-lg flex items-center justify-center">
            {i + 1}
          </div>

          {/* Image Preview */}
          <div className="flex-shrink-0 w-20 h-16 bg-slate-100 rounded-lg overflow-hidden border border-slate-200">
            <img 
              src={imageUrl(img.image)} 
              alt={`Image ${i + 1}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Image Info */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-700 truncate">
              Gambar #{i + 1}
            </p>
            <p className="text-xs text-slate-500">
              Order: {img.order}
            </p>
          </div>

          {/* Controls */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <button
              disabled={i === 0}
              onClick={() => move(i, i - 1)}
              className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
              title="Pindah ke atas"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </button>
            
            <button
              disabled={i === images.length - 1}
              onClick={() => move(i, i + 1)}
              className="w-9 h-9 flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
              title="Pindah ke bawah"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Move to Top/Bottom buttons (optional) */}
            {images.length > 3 && (
              <>
                <div className="w-px h-6 bg-slate-300 mx-1" />
                <button
                  disabled={i === 0}
                  onClick={() => move(i, 0)}
                  className="hidden sm:flex w-9 h-9 items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
                  title="Pindah ke paling atas"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 11l7-7 7 7M5 19l7-7 7 7" />
                  </svg>
                </button>
                
                <button
                  disabled={i === images.length - 1}
                  onClick={() => move(i, images.length - 1)}
                  className="hidden sm:flex w-9 h-9 items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-slate-100"
                  title="Pindah ke paling bawah"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 5l-7 7-7-7M19 13l-7 7-7-7" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      ))}

      {/* Summary */}
      <div className="flex items-center gap-2 pt-2 text-xs text-slate-500">
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span>Total {images.length} gambar. Gambar pertama akan menjadi cover.</span>
      </div>
    </div>
  );
}