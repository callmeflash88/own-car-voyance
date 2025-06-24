"use client";

import { createContext, useContext, useState } from "react";

type AuthStep = "login" | "register" | "forgot" | "otp" | "create";

interface AuthFlowContextType {
  step: AuthStep;
  setStep: (step: AuthStep) => void;
  email: string;
  setEmail: (email: string) => void;
}

const AuthFlowContext = createContext<AuthFlowContextType | null>(null);

export const useAuthFlow = () => {
  const ctx = useContext(AuthFlowContext);
  if (!ctx) throw new Error("useAuthFlow must be used within AuthFlowProvider");
  return ctx;
};

export const AuthFlowProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [step, setStep] = useState<AuthStep>("login");
  const [email, setEmail] = useState("");

  return (
    <AuthFlowContext.Provider value={{ step, setStep, email, setEmail }}>
      {children}
    </AuthFlowContext.Provider>
  );
};
