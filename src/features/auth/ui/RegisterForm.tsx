import { Car, Eye } from "lucide-react";
import { FormProvider } from "react-hook-form";
import {
  REGISTER_FORM_FIELDS,
  useRegisterForm,
} from "../model/useRegisterForm";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { Checkbox } from "@/shared/ui/checkbox";
import { Button } from "@/shared/ui";
import { AuthGoogleButton } from "@/features/auth-google-button/ui";
import { useAuthFlow } from "../model/AuthFlowContext";

type RegisterFormProps = {
  onSwitch?: () => void;
};

export const RegisterForm = ({ onSwitch }: RegisterFormProps) => {
  const { form, register, isLoading, error } = useRegisterForm();
  const { setStep } = useAuthFlow();

  const handleSubmit = async (data: any) => {
    const fullData = {
      ...data,
      role: 1,
    };
    await register(fullData);
    setStep("login");
    form.reset();
  };
  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-inter font-semibold text-[40px] leading-[54px] tracking-normal">
        Sign Up
      </h1>
      <p className="mt-2 font-inter font-normal text-base leading-tight tracking-normal text-[#2B2B2B80]">
        Join us and start exploring smarter car deals
      </p>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10">
          <div className="flex flex-col ">
            <RenderFormFields fields={REGISTER_FORM_FIELDS} />
          </div>
          <div className="flex items-center gap-2 mt-5">
            <Checkbox />
            <span className="font-inter font-normal text-sm leading-tight tracking-normal">
              I agree to the Terms & Conditions
            </span>
          </div>

          <Button
            variant="primary"
            type="submit"
            isLoading={isLoading}
            size="lg"
            className="w-full mt-10"
          >
            <span>Sign Up</span>
          </Button>
          <AuthGoogleButton />
          <p className="font-inter font-normal text-sm leading-relaxed tracking-normal text-center mt-5">
            Already have an account?{" "}
            <span
              className="text-[#4E17E5] font-[400]"
              onClick={() => setStep("login")}
            >
              Sign in
            </span>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};
