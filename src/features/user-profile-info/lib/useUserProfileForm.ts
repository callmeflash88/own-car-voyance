import { useUpdateUserProfileMutation } from "@/entities/user/api/userApi";
import { useUploadFileMutation } from "@/shared/api/uploadApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const EditUserSchema = z.object({
  full_name: z.string().min(1).optional(),
  email: z.string().email(),
  phone: z.string(),
  location: z.string(),
  gender: z.string(),
  bio: z.string(),
});

export type EditUserFormValues = z.infer<typeof EditUserSchema>;

export const useEditUserProfileForm = (user: any, refetch?: () => void) => {
  const form = useForm({ defaultValues: user });
  const [updateUserProfile, { isLoading, error }] =
    useUpdateUserProfileMutation();
  const [uploadFile] = useUploadFileMutation();

  const handleSubmit = async (data: any, id?: number) => {
    try {
      const fullData = { ...data };

      if (id) {
        fullData.logo = { id };
      } else {
        delete fullData.logo;
      }

      delete fullData.photo;

      await updateUserProfile(fullData).unwrap();
      refetch?.();
    } catch (e) {
      console.error("Failed to update user:", e);
    }
  };

  return { form, handleSubmit, uploadFile, isLoading, error };
};
