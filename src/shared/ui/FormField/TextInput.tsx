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
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldId = id || name;
  const error = errors?.[name]?.message as string | undefined;
  const isShownError = !!error;

  const combinedClassNames = cn(
    "w-full outline-none ",
    TEXT_INPUT_STYLE_VARIANTS[variant],
    className,
    {
      "resize-y min-h-[120px]": isTextArea,
      "!border-red-base": isShownError,
      "opacity-50 cursor-not-allowed": disabled,
    }
  );

  const InputComponent = useMemo(() => {
    if (mask) return "input";
    if (isTextArea) return "textarea";
    return "input";
  }, [mask, isTextArea]);

  const commonProps = {
    id: fieldId,
    className: combinedClassNames,
    placeholder,
    disabled,
    autoComplete,
    rows: isTextArea ? rows || 4 : undefined,
    maxLength,
    minLength,
    required,
    ...register(name),
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
      <>
        <InputComponent {...commonProps} />
        {isTextArea && maxLength && (
          <div className="flex justify-end mt-1 text-xs text-gray-400">
            {/* You'll need to manage char counter manually if needed */}
          </div>
        )}
      </>
    </FormField>
  );
};
