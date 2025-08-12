"use client";
import {
  useGetAdminSettingsQuery,
  useGetTeamMembersQuery,
} from "@/shared/api/dashBoardApi";

import { AdminSettingsForm } from "@/features/admin-settings/ui/AdminSettingsForm";
import { AdminChangePasswordForm } from "@/features/admin-settings/ui/ChangePasswordForm";
import { InviteMembers } from "@/features/admin-settings/ui/InveiteMembers";
import { TeamMembers } from "@/features/admin-settings/ui/TeamMembers";
import { DeleteProfile } from "@/features/admin-settings/ui/DeleteProfile";

export default function AdminSettings() {
  const { data: userSettings, isLoading: isUserSettingsLoading } =
    useGetAdminSettingsQuery();
  const { data } = useGetTeamMembersQuery();

  if (isUserSettingsLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#4E17E5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full px-10 flex flex-col gap-5 items-start">
      {/* UserProfileCard */}
      <div className="bg-white  rounded-2xl shadow w-full p-5">
        {/* Form */}
        <div className="flex justify-between items-center border-b border-gray-200 pb-5">
          <h2 className="text-lg font-semibold">Personal Profile</h2>
        </div>
        <AdminSettingsForm user={userSettings} />
      </div>
      <AdminChangePasswordForm />
      <InviteMembers />
      <TeamMembers data={data} />
      <DeleteProfile />
    </div>
  );
}
