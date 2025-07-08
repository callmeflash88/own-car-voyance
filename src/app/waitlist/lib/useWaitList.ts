import { useState } from "react";
import { NotificationService } from "@/shared/lib/NotificationService";
import { isValidEmail } from "./isValidMail";

export const useWaitlist = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (
    isEmailForm: boolean,
    isPhoneConsentChecked?: boolean
  ) => {
    let trimmed = isEmailForm ? email.trim() : phone.trim();
    if (!isEmailForm && trimmed.startsWith("+")) {
      trimmed = trimmed.slice(1);
    }

    if (isEmailForm && !isValidEmail(trimmed)) {
      NotificationService.error("Please enter a valid email address.");
      return;
    }

    if (!isEmailForm) {
      if (trimmed.length < 8) {
        NotificationService.error("Please enter a valid phone number.");
        return;
      }
      if (!isPhoneConsentChecked) {
        NotificationService.error("You must agree to receive SMS updates.");
        return;
      }
    }

    try {
      NotificationService.loading("Sending...");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isEmailForm ? { email: trimmed } : { phone: trimmed }
        ),
      });

      const data = await res.json();
      NotificationService.dismiss();

      if (res.ok) {
        NotificationService.success("You’ve successfully subscribed! 🎉");
        if (isEmailForm) setEmail("");
        else setPhone("");
      } else {
        NotificationService.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      NotificationService.dismiss();
      NotificationService.error("Network error. Please try again later.");
    }
  };

  return { email, setEmail, phone, setPhone, handleSubmit };
};
