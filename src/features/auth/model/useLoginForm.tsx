// src/features/auth/model/useLoginForm.ts
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoginMutation } from "../api/authApi";
import { useRouter } from "next/navigation";

import { TextInput } from "@/shared/ui/FormField/TextInput";
import { PasswordInput } from "@/shared/ui/FormField/PasswordInput";
import { useState } from "react";
import Cookies from "js-cookie";
import {
  ACCESS_TOKEN,
  AUTH_REFRESH_TOKEN,
} from "@/shared/constants/cookiesKeys";
import { useAppDispatch } from "@/shared/lib/hooks";
import { setAuth } from "./slice";
import { useLazyGetUserQuery } from "@/entities/user/api/userApi";
import { useAuthFlow } from "./AuthFlowContext";

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
    isError: false,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "",
    component: PasswordInput,
    labelClassName: LABEL_CLASSNAME,
    fieldClassName: TEXT_INPUT_CLASSNAME,
    isError: false,
  },
];

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must include at least one uppercase letter")
    .regex(/[a-z]/, "Password must include at least one lowercase letter")
    .regex(/[0-9]/, "Password must include at least one digit"),
  // .regex(
  //   /[^a-zA-Z0-9]/,
  //   "Password must include at least one special character"
  // ),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const useLoginForm = () => {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [getProfile] = useLazyGetUserQuery();
  const { setStep } = useAuthFlow();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const [login] = useLoginMutation();

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await login(data).unwrap();

      if (response.access_token && response.refresh_token) {
        Cookies.set(ACCESS_TOKEN, response.access_token);
        Cookies.set(AUTH_REFRESH_TOKEN, response.refresh_token);

        const profile = await getProfile().unwrap();

        Cookies.set(
          "register_verification",
          profile.register_verification.toString()
        );

        if (profile.register_verification === false) {
          router.push("/login?step=verification-phone");
        } else {
          router.push("/");
        }
      }
    } catch (err: any) {
      setServerError("Login failed: invalid email or password");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading: false,
    error: null,
    serverError,
  };
};
