import { useUpdateAdminSettingsMutation } from "@/shared/api/dashBoardApi";
import { useUploadFileMutation } from "@/shared/api/uploadApi";
import { useForm } from "react-hook-form";
import z from "zod";

const EditAdminSchema = z.object({
  full_name: z.string().min(1).optional(),
  phone: z.string(),
  last_name: z.string().min(1).optional(),
  gender: z.string(),
  email: z.string().email(),
  location: z.string(),
  bio: z.string(),
});

export type EditAdminFormValues = z.infer<typeof EditAdminSchema>;

export const useEditAdminForm = (user: any, refetch?: () => void) => {
  const form = useForm<EditAdminFormValues>({
    defaultValues: {
      full_name: user?.full_name?.split(" ")[0] || "",
      phone: user?.phone || "",
      gender: user?.gender || "",
      email: user?.email || "",
      location: user?.location || "",
      bio: user?.bio || "",
    },
  });
  const [updateAdminProfile, { isLoading, error }] =
    useUpdateAdminSettingsMutation();
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

      await updateAdminProfile(fullData).unwrap();
      refetch?.();
    } catch (e) {
      console.error("Failed to update user:", e);
    }
  };

  return { form, handleSubmit, uploadFile, isLoading, error };
};
