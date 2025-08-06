"use client";

import { useState } from "react";
import { Pencil, User } from "lucide-react";
import { useUserProfile } from "@/entities/user/lib/useUserProfile";
import { UserProfileEditForm } from "../../../features/user-profile-info/ui/UserProfileEditForm";
import { UserProfileAvatar } from "../../../features/user-profile-info/ui/UserProfileAvatarSection";
import { UserProfileVerification } from "../../../features/user-profile-info/ui/UserProfileVerification";

export const UserProfileCard = () => {
  const { user, refetch } = useUserProfile();
  const [editMode, setEditMode] = useState(false);

  if (!user) return null;

  return (
    <div className="bg-white  rounded-2xl shadow w-full p-5">
      <div className="flex justify-between items-center border-b border-gray-200 pb-5">
        <h2 className="text-lg font-semibold">Personal Profile</h2>
        <button
          className="cursor-pointer"
          onClick={() => setEditMode((prev) => !prev)}
        >
          <Pencil size={16} />
        </button>
      </div>
      {!editMode && <UserProfileAvatar user={user} />}

      {editMode ? (
        <UserProfileEditForm
          user={user}
          refetch={refetch}
          onCancel={() => setEditMode(false)}
        />
      ) : (
        <div className="mt-4 space-y-2 text-sm text-gray-800">
          <p className="font-inter font-normal text-base leading-none tracking-normal flex flex-col gap-3">
            <strong className="text-[#2B2B2B4D]">Email</strong> {user.email}
          </p>
          <p className="font-inter font-normal text-base leading-none tracking-normal flex flex-col gap-3">
            <strong className="text-[#2B2B2B4D]">Phone</strong>{" "}
            {user.phone ?? "-"}
          </p>
          <p className="font-inter font-normal text-base leading-none tracking-normal flex flex-col gap-3">
            <strong className="text-[#2B2B2B4D]">Location</strong>{" "}
            {user.location ?? "-"}
          </p>
          <p className="font-inter font-normal text-base leading-none tracking-normal flex flex-col gap-3">
            <strong className="text-[#2B2B2B4D]">Gender</strong>{" "}
            {user.gender ?? "-"}
          </p>
          <p className="font-inter font-normal text-base leading-none tracking-normal flex flex-col gap-3">
            <strong className="text-[#2B2B2B4D]">Bio</strong> {user.bio ?? "-"}
          </p>
        </div>
      )}

      {!editMode && <UserProfileVerification />}
    </div>
  );
};
