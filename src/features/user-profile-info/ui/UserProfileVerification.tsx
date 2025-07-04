import { useUserProfile } from "@/entities/user/lib/useUserProfile";
import { CircleCheck } from "lucide-react";
import clsx from "clsx"; // якщо ще не встановлений: npm i clsx

export const UserProfileVerification = () => {
  const { user } = useUserProfile();

  const verificationItems = [
    {
      label: "Registered Owner Verified",
      verified: user?.register_verification,
    },
    {
      label: "Email Verified",
      verified: user?.email_verification,
    },
  ];

  return (
    <div className="flex flex-col gap-5 pt-5">
      {verificationItems.map(({ label, verified }) => (
        <p key={label} className="flex items-center gap-2">
          <CircleCheck
            className={clsx("w-5 h-5", {
              "text-[#05A40D]": verified,
              "text-gray-400": !verified,
            })}
          />
          <span
            className={clsx("text-sm font-medium", {
              "text-[#05A40D]": verified,
              "text-gray-400": !verified,
            })}
          >
            {label}
          </span>
        </p>
      ))}
    </div>
  );
};
