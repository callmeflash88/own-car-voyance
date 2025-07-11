import { RenderFormFields } from "@/shared/ui/RenderFormFiled";
import { STEP_BASIC_FORM_FIELDS } from "../model/useCreateAdForm";
import { Button } from "@/shared/ui";

export const StepBasicInfo = () => {
  return (
    <div className="grid grid-cols-2 gap-5">
      <RenderFormFields fields={STEP_BASIC_FORM_FIELDS} />
    </div>
  );
};
