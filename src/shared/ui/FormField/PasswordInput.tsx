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

  const combinedClassNames = cn(
    "w-full outline-none",
    TEXT_INPUT_STYLE_VARIANTS[variant],
    className,
    {
      "!border-red-base": isShownError,
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

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
      <div className="relative">
        <input
          id={fieldId}
          type={showPassword ? "text" : "password"}
          className={combinedClassNames}
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
    </FormField>
  );
};
