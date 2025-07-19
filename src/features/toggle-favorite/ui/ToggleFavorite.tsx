"use client";
import { Heart } from "lucide-react";
import { useState } from "react";
import {
  useAddToFavoriteMutation,
  useDeleteFromFavoriteMutation,
} from "@/shared/api/carApi";

export const ToggleFavorite = ({
  vehicleId,
  isFavorite,
}: {
  vehicleId: string;
  isFavorite: boolean;
}) => {
  const [liked, setLiked] = useState(isFavorite);
  const [addToFavorite] = useAddToFavoriteMutation();
  const [removeFromFavorite] = useDeleteFromFavoriteMutation();

  const toggle = async () => {
    setLiked(!liked);
    try {
      if (!liked) {
        await addToFavorite(vehicleId);
      } else {
        await removeFromFavorite(vehicleId);
      }
    } catch (error) {
      console.error("Ошибка при переключении избранного", error);
    }
  };

  return (
    <button
      className="absolute bottom-5 right-2 bg-white rounded-full p-2"
      onClick={toggle}
    >
      <Heart fill={liked ? "black" : "white"} />
    </button>
  );
};
