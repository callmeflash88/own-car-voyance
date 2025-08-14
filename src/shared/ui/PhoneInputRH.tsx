"use client";

import { Controller, useFormContext } from "react-hook-form";
import { PhoneInput } from "@/app/waitlist/PhoneInput";

const REGEX_PHONE = /^\+1\d{10}$/; // American phone number regex

// Normalize phone: +1XXXXXXXXXX
const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  return "+" + digits;
};

interface PhoneInputRHProps {
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
  fieldClassName?: string;
  labelClassName?: string;
  isError?: boolean;
}

export const PhoneInputRH = ({
  name,
  label,
  placeholder,
  required,
  className,
  fieldClassName,
  labelClassName,
  isError = true,
}: PhoneInputRHProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required ? "Phone is required" : false,
        validate: (value) => {
          const normalized = normalizePhone(value || "");
          return REGEX_PHONE.test(normalized) || "Invalid phone number format";
        },
      }}
      render={({ field }) => (
        <PhoneInput
          {...field}
          label={label}
          placeholder={placeholder}
          className={className}
          error={
            isError !== false ? errors[name]?.message?.toString() : undefined
          }
        />
      )}
    />
  );
};
