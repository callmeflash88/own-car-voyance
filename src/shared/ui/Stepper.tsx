import { CheckIcon } from "lucide-react"; // или любая другая иконка
import React from "react";

interface StepperProps {
  currentStep: number;
}

const steps = ["Basic Info", "Details", "PhotosPreview"];

export const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <React.Fragment key={index}>
            <div className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0 ${
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
                className={`font-inter text-base tracking-tight ${
                  isCurrent
                    ? "text-black font-semibold"
                    : "text-[#2B2B2B80] font-normal"
                }`}
              >
                {step}
              </span>
            </div>

            {/* Линия между шагами */}
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
  );
};
