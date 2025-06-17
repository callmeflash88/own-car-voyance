"use client";
import { Heart } from "lucide-react";
import { useState } from "react";

export const ToggleFavorite = ({
  vehicleId,
  isFavorite,
}: {
  vehicleId: string;
  isFavorite: boolean;
}) => {
  const [liked, setLiked] = useState(isFavorite);

  const toggle = () => {
    setLiked(!liked);
    // Здесь можно дернуть api/postFavorite(vehicleId)
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
