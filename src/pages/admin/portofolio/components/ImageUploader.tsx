// src/pages/admin/portofolio/components/ImageUploader.tsx

import { useEffect, useState } from "react";

type Props = {
  value: File[];
  onChange: (files: File[]) => void;
};

export default function ImageUploader({ value, onChange }: Props) {
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    const urls = value.map((file) => URL.createObjectURL(file));
    setPreviews(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [value]);

  return (
    <div className="space-y-3">
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) => {
          const files = Array.from(e.target.files ?? []);
          onChange(files);
        }}
        className="block w-full text-sm file:mr-4 file:rounded-md
                   file:border-0 file:bg-zinc-800 file:px-4
                   file:py-2 file:text-white hover:file:bg-zinc-700"
      />

      {previews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {previews.map((src, i) => (
            <img
              key={i}
              src={src}
              className="h-32 w-full object-cover rounded-lg border border-zinc-700"
            />
          ))}
        </div>
      )}
    </div>
  );
}
