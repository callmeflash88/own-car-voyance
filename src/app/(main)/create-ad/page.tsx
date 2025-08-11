"use client";
import {
  STEP_FIELDS,
  useCreateAdForm,
} from "@/features/create-ad/model/useCreateAdForm";
import { StepBasicInfo } from "@/features/create-ad/ui/StepBasicInfo";
import { StepDetails } from "@/features/create-ad/ui/StepDetails";
import { PreviewStep } from "@/features/create-ad/ui/StepPhotos&Preview";
import { CarStatus } from "@/shared/api/carApi";
import createAdBg from "@/shared/assets/bg/createAdBg.jpg";
import { useVehicleData, VehicleFilters } from "@/shared/lib/hooks";
import { Button } from "@/shared/ui";
import { Stepper } from "@/shared/ui/Stepper";
import { useEffect, useMemo, useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";

const steps = [
  (props: any) => <StepBasicInfo {...props} />,
  (props: any) => <StepDetails {...props} />,
  (props: any) => <PreviewStep {...props} />,
];

export default function CreateAdPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const { form, handleSubmit } = useCreateAdForm();
  const { formState, getValues: getFormValues } = form;
  const { isValid, errors } = formState;

  const stepFields = STEP_FIELDS[currentStep] || [];
  const watchedValues = useWatch({ control: form.control, name: stepFields });
  const isStepValid =
    watchedValues.length === stepFields.length &&
    watchedValues.every((value) => !!value);

  const CurrentStepComponent = steps[currentStep];

  const vehicleData = useVehicleData();

  const { year, make, model, body_style } = getFormValues();
  const filters: VehicleFilters = {
    Year: year !== "" ? Number(year) : undefined,
    Make: make !== "" ? make : undefined,
    Model: model !== "" ? model : undefined,
    Category: body_style !== "" ? body_style : undefined,
  };

  useEffect(() => {
    vehicleData.initializeAllData();
  }, []);

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${createAdBg.src})` }}
    >
      <section className="flex flex-col text-white pt-28 mx-4 md:mx-8 justify-center gap-3 items-center">
        <h1 className="font-inter font-semibold text-4xl leading-none tracking-normal text-center">
          List Your Vehicle in Minutes
        </h1>
        <p className="font-inter font-normal text-base leading-[1.55] tracking-normal text-center max-w-[600px]">
          Fill in your car’s details, upload photos, and publish your listing.
          With VIN verification and a clean layout, we make it easy to sell
          faster and smarter — no hassle, no hidden steps.
        </p>
      </section>
      <FormProvider {...form}>
        <div className="mx-auto max-w-[880px] mt-10 pb-10 px-4 md:px-8 box-content">
          <form className="bg-white rounded-2xl shadow w-full py-4 sm:py-15">
            <div className="max-w-[720px] mx-auto px-4 md:px-8">
              <Stepper currentStep={currentStep} />
              <CurrentStepComponent
                features={features}
                setFeatures={setFeatures}
                uploadedPhotos={uploadedPhotos}
                setUploadedPhotos={setUploadedPhotos}
                vehicleData={vehicleData}
                filters={filters}
                currentStep={currentStep}
              />
              <div className="flex flex-col-reverse items-center justify-end gap-2 mt-5 w-full sm:flex-row">
                {currentStep > 0 && (
                  <Button
                    className="w-full sm:w-auto sm:mr-auto"
                    variant="secondary"
                    size="lg"
                    type="button"
                    onClick={() => setCurrentStep(currentStep - 1)}
                  >
                    Back
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button
                    className="w-full sm:w-auto"
                    variant="primary"
                    size="lg"
                    type="button"
                    onClick={() => setCurrentStep(currentStep + 1)}
                    disabled={
                      !isStepValid ||
                      (currentStep === 1 && features.length === 0)
                    }
                  >
                    Next Step
                  </Button>
                ) : (
                  <div className="flex flex-col-reverse gap-2 w-full sm:w-auto sm:flex-row">
                    <Button
                      className="w-full sm:w-auto"
                      variant="outline"
                      size="lg"
                      type="button"
                      onClick={() =>
                        handleSubmit(
                          CarStatus.DRAFT,
                          uploadedPhotos,
                          features
                        )()
                      }
                    >
                      Save as Draft
                    </Button>
                    <Button
                      className="w-full sm:w-auto"
                      variant="primary"
                      size="lg"
                      type="button"
                      onClick={() =>
                        handleSubmit(
                          CarStatus.ACTIVE,
                          uploadedPhotos,
                          features
                        )()
                      }
                    >
                      List my Vehicle
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
