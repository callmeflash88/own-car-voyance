"use client";

import { useState, useRef } from "react";
import { useCheckOtpMutation } from "../api/authApi";
import { useAuthFlow } from "./AuthFlowContext";

export const useCheckOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [checkOtp, { isLoading, error }] = useCheckOtpMutation();
  const { setStep } = useAuthFlow();

  // Используем один useRef с массивом внутри
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    e.target.value = value;
    updateOtp();

    if (value && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const updateOtp = () => {
    const newOtp = inputsRef.current.map((ref) => ref?.value || "").join("");
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    await checkOtp({ email, otp });
    setStep("create");
  };

  return {
    email,
    setEmail,
    otp,
    handleChange,
    handleKeyDown,
    handleSubmit,
    isLoading,
    error,
    inputsRef,
  };
};
