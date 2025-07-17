"use client";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { STEP_DETAILS_FORM_FIELDS } from "../model/useCreateAdForm";
import { useState } from "react";
import { FeaturesInput } from "./FeaturesInput";
import { useFormContext } from "react-hook-form";

interface Props {
  features: string[];
  setFeatures: (features: string[]) => void;
}

export const StepDetails: React.FC<Props> = ({ features, setFeatures }) => {
  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-2 gap-5">
      <RenderFormFields fields={STEP_DETAILS_FORM_FIELDS} />
      <div className="col-span-2">
        <FeaturesInput value={features} onChange={setFeatures} />
      </div>
      <div className="col-span-2 flex flex-col">
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
