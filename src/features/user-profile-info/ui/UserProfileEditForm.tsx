"use client";

import { useRef, useState } from "react";
import { Input, Button } from "@/shared/ui";
import { useEditUserProfileForm } from "../lib/useUserProfileForm";
import { NotificationService } from "@/shared/lib/NotificationService";
import Image from "next/image";

export const UserProfileEditForm = ({ user, refetch, onCancel }: any) => {
  const { form, handleSubmit, uploadFile, isLoading, error } =
    useEditUserProfileForm(user, refetch);
  const {
    register,
    handleSubmit: submitForm,
    setValue,
    formState: { errors },
  } = form;

  const { ref: registerPhotoRef, onChange: registerPhotoOnChange } =
    register("photo");

  const uploadRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(
    user?.logo?.url || null
  );
  const [logoId, setLogoId] = useState<number | null>(user?.logo?.id || null);

  const isValidImageType = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type.toLowerCase());
  };

  const isValidImageSize = (file: File): boolean => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    return file.size <= maxSize;
  };

  const processImageFile = async (file: File) => {
    if (!isValidImageType(file)) {
      NotificationService.error("Supported image formats: JPEG, JPG, PNG");
      return;
    }

    if (!isValidImageSize(file)) {
      NotificationService.error("Image size must be less than 5MB");
      return;
    }

    setValue("photo", file);
    setPreview(URL.createObjectURL(file));

    try {
      const response = await uploadFile(file).unwrap();
      setLogoId(response.result.id);
      NotificationService.success("Image uploaded successfully");
    } catch (err) {
      console.error("Upload failed:", err);

      setPreview(user?.logo?.url || null);
      setLogoId(user?.logo?.id || null);

      NotificationService.error("Failed to upload image");
    }
  };

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processImageFile(file);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await processImageFile(file);
    }
  };

  const handleUploadClick = () => {
    if (uploadRef.current) {
      uploadRef.current.click();
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    setLogoId(null);
    setValue("photo", null);

    if (uploadRef.current) {
      uploadRef.current.value = "";
    }
  };

  const onSubmit = async (data: any) => {
    await handleSubmit(data, logoId || undefined); // 👈 передати ID
    onCancel();
  };

  return (
    <form onSubmit={submitForm(onSubmit)} className="space-y-3 mt-3">
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        className="w-32 h-32 mx-auto rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center text-center cursor-pointer overflow-hidden relative"
        onClick={handleUploadClick}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-sm text-gray-500 px-2">Drag & drop your photo</p>
        )}
      </div>

      <input
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        className="hidden"
        {...register("photo")}
        ref={(el) => {
          registerPhotoRef(el);
          uploadRef.current = el;
        }}
        onChange={(e) => {
          registerPhotoOnChange(e);
          handleFileChange(e);
        }}
      />

      <Button
        type="button"
        size="sm"
        variant="primary"
        className="w-full"
        iconLeft={
          <Image
            src="/assets/icons/addPhoto.svg"
            alt="add_photo"
            width={16}
            height={16}
          />
        }
        onClick={handleUploadClick}
      >
        Upload New Image
      </Button>

      {preview && (
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="w-full bg-[#D9D9D9] text-black"
          onClick={handleRemoveImage}
        >
          Remove Image
        </Button>
      )}

      <Input
        label="Full Name"
        {...register("full_name")}
        error={errors.full_name?.message as string | undefined}
      />
      <Input
        label="Email"
        {...register("email")}
        error={errors.email?.message as string | undefined}
      />
      <Input
        label="Phone"
        {...register("phone")}
        error={errors.phone?.message as string | undefined}
      />
      <Input
        label="Location"
        {...register("location")}
        error={errors.location?.message as string | undefined}
      />
      <Input
        label="Gender"
        {...register("gender")}
        error={errors.gender?.message as string | undefined}
      />
      <Input
        label="Bio"
        {...register("bio")}
        error={errors.bio?.message as string | undefined}
      />

      <div className="flex gap-2 pt-2">
        <Button type="submit" disabled={isLoading}>
          Save
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>

      {error && <p className="text-red-500 text-sm">Error: {String(error)}</p>}
    </form>
  );
};
