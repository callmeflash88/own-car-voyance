"use client";

import { Heart } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  useAddToFavoriteMutation,
  useDeleteFromFavoriteMutation,
} from "@/shared/api/carApi";

interface Props {
  vehicleId: string;
  isFavorite: boolean;
  isAuthenticated: boolean;
}

export const ToggleFavorite = ({
  vehicleId,
  isFavorite,
  isAuthenticated,
}: Props) => {
  const router = useRouter();
  const [liked, setLiked] = useState(isFavorite);
  const [addToFavorite] = useAddToFavoriteMutation();
  const [removeFromFavorite] = useDeleteFromFavoriteMutation();

  const handleClick = async (e: React.MouseEvent) => {
    e.stopPropagation(); // чтобы не срабатывало открытие карточки

    if (!isAuthenticated) {
      router.push("/login");
      return;
    }

    try {
      if (!liked) {
        await addToFavorite(vehicleId).unwrap();
        setLiked(true);
      } else {
        await removeFromFavorite(vehicleId).unwrap();
        setLiked(false);
      }
    } catch (error) {
      console.error("Ошибка при добавлении/удалении из избранного:", error);
    }
  };

  return (
    <button
      className="absolute bottom-5 right-2 bg-white rounded-full p-2 shadow"
      onClick={handleClick}
    >
      <Heart
        className="w-6 h-6"
        fill={liked ? "red" : "white"}
        color={liked ? "red" : "gray"}
      />
    </button>
  );
};
