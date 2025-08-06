"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";

import { CheckBoxTable } from "@/features/admin-users/ui/CheckBoxTable";
import FilterSelect from "@/features/filter-select/ui/FilterSelect";
import {
  useBlockUnblockUsersMutation,
  useDeleteUsersMutation,
  useGetUsersQuery,
} from "@/shared/api/dashBoardApi";
import { clearSelected } from "@/features/admin-users/model/selectedUsersSlice";
import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { Row, Column } from "@/shared/types/table";
import { roleLabels, statusLabels, User } from "@/shared/types/userRoles";
import { Table, TableBody, TableHeader } from "@/shared/ui/Table";

const ADMIN_USERS_COLUMNS: Column[] = [
  { key: "action_checkbox", label: "" },
  { key: "full_name", label: "Name" },
  { key: "email", label: "Contact" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
  { key: "created_at", label: "Joined" },
  { key: "action_buttons", label: "" },
];

function formatAmericanDate(isoDate: string, timeZone = "America/New_York") {
  if (!isoDate) return "";
  try {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZone,
    }).format(date);
  } catch {
    return isoDate;
  }
}

const getTableItems = (users: User[]): Row[] =>
  users.map((item) => ({
    id: item.id,
    action_checkbox: {
      type: "component" as const,
      component: () => <CheckBoxTable userId={item.id.toString()} />,
    },
    full_name: item.full_name,
    email: item.email,
    role: roleLabels[item.role] ?? "Unknown",
    status: statusLabels[item.status] ?? "Unknown",
    created_at: formatAmericanDate(item.created_at),
    action_buttons: {
      type: "component" as const,
      component: () => (
        <div className="rounded-full bg-[#4E17E5] h-10 w-10 flex justify-center items-center">
          <ChevronRight className="w-4 h-4 text-white" />
        </div>
      ),
    },
  }));

export default function AdminUsersPage() {
  const dispatch = useAppDispatch();
  const selectedUserIds = useAppSelector(
    (state) => state.selectedUser.selectedIds
  );

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("Most Popular");

  const perPage = 20;

  const {
    data: usersResponse,
    isLoading,
    refetch,
  } = useGetUsersQuery({ page, perPage });

  const [blockUnblockUsers, { isLoading: isMutating }] =
    useBlockUnblockUsersMutation();
  const [deleteUsers, { isLoading: isDeleting }] = useDeleteUsersMutation();

  const users = usersResponse?.data ?? [];
  const items = getTableItems(users);

  const handleBlockUnblock = async () => {
    if (selectedUserIds.length === 0) return alert("No users selected.");
    try {
      await blockUnblockUsers({ ids: selectedUserIds }).unwrap();
      dispatch(clearSelected());
      refetch();
    } catch (error) {
      console.error("Block/Unblock error:", error);
    }
  };

  const handleDeleteUsers = async () => {
    if (selectedUserIds.length === 0) return alert("No users selected.");
    if (!confirm(`Delete ${selectedUserIds.length} user(s)?`)) return;
    try {
      await deleteUsers({ ids: selectedUserIds }).unwrap();
      dispatch(clearSelected());
      refetch();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const getButtonClasses = (type: "primary" | "danger", disabled: boolean) => {
    const base =
      "px-6 py-2 rounded-full border transition font-medium disabled:cursor-not-allowed";
    if (disabled)
      return `${base} border-gray-300 text-gray-300 cursor-not-allowed`;

    return type === "primary"
      ? `${base} border-[#4E17E5] text-[#4E17E5] hover:bg-[#4E17E5] hover:text-white`
      : `${base} border-red-500 text-red-500 hover:bg-red-500 hover:text-white`;
  };

  const total = usersResponse?.meta?.total ?? 0;
  const lastPage = Math.ceil(total / perPage);

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#4E17E5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <section className="flex flex-col px-10 py-8 gap-6">
      {/* Actions + Filter */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4">
          <button
            onClick={handleBlockUnblock}
            disabled={isMutating || selectedUserIds.length === 0}
            className={getButtonClasses(
              "primary",
              selectedUserIds.length === 0
            )}
          >
            {isMutating ? "Processing..." : "Block / Unlock"}
          </button>

          <button
            onClick={handleDeleteUsers}
            disabled={isDeleting || selectedUserIds.length === 0}
            className={getButtonClasses("danger", selectedUserIds.length === 0)}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </button>
        </div>

        <FilterSelect
          options={[
            "Newest Listings",
            "Most Popular",
            "Highest Rated",
            "Newest First",
            "Oldest First",
          ]}
          selected={filter}
          onChange={setFilter}
        />
      </div>

      {/* Table */}
      <Table>
        <TableHeader columns={ADMIN_USERS_COLUMNS} isGray />
        <TableBody items={items} columns={ADMIN_USERS_COLUMNS} />
      </Table>

      {/* Pagination */}
      <div className="flex justify-end items-center gap-4 mt-0">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">Page {page}</span>
        <button
          onClick={() => page < lastPage && setPage((prev) => prev + 1)}
          disabled={users.length < perPage}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </section>
  );
}
