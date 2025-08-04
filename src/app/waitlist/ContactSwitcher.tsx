"use client";

import { useState } from "react";
import { Input } from "@/shared/ui";
import { Button } from "@/shared/ui";
import { cn } from "@/shared/lib/utils";

export default function ContactSwitcher() {
  const [method, setMethod] = useState<"phone" | "email">("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (method === "phone") {
      console.log("📱 Phone submitted:", phone);
    } else {
      console.log("📧 Email submitted:", email);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md"
    >
      <div className="flex items-center border rounded-full overflow-hidden mb-4">
        <button
          type="button"
          onClick={() => setMethod("phone")}
          className={cn(
            "w-1/2 py-2 text-center font-medium text-sm transition-all",
            method === "phone"
              ? "bg-black text-white"
              : "bg-white text-gray-500"
          )}
        >
          Phone
        </button>
        <button
          type="button"
          onClick={() => setMethod("email")}
          className={cn(
            "w-1/2 py-2 text-center font-medium text-sm transition-all",
            method === "email"
              ? "bg-black text-white"
              : "bg-white text-gray-500"
          )}
        >
          Email
        </button>
      </div>

      {method === "phone" && (
        <>
          <label className="block text-sm mb-1">Stay Updated Via Phone</label>
          <Input
            placeholder="xxx xx xxxx"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="mb-2"
          />
          <div className="text-xs text-gray-500 mb-4">
            <input type="checkbox" className="mr-1" required /> By submitting
            your phone number, you agree to receive SMS updates from CarVoyance.
          </div>
        </>
      )}

      {method === "email" && (
        <Input
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4"
        />
      )}

      <Button type="submit" variant="primary" className="w-full">
        Submit
      </Button>
    </form>
  );
}
