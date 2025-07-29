"use client";
import { useAuthFlow } from "@/features/auth/model/AuthFlowContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { CheckOtpForm } from "./CheckOtpForm";
import { CreatePasswordForm } from "./CreatePasswordForm";
import { VaerificatePhone } from "./VaerificatePhone";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export const AuthUI = () => {
  const { step, setStep } = useAuthFlow();
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryStep = searchParams.get("step");
    if (queryStep) {
      setStep(queryStep as any);
    }
  }, [searchParams]);

  return (
    // FOR TEST
    <div className="flex-1 w-full flex items-center justify-center !z-10">
      {step === "login" && <LoginForm />}
      {step === "register" && <RegisterForm />}
      {step === "forgot" && <ForgotPasswordForm />}
      {step === "otp" && <CheckOtpForm />}
      {step === "create" && <CreatePasswordForm />}
      {step === "verification-phone" && <VaerificatePhone />}
    </div>
  );
};
