import { useState } from "react";
import { NotificationService } from "@/shared/lib/NotificationService";
import { isValidEmail } from "./isValidMail";

const normalizePhone = (phone: string, withPlus: boolean = true) => {
  const digits = phone.replace(/\D/g, "");
  return withPlus ? `+${digits}` : digits;
};

const REGEX_PHONE = /^\+[1-9]\d{9,14}$/;

export const useWaitlist = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = async (
    isEmailForm: boolean,
    isPhoneConsentChecked?: boolean
  ) => {
    const trimmed = isEmailForm ? email.trim() : phone.trim();

    if (isEmailForm) {
      if (!isValidEmail(trimmed)) {
        NotificationService.error("Please enter a valid email address.");
        return;
      }
      return await submitToBackend({ email: trimmed });
    }

    const plusPhone = normalizePhone(trimmed, true);

    if (!REGEX_PHONE.test(plusPhone)) {
      NotificationService.error("Please enter a valid phone number.");
      return;
    }

    if (!isPhoneConsentChecked) {
      NotificationService.error("You must agree to receive SMS updates.");
      return;
    }

    NotificationService.loading("Sending code...");
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: plusPhone }),
    });

    NotificationService.dismiss();

    if (res.ok) {
      setIsCodeSent(true);
      NotificationService.success("Code sent! Check your SMS.");
    } else {
      NotificationService.error("Failed to send verification code.");
    }
  };

  const verifyCode = async () => {
    const trimmed = phone.trim();
    const plusPhone = normalizePhone(trimmed, true);
    const plainPhone = normalizePhone(trimmed, false);

    NotificationService.loading("Verifying code...");

    const res = await fetch("/api/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone: plusPhone, code }),
    });

    NotificationService.dismiss();

    if (res.ok) {
      await submitToBackend({ phone: plainPhone });
      setIsVerified(true);
      setPhone("");
      setCode("");
      setIsCodeSent(false);
      NotificationService.success("Phone number verified! 🎉");
    } else {
      NotificationService.error("Invalid code. Please try again.");
    }
  };

  const submitToBackend = async (payload: {
    phone?: string;
    email?: string;
  }) => {
    try {
      NotificationService.loading("Subscribing...");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      NotificationService.dismiss();

      if (res.ok) {
        NotificationService.success("You’ve successfully subscribed! 🎉");
        setEmail("");
        return true;
      } else {
        NotificationService.error(data.message || "Something went wrong.");
        return false;
      }
    } catch (error) {
      NotificationService.dismiss();
      NotificationService.error("Network error. Please try again later.");
      return false;
    }
  };

  return {
    email,
    setEmail,
    phone,
    setPhone,
    code,
    setCode,
    isCodeSent,
    isVerified,
    handleSubmit,
    verifyCode,
  };
};
