// shared/ui/Button/Button.tsx
import { cn } from "@/shared/lib/utils";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonSize = "sm" | "md" | "lg";
type ButtonVariant = "primary" | "secondary" | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  size?: ButtonSize;
  variant?: ButtonVariant;
  className?: string;
  isLoading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-8 py-3 text-lg",
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-[#4E17E5] text-white hover:bg-[#3d13b6]",
  secondary: "bg-[#2B2B2B] text-white",
  outline: "border border-gray-400 text-black hover:bg-gray-100",
};

export const Button = ({
  children,
  size = "md",
  variant = "primary",
  className,
  isLoading = false,
  disabled,
  iconLeft,
  iconRight,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled || isLoading}
      className={cn(
        "rounded-full flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
      ) : (
        <>
          {iconLeft && <span>{iconLeft}</span>}
          <span>{children}</span>
          {iconRight && <span>{iconRight}</span>}
        </>
      )}
    </button>
  );
};
