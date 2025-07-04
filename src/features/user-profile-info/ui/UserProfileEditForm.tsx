import { useForm } from "react-hook-form";
import { Button, Input } from "@/shared/ui";

export const UserProfileEditForm = ({ user, onCancel }: any) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      phone: user.phone || "",
      location: user.location || "",
      gender: user.gender || "",
      bio: user.bio || "",
    },
  });

  const onSubmit = (values: any) => {
    // Тут буде запит на бекенд для оновлення
    console.log("Submit values:", values);
    onCancel(); // закрити форму
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 mt-3">
      <Input label="Phone" {...register("phone")} />
      <Input label="Location" {...register("location")} />
      <Input label="Gender" {...register("gender")} />
      <Input label="Bio" {...register("bio")} />

      <div className="flex gap-2">
        <Button type="submit">Save</Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
};
