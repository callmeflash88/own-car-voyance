import { CheckIcon } from "lucide-react"; // или любая другая иконка
import React from "react";

interface StepperProps {
  currentStep: number;
}

const steps = ["Basic Info", "Details", "Photos&Preview"];

export const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-5 sm:mb-10">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <React.Fragment key={index}>
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 ${
                    isCompleted
                      ? "bg-[#5511EE] text-white"
                      : isCurrent
                      ? "bg-[#5511EE] text-white"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {isCompleted ? <CheckIcon className="w-4 h-4" /> : index + 1}
                </div>
                <span
                  className={`hidden sm:block font-inter text-base tracking-tight ${
                    isCurrent
                      ? "text-black font-semibold"
                      : "text-[#2B2B2B80] font-normal"
                  }`}
                >
                  {step}
                </span>
              </div>

              {/* Line between steps */}
              {index < steps.length - 1 && (
                <div
                  className={`flex-grow h-[3px] mx-2 ${
                    isCompleted ? "bg-[#5511EE]" : "bg-gray-300"
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* divider */}
      <hr className="hidden mb-10 border-gray-300 sm:block" />

      <p className="block sm:hidden mb-5 leading-normal text-2xl tracking-tight font-medium">
        {steps[currentStep]}
      </p>
    </div>
  );
};
