import { cn } from "@/shared/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { FC } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  // select should have id or name
  name?: string;
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  isBordered?: boolean;
  labelClassName?: string;
  icon?: React.ReactNode;
  fieldClassName?: string;
}

export const Select: FC<SelectProps> = ({
  name,
  options,
  value,
  onChange,
  placeholder = "Select...",
  disabled = false,
  className = "",
  isBordered = true,
  icon,
  fieldClassName,
}) => {
  return (
    <div className={cn("relative w-full text-black", className)}>
      {icon && (
        <div className="pointer-events-none absolute left-3 top-1/2 transform -translate-y-1/2">
          {icon}
        </div>
      )}
      <select
        name={name}
        className={cn(
          "w-full appearance-none px-3 py-2 rounded-md focus:outline-none focus:ring-2 cursor-pointer",
          isBordered && "border border-gray-300",
          disabled ? "bg-gray-100 cursor-not-allowed" : "focus:ring-blue-500",
          value === "" ? "text-gray-400" : "text-black",
          icon && "pl-10",
          "pr-10",
          fieldClassName
        )}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
      >
        <option value="" disabled className="text-gray-400">
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
