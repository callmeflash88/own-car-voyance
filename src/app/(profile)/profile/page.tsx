"use client";
import { UserVehicleCard } from "@/entities/vehicle/ui/UserVehicleCard";
import { UserVehiclesList } from "@/features/user-vehicles/ui/UserVehiclesList";
import { ProfileProgress } from "@/widgets/profile-progress/ui/profile-progress";
import { UserProfileCard } from "@/widgets/user-profile-card/ui/UserProfileCard";
import { Pencil } from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [editMode, setEditMode] = useState(false);
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 px-10">
      <div className="flex flex-col gap-4">
        <ProfileProgress />
        <UserProfileCard />
      </div>
      <div>
        <div className="bg-white rounded-2xl shadow w-full p-5">
          <div className="flex justify-between items-center border-b border-gray-200 pb-5">
            <h2 className="text-lg font-semibold">Active Vehicles</h2>
            <button
              className="cursor-pointer"
              onClick={() => setEditMode(!editMode)}
            >
              <Pencil size={16} />
            </button>
          </div>
          <div className="mt-4 min-h-[40vh] max-h-[66vh] overflow-y-auto">
            <UserVehiclesList editMode={editMode} />
          </div>
        </div>
      </div>
    </div>
  );
}
