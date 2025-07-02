import { z } from "zod";
import { useRegisterMutation } from "../api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/shared/ui/FormField/TextInput";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl mt-2";
const TEXT_INPUT_CLASSNAME = " py-0 ";

export const REGISTER_FORM_FIELDS = [
  {
    name: "full_name",
    label: "Full Name",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
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
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
  },
];

const registerSchema = z.object({
  full_name: z.string(),
  email: z.string().email(),
  password: z.string(),
  confirm_password: z.string(),
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const [register, { isLoading, error }] = useRegisterMutation();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  return {
    form,
    register,
    isLoading,
    error,
  };
};
