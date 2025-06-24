"use client";

import { Button } from "@/shared/ui";
import { OtpInputs } from "./OtpInputs";
import { useCheckOtp } from "../model/useCheckOtp";
import { ArrowLeft } from "lucide-react";
import { useAuthFlow } from "../model/AuthFlowContext";

export const CheckOtpForm = () => {
  const {
    inputs,
    email,
    setEmail,
    handleChange,
    handleKeyDown,
    handleSubmit,
    isLoading,
  } = useCheckOtp();

  return (
    <div className="flex flex-col justify-center space-y-2">
      <p className="font-inter font-normal text-base leading-none tracking-normal flex gap-2 items-center">
        <ArrowLeft size={14} /> Back
      </p>
      <h1 className="font-inter font-semibold text-[40px] leading-[54px] tracking-normal">
        Reset Password
      </h1>

      <p className="mt-2 font-inter font-normal text-base leading-tight tracking-normal text-[#2B2B2B80]">
        Enter your registered email address. we’ll send
        <br /> you a code to reset your password.
      </p>

      <p className="font-inter font-medium text-base leading-relaxed tracking-normal">
        Enter Code
      </p>

      <OtpInputs
        inputs={inputs}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />

      <div className="flex flex-col justify-center items-center">
        <Button
          variant="primary"
          type="submit"
          isLoading={isLoading}
          size="lg"
          className="w-full mt-10"
          onClick={handleSubmit}
        >
          <span>Reset</span>
        </Button>

        <p className="text-sm text-gray-700 mt-2">
          Didn’t receive a code?{" "}
          <button className="text-purple-600 underline hover:text-[#4E17E5]">
            Send again
          </button>
        </p>
      </div>
    </div>
  );
};
