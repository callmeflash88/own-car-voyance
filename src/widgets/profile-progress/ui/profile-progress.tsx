"use client";
import { useUserProfile } from "@/entities/user/lib/useUserProfile";

export const ProfileProgress = () => {
  const { profileCompletion, user } = useUserProfile(); // 0 - 100

  console.log("user", user);

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <p className="text-sm mb-2 text-gray-700">Complete your profile</p>
      <div className="w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-purple-600 rounded-full transition-all"
          style={{ width: `${profileCompletion}%` }}
        />
      </div>
    </div>
  );
};
