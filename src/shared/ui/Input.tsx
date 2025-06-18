import { forwardRef, ReactNode } from "react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, iconPosition = "left", className, ...props }, ref) => {
    return (
      <div className="">
        {label && (
          <label className="block mb-1 text-sm font-medium text-gray-700">
            {label}
          </label>
        )}
        <div
          className={clsx(
            "relative flex items-center rounded-md border px-3 py-2",
            error
              ? "border-red-500 focus-within:ring-red-500"
              : "border-gray-300 focus-within:ring-2 focus-within:ring-blue-500"
          )}
        >
          {icon && iconPosition === "left" && (
            <div className="mr-2 text-gray-500">{icon}</div>
          )}
          <input
            ref={ref}
            className={clsx(
              "w-full bg-transparent outline-none placeholder-gray-400",
              className
            )}
            {...props}
          />
          {icon && iconPosition === "right" && (
            <div className="ml-2 text-gray-500">{icon}</div>
          )}
        </div>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
