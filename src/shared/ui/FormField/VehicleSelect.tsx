import { useEffect, useMemo } from "react";
import { RHSelect } from "./RHSelect";
import { VehicleData, VehicleFilters } from "@/shared/lib/hooks";
import { useFormContext } from "react-hook-form";

interface VehicleSelectProps {
  name: string;
  label: string;
  placeholder: string;
  field: "Year" | "Make" | "Model" | "Category";
  labelClassName?: string;
  fieldClassName?: string;
  vehicleData: VehicleData;
}

export const VehicleSelect = ({
  name,
  label,
  placeholder,
  field,
  labelClassName,
  fieldClassName,
  vehicleData,
}: VehicleSelectProps) => {
  const { getValues } = useFormContext();
  const { data, loading, fetchFieldData } = vehicleData;
  const { year, make, model, body_style } = getValues();

  const vehicleFilters: VehicleFilters = useMemo(() => {
    const filterObj = {
      Year: year !== "" ? Number(year) : undefined,
      Make: make !== "" ? make : undefined,
      Model: model !== "" ? model : undefined,
      Category: body_style !== "" ? body_style : undefined,
    };

    delete filterObj[field];

    return filterObj;
  }, [year, make, model, body_style]);

  const currentOptions = data[field] || [];
  const isLoading = loading[field] || false;

  const options = [
    { label: `Reset`, value: "" },
    ...currentOptions.map((item) => ({
      label: item.toString(),
      value: item.toString(),
    })),
  ];

  useEffect(() => {
    fetchFieldData(field, vehicleFilters);
  }, [vehicleFilters]);

  return (
    <div>
      <RHSelect
        name={name}
        label={label}
        placeholder={placeholder}
        options={options}
        className={fieldClassName}
        labelClassName={labelClassName}
        disabled={isLoading}
      />
    </div>
  );
};
