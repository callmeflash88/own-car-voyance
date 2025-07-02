// components/PasswordInput.tsx
import { useState, type FC } from "react";
import cn from "classnames";
import { useFormContext } from "react-hook-form";

import { FormField } from ".";
import { TEXT_INPUT_STYLE_VARIANTS } from "./constants";
import { FormFieldVariants } from "./types";
import type { IFormField } from "../../types/form";
import { Eye, EyeOff } from "lucide-react";

export const PasswordInput: FC<IFormField> = ({
  className,
  fieldClassName,
  labelClassName,
  id,
  label,
  variant = FormFieldVariants.PRIMARY,
  placeholder,
  name,
  disabled,
  autoComplete,
  required,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const fieldId = id || name;

  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors?.[name]?.message as string | undefined;
  const isShownError = !!error;

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      <input
        id={fieldId}
        type={showPassword ? "text" : "password"}
        className={cn(
          "w-full bg-transparent outline-none placeholder-gray-400",
          className
        )}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        {...register(name, { required })}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        onClick={togglePasswordVisibility}
        aria-label="Toggle password visibility"
      >
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
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
