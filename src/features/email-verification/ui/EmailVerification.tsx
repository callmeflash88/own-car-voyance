"use client";
import { Button } from "@/shared/ui";
import { useVerifyEmailMutation } from "../api/verifyEmailApi";

export const EmailVerification = () => {
  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
  return (
    <div className="bg-white  rounded-2xl shadow w-full p-5">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h2 className="text-lg font-semibold">Email Verification</h2>
      </div>
      <div className="w-full flex justify-end">
        <Button
          variant="primary"
          size="lg"
          className="!px-30 mt-5"
          onClick={() => verifyEmail()}
          disabled={isLoading}
        >
          {isLoading ? "Verifying..." : "Verify"}
        </Button>
      </div>
    </div>
  );
};
