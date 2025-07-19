"use client";

import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";
import { FC } from "react";

interface EditButtonProps {
  id: string;
}

export const EditButton: FC<EditButtonProps> = ({ id }) => {
  const router = useRouter();

  return (
    <button
      className="absolute bottom-5 right-2 bg-white rounded-full p-2"
      onClick={() => router.push(`/edit-ad/${id}`)}
    >
      <Pencil />
    </button>
  );
};
