"use client";

import {
  useApproveAccountMutation,
  useBlockUnblockUsersMutation,
  useDeleteUsersMutation,
  useGetUserByIdQuery,
} from "@/shared/api/dashBoardApi";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import noAvatar from "../../../../../public/assets/images/no-avatar.webp";
import profileGal from "../../../../../public/assets/icons/profileGal.svg";
import { Button } from "@/shared/ui";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface CarStats {
  ACTIVE: number;
  SOLD: number;
  DRAFT: number;
}

const COLORS = ["#5E00F8", "#709CFF", "#CDD9FF"];

import {
  CheckCircleIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { AdminUserVehicleCard } from "@/features/admin-user-detail/ui/AdminUserVehicleCard";
import { useEffect, useState } from "react";

export default function AdminUser() {
  const { id } = useParams();
  const router = useRouter();
  const userId = id?.toString() || "";

  const [blockUnblockUsers, { isLoading: isMutating }] =
    useBlockUnblockUsersMutation();
  const [deleteUsers, { isLoading: isDeleting }] = useDeleteUsersMutation();
  const { data: user } = useGetUserByIdQuery(userId);
  const [approveUser, { isLoading: isApproving }] = useApproveAccountMutation();

  const [cars, setCars] = useState(user?.cars || []);

  useEffect(() => {
    if (user?.cars) {
      setCars(user.cars);
    }
  }, [user]);

  const handleDeleteUser = async () => {
    const confirmDelete = confirm(
      `Are you sure you want to delete ${user?.full_name}?`
    );
    if (!confirmDelete) return;

    try {
      await deleteUsers({ ids: [userId] }).unwrap();
      alert("User deleted successfully.");
      router.push("/admin/users");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete user.");
    }
  };

  const habdleBlockUser = async () => {
    try {
      await blockUnblockUsers({ ids: [userId] }).unwrap();
      alert("User blocked/unblocked successfully.");
    } catch (error) {
      console.error("Block/Unblock error:", error);
      alert("Failed to block/unblock user.");
    }
  };

  const handleApproveUser = async () => {
    try {
      await approveUser(userId).unwrap();
      alert("User approved successfully.");
    } catch (error) {
      console.error("Approve error:", error);
      alert("Failed to approve user.");
    }
  };

  const getButtonClasses = (type: "danger" | "primary", isLoading: boolean) => {
    const baseClasses = "px-6 py-2 rounded-full border transition font-medium";

    if (type === "danger") {
      return `${baseClasses} border-[#D9D9D9] text-[#D9D9D9] hover:border-red-500 hover:text-red-500 hover:bg-red-500 hover:text-white ${
        isLoading ? "cursor-wait opacity-50" : ""
      }`;
    }

    if (type === "primary") {
      return `${baseClasses} border-[#D9D9D9] text-[#D9D9D9] hover:border-[#4E17E5] hover:text-[#4E17E5] hover:bg-[#4E17E5] hover:text-white ${
        isLoading ? "cursor-wait opacity-50" : ""
      }`;
    }

    return baseClasses;
  };

  const userAvatar = typeof user?.logo === "string" ? user.logo : null;

  console.log("user", user);

  const carStats: CarStats = {
    ACTIVE: user?.carStats?.ACTIVE ?? 0,
    SOLD: user?.carStats?.SOLD ?? 0,
    DRAFT: user?.carStats?.DRAFT ?? 0,
  };

  const data = [
    { name: "Active Vehicles", value: carStats.ACTIVE },
    { name: "Sold Vehicles", value: carStats.SOLD },
    { name: "Draft Vehicles", value: carStats.DRAFT },
  ];

  return (
    <div className="w-full flex flex-col px-10 py-5">
      <div className="bg-white rounded-2xl shadow w-full p-5 flex">
        <div className="w-full px-6 py-5 flex justify-between items-center">
          <div className="flex gap-5 items-center">
            <div className="w-20 h-20 rounded-full overflow-hidden relative shrink-0">
              <Image
                src={userAvatar || noAvatar}
                alt="Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3 items-center">
                <h3 className="text-2xl font-semibold">{user?.full_name}</h3>
                <Image
                  src={profileGal}
                  alt="profileGal"
                  width={24}
                  height={24}
                />
              </div>
              <p className="text-sm text-gray-500">
                Member since: {new Date(user?.created_at).getFullYear()}
              </p>
            </div>
          </div>
          <div className="px-6 pt-4 flex gap-5">
            <button
              onClick={habdleBlockUser}
              disabled={isMutating}
              className={getButtonClasses("primary", isMutating)}
            >
              {isMutating ? "Processing..." : "Block / Unlock"}
            </button>
            <button
              onClick={handleDeleteUser}
              disabled={isDeleting}
              className={getButtonClasses("danger", isDeleting)}
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
            <Button variant="primary" size="md" onClick={handleApproveUser}>
              Approve User Account
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full flex mt-5 gap-10">
        <div className="w-1/5">
          <div className="bg-white rounded-2xl shadow w-full p-5 flex flex-col">
            <p className="font-inter font-semibold text-[20px] leading-none tracking-normal">
              Info
              <div className="space-y-4 text-sm text-gray-600 mt-6">
                <div className="flex items-center gap-2">
                  <MailIcon className="text-[#5511EE] w-5 h-5" />
                  <div>
                    <p className="text-gray-400 font-inter font-medium text-[16px] leading-none tracking-normal">
                      Email
                    </p>
                    <p className="text-black font-inter font-normal text-[16px] leading-6 tracking-normal">
                      {user?.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <PhoneIcon className="text-[#5511EE] w-5 h-5" />
                  <div>
                    <p className="text-gray-400 font-inter font-medium text-[16px] leading-none tracking-normal">
                      Phone
                    </p>
                    <p className="text-black font-inter font-normal text-[16px] leading-6 tracking-normal">
                      {user?.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <MapPinIcon className="text-[#5511EE] w-5 h-5" />
                  <div>
                    <p className="text-gray-400 font-inter font-medium text-[16px] leading-none tracking-normal">
                      Location
                    </p>
                    <p className="text-black font-inter font-normal text-[16px] leading-6 tracking-normal">
                      {user?.location || "N/A"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <UserIcon className="text-[#5511EE] w-5 h-5" />
                  <div>
                    <p className="text-gray-400 font-inter font-medium text-[16px] leading-none tracking-normal">
                      Gender
                    </p>
                    <p className="text-black font-inter font-normal text-[16px] leading-6 tracking-normal">
                      {user?.gender || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="space-y-2 text-sm font-medium">
                <div
                  className={`flex items-center gap-2 ${
                    user?.register_verification
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Registered Owner Verified</span>
                </div>

                <div
                  className={`flex items-center gap-2 ${
                    user?.email_verification
                      ? "text-green-600"
                      : "text-gray-400"
                  }`}
                >
                  <CheckCircleIcon className="w-5 h-5" />
                  <span>Email Verified</span>
                </div>
              </div>
            </p>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl shadow p-6 w-full max-w-sm mt-5">
            <h2 className="text-lg font-semibold mb-4">Ad Statistics</h2>

            {data.every((entry) => entry.value === 0) ? (
              <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm">
                No data available
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                    stroke="white"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            )}

            <div className="mt-4 space-y-2">
              {data.map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between text-sm text-gray-600"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="inline-block w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    />
                    <span>{entry.name}</span>
                  </div>
                  <span className="text-black">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-4/5">
          <div className="bg-white rounded-2xl shadow w-full p-5 flex flex-col">
            <p className="font-inter font-semibold text-[20px] leading-none tracking-normal">
              User’s Vehichels
            </p>
            {cars?.length > 0 ? (
              <div className="w-full flex flex-col">
                {cars.map((car: any) => (
                  <AdminUserVehicleCard
                    key={car.id}
                    car={car}
                    onDeleted={(deletedId) => {
                      setCars((prev) => prev.filter((c) => c.id !== deletedId));
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full py-12 flex flex-col items-center justify-center text-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17l-1.5 1.5M14.25 17l1.5 1.5M7.5 10h9l.5 2m-10-.5L7.5 10m9 0l.5 1.5M6 16h12M6 16v1.5M18 16v1.5M9 6h6a2 2 0 012 2v1H7V8a2 2 0 012-2z"
                  />
                </svg>
                <p className="text-lg font-semibold">User has no vehicles</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
