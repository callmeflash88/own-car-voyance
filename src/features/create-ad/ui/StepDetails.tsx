"use client";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { createDynamicFields } from "../model/useCreateAdForm";
import { FeaturesInput } from "./FeaturesInput";
import { useFormContext } from "react-hook-form";
import { VehicleData, VehicleFilters } from "@/shared/lib/hooks";

interface Props {
  currentStep: number;
  vehicleData: VehicleData;
  filters: VehicleFilters;
  features: string[];
  setFeatures: (features: string[]) => void;
}

export const StepDetails: React.FC<Props> = ({
  currentStep,
  vehicleData,
  filters,
  features,
  setFeatures,
}) => {
  const { register } = useFormContext();
  const dynamicFields = createDynamicFields(currentStep, vehicleData, filters);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <RenderFormFields fields={dynamicFields} />
      <div className="col-span-1 sm:col-span-2">
        <FeaturesInput value={features} onChange={setFeatures} />
      </div>
      <div className="col-span-1 sm:col-span-2 flex flex-col">
        <label className="font-bold text-gray-dark text-xl">Description</label>
        <textarea
          {...register("description")}
          placeholder="Tell buyers more about the condition and history of your vehicle."
          rows={5}
          className="border-2 border-[#E7E6E7] rounded-2xl p-4"
        />
      </div>
    </div>
  );
};
