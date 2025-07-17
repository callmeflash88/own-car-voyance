"use client";
import {
  isCurrentStepValid,
  STEP_FIELDS,
  useCreateAdForm,
} from "@/features/create-ad/model/useCreateAdForm";
import { StepBasicInfo } from "@/features/create-ad/ui/StepBasicInfo";
import { StepDetails } from "@/features/create-ad/ui/StepDetails";
import { PreviewStep } from "@/features/create-ad/ui/StepPhotos&Preview";
import { CarStatus } from "@/shared/api/carApi";
import createAdBg from "@/shared/assets/bg/createAdBg.jpg";
import { Button } from "@/shared/ui";
import { Stepper } from "@/shared/ui/Stepper";
import { useEffect, useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";

const steps = [
  StepBasicInfo,
  (props: any) => <StepDetails {...props} />,
  (props: any) => <PreviewStep {...props} />,
];

export default function CreateAdPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const { form, handleSubmit } = useCreateAdForm();
  const { formState } = form;
  const { isValid, errors } = formState;

  const stepFields = STEP_FIELDS[currentStep] || [];
  const watchedValues = useWatch({ control: form.control, name: stepFields });
  const isStepValid =
    watchedValues.length === stepFields.length &&
    watchedValues.every((value) => !!value);

  const CurrentStepComponent = steps[currentStep];

  return (
    <div
      className="min-h-screen w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${createAdBg.src})` }}
    >
      <section className="flex flex-col text-white pt-28 justify-center gap-3 items-center">
        <h1 className="font-inter font-semibold text-4xl leading-none tracking-normal text-center">
          List Your Vehicle in Minutes
        </h1>
        <p className="font-inter font-normal text-base leading-[1.55] tracking-normal text-center w-[600px]">
          Fill in your car’s details, upload photos, and publish your listing.
          With VIN verification and a clean layout, we make it easy to sell
          faster and smarter — no hassle, no hidden steps.
        </p>
      </section>
      <FormProvider {...form}>
        <div className="px-72 mt-10">
          <form className="bg-white  rounded-2xl shadow w-full px-20 py-16">
            <Stepper currentStep={currentStep} />
            <CurrentStepComponent
              features={features}
              setFeatures={setFeatures}
              uploadedPhotos={uploadedPhotos}
              setUploadedPhotos={setUploadedPhotos}
            />
            <div className="flex items-center justify-end mt-5 w-full">
              {currentStep > 0 && (
                <Button
                  variant="secondary"
                  size="lg"
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="mr-auto"
                >
                  Back
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  variant="primary"
                  size="lg"
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  disabled={!isStepValid}
                >
                  Next Step
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="lg"
                    type="button"
                    onClick={() =>
                      handleSubmit(CarStatus.DRAFT, uploadedPhotos, features)()
                    }
                  >
                    Save as Draft
                  </Button>
                  <Button
                    variant="primary"
                    size="lg"
                    type="button"
                    onClick={() =>
                      handleSubmit(CarStatus.ACTIVE, uploadedPhotos, features)()
                    }
                  >
                    List my Vehicle
                  </Button>
                </div>
              )}
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
