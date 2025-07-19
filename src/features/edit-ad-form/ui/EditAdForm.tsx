"use client";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { EDIT_AD_FORM_FIELDS, useEditAdForm } from "../model/useEditAdForm";
import { useDeleteMyCarMutation, VehicleAd } from "@/shared/api/carApi";
import { FC, useEffect, useState } from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { PhotoUploader } from "@/shared/ui/photo-uploader/ui/PhotoUploader";
import { PhotoGallery } from "./PhotGallery";
import { Button } from "@/shared/ui";
import { IoTrashBin } from "react-icons/io5";

interface EditAdFormProps {
  car: VehicleAd;
}

export const EditAdForm: FC<EditAdFormProps> = ({ car }) => {
  const { form, onSubmit, isLoading: isUpdateLoading } = useEditAdForm(car);
  const [deleteMyCar, { isLoading }] = useDeleteMyCarMutation();
  const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([]);

  console.log("Car", car);

  useEffect(() => {
    if (car) {
      form.reset({
        make: car.make,
        model: car.model,
        year: car.year?.toString(),
        mileage: car.mileage?.toString(),
        price: car.price?.toString(),
        condition: car.condition,
        location: car.location,
        body_style: car.body_style,
        transmission: car.transmission,
        exterior_color: car.exterior_color,
        interior_color: car.interior_color,
        fuel_type: car.fuel_type,
        drive_type: car.drive_type,
        engine: car.engine,
        number_of_seats: car.number_of_seats?.toString(),
        description: car.description || "",
      });

      setUploadedPhotos(car.images);
    }
  }, [car]);

  const handleMainPhotoChange = (index: number) => {
    if (index === 0) return;
    setUploadedPhotos((prev) => {
      const newPhotos = [...prev];
      const [selected] = newPhotos.splice(index, 1);
      newPhotos.unshift(selected);
      return newPhotos;
    });
  };

  return (
    <section className="flex flex-col bg-white p-4 rounded-2xl shadow  w-full">
      <FormProvider {...form}>
        <form onSubmit={onSubmit}>
          <div className="w-full grid grid-cols-4 gap-5">
            <RenderFormFields fields={EDIT_AD_FORM_FIELDS} />
            <div className="md:col-span-4 flex flex-col">
              <label className="whitespace-nowrap text-gray-dark font-poppins font-medium font-bold text-gray-dark text-xl">
                Description
              </label>
              <textarea
                {...form.register("description")}
                placeholder="Tell buyers more about the condition and history of your vehicle."
                rows={5}
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm"
              />
            </div>
          </div>
          <div className="flex mt-10">
            <div className="flex-1">
              <PhotoGallery
                photos={uploadedPhotos}
                onMainPhotoChange={handleMainPhotoChange}
              />
            </div>
            <div className="flex-1">
              <PhotoUploader
                uploadedPhotos={uploadedPhotos}
                setUploadedPhotos={setUploadedPhotos}
              />
            </div>
          </div>
          <div className="w-full flex  justify-between">
            <Button
              variant="danger"
              className="bg-[#EB090933] flex gap-2 px-20 py-2"
              size="lg"
              iconLeft={<IoTrashBin color="#EB0909" size={20} />}
              onClick={() =>
                car.id !== undefined && deleteMyCar(car.id.toString())
              }
            >
              <span className="text-[#EB0909]">Delete</span>
            </Button>
            <Button variant="primary" size="lg" className="!px-30 mt-5">
              Save Changes
            </Button>
          </div>
        </form>
      </FormProvider>
    </section>
  );
};
