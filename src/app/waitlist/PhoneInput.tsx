"use client";

import { forwardRef, useEffect, useRef } from "react";
import IMask from "imask";
import clsx from "clsx";
import type { ReactNode } from "react";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
}

export const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      label,
      error,
      icon,
      iconPosition = "left",
      className,
      value,
      onChange,
      placeholder = "+1 (___) ___-____",
      ...props
    },
    ref
  ) => {
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (inputRef.current) {
        const mask = IMask(inputRef.current, {
          mask: "+1 (000) 000-0000",
        });

        return () => mask.destroy();
      }
    }, []);

    return (
      <div>
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
            ref={(el) => {
              inputRef.current = el;
              if (typeof ref === "function") ref(el);
              else if (ref)
                (
                  ref as React.MutableRefObject<HTMLInputElement | null>
                ).current = el;
            }}
            type="tel"
            placeholder={placeholder}
            value={value}
            onChange={onChange}
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

PhoneInput.displayName = "PhoneInput";
