"use client";
import {
  useGetUserQuery,
  useLazyGetUserQuery,
} from "@/entities/user/api/userApi";
import { useEffect, useRef, useState } from "react";
import { usePhoneVerification } from "../model/useVerificatePhone";
import clsx from "clsx";

export const VaerificatePhone = () => {
  const { data, isLoading } = useGetUserQuery();

  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const [error, setError] = useState(false);

  const { checkVerification, sendVerification } = usePhoneVerification();
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const hasSentCode = useRef(false);

  useEffect(() => {
    if (data?.phone && !hasSentCode.current) {
      sendVerification();
      hasSentCode.current = true;
    }
  }, [data]);

  const sendCode = () => {
    sendVerification();
  };

  const handleChange = (val: string, index: number) => {
    if (!/^[0-9]?$/.test(val)) return;

    const newCode = [...code];
    newCode[index] = val;
    setCode(newCode);
    setError(false);

    if (val && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }

    if (newCode.every((digit) => digit !== "")) {
      verifyCode(newCode.join(""));
    }
  };

  const verifyCode = async (fullCode: string) => {
    try {
      const res = await checkVerification({ otp: fullCode }).unwrap();

      document.cookie = "register_verification=true; path=/";

      window.location.href = "/profile";
    } catch {
      setError(true);
    }
  };

  console.log("data", data);
  return (
    <div className="flex flex-col justify-center space-y-2">
      <h1 className="font-inter font-semibold text-[32px] md:text-[40px] leading-[54px] tracking-normal">
        Verify your phone
      </h1>

      <p className="mt-2 font-inter font-normal text-base leading-tight tracking-normal text-[#2B2B2B80]">
        We’ve sent a code to {data?.phone}
      </p>

      {error && (
        <p className="text-red-500 mt-4 text-sm">
          Invalid code. Please try again
        </p>
      )}

      <div className="flex space-x-2 mt-4">
        {code.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e.target.value, index)}
            className={clsx(
              "w-12 h-12 text-center border rounded-md text-lg",
              error ? "border-red-500" : "border-gray-300"
            )}
          />
        ))}
      </div>

      <button
        className="mt-6 bg-[#6016FC] text-white py-2 px-8 rounded-full text-lg"
        onClick={() => verifyCode(code.join(""))}
      >
        Confirm
      </button>

      <p className="text-sm text-gray-500 mt-3">
        Didn’t receive a code?{" "}
        <span className="text-[#6016FC] cursor-pointer" onClick={sendCode}>
          Send again
        </span>
      </p>
    </div>
  );
};
