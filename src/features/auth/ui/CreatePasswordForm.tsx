"use client";

import { useState } from "react";
import { FormProvider } from "react-hook-form";
import { Button } from "@/shared/ui";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import {
  CREATE_PASSWORD_FORM_FIELDS,
  useCreatePasswordForm,
} from "../model/useCreatePasswordForm";
import { validatePassword } from "../model/validatePassword";
import { PasswordRules } from "./PasswordRules";
import { useAuthFlow } from "../model/AuthFlowContext";

export const CreatePasswordForm = () => {
  const { email } = useAuthFlow();
  const { form, onSubmit, isLoading } = useCreatePasswordForm(email);
  const watchedPassword = form.watch("password");
  const rules = validatePassword(watchedPassword);
  const { setStep } = useAuthFlow();

  const handleSubmit = async () => {
    await onSubmit();
    form.reset();
    setStep("login");
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md w-full mx-auto flex flex-col gap-6"
      >
        <h2 className="text-3xl font-bold text-gray-900">
          Create New Password
        </h2>

        <PasswordRules rules={rules} />

        <div className="">
          <RenderFormFields fields={CREATE_PASSWORD_FORM_FIELDS} />
        </div>

        <Button
          variant="primary"
          type="submit"
          isLoading={isLoading}
          size="lg"
          className="w-full mt-10"
        >
          <span>Create</span>
        </Button>
      </form>
    </FormProvider>
  );
};
