import { FC } from "react";
import { cn } from "@/shared/lib/utils";

interface PhotoGalleryProps {
  photos: any[];
  onMainPhotoChange: (index: number) => void;
}

export const PhotoGallery: FC<PhotoGalleryProps> = ({
  photos,
  onMainPhotoChange,
}) => {
  if (photos.length === 0) return null;

  console.log("photos", photos);

  return (
    <div className="flex gap-4">
      {/* Главное фото */}
      <div className="w-[420px] h-[320px] rounded-xl overflow-hidden">
        <img
          src={photos[0].url}
          alt="Main"
          className="w-full h-full object-cover cursor-pointer"
        />
      </div>

      {/* Маленькие превью */}
      <div className="flex flex-col gap-3">
        {photos.slice(1).map((photo, i) => (
          <div
            key={i}
            onClick={() => onMainPhotoChange(i + 1)}
            className="w-[140px] h-[100px] rounded-xl overflow-hidden border-2 border-transparent hover:border-primary cursor-pointer transition"
          >
            <img
              src={photo.url}
              alt={`Preview ${i}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
