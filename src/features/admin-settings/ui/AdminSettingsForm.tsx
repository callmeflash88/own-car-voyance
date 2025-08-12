"use client";
import { useRef, useState, useEffect } from "react";
import { useEditAdminForm } from "../model/useAdminForm";
import { NotificationService } from "@/shared/lib/NotificationService";
import { Button, Input } from "@/shared/ui";
import { RHSelect } from "@/shared/ui/FormField/RHSelect";
import { FormProvider } from "react-hook-form";
import Image from "next/image";
import noAvatar from "../../../../public/assets/images/no-avatar.webp";
import camera from "@/shared/assets/icons/camera.svg";

export const AdminSettingsForm = ({ user, refetch, onCancel }: any) => {
  const { form, handleSubmit, uploadFile, isLoading } = useEditAdminForm(
    user,
    refetch
  );

  const {
    register,
    handleSubmit: submitForm,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const { ref: registerPhotoRef, onChange: registerPhotoOnChange } =
    register("photo");

  const uploadRef = useRef<HTMLInputElement>(null);

  // isEditing режим
  const [isEditing, setIsEditing] = useState(false);

  // preview и logoId нужно инициализировать по данным user и сбрасывать при cancel
  const [preview, setPreview] = useState<string | null>(
    user?.logo?.url || null
  );
  const [logoId, setLogoId] = useState<number | null>(user?.logo?.id || null);

  // При изменении пользователя (user) сбрасываем форму и preview
  useEffect(() => {
    // Формируем значения из user (например full_name делим на имя и фамилию в useEditAdminForm, тут просто сбросим форму полностью)
    reset({
      full_name: user?.full_name || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      email: user?.email || "",
      location: user?.location || "",
      bio: user?.bio || "",
    });

    setPreview(user?.logo?.url || null);
    setLogoId(user?.logo?.id || null);

    setIsEditing(false); // при смене user выключаем режим редактирования
  }, [user, reset]);

  const isValidImageType = (file: File): boolean => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    return allowedTypes.includes(file.type.toLowerCase());
  };

  const isValidImageSize = (file: File): boolean =>
    file.size <= 5 * 1024 * 1024;

  const processImageFile = async (file: File) => {
    if (!isValidImageType(file)) {
      NotificationService.error("Supported formats: JPEG, JPG, PNG");
      return;
    }
    if (!isValidImageSize(file)) {
      NotificationService.error("Image must be < 5MB");
      return;
    }

    setValue("photo", file);
    setPreview(URL.createObjectURL(file));

    try {
      const response = await uploadFile(file).unwrap();
      setLogoId(response.result.id);
      NotificationService.success("Image uploaded");
    } catch (err) {
      console.error(err);
      setPreview(user?.logo?.url || null);
      setLogoId(user?.logo?.id || null);
      NotificationService.error("Failed to upload");
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await processImageFile(file);
  };

  const handleUploadClick = () => uploadRef.current?.click();

  const handleRemoveImage = () => {
    setPreview(null);
    setLogoId(null);
    setValue("photo", null);
    if (uploadRef.current) uploadRef.current.value = "";
  };

  // При отмене сбрасываем форму и preview к исходным user данным
  const handleCancel = () => {
    reset({
      full_name: user?.full_name || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      email: user?.email || "",
      location: user?.location || "",
      bio: user?.bio || "",
    });

    setPreview(user?.logo?.url || null);
    setLogoId(user?.logo?.id || null);
    setIsEditing(false);

    onCancel?.();
  };

  const onSubmit = async (data: any) => {
    await handleSubmit(data, logoId || undefined);
    setIsEditing(false);
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={submitForm(onSubmit)}
        className="w-full flex flex-col gap-5"
      >
        {/* Фото с drag & drop */}
        <div className="flex justify-start items-start mt-5 gap-5">
          <div
            className="w-30 h-30 rounded-full overflow-hidden relative shrink-0 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-indigo-500 transition"
            onClick={() => isEditing && uploadRef.current?.click()}
            onDrop={async (e) => {
              e.preventDefault();
              if (!isEditing) return;
              const file = e.dataTransfer.files?.[0];
              if (file) await processImageFile(file);
            }}
            onDragOver={(e) => e.preventDefault()}
          >
            <Image
              src={preview || noAvatar}
              alt="Avatar"
              fill
              className="object-cover"
              unoptimized={!!preview}
            />
          </div>

          {isEditing && (
            <div className="flex flex-col gap-2">
              <p className="text-[#757575] text-sm">
                At least 80x80px, JPG/PNG only
              </p>
              <div className="flex gap-4 items-center mt-4">
                <Button
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => uploadRef.current?.click()}
                  iconLeft={<Image src={camera} alt="camera" />}
                >
                  Upload or Drop Image
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  className="bg-[#D9D9D9] text-black"
                  onClick={handleRemoveImage}
                >
                  Remove Image
                </Button>
              </div>
              <input
                type="file"
                ref={(e) => {
                  uploadRef.current = e;
                  registerPhotoRef(e);
                }}
                onChange={(e) => {
                  registerPhotoOnChange(e);
                  handleFileChange(e);
                }}
                className="hidden"
                accept="image/jpeg,image/jpg,image/png"
              />
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Поля */}
          <Input
            label="Full Name"
            {...register("full_name")}
            disabled={!isEditing}
            error={errors.full_name?.message}
          />
          <Input
            label="Email"
            type="email"
            {...register("email")}
            disabled={!isEditing}
            error={errors.email?.message}
          />
          <Input
            label="Phone"
            type="tel"
            {...register("phone")}
            disabled={!isEditing}
            error={errors.phone?.message}
          />
          <Input
            label="Location"
            {...register("location")}
            disabled={!isEditing}
            error={errors.location?.message}
          />
          <div className="col-span-2">
            <RHSelect
              className=""
              label="Gender"
              {...register("gender")}
              disabled={!isEditing}
              options={["Male", "Female", "Other"].map((g) => ({
                label: g,
                value: g,
              }))}
            />
          </div>

          <div className="col-span-2 flex flex-col">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              {...register("bio")}
              disabled={!isEditing}
              rows={2}
              className="border-2 border-[#E7E6E7] rounded-2xl p-4"
            />
          </div>
        </div>

        {/* Кнопки */}
        <div className="col-span-2 flex justify-end gap-2 mt-4">
          {isEditing ? (
            <>
              <Button type="button" variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </>
          ) : (
            <Button
              type="button"
              variant="primary"
              onClick={() => setIsEditing(true)}
            >
              Change
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
