"use client";
import { useCreateAdForm } from "@/features/create-ad/model/useCreateAdForm";
import { StepBasicInfo } from "@/features/create-ad/ui/StepBasicInfo";
import { StepDetails } from "@/features/create-ad/ui/StepDetails";
import createAdBg from "@/shared/assets/bg/createAdBg.jpg";
import { Button } from "@/shared/ui";
import { Stepper } from "@/shared/ui/Stepper";
import { useState } from "react";
import { FormProvider } from "react-hook-form";

const steps = [StepBasicInfo, StepDetails];

export default function CreateAdPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { form } = useCreateAdForm();

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
        <div className="px-56">
          <form className="bg-white  rounded-2xl shadow w-full p-5">
            <Stepper currentStep={currentStep} />
            <CurrentStepComponent />
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
                >
                  Next Step
                </Button>
              ) : (
                <Button
                  variant="primary"
                  size="lg"
                  type="button"
                  onClick={() => {}}
                >
                  List my Vehicle
                </Button>
              )}
            </div>
          </form>
        </div>
      </FormProvider>
    </div>
  );
}
