import { useAuthFlow } from "@/features/auth/model/AuthFlowContext";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { ForgotPasswordForm } from "./ForgotPasswordForm";
import { CheckOtpForm } from "./CheckOtpForm";
import { CreatePasswordForm } from "./CreatePasswordForm";

export const AuthUI = () => {
  const { step } = useAuthFlow();

  return (
    <div className="flex-1 w-full flex items-center justify-center !z-10">
      {step === "login" && <LoginForm />}
      {step === "register" && <RegisterForm />}
      {step === "forgot" && <ForgotPasswordForm />}
      {step === "otp" && <CheckOtpForm />}
      {step === "create" && <CreatePasswordForm />}
    </div>
  );
};
