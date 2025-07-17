"use client";
import { useUploadFileMutation } from "@/shared/api/uploadApi";
import { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useCreateAdForm } from "../model/useCreateAdForm";
import { useFormContext } from "react-hook-form";
import { Fuel, Gauge, Heart, MapPin, Palette, Settings } from "lucide-react";
import transmissionIcon from "../../../../public/assets/icons/transmissinIcon.svg";
import Image from "next/image";
import { MdOutlineAirlineSeatReclineNormal } from "react-icons/md";

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

  console.log("Form data:", data);

  console.log("Data:", data);

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
    <div className="flex flex-col gap-2">
      <div className="flex flex-col">
        <p className="font-inter font-medium text-base leading-normal tracking-normal">
          Vehicle Photos (up to 10)
        </p>
        <div
          {...getRootProps()}
          className="border border-dashed border-gray-400 rounded-md p-6 text-center cursor-pointer min-h-[200px] flex flex-col justify-center items-center gap-2"
        >
          <input {...getInputProps()} />
          <UploadIcon />
          <p className="text-sm">
            <span className="text-violet-600 font-medium">Link</span> or drag
            image
          </p>
          <p className="text-xs text-gray-400">
            SVG, PNG, JPG or GIF (max. 3MB)
          </p>
        </div>
      </div>

      <div className="flex flex-col">
        <p className="font-inter font-medium text-base leading-normal tracking-normal">
          Listing Summary
        </p>
        <div className="border-2 border-[#E7E6E7] rounded-3xl p-4 flex justify-between">
          <div className="w-2/4 pr-4">
            {/* Главное фото */}
            {uploadedPhotos[0] && (
              <div className="mb-4 rounded-xl overflow-hidden border">
                <Image
                  src={uploadedPhotos[0].url}
                  alt="Main"
                  width={320}
                  height={240}
                  className="object-cover w-full "
                />
              </div>
            )}

            {/* Миниатюры */}
            <div className="flex gap-2">
              {uploadedPhotos.slice(1, 4).map((photo, index) => (
                <div
                  key={photo.id}
                  className="w-[100px] h-[75px] overflow-hidden rounded-md border cursor-pointer"
                  onClick={() => handleMainPhotoChange(index + 1)}
                >
                  <Image
                    src={photo.url}
                    alt={`Photo ${index + 2}`}
                    width={100}
                    height={75}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-2/4">
            <div className="flex flex-col gap-2">
              <h1 className="font-inter font-semibold text-2xl leading-none tracking-normal">
                {data.model}
              </h1>
              <p className="font-inter font-semibold text-3xl leading-none tracking-normal">
                {data.price} $
              </p>
            </div>
            <div className="grid grid-cols-2 gap-y-6 mt-5">
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <Gauge color="#2B2B2B4D" /> Mileage
                </strong>
                {data.mileage}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <Fuel /> Fuel Type
                </strong>{" "}
                {data.fuel_type}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <Image src={transmissionIcon} alt="transmission" />{" "}
                  Transmission
                </strong>{" "}
                {data.transmission}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <MdOutlineAirlineSeatReclineNormal /> Seats
                </strong>{" "}
                {data.number_of_seats}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <Settings /> Engine
                </strong>{" "}
                {data.engine}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <Palette /> Color Exterior
                </strong>{" "}
                {data.exterior_color}
              </div>
              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <Gauge color="#2B2B2B4D" /> Drive Type
                </strong>
                {data.drive_type}
              </div>

              <div className="font-inter font-medium text-base leading-none tracking-normal flex flex-col items-start justify-between gap-2">
                <strong className="text-[#2B2B2B4D] flex items-center gap-2 font-inter font-normal text-base leading-none tracking-normal">
                  <Palette /> Color Interior
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
