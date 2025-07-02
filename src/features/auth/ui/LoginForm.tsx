// src/features/auth/ui/LoginForm.tsx
"use client";
import { Button, Input } from "@/shared/ui";
import { Car, Eye } from "lucide-react";
import { useState } from "react";
import { LOGIN_FORM_FIELDS, useLoginForm } from "../model/useLoginForm";
import { FormProvider } from "react-hook-form";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { Checkbox } from "@/shared/ui/checkbox";
import { AuthGoogleButton } from "@/features/auth-google-button/ui";
import { useAuthFlow } from "../model/AuthFlowContext";
import { useRouter } from "next/navigation";

type LoginFormProps = {
  onSwitch?: () => void;
};

export const LoginForm = ({ onSwitch }: LoginFormProps) => {
  const { form, onSubmit, isLoading, error } = useLoginForm();
  const { setStep } = useAuthFlow();
  const router = useRouter();

  const handleSubmit = async (data: any) => {
    try {
      const result = await onSubmit(data); // або просто login, якщо без обгортки
      form.reset();
      router.push("/"); // редірект на головну
    } catch (e) {
      console.error("Login failed", e); // залиш для відлагодження
    }
  };

  return (
    <div className="flex flex-col justify-center">
      <h1 className="font-inter font-semibold text-[40px] leading-[54px] tracking-normal">
        Sign In
      </h1>
      <p className="mt-2 font-inter font-normal text-base leading-tight tracking-normal text-[#2B2B2B80]">
        Please enter your details to access your account
      </p>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="mt-10">
          <div className="flex flex-col gap-2">
            <RenderFormFields fields={LOGIN_FORM_FIELDS} />
          </div>
          <div className="flex justify-between mt-5">
            <div className="flex items-center gap-2">
              <Checkbox />
              <span className="font-inter font-normal text-sm leading-tight tracking-normal">
                Remember me
              </span>
            </div>
            <p
              className="font-inter font-medium text-sm leading-tight tracking-normal text-[#4E17E5]"
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
            <span>Sign In</span>
          </Button>
          <AuthGoogleButton />
          <p className="font-inter font-normal text-sm leading-relaxed tracking-normal text-center mt-5">
            Don’t have an account?{" "}
            <span
              className="text-[#4E17E5] font-[400]"
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
