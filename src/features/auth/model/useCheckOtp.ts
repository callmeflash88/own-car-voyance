import { useState, useRef } from "react";
import { useCheckOtpMutation } from "../api/authApi";
import { useAuthFlow } from "./AuthFlowContext";

export const useCheckOtp = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [checkOtp, { isLoading, error }] = useCheckOtpMutation();
  const { setStep } = useAuthFlow();

  const inputs = Array.from({ length: 6 }, () =>
    useRef<HTMLInputElement>(null)
  );

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (!/^\d?$/.test(value)) return;
    e.target.value = value;
    updateOtp();

    if (value && index < inputs.length - 1) {
      inputs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !e.currentTarget.value && index > 0) {
      inputs[index - 1].current?.focus();
    }
  };

  const updateOtp = () => {
    const newOtp = inputs.map((ref) => ref.current?.value || "").join("");
    setOtp(newOtp);
  };

  const handleSubmit = async () => {
    await checkOtp({ email, otp });
    setStep("create");
  };

  return {
    inputs,
    email,
    setEmail,
    otp,
    handleChange,
    handleKeyDown,
    handleSubmit,
    isLoading,
    error,
  };
};
