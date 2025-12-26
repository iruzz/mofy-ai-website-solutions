// src/pages/admin/portofolio/components/ImageUploader.tsx

import { useEffect, useRef, useState } from "react";

type Props = {
  value: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
};

export default function ImageUploader({ value, onChange, disabled = false }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    onChange([...value, ...files]); // Append to existing files
  };

  const removeImage = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index);
    onChange(newFiles);
  };

  const clearAll = () => {
    onChange([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          disabled={disabled}
          className="block w-full text-sm file:mr-4 file:rounded-md
                     file:border-0 file:bg-zinc-800 file:px-4
                     file:py-2 file:text-white hover:file:bg-zinc-700
                     disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {previews.length > 0 && (
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <p className="text-sm text-zinc-400">{previews.length} gambar dipilih</p>
            <button
              type="button"
              onClick={clearAll}
              disabled={disabled}
              className="text-sm px-2 py-1 bg-red-900/30 text-red-300 rounded hover:bg-red-900/50 disabled:opacity-50"
            >
              Hapus Semua
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {previews.map((src, i) => (
              <div key={i} className="relative group">
                <img
                  src={src}
                  className="h-32 w-full object-cover rounded-lg border border-zinc-700"
                  alt={`Preview ${i + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeImage(i)}
                  disabled={disabled}
                  className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity disabled:opacity-50"
                  title="Hapus gambar ini"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
