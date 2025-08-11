import z from "zod";
import { useChangePasswordMutation } from "../api/changePasswordApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { NotificationService } from "@/shared/lib/NotificationService";
import { PasswordInput } from "@/shared/ui/FormField/PasswordInput";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl !mt-2";
const TEXT_INPUT_CLASSNAME = " py-2 ";

export const CHANGE_PASSWORD_FORM_FIELDS = [
  {
    name: "password",
    label: "Current Password",
    placeholder: "Enter password",
    component: PasswordInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "new_password",
    label: "New Password",
    placeholder: "Enter password",
    component: PasswordInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Enter password",
    component: PasswordInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
];

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .regex(/[A-Z]/, "Must include uppercase letter")
  .regex(/[a-z]/, "Must include lowercase letter")
  .regex(/[0-9]/, "Must include digit");

const changePassordSchema = z
  .object({
    password: passwordSchema,
    new_password: passwordSchema,
    confirm_password: z.string(),
  })
  .refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type ChangePasswordFormValues = z.infer<typeof changePassordSchema>;

export const useChangePasswordForm = () => {
  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const form = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePassordSchema),
    defaultValues: {
      password: "",
      new_password: "",
      confirm_password: "",
    },
    mode: "onSubmit",
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      await changePassword(data).unwrap();
      form.reset();
      NotificationService.success("Password changed successfully");
    } catch (err) {
      console.error("Change password error:", err);
      NotificationService.error("Failed to change password");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading,
  };
};
