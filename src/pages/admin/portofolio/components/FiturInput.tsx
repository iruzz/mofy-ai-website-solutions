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
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ketik fitur (contoh: Responsive Design) lalu Enter"
          disabled={disabled}
          className="flex-1 rounded-md bg-zinc-900 border border-zinc-700 p-3 text-sm focus:outline-none focus:border-blue-500 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={addFitur}
          disabled={disabled || !inputValue.trim()}
          className="px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
        >
          + Tambah
        </button>
      </div>

      {value.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm text-zinc-400">{value.length} fitur ditambahkan</p>
          <div className="flex flex-wrap gap-2">
            {value.map((fitur, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-blue-900/30 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-700"
              >
                <span>{fitur}</span>
                <button
                  type="button"
                  onClick={() => removeFitur(index)}
                  disabled={disabled}
                  className="text-blue-400 hover:text-blue-200 disabled:opacity-50 ml-1"
                  title="Hapus fitur"
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
