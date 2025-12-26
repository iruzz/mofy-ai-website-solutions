// src/pages/admin/portofolio/components/ImageUploader.tsx

import { useRef, useState } from "react";

type Props = {
  value: File[];
  onChange: (files: File[]) => void;
  disabled?: boolean;
};

export default function ImageUploader({ value, onChange, disabled = false }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    processFiles(files);
  };

  const processFiles = (files: File[]) => {
    // Filter only image files
    const imageFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB
      
      if (!isImage) {
        console.warn(`File ${file.name} is not an image (${file.type})`);
      }
      if (!isValidSize) {
        console.warn(`File ${file.name} is too large (${(file.size / 1024 / 1024).toFixed(2)}MB)`);
      }
      
      return isImage && isValidSize;
    });

    // Log file details for debugging
    console.log('Selected files:', imageFiles.map(f => ({
      name: f.name,
      type: f.type,
      size: f.size,
      sizeKB: (f.size / 1024).toFixed(2) + ' KB'
    })));

    onChange([...value, ...imageFiles]);
  };

  const removeFile = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const triggerFileInput = () => {
    inputRef.current?.click();
  };

  // Drag and Drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    processFiles(files);
  };

  return (
    <div className="space-y-4">
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {/* Upload Area with Drag & Drop */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={`
          relative cursor-pointer p-10 
          border-2 border-dashed rounded-xl
          transition-all duration-200
          ${isDragging 
            ? 'border-blue-400 bg-blue-50 scale-[1.02]' 
            : 'border-slate-300 bg-white hover:border-slate-400 hover:bg-slate-50'
          }
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div className="flex flex-col items-center gap-4 text-center pointer-events-none">
          {/* Icon */}
          <div className={`
            w-16 h-16 rounded-2xl flex items-center justify-center
            transition-colors duration-200
            ${isDragging ? 'bg-blue-100' : 'bg-slate-100'}
          `}>
            <svg 
              className={`w-8 h-8 transition-colors ${isDragging ? 'text-blue-600' : 'text-slate-600'}`}
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              {isDragging ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              )}
            </svg>
          </div>

          {/* Text */}
          <div>
            <p className="text-base font-semibold text-slate-700 mb-1">
              {isDragging ? 'Drop gambar di sini' : 'Klik atau drag & drop'}
            </p>
            <p className="text-sm text-slate-500">
              PNG, JPG, JPEG, atau WebP
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Maksimal 5MB per file
            </p>
          </div>

          {/* Browse Button */}
          {!isDragging && (
            <button
              type="button"
              className="mt-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                triggerFileInput();
              }}
            >
              Pilih File
            </button>
          )}
        </div>
      </div>

      {/* Preview Files */}
      {value.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="font-semibold">{value.length} gambar siap diupload</span>
            </div>
            <button
              type="button"
              onClick={() => onChange([])}
              disabled={disabled}
              className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
            >
              Hapus Semua
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {value.map((file, index) => (
              <div key={index} className="group relative">
                {/* Image preview */}
                <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden border-2 border-slate-200 group-hover:border-slate-300 transition-all">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex flex-col items-center justify-end p-3">
                  <div className="text-center mb-2">
                    <p className="text-xs text-white font-medium truncate w-full mb-1">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-300">
                      {(file.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  disabled={disabled}
                  className="absolute -top-2 -right-2 w-7 h-7 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
                  title="Hapus gambar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Order badge */}
                <div className="absolute top-2 left-2 w-6 h-6 bg-slate-800/80 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}