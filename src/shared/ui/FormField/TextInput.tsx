// components/TextInput.tsx
import { type FC, useMemo } from "react";

import cn from "classnames";
import { useFormContext } from "react-hook-form";
import { TEXT_INPUT_STYLE_VARIANTS } from "./constants";
import { FormFieldVariants } from "./types";
import { FormField } from ".";
import type { IFormField } from "../../types/form";

export const TextInput: FC<IFormField> = ({
  className,
  fieldClassName,
  labelClassName,
  id,
  label,
  variant = FormFieldVariants.PRIMARY,
  placeholder,
  isTextArea = false,
  mask,
  rows,
  maxLength,
  minLength,
  required,
  autoComplete,
  disabled,
  name,
  isError = true,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldId = id || name;
  const error = errors?.[name]?.message as string | undefined;
  const isShownError = isError && !!error;

  const InputComponent = useMemo(() => {
    if (mask) return "input";
    if (isTextArea) return "textarea";
    return "input";
  }, [mask, isTextArea]);

  const input = (
    <div
      className={cn(
        "relative flex items-center rounded-md border px-3 py-2",
        isShownError
          ? "border-red-500 focus-within:ring-red-500"
          : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500",
        {
          "opacity-50 cursor-not-allowed": disabled,
        }
      )}
    >
      <InputComponent
        id={fieldId}
        className={cn(
          "w-full bg-transparent outline-none placeholder-gray-400",
          className
        )}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        rows={isTextArea ? rows || 4 : undefined}
        maxLength={maxLength}
        minLength={minLength}
        required={required}
        {...register(name)}
      />
    </div>
  );

  return (
    <FormField
      className={fieldClassName}
      labelClassName={labelClassName}
      variant={variant}
      label={label}
      labelFor={fieldId}
      isShownError={isShownError}
      error={error}
    >
      {input}
    </FormField>
  );
};
