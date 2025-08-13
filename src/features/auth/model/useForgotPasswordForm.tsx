import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useForgotPasswordMutation } from "../api/authApi";
import { TextInput } from "@/shared/ui/FormField/TextInput";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl !mt-2";
const TEXT_INPUT_CLASSNAME = " py-2 ";

export const FORGOT_PASSWORD_FORM_FIELDS = [
  {
    name: "email",
    label: "Email",
    placeholder: "example@gmail.com",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
];

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const useForgotForm = () => {
  const [forgot, { isLoading, error }] = useForgotPasswordMutation();

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await forgot(data).unwrap();
      console.log("Login success:", response);
    } catch (err) {
      console.error("Login error:", err);
    }
  });

  return {
    form,
    onSubmit,
    isLoading,
    error,
  };
};
