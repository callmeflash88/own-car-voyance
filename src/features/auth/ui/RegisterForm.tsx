"use client";

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
import { NotificationService } from "@/shared/lib/NotificationService";
import { CircleAlert } from "lucide-react";

type RegisterFormProps = {
  onSwitch?: () => void;
};

export const RegisterForm = ({ onSwitch }: RegisterFormProps) => {
  const { form, register, isLoading } = useRegisterForm();
  const { setStep } = useAuthFlow();
  const { errors } = form.formState;

  const normalizePhone = (phone: string): string =>
    "+" + phone.replace(/\D/g, "");

  const handleSubmit = async (data: any) => {
    const normalizedPhone = normalizePhone(data.phone);

    const fullData = {
      ...data,
      phone: normalizedPhone,
      role: 1,
    };

    try {
      await register(fullData).unwrap();
      NotificationService.success("Registration successful!");
      setStep("login");
      form.reset();
    } catch (err: any) {
      const message =
        err?.data?.message ||
        err?.error ||
        "Registration failed. Please try again.";

      NotificationService.error(message);
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-inter font-semibold text-[32px] md:text-[40px] leading-[54px] tracking-normal">
        Sign Up
      </h1>
      <p className="mt-2 font-inter text-base text-[#2B2B2B80]">
        Join us and start exploring smarter car deals
      </p>

      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10">
          {Object.keys(errors).length > 0 && (
            <div className=" text-red-600 p-3 rounded mb-4 text-sm space-y-1">
              {Object.values(errors).map((error, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="min-w-4">
                    <CircleAlert size={16} />
                  </div>
                  <span>{error?.message?.toString()}</span>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col">
            <RenderFormFields fields={REGISTER_FORM_FIELDS} />
          </div>

          <div className="flex items-center gap-2 mt-5">
            <input
              type="checkbox"
              id="terms"
              {...form.register("terms")}
              className="w-4 h-4"
            />
            <label htmlFor="terms" className="text-sm">
              I agree to the Terms & Conditions
            </label>
          </div>
          {/* {errors.terms && (
            <p className="text-sm text-red-600 mt-1 flex items-center gap-1">
              <CircleAlert size={16} />
              {errors.terms.message?.toString()}
            </p>
          )} */}

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

          <p className="text-sm text-center mt-5">
            Already have an account?{" "}
            <span
              className="text-[#4E17E5] cursor-pointer font-medium"
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
