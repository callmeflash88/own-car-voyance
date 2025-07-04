"use client";
import { useUserProfile } from "@/entities/user/lib/useUserProfile";

export const ProfileProgress = () => {
  const { profileCompletion } = useUserProfile(); // 0 - 100

  return (
    <div className="bg-white p-4 rounded-2xl shadow flex flex-col items-start w-full">
      <p className="font-semibold text-[18px] text-left text-black">
        Complete your profile
      </p>

      <div className="flex items-center w-full mt-3">
        <div className="relative w-full h-2 rounded-full bg-gray-200">
          <div
            className="absolute top-0 left-0 h-2 rounded-full bg-[#4E17E5] transition-all"
            style={{ width: `${profileCompletion}%` }}
          />
        </div>
        <span className="ml-2 text-sm text-gray-500 font-medium">
          {profileCompletion}%
        </span>
      </div>
    </div>
  );
};
