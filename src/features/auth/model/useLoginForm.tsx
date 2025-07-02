import { Input } from "@/shared/ui";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../api/authApi";
import { TextInput } from "@/shared/ui/FormField/TextInput";
import { PasswordInput } from "@/shared/ui/FormField/PasswordInput";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl !mt-2";
const TEXT_INPUT_CLASSNAME = " py-2 ";

export const LOGIN_FORM_FIELDS = [
  {
    name: "email",
    label: "Email",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "",
    component: PasswordInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
];

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const [login, { isLoading, error }] = useLoginMutation();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await login(data).unwrap();
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
