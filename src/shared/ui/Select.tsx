import { cn } from "@/shared/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { FC } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isBordered?: boolean;
}

export const Select: FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = "",
  isBordered = true,
}) => {
  return (
    <div className={`relative w-full text-black ${className}`}>
      {label && (
        <label className="block mb-1 text-sm font-medium">{label}</label>
      )}
      <select
        className={cn(
          "w-full appearance-none px-3 py-2 rounded-md focus:outline-none focus:ring-2",
          isBordered && "border border-gray-300", // Apply border only if isBordered is true
          disabled ? "bg-gray-100 cursor-not-allowed" : "focus:ring-blue-500",
          "pr-10"
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
        <ChevronDownIcon />
      </div>
    </div>
  );
};
