"use client";
import { useUploadFileMutation } from "@/shared/api/uploadApi";
import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { Fuel, Gauge, Palette, Settings } from "lucide-react";
import transmissionIcon from "../../../../public/assets/icons/transmissinIcon.svg";
import Image from "next/image";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";
import { PhotoUploader } from "@/shared/ui/photo-uploader/ui/PhotoUploader";

interface UploadedPhoto {
  id: number;
  url: string;
}

interface PreviewStepProps {
  uploadedPhotos: UploadedPhoto[];
  setUploadedPhotos: React.Dispatch<React.SetStateAction<UploadedPhoto[]>>;
}

export const PreviewStep: FC<PreviewStepProps> = ({
  uploadedPhotos,
  setUploadedPhotos,
}) => {
  const [uploadFile, { isLoading }] = useUploadFileMutation();
  const form = useFormContext();

  const data = form.getValues();

  const handleMainPhotoChange = (index: number) => {
    if (index === 0) return; // Уже главное
    setUploadedPhotos((prev) => {
      const newPhotos = [...prev];
      const [selected] = newPhotos.splice(index, 1); // Удалить выбранное
      newPhotos.unshift(selected); // Поместить первым
      return newPhotos;
    });
  };

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (uploadedPhotos.length >= 10) return;

      const remainingSlots = 10 - uploadedPhotos.length;
      const filesToUpload = acceptedFiles.slice(0, remainingSlots);

      for (const file of filesToUpload) {
        try {
          const res = await uploadFile(file).unwrap();
          setUploadedPhotos((prev) => [
            ...prev,
            { id: res.result.id, url: res.result.url },
          ]);
        } catch (err) {
          console.error("Upload error", err);
        }
      }
    },
    [uploadedPhotos, uploadFile]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg", ".jpg"],
      "image/gif": [".gif"],
      "image/svg+xml": [".svg"],
    },
    multiple: true,
    maxSize: 3 * 1024 * 1024,
  });

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col">
        {/* <p className="font-inter font-medium text-base leading-normal tracking-normal">
          Vehicle Photos (up to 10)
        </p> */}
        <PhotoUploader
          uploadedPhotos={uploadedPhotos}
          setUploadedPhotos={setUploadedPhotos}
        />
      </div>

      <div className="flex flex-col gap-2">
        <p className="font-inter font-medium text-base leading-normal tracking-normal">
          Listing Summary
        </p>
        <div className="border-2 border-[#E7E6E7] rounded-3xl p-4 flex flex-col sm:flex-row justify-between gap-5 sm:gap-10">
          <div className="w-full sm:w-2/4">
            {uploadedPhotos[0] && (
              <div className="mb-4 rounded-xl overflow-hidden border relative group w-full">
                <Image
                  src={uploadedPhotos[0].url}
                  alt="Main"
                  width={320}
                  height={240}
                  className="object-cover w-full h-[240px]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setUploadedPhotos((prev) => prev.slice(1));
                  }}
                  className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-lg"
                >
                  &times;
                </button>
              </div>
            )}

            <div className="flex gap-2">
              {uploadedPhotos.slice(1, 3).map((photo, index) => (
                <div
                  key={photo.id}
                  className="relative w-1/2 overflow-hidden rounded-md border cursor-pointer"
                >
                  <Image
                    src={photo.url}
                    alt={`Photo ${index + 2}`}
                    width={100}
                    height={75}
                    className="object-cover w-full h-full"
                    onClick={() => handleMainPhotoChange(index + 1)}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      const photoToRemoveId = photo.id;
                      setUploadedPhotos((prev) =>
                        prev.filter((p) => p.id !== photoToRemoveId)
                      );
                    }}
                    className="absolute top-1 right-1 bg-black/60 hover:bg-black/80 text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full sm:w-2/4">
            <div className="flex flex-col gap-2">
              <h1 className="font-inter font-semibold text-2xl leading-none tracking-normal">
                {data.model}
              </h1>
              <p className="font-inter font-semibold text-3xl leading-none tracking-normal">
                {data.price} $
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-6 mt-5">
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <Gauge />
                  <span className="hidden sm:inline">Mileage</span>
                </strong>
                <span className="leading-normal">{data.mileage} km</span>
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <Fuel />
                  <span className="hidden sm:inline">Fuel Type</span>
                </strong>{" "}
                {data.fuel_type}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <Image src={transmissionIcon} alt="transmission" />{" "}
                  <span className="hidden sm:inline">Transmission</span>
                </strong>{" "}
                {data.transmission}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <MdOutlineAirlineSeatReclineNormal />
                  <span className="hidden sm:inline">Seats</span>
                </strong>{" "}
                {data.number_of_seats}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <Settings />
                  <span className="hidden sm:inline">Engine</span>
                </strong>{" "}
                {data.engine}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <Palette />
                  <span className="hidden sm:inline">Color Exterior</span>
                </strong>{" "}
                {data.exterior_color}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <Gauge color="#2B2B2B4D" />
                  <span className="hidden sm:inline">Drive Type</span>
                </strong>
                {data.drive_type}
              </div>

              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-row items-start gap-2 sm:flex-col sm:justify-between">
                <strong className="text-[#2B2B2B] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal sm:text-[#2B2B2B4D]">
                  <Palette />
                  <span className="hidden sm:inline">Color Interior</span>
                </strong>{" "}
                {data.interior_color}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UploadIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    className="text-violet-600"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12 16V4M12 4L8 8M12 4L16 8M4 20H20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
