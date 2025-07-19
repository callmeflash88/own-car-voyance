"use client";

import { FC, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useUploadFileMutation } from "@/shared/api/uploadApi";
import Image from "next/image";

import { PhotoUploaderProps } from "../model/types";

export const PhotoUploader: FC<PhotoUploaderProps> = ({
  uploadedPhotos,
  setUploadedPhotos,
}) => {
  const [uploadFile] = useUploadFileMutation();

  const handleMainPhotoChange = (index: number) => {
    if (index === 0) return;
    setUploadedPhotos((prev) => {
      const newPhotos = [...prev];
      const [selected] = newPhotos.splice(index, 1);
      newPhotos.unshift(selected);
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

  const { getRootProps, getInputProps } = useDropzone({
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
      <p className="font-inter font-medium text-base">
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
        <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 3MB)</p>
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
