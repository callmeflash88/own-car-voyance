import { z } from "zod";
import { useRegisterMutation } from "../api/authApi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextInput } from "@/shared/ui/FormField/TextInput";
import { PhoneInputRH } from "@/shared/ui/PhoneInputRH";

const LABEL_CLASSNAME = "font-bold text-gray-dark text-xl mt-2";
const TEXT_INPUT_CLASSNAME = " py-0 ";

export const REGISTER_FORM_FIELDS = [
  {
    name: "full_name",
    label: "Full Name",
    placeholder: "Olivia Klark",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
    isError: false,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "olivia@example.com",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
    isError: false,
  },
  {
    name: "phone",
    label: "Phone number",
    placeholder: "+1 (xxx) xxx-xxxx",
    required: true,
    component: PhoneInputRH,
    className: "w-full",
    fieldClassName: "mt-1",
    labelClassName: "text-sm font-medium text-gray-700",
    isError: false,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
    isError: false,
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Re-enter password",
    component: TextInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
    isError: false,
  },
];
const REGEX_PHONE = /^\+1\d{10}$/;

const normalizePhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");
  return "+" + digits;
};

const registerSchema = z
  .object({
    full_name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
      .string()
      .transform(normalizePhone) // 👈 очищает до проверки
      .refine((val) => REGEX_PHONE.test(val), {
        message: "Invalid phone number format",
      }),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must include at least one uppercase letter")
      .regex(/[a-z]/, "Password must include at least one lowercase letter")
      .regex(/[0-9]/, "Password must include at least one number")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must include at least one special character"
      ),
    confirm_password: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must agree to the Terms & Conditions" }),
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

export const useRegisterForm = () => {
  const [register, { isLoading, error }] = useRegisterMutation();

  const form = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      password: "",
      confirm_password: "",
    },
    mode: "onSubmit",
  });

  return {
    form,
    register,
    isLoading,
    error,
  };
};
