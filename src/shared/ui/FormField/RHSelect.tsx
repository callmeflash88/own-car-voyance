import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import { Select } from "@/shared/ui/Select";

interface Option {
  value: string;
  label: string;
}

interface RHSelectProps {
  name: string;
  label: string;
  options: Option[];
  placeholder?: string;
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
}

export const RHSelect: FC<RHSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  className,
  fieldClassName,
  labelClassName,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          label={label}
          value={field.value}
          onChange={field.onChange}
          options={options}
          placeholder={placeholder}
          className={className}
          isBordered
        />
      )}
    />
  );
};
