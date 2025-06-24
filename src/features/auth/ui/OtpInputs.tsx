import React from "react";

interface Props {
  inputs: React.RefObject<HTMLInputElement | null>[]; // ← исправлено здесь
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const OtpInputs = ({ inputs, onChange, onKeyDown }: Props) => {
  return (
    <div className="flex gap-2">
      {inputs.map((ref, index) => (
        <input
          key={index}
          ref={ref}
          type="text"
          inputMode="numeric"
          maxLength={1}
          onChange={(e) => onChange(index, e)}
          onKeyDown={(e) => onKeyDown(index, e)}
          className="w-12 h-12 text-center text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4E17E5]"
        />
      ))}
    </div>
  );
};
