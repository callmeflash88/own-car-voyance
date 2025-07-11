interface StepperProps {
  currentStep: number;
}

const steps = ["Basic Info", "Details", "PhotosPreview"];

export const Stepper = ({ currentStep }: StepperProps) => {
  return (
    <div className="flex items-center justify-between mb-10">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className={`w-6 h-6 rounded-full text-white text-sm flex items-center justify-center ${
              index <= currentStep ? "bg-primary" : "bg-gray-300 text-gray-500"
            }`}
          >
            {index + 1}
          </div>
          <span
            className={`text-sm ${
              index === currentStep
                ? "font-semibold text-black"
                : "text-gray-400"
            }`}
          >
            {step}
          </span>
          {index < steps.length - 1 && (
            <div className="w-8 h-[1px] bg-gray-300 mx-2"></div>
          )}
        </div>
      ))}
    </div>
  );
};
