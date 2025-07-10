// src/features/auth/ui/LoginForm.tsx
"use client";

import { Button } from "@/shared/ui";
import { FormProvider } from "react-hook-form";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { Checkbox } from "@/shared/ui/checkbox";
import { AuthGoogleButton } from "@/features/auth-google-button/ui";
import { useAuthFlow } from "../model/AuthFlowContext";
import { useLoginForm, LOGIN_FORM_FIELDS } from "../model/useLoginForm";
import { CircleAlert } from "lucide-react";

export const LoginForm = ({ onSwitch }: { onSwitch?: () => void }) => {
  const { form, handleSubmit, isLoading, serverError } = useLoginForm();
  const { setStep } = useAuthFlow();

  const { errors } = form.formState;

  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-inter font-semibold text-[40px] leading-[54px] tracking-normal">
        Sign In
      </h1>
      <p className="mt-2 font-inter font-normal text-base leading-tight tracking-normal text-[#2B2B2B80]">
        Please enter your details to access your account
      </p>

      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="mt-10">
          {(Object.keys(errors).length > 0 || serverError) && (
            <div className=" text-red-600 p-3 rounded mb-4 text-sm space-y-1">
              {serverError && (
                <div className="flex items-center gap-2">
                  <CircleAlert size={16} />
                  {serverError}
                </div>
              )}
              {Object.values(errors).map((error, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CircleAlert size={16} />
                  {error?.message?.toString()}
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-col gap-2">
            <RenderFormFields fields={LOGIN_FORM_FIELDS} />
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="text-sm">Remember me</span>
            </div>
            <p
              className="text-sm text-[#4E17E5] cursor-pointer"
              onClick={() => setStep("forgot")}
            >
              Forgot Password?
            </p>
          </div>

          <Button
            variant="primary"
            type="submit"
            isLoading={isLoading}
            size="lg"
            className="w-full mt-10"
          >
            Sign In
          </Button>

          <AuthGoogleButton />

          <p className="text-sm text-center mt-5">
            Don’t have an account?{" "}
            <span
              className="text-[#4E17E5] cursor-pointer"
              onClick={() => setStep("register")}
            >
              Sign up
            </span>
          </p>
        </form>
      </FormProvider>
    </div>
  );
};
