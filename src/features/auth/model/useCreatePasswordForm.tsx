import { PasswordInput } from "@/shared/ui/FormField/PasswordInput";
import { z } from "zod";
import { useCreateNewPasswordMutation } from "../api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl";
const TEXT_INPUT_CLASSNAME = " py-2 ";

export const CREATE_PASSWORD_FORM_FIELDS = [
  {
    name: "password",
    label: "New Password",
    placeholder: "",
    component: PasswordInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "confirm",
    label: "Confirm Password",
    placeholder: "",
    component: PasswordInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
];

const forgotPasswordSchema = z.object({
  password: z.string().min(8),
  confirm: z.string().min(8),
});

export type CreatePasswordFormValues = z.infer<typeof forgotPasswordSchema>;

import { UseFormReturn } from "react-hook-form";

export const useCreatePasswordForm = (
  email: string
): {
  form: UseFormReturn<CreatePasswordFormValues>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isLoading: boolean;
  error: unknown;
} => {
  const [createPassword, { isLoading, error }] = useCreateNewPasswordMutation();

  const form = useForm<CreatePasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      password: "",
      confirm: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    const fullData = {
      email,
      new_password: data.password,
      confirm_password: data.confirm,
    };

    try {
      const response = await createPassword(fullData).unwrap();
      console.log("Password reset success:", response);
    } catch (err) {
      console.error("Password reset error:", err);
    }
  });

  return {
    form,
    onSubmit,
    isLoading,
    error,
  };
};
