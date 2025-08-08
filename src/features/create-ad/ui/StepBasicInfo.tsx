import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { createDynamicFields } from "../model/useCreateAdForm";
import { VehicleData, VehicleFilters } from "@/shared/lib/hooks";

interface StepBasicInfoProps {
  currentStep: number;
  vehicleData: VehicleData;
  filters: VehicleFilters;
}

export const StepBasicInfo = ({
  currentStep,
  vehicleData,
  filters,
}: StepBasicInfoProps) => {
  const dynamicFields = createDynamicFields(currentStep, vehicleData, filters);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      <RenderFormFields fields={dynamicFields} />
    </div>
  );
};
