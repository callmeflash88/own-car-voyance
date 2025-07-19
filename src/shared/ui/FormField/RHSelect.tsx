// components/RHSelect.tsx
import { Controller, useFormContext } from "react-hook-form";
import { FC } from "react";
import { Select } from "@/shared/ui/Select";

import { FormFieldVariants } from "./types";
import { FormField } from ".";

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
  variant?: FormFieldVariants;
  disabled?: boolean;
}

export const RHSelect: FC<RHSelectProps> = ({
  name,
  label,
  options,
  placeholder,
  className,
  fieldClassName,
  labelClassName,
  variant = FormFieldVariants.PRIMARY,
  disabled = false,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;
  const isShownError = !!error;

  return (
    <FormField
      className={fieldClassName}
      labelClassName={labelClassName}
      variant={variant}
      label={label}
      labelFor={name}
      isShownError={isShownError}
      error={error}
    >
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={field.onChange}
            options={options}
            placeholder={placeholder}
            disabled={disabled}
            className={className}
            isBordered
          />
        )}
      />
    </FormField>
  );
};
