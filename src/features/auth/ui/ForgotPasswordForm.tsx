import { FormProvider } from "react-hook-form";
import {
  FORGOT_PASSWORD_FORM_FIELDS,
  useForgotForm,
} from "../model/useForgotPasswordForm";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { Button } from "@/shared/ui";
import { useAuthFlow } from "../model/AuthFlowContext";
import { ChevronLeft } from "lucide-react";

export const ForgotPasswordForm = () => {
  const { form, onSubmit, isLoading, error } = useForgotForm();
  const { setStep, setEmail } = useAuthFlow();

  const handleSubmitRecoveryPassword = async (data: any) => {
    console.log("data", data);
    await onSubmit(data);

    setEmail(data.email);
    setStep("otp");
  };

  return (
    <div className="flex flex-col justify-center">
      <p
        className="flex items-center gap-1 text-base leading-none cursor-pointer mb-2"
        onClick={() => setStep("login")}
      >
        <ChevronLeft size={13} />
        <span>Back</span>
      </p>
      <h1 className="font-inter font-semibold text-[32px] md:text-[40px] leading-[54px] tracking-normal">
        Reset Password
      </h1>
      <p className="mt-2 font-inter font-normal text-base leading-tight tracking-normal text-[#2B2B2B80]">
        Enter your registered email address. we’ll send
        <br /> you a code to reset your password.
      </p>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitRecoveryPassword)}>
          <div className="mt-5">
            <RenderFormFields fields={FORGOT_PASSWORD_FORM_FIELDS} />
          </div>
          <Button
            variant="primary"
            type="submit"
            isLoading={isLoading}
            size="lg"
            className="w-full mt-10"
          >
            <span>Send Code</span>
          </Button>
        </form>
      </FormProvider>
    </div>
  );
};
