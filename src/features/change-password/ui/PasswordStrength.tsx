"use client";
import { useEffect, useState } from "react";

interface PasswordStrengthProps {
  password: string;
}

export const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const [strength, setStrength] = useState<"Weak" | "Medium" | "Strong">(
    "Weak"
  );

  useEffect(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) setStrength("Weak");
    else if (score === 2 || score === 3) setStrength("Medium");
    else setStrength("Strong");
  }, [password]);

  const getColor = () => {
    if (strength === "Weak") return "bg-red-500";
    if (strength === "Medium") return "bg-yellow-500";
    return "bg-green-600";
  };

  return (
    <div className="flex items-center gap-2">
      <div className="w-full h-2 rounded bg-gray-200">
        <div
          className={`h-2 rounded ${getColor()}`}
          style={{
            width:
              strength === "Weak"
                ? "33%"
                : strength === "Medium"
                ? "66%"
                : "100%",
          }}
        />
      </div>
      <span className="text-sm text-gray-600">{strength}</span>
    </div>
  );
};
