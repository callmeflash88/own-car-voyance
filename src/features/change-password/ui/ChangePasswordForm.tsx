"use client";
import { FormProvider, useWatch } from "react-hook-form";
import {
  CHANGE_PASSWORD_FORM_FIELDS,
  useChangePasswordForm,
} from "../model/useChangePassword";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { PasswordStrength } from "./PasswordStrength";
import { Button } from "@/shared/ui";

export const ChangePasswordForm = () => {
  const { form, handleSubmit, isLoading } = useChangePasswordForm();
  return (
    <div className="bg-white  rounded-2xl shadow w-full p-5">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h2 className="text-lg font-semibold">Security</h2>
      </div>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex flex-col gap-5">
            <RenderFormFields fields={CHANGE_PASSWORD_FORM_FIELDS} />
            <PasswordStrength
              password={useWatch({
                control: form.control,
                name: "new_password",
              })}
            />
          </div>
          <div className="flex justify-end mt-5">
            <Button type="submit" variant="primary" size="lg">
              Save New Password
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};
