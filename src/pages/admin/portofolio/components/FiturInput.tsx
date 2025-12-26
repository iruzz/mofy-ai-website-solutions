// src/pages/admin/portofolio/components/FiturInput.tsx

import { useState } from "react";

type Props = {
  value: string[];
  onChange: (fitur: string[]) => void;
  disabled?: boolean;
};

export default function FiturInput({ value, onChange, disabled = false }: Props) {
  const [inputValue, setInputValue] = useState("");

  const addFitur = () => {
    if (inputValue.trim() && !value.includes(inputValue.trim())) {
      onChange([...value, inputValue.trim()]);
      setInputValue("");
    }
  };

  const removeFitur = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFitur();
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik fitur (contoh: Responsive Design) lalu tekan Enter"
          disabled={disabled}
          className="flex-1 rounded-lg bg-white border border-slate-300 p-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
        />
        <button
          type="button"
          onClick={addFitur}
          disabled={disabled || !inputValue.trim()}
          className="px-5 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          + Tambah
        </button>
      </div>

      {value.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            <span className="font-medium">{value.length} fitur ditambahkan</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {value.map((fitur, index) => (
              <div
                key={index}
                className="group flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-lg text-sm border border-emerald-200 hover:border-emerald-300 transition-colors"
              >
                <span>{fitur}</span>
                <button
                  type="button"
                  onClick={() => removeFitur(index)}
                  disabled={disabled}
                  className="text-emerald-600 hover:text-emerald-800 disabled:opacity-50 transition-colors"
                  title="Hapus fitur"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}