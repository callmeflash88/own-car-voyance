import cn from "classnames";
import { FormFieldVariants } from "./types";
import type { FC } from "react";
import { LABEL_STYLE_VARIANTS } from "./constants";

interface Props {
  children: string;
  className?: string;
  variant?: FormFieldVariants;
  htmlFor?: string;
}

export const Label: FC<Props> = ({
  className,
  children,
  variant = FormFieldVariants.PRIMARY,
  htmlFor,
}) => {
  if (!children) return null;

  return (
    <label
      htmlFor={htmlFor}
      className={cn(
        "whitespace-nowrap",
        LABEL_STYLE_VARIANTS[variant],
        className
      )}
    >
      {children}
    </label>
  );
};
