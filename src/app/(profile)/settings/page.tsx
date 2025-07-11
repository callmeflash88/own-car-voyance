import { ChangePasswordForm } from "@/features/change-password/ui/ChangePasswordForm";
import { EmailVerification } from "@/features/email-verification/ui/EmailVerification";

export default function Settings() {
  return (
    <div className="w-full h-full px-10 flex flex-col gap-20 items-start">
      <ChangePasswordForm />
      <EmailVerification />
    </div>
  );
}
