import cn from "classnames";
import type { FC, ReactNode } from "react";
import { Label } from "./Label";
import { FormFieldVariants } from "./types";

import { FORM_FIELD_STYLE_VARIANTS } from "./constants";

interface Props {
  children: ReactNode;
  className?: string;
  labelClassName?: string;
  variant?: FormFieldVariants;
  label?: string;
  labelFor: string;
  isShownError?: boolean;
  error?: string;
}

export const FormField: FC<Props> = ({
  children,
  className,
  labelClassName,
  variant,
  label,
  labelFor,
  isShownError,
  error,
}) => {
  const safeVariant = variant ?? FormFieldVariants.PRIMARY;

  const combinedClassNames = cn(
    "relative w-full",
    FORM_FIELD_STYLE_VARIANTS[safeVariant],
    className,
    { "flex flex-col gap-1.5": label }
  );

  return (
    <div className={combinedClassNames}>
      {label && (
        <Label
          className={labelClassName}
          variant={safeVariant}
          htmlFor={labelFor}
        >
          {label}
        </Label>
      )}
      {children}
      {isShownError && error && (
        <div className="text-red-500 text-sm mt-1">{error}</div>
      )}
    </div>
  );
};
