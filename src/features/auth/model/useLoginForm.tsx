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
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const dispatch = useAppDispatch();

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    try {
      const response = await login(data).unwrap();

      Cookies.set(ACCESS_TOKEN, response.access_token);
      Cookies.set(AUTH_REFRESH_TOKEN, response.refresh_token);

      dispatch(setAuth({ token: response.access_token }));

      router.push("/");
    } catch (err) {
      setServerError("Login failed");
    }
  });

  return {
    form,
    handleSubmit,
    isLoading,
    error,
    serverError,
  };
};
