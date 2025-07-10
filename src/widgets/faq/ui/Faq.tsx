import { FAQAnswers } from "@/features/faq-answers/ui/FaqAnswers";
import { Button } from "@/shared/ui";

export const Faq = () => {
  return (
    <section className="relative py-32 flex flex-col justify-start items-start overflow-hidden bg-white">
      {/* Овальный фон */}
      <div className="absolute inset-0 z-0 flex justify-center items-center">
        <div className="w-[90vw] h-[600px] bg-[#6F76F2] opacity-10 rounded-full blur-[25px]" />
      </div>

      <div className="px-60 w-full flex items-center justify-between">
        <div className="flex w-1/2 flex-col items-start">
          <h3 className="font-inter font-semibold text-[40px] leading-[54px] tracking-normal align-middle capitalize">
            Find Your
            <br /> Answers Here
          </h3>
          <p className="mt-4 font-inter font-normal text-[20px] leading-[30px] tracking-normal align-middle">
            Couldn’t not find what you were looking <br />
            for? Write to us at{" "}
            <span className="text-[#5511EE]">help@carvoyance.info</span>
          </p>
          <Button variant="primary" size="lg" className="mt-10 px-12">
            Contact Us
          </Button>
        </div>
        <div className="flex w-1/2 flex-col items-start">
          <FAQAnswers />
        </div>
      </div>
    </section>
  );
};
