"use client";
import { EditAdForm } from "@/features/edit-ad-form/ui/EditAdForm";
import { useGetMyCarByIdQuery } from "@/shared/api/carApi";
import { useParams } from "next/navigation";

export default function EditSurvey() {
  const params = useParams();
  const id = params.id;
  const {
    data: car,
    isLoading,
    isError,
  } = useGetMyCarByIdQuery(id?.toString() || "");

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center">
        <div className="w-12 h-12 border-4 border-[#4E17E5] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isError || !car) {
    return (
      <div className="w-full h-[60vh] flex justify-center items-center text-red-500">
        Failed to load car data.
      </div>
    );
  }

  return (
    <div className="w-full h-full px-10 flex flex-col gap-20 items-start">
      <EditAdForm car={car} />
    </div>
  );
}
