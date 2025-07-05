"use client";

import { useState } from "react";
import { Input, Button } from "@/shared/ui";
import { useEditUserProfileForm } from "../lib/useUserProfileForm";

export const UserProfileEditForm = ({ user, onCancel }: any) => {
  const { form, handleSubmit, uploadFile, isLoading, error } =
    useEditUserProfileForm(user);
  const {
    register,
    handleSubmit: submitForm,
    setValue,
    formState: { errors },
  } = form;

  const [preview, setPreview] = useState<string | null>(null);
  const [logoId, setLogoId] = useState<number | null>(null);

  const onDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      setValue("photo", file);
      setPreview(URL.createObjectURL(file));

      try {
        const response = await uploadFile(file).unwrap();
        console.log("Upload success:", response);
        setLogoId(response.result.id);
      } catch (err) {
        console.error("Upload failed:", err);
      }
    }
  };

  console.log("logoId", logoId);

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

      <input type="file" className="hidden" {...register("photo")} />

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
