"use client";
import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { STEP_DETAILS_FORM_FIELDS } from "../model/useCreateAdForm";
import { useState } from "react";
import { FeaturesInput } from "./FeaturesInput";

export const StepDetails = () => {
  const [features, setFeatures] = useState<string[]>([]);
  return (
    <div className="grid grid-cols-2 gap-5">
      <RenderFormFields fields={STEP_DETAILS_FORM_FIELDS} />
      <div className="col-span-2">
        <FeaturesInput value={features} onChange={setFeatures} />
      </div>
    </div>
  );
};
