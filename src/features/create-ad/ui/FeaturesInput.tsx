"use client";
import { X, Plus } from "lucide-react";
import { useState } from "react";

interface FeaturesInputProps {
  value: string[];
  onChange: (features: string[]) => void;
}

export const FeaturesInput = ({ value, onChange }: FeaturesInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addFeature = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
      setInputValue("");
    }
  };

  const removeFeature = (feature: string) => {
    onChange(value.filter((f) => f !== feature));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addFeature();
    }
  };

  return (
    <div className="w-full flex flex-col gap-2">
      <label className="font-bold text-gray-800 text-xl">Features</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="ex. Sunroof"
          className="flex-1 border border-gray-300 rounded-2xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
        />
        <button
          type="button"
          onClick={addFeature}
          className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-2xl p-3"
        >
          <Plus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-3 mt-2">
        {value.map((feature) => (
          <div
            key={feature}
            className="flex items-center bg-gray-200 rounded-full px-4 py-2 text-gray-700 text-sm"
          >
            <span>#{feature}</span>
            <button
              type="button"
              onClick={() => removeFeature(feature)}
              className="ml-2 text-gray-500 hover:text-gray-800"
            >
              <X size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
