import { useState } from "react";

import { NotificationService } from "@/shared/lib/NotificationService";
import { isValidEmail } from "./isValidMail";

export const useWaitlist = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const trimmed = email.trim();

    if (!isValidEmail(trimmed)) {
      NotificationService.error("Please enter a valid email address.");
      return;
    }

    try {
      NotificationService.loading("Sending...");

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: trimmed }),
      });

      const data = await res.json();
      NotificationService.dismiss();

      if (res.ok) {
        NotificationService.success("You’ve successfully subscribed! 🎉");
        setEmail("");
      } else {
        NotificationService.error(data.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      NotificationService.dismiss();
      NotificationService.error("Network error. Please try again later.");
    }
  };

  return { email, setEmail, handleSubmit };
};
