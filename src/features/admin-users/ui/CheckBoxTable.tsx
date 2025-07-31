// features/admin-users/ui/CheckBoxTable.tsx
"use client";

import { useAppDispatch, useAppSelector } from "@/shared/lib/hooks";
import { toggleUser } from "../model/selectedUsersSlice";

type Props = {
  userId: string;
};

export const CheckBoxTable = ({ userId }: Props) => {
  const dispatch = useAppDispatch();
  const selectedIds = useAppSelector((state) => state.selectedUser.selectedIds);

  const isChecked = selectedIds.includes(userId);

  const handleChange = () => {
    dispatch(toggleUser(userId));
  };

  return (
    <input
      type="checkbox"
      className="w-4 h-4 rounded border-gray-300"
      checked={isChecked}
      onChange={handleChange}
    />
  );
};
