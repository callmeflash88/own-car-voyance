import React from "react";

interface OtpInputsProps {
  inputsRef: React.RefObject<(HTMLInputElement | null)[]>;
  onChange: (index: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (index: number, e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const OtpInputs = ({
  inputsRef,
  onChange,
  onKeyDown,
}: OtpInputsProps) => {
  return (
    <div className="flex gap-2">
      {inputsRef.current.map((ref, index) => (
        <input
          key={index}
          // ref={ref}
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
